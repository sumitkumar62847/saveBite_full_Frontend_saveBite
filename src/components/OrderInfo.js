import React from 'react'
import { useNavigate } from 'react-router-dom';

function OrderInfo() {
  const navigate = useNavigate();
  return (
    <div className='w-[850px] h-auto  bg-green-100 m-4 border'>
          <div className='w-full h-[80%] flex justify-center items-center'>
            <h1 className='text-center text-2xl'>Not any Order Place at yet </h1>
          </div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <button className='w-[200px] h-[40px] text-center text-white py-2 bg-green-600 hover:bg-green-800 rounded-xl' onClick={()=>navigate('/')}>Order Now</button>
          </div>
    </div>
  )
}

export default OrderInfo;