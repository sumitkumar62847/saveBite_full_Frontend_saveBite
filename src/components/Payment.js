import React, { useState, useEffect } from 'react';
import Headers from './header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import CartTotalAmount from './cartTotalAmount';

function Payment() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  // State to track window width for responsive sm: breakpoints
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tailwind sm: breakpoint is 640px
  const isSm = windowWidth >= 640;

  return (
    <>
      <Headers search={false} />
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          paddingBottom: '2.5rem', // pb-10
          minHeight: '90vh',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: isSm ? 'row' : 'column', // sm:flex-row
            justifyContent: 'center',
            gap: '1rem', // gap-4
            alignItems: isSm ? 'flex-start' : 'center', // sm:items-start
            marginTop: '1rem', // Added slight margin to prevent sticking to header
          }}
        >
          <CartTotalAmount payment={true} cartItems={cartItems} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;