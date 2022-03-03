import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const LoadPost = () => {
  return (
    <div className=' lg:w-4/5 w-full h-screen flex md:grid md:grid-cols-8 md:grid-flow-col md:auto-cols-auto  md:gap-6 md:p-6  p-2'>
  <div className='w-full md:col-span-5 '>
      <div className='shadow-lg bg-white rounded-lg   sm:p-4 '>
        <div className='flex justify-between items-center sm:px-4 sm:pb-3 p-3'>
          <div className='flex justify-start items-center w-full'>
            <Skeleton variant="circular" width={40} height={40} sx={{marginRight:1}} />
            <Skeleton variant="text" width='100%'/>
          </div> 
        </div>
        <div className=' border-b border-solid pb-4 aspect-square'>
          <Skeleton variant="rectangular" width='100%' height='95%' />  
        </div> 
         
        <div className='py-2 border-b border-solid'>
          <Skeleton variant="text" width='20%'/>
          <Skeleton variant="text" width='90%'/>
          <Skeleton variant="text" width='80%'/>
        </div>
        <div className='px-3 md:hidden w-full'>
              <div className='my-4 flex flex-wrap items-center justify-start border-b border-solid pb-6 w-full'>
                <Skeleton variant="rectangular" width='100%' height='5%' />    
              </div>
              <div className='flex flex-col justify-start items-start h-full overflow-visible w-full'>
                <Skeleton variant="text" width='100%'/>
                <Skeleton variant="text" width='100%'/>
              </div>
        </div>
      </div>
  </div>

  <div className='md:col-span-3 hidden md:block lg:block'>
      <div>
          <div className='shadow-lg bg-white p-4 rounded-lg'>
              <div className='my-4 flex flex-wrap items-center justify-start border-b border-solid pb-6 w-full'>
                <Skeleton variant="rectangular" width='100%' height='200px' />   
              </div>
              <div className='flex flex-col justify-items-start items-start overflow-visible'>
                <Skeleton variant="text" width='100%'/>
                <Skeleton variant="text" width='100%'/>
              </div>
          </div>

      </div>
  </div>

</div>
  )
}

export default LoadPost