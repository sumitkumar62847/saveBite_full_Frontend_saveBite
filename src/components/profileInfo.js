import React, { useEffect, useRef, useState } from 'react'
import './AllComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../Slices/Register.js';


function ProfileInfo() {
    const userInfo = useSelector((state) => state.mainSB.userinfo);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    console.log(userInfo)
    const [form, setForm] = useState({fullname:userInfo?.userInfo?.name ||'Guest765',email:userInfo?.userInfo?.email || 'example@gmail.com',gender:userInfo?.userInfo?.gender || ''});
    const [disable, setDisable] = useState(true);
    function editHandle(e){
        e.preventDefault();
        if(disable){
            setDisable(false);
        }else{
            dispatch(createProfile({...form,userid:localStorage.getItem('idtity')}))
            setDisable(true);
        }
    }
    useEffect(()=>{
        if(userInfo?.userInfo?.name && userInfo?.userInfo?.email && userInfo?.userInfo?.gender){
            console.log('cefc')
            setForm({fullname:userInfo?.userInfo?.name,email:userInfo?.userInfo?.email ,gender:userInfo?.userInfo?.gender})
        }
    },[userInfo?.userInfo?.email,userInfo?.userInfo?.gender,userInfo?.userInfo?.name]);
    useEffect(()=>{
        if(!disable && inputRef.current){
            inputRef.current.focus();
        }
    },[disable])
    function changehandle(e){
        setForm({...form,[e.target.name]:e.target.value})
    }
  return(
    <div className='w-[850px]  bg-green-100 m-4 border'>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mt-10 mx-auto my-4'>
            <form name='personalInfo' className='w-full my-5'>
                <label className='text-slate-950 text-2xl'>Personal Information</label>
                <div className='flex items-center gap-2'>
                    <input onChange={changehandle} value={form.fullname} disabled={disable} ref={inputRef} type='text' placeholder='Full Name' name='fullname' required className='my-3 w-[60%] h-[40px] bg-transparent px-3 hover:bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
                <label className='text-slate-500'>Gender</label>
                <div className='flex items-center gap-2'>
                    <input disabled={disable} checked={form.gender === 'male'} type='radio' onChange={changehandle} id='male' name='gender' value='male' className='my-3 w-[20px] h-[20px] bg-slate-50 rounded-full cursor-pointer focus:outline-none' />
                    <label htmlFor='male' className='text-slate-600'>Male</label>
                    <input disabled={disable} checked={form.gender === 'female'}  type='radio' onChange={changehandle} id='female' name='gender' value='female' className='my-3 w-[20px] h-[20px] bg-slate-50 rounded-full cursor-pointer focus:outline-none' />
                    <label htmlFor='female' className='text-slate-600'>Female</label>
                </div>
                <label className='text-slate-950 text-2xl my-4'>Email Address</label>
                <div className='flex items-center gap-2'>
                    <input value={form.email} disabled={disable} onChange={changehandle} type='email' placeholder='Email' name='email' required className='my-3 w-[60%] h-[40px] bg-transparent px-3 hover:bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
            </form>
            <button className='text-blue-400 w-[100px] h-[40px] border px-4 rounded-lg' onClick={editHandle}>{disable ? 'Edit': 'Save'}</button>
            <form name='mobileNoInfo' className='w-full my-5'>
                <label className='text-slate-950 text-2xl'>Mobile Number</label>
                <div className='flex items-center gap-2'>
                    <input disabled='true' value={userInfo?.userInfo?.mobile} type='number' placeholder='Mobile Number' name='mobileNo' required className='my-3 w-[60%] h-[40px] bg-transparent px-3 hover:bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500 appearance-none' />
                </div>
            </form>
        </div>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mx-auto my-5 pb-5'>
            <p>Your login ( mobile number) changes, likewise. You'll receive all your account related communication on 
                your updated email address (or mobile number).
                When will my account be updated with the new email address (or mobile number)?
                It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
                What happens to my existing account when I update my email address (or mobile number)?
                Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. 
                You'll continue seeing your Order history, saved information and personal details.</p>
        </div>
    </div>
  )
}

export default ProfileInfo;