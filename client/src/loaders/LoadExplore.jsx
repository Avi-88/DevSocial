import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const dummyPost = [1,2,3,4,5,6,7,8];

const LoadExplore = () => {
  return (
    <div className='w-full  md:w-4/5 md:p-4 p-2 bg-white shadow-lg h-screen '>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3'>
        {dummyPost.map((post)=>{
        return (
            <div key={post}  className='post-div rounded-md  relative '>
              <Skeleton variant="rectangular" width='100%' sx={{height:{lg:280, md:220, sm:180, xs:150}}} />
              <div className='rounded-b-md hidden-detail w-full absolute left-0 bottom-0 md:p-4 p-1 sm:p-2 flex justify-start items-center  '>
              <Skeleton variant="circular" sx={{marginRight:1, height:{lg:40,md:30, sm:25 , xs:20},width:{lg:40,md:30, sm:25 , xs:20}}} />
              <Skeleton variant="text" width='100%'/>                
              </div>
            </div>
        )
        })}
      </div>
    </div>
  )
}

export default LoadExplore