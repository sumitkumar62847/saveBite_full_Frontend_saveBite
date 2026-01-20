import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItems } from '../Slices/DeliverySection';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCart from './orderCart';

function OrderInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OrderItems = useSelector((state) => state.delivery.allOrderItems);
  // console.log(OrderItems)
  const yes = OrderItems?.length === 0;
  useEffect(() => {
    dispatch(getOrderItems());
  }, [dispatch]);




  return (

    <div className='w-[850px] h-auto  bg-white m-4 border'>
      {yes && 
      <div>
        <div className='w-full h-[80%] flex justify-center items-center'>
            <h1 className='text-center text-2xl'>Not any Order Place at yet </h1>
          </div>
          <div className='w-full h-[20%] flex justify-center items-center'>
            <button className='w-[200px] h-[40px] text-center text-white py-2 bg-green-600 hover:bg-green-800 rounded-xl' onClick={()=>navigate('/')}>Order Now</button>
          </div>
      </div>}

      {!yes && <div className='w-full h-[80%] overflow-y-auto flex justify-center items-center'> <OrderCart allOrder={true} AllOrderItems={OrderItems}></OrderCart> </div>} 
      </div>  
   
  )
}

export default OrderInfo;