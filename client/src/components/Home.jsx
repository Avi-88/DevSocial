import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import LoadHome from '../loaders/LoadHome';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const Home = () => {
    const {user} = useContext(AuthContext);

    const [myPosts, setMyPosts] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [like, setLike] = useState(false);
    const [image, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('info');
    


    const caption = useRef();

    
    useEffect(()=>{
        const getHomeData = async () =>{
        const requestOne = await axios.get(`posts/feedposts/${user._id}`);
        const requestTwo = await axios.get(`users/${user._id}/suggested`);
    
        await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
              
            setMyPosts(responseOne.data.sort((p1, p2)=> {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
            setSuggested(responseTwo.data.suggested)
            setFollowing(responseTwo.data.following)     
            setIsLoading(false)
        }))
        .catch(error => {
            alert("There was an error: " + error);
        })
        }
    
        getHomeData();
    }, [user._id, like]);


    const handleLike = async(id) =>{
        try {
            await axios.put(`/posts/react/${id}`, {userId: user._id});
        } catch (error) {
            alert('something went wrong:' + error)
        }
    }; 
    
    const handleFollow = async (id, name) =>{
        try {
            await axios.put(`/users/${id}/follow`, {userId: user._id});
            setLike(!like);
            setOpenAlert(true);
            setMsg('You started following '+ name);
            setType('info');
        } catch (error) {
            setOpenAlert(true);
            setMsg('Something Went Wrong!');
            setType('error');
            console.log(error);
        };
    };


    const handleChange = (e)=>{
       const file = e.target.files[0];
       handlePreview(file);
       setImage(file.name)
    }

    const handlePreview = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPreviewImage(reader.result);
        };
    };

    const uploadImage = async () => {
        try {
           setIsUploading(true);
           const res = await axios.post('posts/add', {author:user._id, caption:caption.current.value ,photo: previewImage, picName: image})
           if(res.status === 200){
               setOpenAlert(true);
               setMsg('Image Uploaded !');
               setType('success');
               window.location.reload();
               setIsUploading(false);
           }
        } catch (error) {
            setOpenAlert(true);
            setMsg('Something Went Wrong!');
            setType('error');
            console.log(error); 
        }
      
    };

    const handleAlerts = (msg,type) =>{
        return (
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={type} sx={{ width: '100%' }}>
                {msg}
            </Alert>
            </Snackbar>
        )
    }  

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    }; 

    return isLoading ? (<LoadHome/>) : (
        <div className= "lg:w-11/12 md:w-full sm:w-full ">
          <div className=' w-full flex md:grid  md:grid-cols-7 md:gap-6 md:p-6 p-1'>
            <div className=' col-span-2 rounded-lg hidden lg:block  '>
                <div className='bg-white shadow-lg rounded-lg sticky top-6'>
                    <img className='w-full shadow-lg rounded-t-lg' alt='advert' src='/assets/ad.jpg'></img>
                    <p className='text-center p-2 font-medium'>Advertisement</p>
                </div>
            </div>

            <div className='lg:col-span-3 md:col-span-4 rounded-lg h-full py-4 md:py-0  scroll-smooth'>
                <div className='bg-white shadow-lg p-4 rounded-lg '>
                    <div className={previewImage ? 'block' : 'hidden'}>
                        <div className='pb-4 relative'>
                            <div className='absolute top-2 right-2 rounded-full bg-red-200'><IconButton color='error' size='small' onClick={()=>{setPreviewImage(null)}}><CloseIcon/></IconButton></div>
                            <img alt='photu' src={previewImage} className='object-cover aspect-square h-full w-full border-2' />
                        </div>
                    </div>
                    <div className='flex  items-center my-2'>
                      <Avatar src={user.profilePicture} />
                      <input placeholder='Caption' ref={caption} className='ml-3 bg-gray-200 rounded-full p-2 grow'/>
                    </div>
                    <div className=' p-4 mt-4 flex justify-around items-center'>
                        <div className='w-full px-2'>
                        <label className='w-full' htmlFor='upload-file'>  
                            <input accept='image/*' type='file' id='upload-file' onChange={handleChange} className='hidden'/>  
                            <Button className='w-full' variant="outlined" component="span" endIcon={<AddPhotoAlternateIcon/>}>
                                Upload 
                            </Button>
                        </label>
                        </div>
                        <div className='w-full px-2'>
                        {isUploading ? (<Button className='w-full' variant="outlined" onClick={uploadImage} endIcon={<CircularProgress size={25}  sx={{color:'blue'}}/>}>
                          POST
                      </Button>) : (<Button className='w-full' variant="outlined" onClick={uploadImage} endIcon={<SendIcon />}>
                          POST
                      </Button>)}
                        </div>
                    </div>
                </div>

                <div className=' sm:flex-col md:grid md:grid-cols-1'>
                {myPosts.map((post, index) => {
                    return(
                    <div key={index} className='items-center aspect-square bg-white shadow-lg  my-6 rounded-lg'>
                        <div className='flex justify-items-start items-center p-4'>
                            <Link to="/profile">
                            <Avatar src={post?.author?.profilePicture} />
                            </Link>
                            <h2 className='ml-4 font-medium'>{post?.author?.username}</h2>
                            <p className='px-4 text-sm text-gray-500'>{format(post.createdAt)}</p> 
                        </div>
                        <div className='mb-2 border-y border-solid aspect-square'>
                            <Link to={`/userpost/${post._id}`}>
                                <img alt='post' className='object-cover h-full w-full aspect-square' src={post.img}></img>
                            </Link>
                        </div>
                        <div className=' flex items-center px-2'>
                            <IconButton onClick={()=>{
                                handleLike(post._id);
                                setLike(!like);
                            }} aria-label="like">
                                {post.likes.includes(user._id) ? <Favorite sx={{color:"red"}} /> : <FavoriteBorder /> } 
                            </IconButton>
                            <p>{(post.likes.length === 1) ? (post.likes.length)+ ' like' : (post.likes.length)+ ' likes'}</p>
                        </div>
                        <div className='flex flex-wrap items-center px-4 pb-4'>
                             <p className='font-bold mr-2 whitespace-nowrap'>{post?.author?.username}</p>
                             <p >{post.caption}</p>
                        </div>
                        <div className='px-4 pb-4'>
                            {post.comments.length > 0 ? 
                            (<Link to={`/userpost/${post._id}`}><p className='font-semibold'>View all {post.comments.length === 1 ? ('Comments'):(post.comments.length + ' Comments')} </p></Link>) : 
                            (<Link to={`/userpost/${post._id}`}><p className='text-gray-500'>Add a comment...</p></Link>)}     
                        </div>
                    </div>
                    )
                })}
                    
                </div>
            </div>

            <div className=' lg:col-span-2 md:col-span-3 md:h-screen lg:block  md:block hidden rounded-lg sticky top-6'>
                <div className='mb-6 shadow-lg '>
                    <div className='bg-gray-700 p-4 rounded-lg flex justify-between items-center'>
                       <h1 className='text-white'>Following</h1>
                       <PeopleAltIcon sx={{color:"white"}}/>
                    </div>
                    <div className='bg-white p-4 rounded-lg max-h-80 overflow-auto'>
                       {following.length > 0 ? following.map((profile,index)=>{
                        return  (<div key={index} className='flex justify-items-start items-center py-4'>
                                    <Link to={`/userprofile/${profile._id}`}>
                                        <Avatar src={profile.profilePicture} />
                                    </Link>
                                    <h2 className='ml-4'>{profile.username}</h2>
                                </div>)
                       }): (<div className='flex justify-center items-center p-4'><p className='text-gray-400 text-center '>Start following people to build connections !</p></div>)}
                    </div>
                </div>

                <div className='shadow-lg '>
                    <div className='bg-gray-700 p-4 rounded-lg flex justify-between items-center'>
                       <h1 className='text-white'>Suggested</h1>
                       <PeopleAltIcon sx={{color:"white"}}/>
                    </div>
                    <div className='bg-white p-4 rounded-lg lg:max-h-60 md:max-h-40 overflow-auto'>
                       {suggested.map((profile,index)=>{
                        return  (<div key={index} className='flex justify-between items-center py-4'>
                                    <div className='flex justify-items-start items-center'>
                                        <Link to={`/userprofile/${profile._id}`}>
                                            <Avatar  src={profile.profilePicture} />
                                        </Link>
                                        <h2 className='ml-4'>{profile.username}</h2>
                                    </div>
                                    <Fab onClick={()=>{handleFollow(profile._id,profile.username)}} size="small" color="primary" aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                </div>)
                       })}
                    </div>
                </div>
            </div>
          </div>
          
        {handleAlerts(msg, type)}

        </div>
    )
}

export default Home
