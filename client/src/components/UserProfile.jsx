import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import LoadProfile from '../loaders/LoadProfile';
import CircularProgress from '@mui/material/CircularProgress';
import _ from 'lodash';

const UserProfile = () => {
     
    const {user} = useContext(AuthContext);
     
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const [follow, setFollow] = useState(false);
    const [paginatedList, setPaginatedList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  

    const {profileId} = useParams();
    const navigate = useNavigate();
        
    useEffect(()=>{
        const getProfileData = async () =>{
        setIsLoading(true);
        const requestOne = await axios.get(`/users/${profileId}`);
        const requestTwo = await axios.get(`/posts/myposts/${profileId}`);
        const requestThree = await axios.get(`/users/${user._id}/suggested`);

        await axios.all([requestOne, requestTwo , requestThree]).then(axios.spread((...responses) => {
          const responseOne = responses[0]
          const responseTwo = responses[1]
          const responseThree = responses[2]
          
          setUserProfile(responseOne.data)
          setUserPosts(responseTwo.data)
          setSuggested(responseThree.data.suggested)     
          setIsLoading(false);
        }))
        .catch(error => {
          alert("There was an error: " + error);
        })
      }

      getProfileData();
    }, [profileId, follow, user._id]);


    useEffect(()=>{
      setPaginatedList(_(suggested)?.slice(0).take(pageSize).value());
    },[suggested]);

    useEffect(()=>{
      const startIndex = (currentPage - 1)*pageSize;
      const paginated = _(suggested)?.slice(startIndex).take(pageSize).value();
      setPaginatedList(paginated);
  },[currentPage , suggested]);

    
    const pageSize = 6;

    const pageCount = suggested ? Math.ceil(suggested.length/pageSize) : 0;

    const pages = _.range(1, pageCount+1);

    const paginationNext = () =>{
      if(currentPage < pages.length){
        setCurrentPage(prevValue => prevValue + 1 );
      }
    };

    const paginationPrevious = () =>{
      if(currentPage > 1){
        setCurrentPage(prevValue => prevValue - 1 );
      }
    };

    const handleFollow = async () =>{
        try {
            setIsLoadingAction(true);
            await axios.put(`/users/${profileId}/follow`, {userId: user._id});
            setFollow(!follow);
            setIsLoadingAction(false);
        } catch (error) {
            alert('something went wrong:'+ error);
        };
    };

    const handleUnFollow = async () =>{
        try {
            setIsLoadingAction(true);
            await axios.put(`/users/${profileId}/unfollow`, {userId: user._id});
            setFollow(!follow);
            setIsLoadingAction(false);
        } catch (error) {
            alert('something went wrong:'+ error);
        }
    };

    const userSwitch = async (id) => {
      navigate(`/userprofile/${id}`)
    };


  return isLoading ? (<LoadProfile/>) : (<div className=' lg:w-4/5 md:w-full w-full h-full sm:flex md:grid md:grid-cols-8 md:gap-6 md:p-6  mx-auto'>
        <div className='w-full md:w-full md:col-span-5 h-full sm:col-span-8 shadow-lg bg-white p-2 rounded-lg relative'>
            <div className='md:border-b md:border-solid'>
              
                <img className='absolute top-0 left-0  h-1/6 lg:h-48 sm:h-1/5 md:h-1/5 w-full md:rounded-t-lg object-cover drop-shadow-xl' alt='banner' src='/assets/4884273.jpg'></img>
               
              <div className=' justify-center items-center py-4 z-40 mt-10'>
                  <div className='flex flex-col justify-center items-center mt-6  md:mb-2'>
                      <Avatar sx={{ height:{lg:150,md:120, sm:100 , xs:100},width:{lg:150,md:120, sm:100 , xs:100},border:1, borderColor:'white' , boxShadow:10}} src={userProfile.profilePicture}/>
                      <h1 className='p-4 md:mt-2 font-bold text-base md:text-lg'>{userProfile.username}</h1>
                      <div className='mb-2' >
                        {userProfile.followers.some(p => p._id === user._id) ? <Button size="small" onClick={handleUnFollow} variant="outlined" endIcon={<DoneIcon />}>{isLoadingAction ?  <CircularProgress size={20}  /> : 'Following'}</Button> : <Button size="small" onClick={handleFollow}  variant="contained" endIcon={<AddIcon />}>{isLoadingAction ?  <CircularProgress size={20} sx={{color:'white'}} /> : 'Follow'}</Button> } 
                      </div>                           
                  </div>
                  <div className='md:hidden md:mb-4 flex flex-col justify-center items-center z-40'>
                    <p className='text-center text-sm'>{userProfile.bio}</p>
                    <div className='flex flex-wrap justify-center py-2'>
                        {userProfile.techStack.map((stack, index)=>(
                            <Chip sx={{margin:"4px"}} key={index} variant="outlined" label={stack} color="info" />
                      ))}  
                    </div>
                  </div>
                  <div className='flex justify-between sm:justify-around md:justify-around items-center pt-4 px-4 md:px-8 sm:pt-4  border-t border-solid'>
                      <div className='flex flex-col justify-center items-center text-sm md:text-base'><p className=' px-1'>{userPosts.length}</p><p className='font-semibold px-1  '>Posts</p></div>
                      <div className='flex flex-col justify-center items-center text-sm md:text-base'><p className=' px-1'>{userProfile.followers.length}</p><p className='font-semibold px-1  '>Followers</p></div>
                      <div className='flex flex-col justify-center items-center text-sm md:text-base'><p className=' px-1'>{userProfile.following.length}</p><p className='font-semibold px-1  '>Following</p></div>
                  </div>
              </div>
            </div>
            <div className='pt-4 border-t border-solid'>
              {userPosts.length === 0 ? (
                <div className='flex justify-center items-center  h-40'>
                  <p className='font-semibold text-gray-400 text-sm'>The user hasn't posted yet</p>
                </div>
              ) : (
                <div className='grid grid-cols-3 gap-1 md:gap-1'>    
                         {userPosts.map((post, index) => (
                        <div key={index} className='col-span-1 aspect-square'>
                          <Link  to={`/userpost/${post._id}`}>
                            <img className='object-cover h-full w-full rounded-sm' src={post.img} alt='post'/>
                          </Link>
                        </div>
                        ))}
                </div>
              )}
            </div>
        </div>

        <div className='md:col-span-3 hidden md:block lg:block'>
            <div>
                <div className='shadow-lg bg-white md:p-2 lg:px-4 mb-4 rounded-lg'>
                    <div className='my-2'>
                        <p className='font-semibold lg:p-2 md:px-2 md:py-1'>Bio :</p>
                        <p className='lg:p-2 md:px-2 md:py-1'>{userProfile.bio}</p>
                    </div>
                    <div className='my-3'>
                        <p className='font-semibold md:p-2 lg:pb-4'>Tech Stack :</p>
                        <div className='flex flex-wrap justify-start px-2'>
                            {userProfile.techStack.map((stack, index)=>(
                                <Chip sx={{margin:"4px"}} key={index} variant="outlined" label={stack} color="info" />
                            ))}   
                        </div>
                    </div>
                </div>
                <div className='shadow-lg bg-white md:p-2 lg:px-4 rounded-lg'>
                    <div className='lg:my-2 md:my-1'>
                        <p className='font-semibold p-2'>Suggested :</p>
                    </div>
                    <div className='grid grid-cols-3 gap-4  justify-items-center items-start '>
                      {paginatedList?.map((profile, index)=>{
                        return(<div key={index} className='flex flex-col justify-center items-center m-2'>
                                <div className='cursor-pointer' onClick={() => userSwitch(profile._id)} >
                                  <Avatar sx={{ backgroundColor:"orange", height:{lg:60,md:50, sm:40},width:{lg:60,md:50, sm:40}}} src={profile.profilePicture} />
                                </div>
                                <h1 className='p-2 text-center md:text-xs lg:text-sm'>{profile.username}</h1>
                              </div>)
                      })}                       
                    </div>
                    <div className='flex justify-center gap-4 items-center p-4'>
                        <IconButton color='primary' size='small' onClick={paginationPrevious}><ArrowBackIosIcon/></IconButton>
                        <IconButton color='primary' size='small' onClick={paginationNext}><ArrowForwardIosIcon/></IconButton>
                    </div>
                </div>

            </div>
        </div>

  </div>);
};

export default UserProfile;
