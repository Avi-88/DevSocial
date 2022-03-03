import React, { Fragment, useContext } from "react";
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Explore  from './Explore';
import UserPost from "./UserPost";
import UserProfile from "./UserProfile";
import TopNav from "./TopNav";
import {Routes, Route} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function App() {
  
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <Fragment>
      {isLoggedIn &&
        <div className="items-center  flex w-full  bg-gray-900 bg-opacity-90 md:px-12 px-6 py-4 md:py-6 shadow-2xl">
        <TopNav/>
        </div>
      }

      <div className="w-full  h-full flex justify-center bg-slate-200 relative ">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home />: <Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={isLoggedIn ? <Profile/>: <Login/>}/>
          <Route path="/explore" element={isLoggedIn ? <Explore/>: <Login/>}/>
          <Route path="/userprofile/:profileId" element={<UserProfile />}/>
          <Route path="/userpost/:postId" element={<UserPost />}/>
        </Routes>  
      </div>
       
      {isLoggedIn &&
        <div className="items-center justify-center flex w-full  bg-gray-900 bg-opacity-90 p-4 md:p-6 shadow-2xl text-white">
        Copyright &#169; 2022  Avi
        </div>
      } 
  
    </Fragment>
  );
}

export default App;
