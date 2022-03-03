import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
     dispatch({type:"LOGOUT"});
     navigate('/');
  };

  return (
   <div className='flex items-center justify-between w-full'>
      <div className='w-12 h-10 flex justify-center items-center'>
         <img alt='logo' className='object-cover' src="https://i.pinimg.com/736x/53/44/f4/5344f4dd489a273b6a71f8db42954054--aesthetic-words-grunge-girl-aesthetic.jpg?b=t"></img>
      </div>
      <div className='px-4'>
         <ul className="flex ">
            <li className="px-3 sm:px-6  py-1">
               <NavLink to="/"  className={({isActive}) => 'hover:text-gray-300 flex justify-center items-center flex-col ' + (isActive ?' text-white border-b-2 ' : ' text-gray-500')} >
                  <div className='md:block hidden'><p className='font-semibold pb-2'>Home</p></div>
                  <div className='md:hidden'>
                  <IconButton sx={{color:"white"}}>
                     <HomeIcon/>
                  </IconButton>
                  </div>
               </NavLink>    
            </li> 
      
      
            <li className="px-3 sm:px-6  py-1">
               <NavLink to="/explore"  className={({isActive}) => 'hover:text-gray-300 flex justify-center items-center flex-col ' + (isActive ?' text-white border-b-2' : ' text-gray-500')} >
                  <div className='md:block hidden'><p className='font-semibold pb-2'>Explore</p></div>
                  <div className='md:hidden'>
                  <IconButton sx={{color:"white"}}>
                     <ExploreIcon/>
                  </IconButton>
                  </div>
               </NavLink>    
            </li>

            <li className="px-3 sm:px-6  py-1">
               <NavLink to="/profile" className={({isActive}) => 'hover:text-gray-300 flex justify-center items-center flex-col ' + (isActive ?' text-white border-b-2' : ' text-gray-500')} >
                  <div className='md:block hidden'><p className='font-semibold pb-2'>My Profile</p></div>
                  <div className='md:hidden'>
                  <IconButton sx={{color:"white"}}>
                     <AccountCircleIcon/>
                  </IconButton>
                  </div>
               </NavLink>    
            </li>
         </ul>
      </div>
   
      <div className=''>
         <IconButton onClick={handleLogout} sx={{color:"red"}} size='small'>
            <LogoutIcon  />
         </IconButton>
      </div>
   
</div>
)
 
};

export default TopNav;
