import React, { useEffect, useRef } from 'react';
import {format} from 'timeago.js';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import LoadPost from '../loaders/LoadPost';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserPost = () => {

  const {user} = useContext(AuthContext);
  const {postId} = useParams();
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [content , setContent] = useState('');
  const [like, setLike] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('info');
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  const caption = useRef();
  const tags = useRef();

  const navigate = useNavigate();


  useEffect(()=>{
    try {
      const getPostData = async ()=>{
        const post = await axios.get(`/posts/${postId}`);
        if(post.data.author._id === user._id){
          setAdmin(true)
        }
        setPostData(post.data);
        setIsLoading(false);
      }
      getPostData();
    } catch (error) {
      alert("something went wrong"+ error)
    }
  },[postId,content,like, user._id]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleChange = (e)=>{
    setContent(e.target.value)
  };

  const handleComment = async() =>{
    try {
      await axios.post(`/comments/add/${postId}`,{author: user, content: content });
      setContent('');
    } catch (error) {
      setOpenAlert(true);
      setMsg('Comment couldnt be added!');
      setType('error');
      console.log(error);
    }
  };

  const handleLike = async(id) =>{
    try {
        await axios.put(`/posts/react/${id}`, {userId: user._id});
    } catch (error) {
        alert('something went wrong:' + error)
    }
  }; 
  
  const handlePostUpdate = async ()=>{
    try {
      const res = await axios.put(`/posts/${postId}`, {userId: user._id , caption: caption?.current?.value , techStack: tags?.current?.value});
      if(res.status === 200){
        setOpenAlert(true);
        setMsg('Post Updated !');
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

  const handlePostDelete = async ()=>{
    try {
      const res = await axios.delete(`/posts/${postId}`, {userId: user._id, fileId: postData.image_id});
      if(res.status === 200){
         alert('post deleted');
         navigate('/profile'); 
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
}  

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

 

  return isLoading ? (<LoadPost/>) : (<div className=' lg:w-4/5 w-full h-full flex md:grid md:grid-cols-8 md:grid-flow-col md:auto-cols-auto  md:gap-6 md:p-6  p-1'>
  <div className='w-full md:col-span-5 '>
      <div className='shadow-lg bg-white rounded-lg mb-10  sm:p-4 '>
        <div className='flex justify-between items-center sm:px-4 sm:pb-3 p-3'>
          <div className='flex justify-start items-center'>
            <Link to={admin ? `/profile` : `/userprofile/${postData.author._id}`}>
              <Avatar sx={{lg:{height:50, width:50},md:{height:50, width:50}, sm:{height:50, width:50}, xs:{height:40, width:40} }} src={postData.author.profilePicture}/>
            </Link>
            <h2 className='ml-3 font-semibold whitespace-nowrap text-md sm:text-lg'>{postData.author.username}</h2>
            <p className='px-4 text-sm text-gray-500'>{format(postData.createdAt)}</p>
          </div>
          {postData.author._id === user._id && <IconButton aria-label="edit" onClick={handleClickOpen}> 
            <MoreVertIcon />
          </IconButton> } 
        </div>
        <div className=' border-b border-solid pb-4 aspect-square'>
          <img alt='camera' className='border  border-solid object-cover aspect-square h-full w-full' src={postData.img}></img>  
        </div> 
         
        <div className='py-2 border-b border-solid'>
            <div className='flex items-center px-2'>
              <IconButton onClick={()=>{
                                handleLike(postData._id);
                                setLike(!like);
                            }} aria-label="like">
                {postData.likes.includes(user._id) ? <Favorite sx={{color:"red"}} /> : <FavoriteBorder /> } 
              </IconButton>
              <p>{(postData.likes.length === 1) ? (postData.likes.length)+ ' like' : (postData.likes.length)+ ' likes'}</p>
            </div>
            <div className='flex items-center px-4'>
             <div className='flex justify-start items-start flex-wrap'><p><span className='font-bold mr-2 whitespace-nowrap text-sm'>{postData.author.username}</span>{postData.caption}</p></div>
            </div>
            <div className='flex flex-wrap justify-start items-center px-2'>
                  <p className='font-semibold p-2 whitespace-nowrap'>Tags :</p>
                  <div className='flex flex-wrap justify-start py-2'>
                    {postData.techStack.map((tag, index)=>(
                      <Chip key={index} sx={{margin:"4px"}} variant="outlined" label={tag} color="info" />
                    ))} 
                  </div>
            </div>
        </div>
        <div className='px-3 md:hidden'>
              <div className='my-4 flex flex-wrap items-center justify-start border-b border-solid pb-6'>
                  <p className='font-semibold p-2 whitespace-nowrap'>Comments :</p>
                  <div className='flex  grow justify-around items-center mx-2'>
                    <input placeholder='Add a comment...' value={content} onChange={handleChange} className='mr-2 bg-gray-200 rounded-full px-3 py-2 grow'></input>
                    <IconButton onClick={handleComment} color="primary" type='submit' component="span" >
                      <SendIcon />
                    </IconButton>
                  </div>   
              </div>
              <div className='flex flex-col justify-items-start items-start h-full overflow-visible pb-4'>
                {postData.comments.map((comment, index)=>(
                    <div key={index} className='whitespace-normal'>
                      <div className='text-sm flex justify-items-start items-center m-2 whitespace-normal'><Avatar sx={{ height:30, width:30, marginRight:1.2 }} src={comment.author.img}/><p ><span className='pr-2  font-semibold whitespace-nowrap '>{comment.author.userName}</span>{comment.content}</p></div>  
                    </div>
                ))}
              </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}  >
        <div className='flex justify-between items-center px-2'>
          <DialogTitle>Edit Post</DialogTitle>
          <IconButton onClick={handleClose} color="primary" type='submit' component="span" >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent sx={{px:3}}>
          <TextField
            margin="dense"
            id="name"
            label="Caption"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            inputRef={caption}
            defaultValue={postData.caption}
          />
          <TextField
            margin="dense"
            id="name"
            label="Tags"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            helperText="*Add a comma between tags"
            inputRef={tags}
            defaultValue={postData.techStack}
          />
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent:"space-around", alignItems:'center',pb:3, px:3}}>
            <Button sx={{flexGrow:1}} variant="contained" onClick={handlePostUpdate}>Update</Button>
            <Button startIcon={<DeleteIcon />}  sx={{flexGrow:1}} variant="contained" onClick={handlePostDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

  </div>

  <div className='md:col-span-3 hidden md:block lg:block'>
      <div>
          <div className='shadow-lg bg-white p-4 rounded-lg'>
              <div className='my-4 flex flex-wrap items-center justify-start border-b border-solid pb-6'>
                  <p className='font-semibold p-2 whitespace-nowrap'>Comments :</p>
                  <div className='flex  grow justify-around items-center mx-2'>
                    <input placeholder='Add a comment...' value={content} onChange={handleChange}  className='mr-2 bg-gray-200 rounded-full px-3 py-2 grow'></input>
                    <IconButton color="primary" onClick={handleComment} type='submit' aria-label="upload picture" component="span">
                      <SendIcon />
                    </IconButton>
                  </div>   
              </div>
              <div className='flex flex-col justify-items-start items-start overflow-y-visible'>
                  {postData.comments.map((comment, index)=>(
                    <div key={index} className='whitespace-normal py-2'>
                      <div className='text-sm flex justify-items-start items-center m-2 whitespace-normal'><Avatar sx={{ height:30, width:30, marginRight:1.2 }} src={comment.author.img}/><p><span className='pr-2 text-sm font-semibold whitespace-nowrap '>{comment.author.userName}</span>{comment.content}</p></div>  
                    </div>
                ))}
              </div>
          </div>

      </div>
  </div>

  {handleAlerts(msg, type)}

</div>);
};

export default UserPost;
