import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const LoadProfile = () => {
  return (
    <div className=' lg:w-4/5 w-full h-screen sm:flex md:grid md:grid-cols-8 md:gap-6 md:p-6  mx-auto'>
        <div className='w-full md:col-span-5 h-full sm:col-span-8 shadow-lg bg-white p-2 rounded-lg relative'>
            <div className='md:border-b md:border-solid'>   
                <div className=' justify-center items-center py-4 z-40 mt-10'>
                    <div className='flex flex-col justify-center items-center mt-6  md:mb-2'>
                        <Skeleton variant='circular' sx={{ height:{lg:150,md:120, sm:90 , xs:80},width:{lg:150,md:120, sm:90 , xs:80}, boxShadow:10}}/>
                        <div className='relative  flex justify-center items-center py-4 w-full'>
                          <Skeleton variant="text" width='40%'/>
                        </div>
                    </div>
                    <div className='md:hidden md:mb-4 flex flex-col justify-center items-center z-40'>
                    <Skeleton variant="text" />
                    </div>
                    <div className='flex justify-around md:justify-around items-center pt-4 px-4 md:px-8 sm:pt-4  border-t border-solid'>
                        <div className='flex  items-center md:text-base w-full'><Skeleton variant="text" width='80%'/></div>
                        <div className='flex  items-center md:text-base w-full'><Skeleton variant="text" width='80%'/></div>
                        <div className='flex  items-center md:text-base w-full'><Skeleton variant="text" width='80%'/></div>
                    </div>
                </div>
            </div>
            <div className='pt-4 border-t border-solid'>
                <div className='grid grid-cols-3 gap-1 md:gap-1'>    
                        <div className='col-span-1 aspect-square'>
                            <Skeleton variant="rectangular" width='95%' height='100%' /> 
                        </div>
                        <div  className='col-span-1 aspect-square'>
                            <Skeleton variant="rectangular" width='95%' height='100%'  /> 
                        </div>
                        <div  className='col-span-1 aspect-square'>
                            <Skeleton variant="rectangular" width='95%' height='100%'  /> 
                        </div>
                </div>    
            </div>
        </div>

        <div className='md:col-span-3 hidden md:block lg:block'>
            <div>
                <div className='shadow-lg bg-white md:p-2 lg:px-4 mb-4 rounded-lg'>
                    <div className='my-2'>
                        <Skeleton variant="text" />
                    </div>
                    <div className='my-3'>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />  
                    </div>
                </div>
                <div className='shadow-lg bg-white md:p-2 lg:px-4 rounded-lg'>
                    <div className='lg:my-2 md:my-1'>
                        <Skeleton variant="text" />
                    </div>
                    <div className='grid grid-cols-3 gap-4  justify-items-center items-start '>
                        <div className='flex flex-col justify-center items-center m-2'>
                            <Skeleton variant='circular' sx={{height:{lg:60,md:50, sm:40},width:{lg:60,md:50, sm:40}}}/>
                            <Skeleton variant="text" width='100%' />
                        </div>
                        <div className='flex flex-col justify-center items-center m-2'>
                            <Skeleton variant='circular' sx={{height:{lg:60,md:50, sm:40},width:{lg:60,md:50, sm:40}}}/>
                            <Skeleton variant="text" width='100%'/>
                        </div>
                        <div className='flex flex-col justify-center items-center m-2'>
                            <Skeleton variant='circular' sx={{height:{lg:60,md:50, sm:40},width:{lg:60,md:50, sm:40}}}/>
                            <Skeleton variant="text" width='100%'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

  </div>
  )
}

export default LoadProfile