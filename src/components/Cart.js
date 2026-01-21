import { useEffect, useState } from 'react';
import Headers from './header';
import CartItem from './cartItem';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../Slices/cartSlice';
import CartTotalAmount from './cartTotalAmount';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  // State for hover effect on the back button
  const [isHoveredBack, setIsHoveredBack] = useState(false);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  // To simulate the sm:flex-row behavior, we check the window width
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Headers search={false}></Headers>
      <div style={{
        width: '100%',
        backgroundColor: '#ffffff',
        paddingBottom: '40px',
        minHeight: '90vh'
      }}>
        <button 
          onClick={() => { navigate(-1) }} 
          onMouseEnter={() => setIsHoveredBack(true)}
          onMouseLeave={() => setIsHoveredBack(false)}
          style={{
            padding: '8px 16px',
            color: '#ffffff',
            fontSize: '1.5rem',
            backgroundColor: isHoveredBack ? '#166534' : '#16a34a',
            borderRadius: '0.75rem',
            margin: '12px',
            position: 'absolute',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {'<-'}
        </button>
        
        <h1 style={{
          textAlign: 'center',
          fontSize: '1.875rem',
          padding: '20px',
          margin: 0
        }}>
          Your Cart
        </h1>

        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          gap: '16px',
          alignItems: isSmallScreen ? 'center' : 'flex-start'
        }}>
          <div>
            {cartItems?.map((item, index) => (
              <CartItem key={index} iteminfo={item}></CartItem>
            ))}
          </div>
              
          <CartTotalAmount cartItems={cartItems}></CartTotalAmount>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Cart;