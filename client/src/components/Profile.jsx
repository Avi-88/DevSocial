import React, {useEffect, useState, useContext, useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import LoadProfile from '../loaders/LoadProfile';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import _ from 'lodash';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Profile = () => {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const [myPosts, setMyPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [suggested, setSuggested] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('info');
  const[profilePic, setProfilePic] = useState('');
  const[profilePreview, setProfilePreview] = useState(null);
  const [paginatedList, setPaginatedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 

  const username = useRef();
  const bio = useRef();
  const techStack = useRef();


  useEffect(()=>{
    const getProfileData = async () =>{
    const requestOne = await axios.get(`users/${user._id}`);
    const requestTwo = await axios.get(`posts/myposts/${user._id}`);
    const requestThree = await axios.get(`users/${user._id}/suggested`);

    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]
      const responseThree = responses[2]
        
      setUserProfile(responseOne.data)
      setMyPosts(responseTwo.data)
      setSuggested(responseThree.data.suggested)    
      setIsLoading(false)
    }))
    .catch(error => {
      alert("There was an error: " + error);
    })
  }
  getProfileData();
}, [user._id]);


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

const handleChange = (e)=>{
  const file = e.target.files[0];
  handlePreview(file);
  setProfilePic(file.name)
}

const handlePreview = (file)=>{
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = ()=>{
    setProfilePreview(reader.result);
  };
};


const handleClickOpen = () => {
  setOpen(true);
};
    
const handleClose = () => {
  setOpen(false);
  setProfilePreview(null);
};


const handleProfileUpdate = async ()=>{
    setIsUpdating(true);
        try {
          const res = await axios.put(`users/${user._id}`, {userId: user._id , username: username?.current?.value, bio: bio?.current?.value, techStack: techStack?.current?.value, profilePic: profilePreview , profilePic_Name: profilePic , profilePic_id:userProfile.profilePic_id });
          if(res.status === 200){
            setIsUpdating(false);
            setOpenAlert(true);
            setMsg('Profile Updated !');
            setType('success');
            window.location.reload(); 
          }
        } catch (error) {
          setOpenAlert(true);
          setMsg('Something Went Wrong!');
          setType('error');
          console.log(error);
        }
};

    
const handleProfileDelete = async ()=>{
        try {
          const res = await axios.delete(`users/${user._id}`, {userId:user._id});
          if(res.status === 200){
             alert('profile deleted');
             navigate('/login'); 
          }
        } catch (error) {
          alert(error);
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
};  

const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
};
      

return isLoading ? (<LoadProfile/>) : (<div className=' lg:w-4/5 w-full h-full sm:flex md:grid md:grid-cols-8 md:gap-6 md:p-6  mx-auto'>
        <div className='w-full md:col-span-5 h-full sm:col-span-8 shadow-lg bg-white p-2 rounded-lg relative'>
            <div className='md:border-b md:border-solid'>
     
                <img className='absolute top-0 left-0  h-1/5 lg:h-48 sm:h-1/5 md:h-1/6 w-full md:rounded-t-lg object-cover drop-shadow-xl*' alt='banner' src='/assets/4884273.jpg'></img>
               
                <div className=' justify-center items-center py-4 z-40 mt-10'>
                    <div className='flex flex-col justify-center items-center mt-6  md:mb-2'>
                        <Avatar sx={{ height:{lg:150,md:120, sm:100 , xs:100},width:{lg:150,md:120, sm:100 , xs:100},border:1, borderColor:'white' , boxShadow:10}} src={userProfile.profilePicture}/>
                        <div className='relative w-auto flex justify-center items-center px-6'>
                          <h1 className='p-4 md:mt-2 font-bold text-base md:text-lg'>{userProfile.username}</h1>
                          <div className='absolute inset-y-auto right-0'>
                            <IconButton size='small' aria-label="edit" onClick={handleClickOpen}> 
                                <EditIcon fontSize="small"/>
                            </IconButton>
                        </div>
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
                        <div className='w-full flex flex-col justify-center items-center text-sm md:text-base'><div className='flex flex-col justify-center items-center'><p className=' px-1'>{myPosts.length}</p><p className='font-semibold px-1  '>Posts</p></div></div>
                        <div className='w-full flex flex-col justify-center items-center text-sm md:text-base'><div className='flex flex-col justify-center items-center'><p className=' px-1'>{userProfile.followers.length}</p><p className='font-semibold px-1  '>Followers</p></div></div>
                        <div className='w-full flex flex-col justify-center items-center text-sm md:text-base'><div className='flex flex-col justify-center items-center'><p className=' px-1'>{userProfile.following.length}</p><p className='font-semibold px-1  '>Following</p></div></div>
                    </div>
                </div>
            </div>
            <div className='pt-2 sm:pt-4 border-t border-solid'>
                <div className='grid grid-cols-3 gap-1 md:gap-1'>    
                         {myPosts.map((post, index) => (
                        <div key={index} className='col-span-1 aspect-square'>
                          <Link  to={`/userpost/${post._id}`}>
                            <img className='object-cover h-full w-full rounded-sm' src={post.img} alt='post'/>
                          </Link>
                        </div>
                        ))}
                </div>    
            </div>

            <Dialog open={open} onClose={handleClose}  >
                <div className='flex justify-between items-center px-2'>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <IconButton onClick={handleClose} color="primary" type='submit' component="span" >
                    <CloseIcon />
                  </IconButton>
                </div>
                <DialogContent sx={{px:3}}>
                  <div className='px-4 pb-6 flex justify-center items-center'>
                  <label htmlFor='upload-profile-file'>
                  <input accept='image/*' type='file' id='upload-profile-file' onChange={handleChange} className='hidden'/>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton size='small' sx={{backgroundColor:'#4b5563', }} aria-label="edit" component="span"> 
                        <EditIcon sx={{color:'white', fontSize: 15}} />
                      </IconButton>
                    }
                  >
                    <Avatar sx={{ height:{lg:120, md:120, sm:100 , xs:80},width:{lg:120, md:120, sm:100 , xs:80}}} src={profilePreview ? profilePreview : userProfile.profilePicture}/>
                  </Badge>
                  </label>
                  </div>

                  <TextField
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputRef={username}
                    defaultValue={userProfile.username}
                  />
                  <TextField
                    margin="dense"
                    id="bio"
                    label="Bio"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    inputRef={bio}
                    defaultValue={userProfile.bio}
                  />
                  <TextField
                    margin="dense"
                    id="tags"
                    label="TechStack"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    helperText="*Add a comma between tags"
                    inputRef={techStack}
                    defaultValue={userProfile.techStack}
                  />
                </DialogContent>
                <DialogActions sx={{display:'flex', justifyContent:"space-around", alignItems:'center',pb:3, px:3}}>
                    <Button startIcon={isUpdating && <CircularProgress size={22}  sx={{color:'white'}}/>} sx={{flexGrow:1}} variant="contained" onClick={handleProfileUpdate}>Update</Button>
                    <Button startIcon={<DeleteIcon />}  sx={{flexGrow:1}} variant="contained" onClick={handleProfileDelete}>Delete</Button>
                </DialogActions>
              </Dialog>


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
                                <Link to={`/userprofile/${profile._id}`}>
                                  <Avatar sx={{ backgroundColor:"orange", height:{lg:60,md:50, sm:40},width:{lg:60,md:50, sm:40}}} src={profile.profilePicture} />
                                </Link>                            
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

        {handleAlerts(msg, type)}

  </div>);
};

export default Profile;

