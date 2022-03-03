import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import LoadExplore from '../loaders/LoadExplore';

const Explore = () => {

  const [postArray , setPostArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    try {
      const getExploreFeed = async ()=>{
        const res = await axios('posts/explore');
        setPostArray(res.data);
        setIsLoading(false);
      }
      getExploreFeed();
    } catch (error) {
      alert(error);
    }
  },[])

  return isLoading ? (<LoadExplore/>) : (
    <div className='w-full  md:w-4/5 md:p-4 p-2 bg-white shadow-lg h-full md:my-5'>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3'>
        {postArray?.map((post, index)=>{
        return (
            <div key={index}  className='post-div rounded-md  relative '>
              <img alt='post' src={post.img}  className='rounded-sm object-cover aspect-square h-full w-full '/>
              <div className='rounded-b-sm hidden-detail w-full absolute left-0 bottom-0 md:p-4 p-1 sm:p-2 flex justify-start items-center text-white from-slate-900 bg-gradient-to-t '>
                <Link className='flex justify-start items-center' to={`/userpost/${post._id}`}>
                <Avatar sx={{ height:{lg:40,md:30, sm:25 , xs:20},width:{lg:40,md:30, sm:25 , xs:20}, boxShadow:10}} src={post?.author?.profilePicture} alt='profile-pic'/>
                <p className='sm:p-2 md:p-1 p-1 text-xs lg:text-base'>{post?.author?.username}</p>
                </Link>
              </div>
            </div>
        )
        })}
      </div>
    </div>
    ) ;
};

export default Explore;
