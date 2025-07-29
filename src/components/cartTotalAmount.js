import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setdlyCrg } from '../Slices/cartSlice';
import { DeleteToCart } from '../Slices/cartSlice';
import axios from 'axios';
import { setCurrentOrderItems } from '../Slices/DeliverySection';
function CartTotalAmount({cartItems ,payment}){
  const HomeItemAmt = useSelector((state)=> state.cart.HomeItemAmt);
  const RestItemAmt = useSelector((state)=> state.cart.RestItemAmt);
  const userInfo = useSelector((state) => state.mainSB.userinfo);
  const dlyCrg = useSelector((state)=> state.cart.dlyCrg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalHomeAmt = 0;
  let totalRestAmt = 0;
  HomeItemAmt.forEach(item => {
      totalHomeAmt += Number(item.amt) * item.userQty;
  });
  RestItemAmt.forEach(item => {
      totalRestAmt += Number(item.amt) * item.userQty;
  });
  useEffect(()=>{
    if(totalHomeAmt === 0){
      dispatch(setdlyCrg(0));
    }
    else if(totalHomeAmt > 149){
      dispatch(setdlyCrg(0));
    }else{
      dispatch(setdlyCrg(49));
    }
  },[totalHomeAmt,totalRestAmt,dispatch]);

  const handlePayment = async (amount) =>{
    try {
        const jwt_token = localStorage.getItem("jwt_token");
        const { data } = await axios.post("http://localhost:8088/api/create-order",{amount},{
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-Type': 'application/json',
            }
        });
      const options={
        key: "rzp_test_kfOfovhCxer3YT", 
        amount: data.amount,    
        currency: data.currency,
        name: "SaveBite",
        description: "Payment for your order",
        order_id: data.orderId,   
        handler: async function (response){
          const verifyRes = await axios.post("http://localhost:8088/api/verify", response,{
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-Type': 'application/json',
            }
          });
          if (verifyRes.data.success) {
            // alert("Payment successful and verified!");
            dispatch(setCurrentOrderItems({RestItemAmt,HomeItemAmt}))
            dispatch(DeleteToCart('All_Clear'));
            window.location.href = '/';
            return {payment:'Done'};
          } else {
            alert("Payment verification failed.");
            window.location.href = '/cart';
          }
        },
        prefill: {
          name: `${userInfo?.userInfo?.name}`,
          email: `${userInfo?.userInfo?.email}`,
          contact: `${userInfo?.userInfo?.mobile}`,
        },
        theme: {
          color: "#27ae60",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error){
      console.error("Error creating order or verifying payment:", error);
    }
  };

  function payHandle(e){
    e.preventDefault();
    const totalAllAmt = (totalHomeAmt + totalRestAmt + dlyCrg).toFixed(1);
    handlePayment(totalAllAmt,cartItems);
  };

  function checkoutHandle(e){
    e.preventDefault()
    if(totalHomeAmt > 0 ){
      navigate('/address')
    }else{
      navigate('/payment');
    }
  }
  return (
    <>
        {cartItems.length !== 0 && <div className='w-[80%] sm:w-[25%] lg:w-[25%] border shadow-2xl p-4 flex flex-col items-center'>
            <h2 className='text-xl p-2  text-red-400 w-full text-center'>Total Amount</h2>
            <div className='w-full h-auto'>
              <p className='w-full flex items-center justify-between py-2 '><label>Delivery Totel :</label> <strong> {(totalHomeAmt).toFixed(1)}&#8377;</strong></p>
              <p className='w-full flex items-center justify-between py-2 '><label>Dining in Totel :</label> <strong> {(totalRestAmt).toFixed(1)}&#8377;</strong></p>
              <p className='w-full flex items-center justify-between py-2 '><label>Delivery Charge :</label> <strong> {(dlyCrg).toFixed(1)}&#8377;</strong></p>
              <p className='w-full flex items-center justify-between py-2'><label>Total Amount: </label> <strong> {(totalHomeAmt + totalRestAmt + dlyCrg).toFixed(1)}&#8377;</strong></p>
            </div>
            {!payment && <button className='w-full h-[50px] mt-4 bg-green-500 active:bg-green-600 text-black rounded-lg text-[6px] md:text-[14px] text-center border' onClick={checkoutHandle}>Proceed to Checkout</button>}
            {payment && <button className='w-full h-[50px] mt-4 bg-green-500 active:bg-green-600 text-black rounded-lg text-[6px] md:text-[14px] text-center border text-2xl' onClick={payHandle}>Pay {(totalHomeAmt + totalRestAmt + dlyCrg).toFixed(1)}&#8377;</button>}
        </div>
        }{cartItems.length === 0 && !payment && <div className='w-full h-[50vh] flex flex-col justify-center items-center'>
          <h1>Cart Empty</h1>
          <i>Click <span className='text-blue-500 underline cursor-pointer' onClick={()=>{navigate('/')}}> Here</span> For Order</i>
        </div>}
        {cartItems.length === 0 && payment && <div className='w-full h-[50vh] flex flex-col justify-center items-center'>
          <h1 className='text-xl text-red-400'>Your Perform address/payment Page Refresh</h1>
          <i>Click <span className='text-blue-500 underline cursor-pointer border' onClick={()=>{navigate('/cart')}}> Here</span> and move to Bag</i>
        </div>}
    </>
    
  )
}

export default CartTotalAmount