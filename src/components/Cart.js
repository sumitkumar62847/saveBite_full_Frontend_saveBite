import  { useEffect } from 'react'
import Headers from './header';
import CartItem from './cartItem';
import Footer from './Footer';
import { useNavigate } from'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../Slices/cartSlice';
import CartTotalAmount from './cartTotalAmount';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cart.cartItems);
  useEffect(()=>{
    dispatch(getCartItems());
  },[dispatch]);

  return(
    <>
      <Headers search={false}></Headers>
     <div className='w-full bg-white pb-10 min-h-[90vh]'>
        <button onClick={()=>{navigate(-1)}} className='px-4 py-2 text-white text-2xl bg-green-600 hover:bg-green-800 rounded-xl m-3 absolute'>{'<-'}</button>
        <h1 className='text-center text-3xl p-5'>Your Cart</h1>
        <div className='w-full flex flex-col sm:flex-row justify-center gap-4 items-center sm:items-start'>
          <div>
            {cartItems?.map((item, index)=>(
              <CartItem key={index} iteminfo = {item}></CartItem>
            ))}
          </div>
              
          <CartTotalAmount cartItems={cartItems}></CartTotalAmount>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Cart;