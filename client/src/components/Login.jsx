import React, {Fragment, useContext, useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const Login = () => {
    const [isNew, setIsNew] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('info');
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const rePassword = useRef();
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNew = () => {
        setIsNew(!isNew);
    };
 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           dispatch({type:"LOGIN_START"});
            try {
                const res = await axios.post("auth/login", {email:email.current.value , password: password.current.value})
                if(res.status === 200){
                    setOpenAlert(true);
                    setMsg('Login Successfull!');
                    setType('success');
                    navigate('/')
                };
        
                dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            } catch (error) {
                dispatch({type:"LOGIN_FAILURE", payload: error})
                setOpenAlert(true);
                setMsg('Something Went Wrong!');
                setType('error');
                console.log(error);
            }
        } catch (error) {
            setOpenAlert(true);
            setMsg('Something Went Wrong!');
            setType('error');
            console.log(error);
        }
    };


    const handleRegister = async()=>{
        if(rePassword.current.value === password.current.value){
        try {
            const res = await axios.post('auth/register', {username:name.current.value, email:email.current.value , password: password.current.value});
            if(res.status === 200){
                setOpenAlert(true);
                setMsg('Registered Successfully');
                setType('success');
                window.location.reload();
            };
        } catch (error) {
            setOpenAlert(true);
            setMsg('Something Went Wrong!');
            setType('error');
            console.log(error);  
        }
    } else {
        setOpenAlert(true);
        setMsg('Invalid Credentials!');
        setType('error');
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

    return (
        <div className='p-8 mt-4 lg:w-2/5 md:w-3/5 sm:w-5/6 w-full overflow-visible h-full'>
            <div className='px-10 py-8 mt-4 text-center bg-white shadow-xl rounded-lg '>
                <div className='p-4 flex justify-center items-top mb-4'>
                    <Avatar sx={{height:"120px", width:"120px", boxShadow:10}} alt="Remy Sharp" src="/assets/sociallogo.png" />
                </div>
                <h1 className='mb-6 text-2xl font-bold '>{isNew ? "Join the club" : "Sign In to your Account" }</h1>
                <form >
                    <div>{isNew ? (
                        <Fragment>
                       <div>
                            <div className='text-left mb-2'>
                                <h1 className='py-2'>Name</h1>
                                <input type="text" ref={name} placeholder="Username" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                            </div>
                            <div className='text-left mb-2'>
                                <h1 className='py-2'>Email</h1>
                                <input type="email" ref={email} placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                            </div>
                            <div className='text-left mb-2'>
                                <h1 className='py-2'>Password</h1>
                                <input type="password" ref={password} placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                            </div>
                            <div className='text-left mb-2'>
                                <h1 className='py-2'>Re-enter Password</h1>
                                <input type="password" ref={rePassword} placeholder="Confirm Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                            </div>
                       </div>
                       <div className='mt-8'>
                            <Button sx={{width:"100%"}} onClick={handleRegister}  variant="contained">Register</Button> 
                            <p onClick={handleNew} className='pt-4 text-blue-400 hover:underline cursor-pointer'>Already a user? Login</p> 
                        </div>
                        </Fragment>
                    ):( <Fragment>
                        <div>
                        <div className='text-left mb-2'>
                            <h1 className='py-2'>Email</h1>
                            <input required ref={email} type="text" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                        </div>
                        <div className='text-left mb-2'>
                        <h1 className='py-2'>Password</h1>
                            <input required ref={password} type="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"></input>
                        </div>
                        </div>
                        <div className='mt-8'>
                            <Button sx={{width:"100%"}} onClick={handleLogin} type='submit' variant="contained">Login</Button> 
                            <p onClick={handleNew} className='pt-4 text-blue-400 hover:underline cursor-pointer'>Sign Up</p> 
                        </div>
                        </Fragment>
                    )}
                        
        
                    </div>
                </form>

            </div>
            {handleAlerts(msg, type)}
        </div>
    )
}

export default Login
