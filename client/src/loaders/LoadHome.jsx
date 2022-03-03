import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const LoadHome = () => {
  return (
    <div className= "lg:w-11/12 w-full ">
          <div className='flex-col w-full flex md:grid  md:grid-cols-7 md:gap-6 md:p-6 p-1'>
            <div className='shadow-lg col-span-2 rounded-lg hidden lg:block bg-white'>
                <Skeleton variant="rectangular" width='100%' height='100%' />
            </div>

            <div className='lg:col-span-3 md:col-span-4 rounded-lg md:h-screen h-full py-4 md:py-0 w-full flex-col md:overflow-hidden'>
                <div className='bg-white shadow-lg p-4 flex-col rounded-lg w-full'>
                    <Skeleton  variant="circular" sx={{marginBottom:1}} width={40} height={40} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </div>

                <div className='w-full flex-col md:grid md:grid-cols-1'>
                    <div  className='items-center w-full  bg-white shadow-lg  my-6 rounded-lg'>
                        <div className='flex justify-start items-center p-4'>
                            <Skeleton variant="circular" width={40} height={40} sx={{marginRight:2}} />
                            <Skeleton variant="text" width='90%'/>
                        </div>
                        <div className='border-y border-solid aspect-square px-2'>
                            <Skeleton variant="rectangular" width='100%' height='95%' />   
                        </div>
                        <div className=' flex items-center px-2'>
                            <Skeleton variant="text" width='90%' /> 
                        </div>
                        <div className='flex flex-wrap items-center px-4 pb-4'>
                            <Skeleton variant="text" width='90%' />  
                        </div>
                        
                    </div>                   
                </div>
            </div>

            <div className=' lg:col-span-2 md:col-span-3 md:h-screen lg:block  md:block hidden rounded-lg'>
                <div className='mb-6 shadow-lg '>
                    <div className='bg-gray-700 p-4 rounded-lg flex justify-between items-center'>
                       <h1 className='text-white'>Following</h1>
                       <PeopleAltIcon sx={{color:"white"}}/>
                    </div>
                    <div className='bg-white p-4 rounded-lg max-h-80 overflow-auto'>
                        <div className='flex justify-start items-center py-2'>
                            <Skeleton variant="circular" width={40} height={40} sx={{marginRight:2}} />
                            <Skeleton variant="text" width='80%' />
                        </div>
                        <div className='flex justify-start items-center py-2'>
                            <Skeleton variant="circular" width={40} height={40}  sx={{marginRight:2}}/>
                            <Skeleton variant="text" width='80%' />
                        </div>
                        <div className='flex justify-start items-center py-2'>
                            <Skeleton variant="circular" width={40} height={40} sx={{marginRight:2}} />
                            <Skeleton variant="text" width='80%' />
                        </div>                    
                    </div>
                </div>

                <div className='shadow-lg '>
                    <div className='bg-gray-700 p-4 rounded-lg flex justify-between items-center'>
                       <h1 className='text-white'>Suggested</h1>
                       <PeopleAltIcon sx={{color:"white"}}/>
                    </div>
                    <div className='bg-white p-4 rounded-lg lg:max-h-60 md:max-h-40 overflow-auto'>
                        <div className='flex justify-start items-center py-2'>
                            <Skeleton variant="circular" width={40} height={40} sx={{marginRight:2}} />
                            <Skeleton variant="text" width='80%'/>
                        </div>
                        <div className='flex justify-start items-center py-2'>
                            <Skeleton variant="circular" width={40} height={40} sx={{marginRight:2}} />
                            <Skeleton variant="text" width='80%'/>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
  )
}

export default LoadHome