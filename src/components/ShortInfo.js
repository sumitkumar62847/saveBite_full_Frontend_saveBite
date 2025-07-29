import React ,{useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import userImage from '../images/userImageIcon.png'
import { useSelector } from 'react-redux';

function ShortInfo({toggleProfileItem , showProfileItem}) {
    const userInfo = useSelector((state) => state.mainSB.userinfo);
    const navigate = useNavigate();
    const addressRef = useRef(null);
    const perInfoRef = useRef(null);
    const orderRef = useRef(null);
    function handertoggle(e){
        toggleProfileItem(e)
    }
    useEffect(() => {
        addressRef.current.style.backgroundColor = showProfileItem[1] ? '#F2F2F2' : '#ffffff';
        perInfoRef.current.style.backgroundColor = showProfileItem[0] ? '#F2F2F2' : '#ffffff';
        orderRef.current.style.backgroundColor = showProfileItem[2] ? '#F2F2F2' : '#ffffff';
    }, [showProfileItem])

    function LogoutHnadle(e){
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }
 
  return (
    <div>
        <div className='lg:w-[250px] h-[50vh] bg-white m-4 border flex flex-col items-center'>
            <div className='border-b-2 w-[100%] flex flex-col items-center pb-3'>
                <div className='lg:w-[80px] md:w-[60px] lg:h-[80px] md:h-[60px] rounded-full bg-slate-400 m-2'>
                    <img src={userImage} alt='user-img' className='w-[100%] h-[100%] rounded-full'></img>
                </div>
                <h1 className='text-xl text-green-900'>{userInfo?.userInfo?.name}</h1>
            </div>
            <div ref={perInfoRef} style={{backgroundColor:'white'}}  className='w-[100%] flex justify-start border-b-2 cursor-pointer ' onClick={()=>handertoggle(0)}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Personal Information</h2>
            </div>
            <div ref={addressRef} style={{backgroundColor:'white'}} className='w-[100%] flex justify-start border-b-2 cursor-pointer ' onClick={()=>handertoggle(1)}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Address Information</h2>
            </div>
            <div ref={orderRef} style={{backgroundColor:'white'}}  className='w-[100%] flex justify-start border-b-2 cursor-pointer '  onClick={()=>handertoggle(2)}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Order</h2>
            </div>
            <div className='w-[100%] flex justify-start border-b-2 cursor-pointer' onClick={()=>navigate('/cart')}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Cart</h2>
            </div>
        </div>
        <div className='lg:w-[250px] bg-white m-4 border flex flex-col items-center'>
            <div className='w-[100%] flex justify-start border-b-2 cursor-pointer hover:bg-slate-100' onClick={LogoutHnadle}>
                <h2 className='text-xl m-3 pl-2 text-red-400'>LogOut</h2>
            </div>
        </div>
    </div>
  )
}

export default ShortInfo;