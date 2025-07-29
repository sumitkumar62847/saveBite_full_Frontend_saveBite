import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createUser, otpVerification} from '../Slices/Register.js'



const initialState = {
    mobile_no:'',
    motp: '',
}

function Login(){
    const [isOpt , setIsOpt] = useState(false);
    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
   
    function handleOpt(e){
        e.preventDefault();
        if(!e.target.checkValidity()){
            alert('please fill in required fill');
            return;
        }else if(user.mobile_no.length !== 10){
            alert('please fill correct mobile number');
        }else{
            dispatch(createUser(user));
            setIsOpt(true);  
        }
        console.log(user);
    }
    function handleVerification(e){
        e.preventDefault();
        console.log(user);
        if(!e.target.checkValidity()){
            alert('please fill in required fill');
            return;
        }else if(user.motp.length !== 6){
            alert('please fill correct OTP');
            return;
        }else{
            dispatch(otpVerification(user));
        }
    }
    useEffect(()=>{
        if(isRegistered){
            navigate('/');
        }
    },[isRegistered, navigate]);

    function changehandle(e){
        setUser({...user,[e.target.name]:e.target.value});
    }
  return (
    <div className='w-full h-[100vh] bg-white flex justify-center items-center '>
        <div className='w-[80%] h-[80%] md:w-[50%] lg:w-[40%] bg-green-50  rounded-xl flex flex-col items-center justify-around'>
            <div className='w-full h-auto p-4 flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-green-500 py-4'>Register your New Account</h1>
                <p className='text-slate-400'>something abount web site</p> 
            </div>
            <div className='w-full h-auto flex justify-center items-center gap-4'>
                {!isOpt && <form className='w-full h-auto flex flex-col items-center gap-10 ' onSubmit={handleOpt}>
                    <input type='number' required name='mobile_no' placeholder='Mobile Number' pattern='\d*' onChange={(e)=>changehandle(e)}
                    className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <button type='submit' className='w-[200px] h-[50px] bg-green-500 text-white rounded-xl font-semibold'>Send OTP </button>
                </form>}
                {isOpt && <form className='w-full h-auto flex flex-col items-center gap-10 ' onSubmit={handleVerification}>
                    <input type='number' required name='motp' placeholder='OTP' pattern='\d*' onChange={(e)=>changehandle(e)} 
                    className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <button type='submit' className='w-[200px] h-[50px] bg-green-500 active:bg-green-600 text-white rounded-xl font-semibold'>Verify & Next</button>
                </form>}
            </div>
        </div>
    </div>
  )
}

export default Login;