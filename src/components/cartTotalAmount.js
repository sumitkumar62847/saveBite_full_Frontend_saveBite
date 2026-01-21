import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setdlyCrg } from '../Slices/cartSlice';
import { DeleteToCart } from '../Slices/cartSlice';
import axios from 'axios';
import { setCurrentOrderItems } from '../Slices/DeliverySection';

function CartTotalAmount({ cartItems, payment }) {
  const HomeItemAmt = useSelector((state) => state.cart.HomeItemAmt);
  const RestItemAmt = useSelector((state) => state.cart.RestItemAmt);
  const userInfo = useSelector((state) => state.mainSB.userinfo);
  const dlyCrg = useSelector((state) => state.cart.dlyCrg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Api = process.env.REACT_APP_API_URL;

  // States for Responsive Design and Interactivity
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHovered, setIsHovered] = useState(null); // track which button is hovered
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let totalHomeAmt = 0;
  let totalRestAmt = 0;
  HomeItemAmt.forEach((item) => {
    totalHomeAmt += Number(item.amt) * item.userQty;
  });
  RestItemAmt.forEach((item) => {
    totalRestAmt += Number(item.amt) * item.userQty;
  });

  useEffect(() => {
    if (totalHomeAmt === 0) {
      dispatch(setdlyCrg(0));
    } else if (totalHomeAmt > 149) {
      dispatch(setdlyCrg(0));
    } else {
      dispatch(setdlyCrg(49));
    }
  }, [totalHomeAmt, totalRestAmt, dispatch]);

  const handlePayment = async (amount) => {
    try {
      const jwt_token = localStorage.getItem('jwt_token');
      const { data } = await axios.post(
        `${Api}/api/create-order`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const options = {
        key: 'rzp_test_kfOfovhCxer3YT',
        amount: data.amount,
        currency: data.currency,
        name: 'SaveBite',
        description: 'Payment for your order',
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await axios.post(`${Api}/api/verify`, response, {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              'Content-Type': 'application/json',
            },
          });
          if (verifyRes.data.success) {
            dispatch(setCurrentOrderItems({ RestItemAmt, HomeItemAmt }));
            dispatch(DeleteToCart('All_Clear'));
            navigate('/');
            return { payment: 'Done' };
          } else {
            alert('Payment verification failed.');
            window.location.href = '/cart';
          }
        },
        prefill: {
          name: `${userInfo?.userInfo?.name}`,
          email: `${userInfo?.userInfo?.email}`,
          contact: `${userInfo?.userInfo?.mobile}`,
        },
        theme: {
          color: '#27ae60',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order or verifying payment:', error);
    }
  };

  function payHandle(e) {
    e.preventDefault();
    const totalAllAmt = (totalHomeAmt + totalRestAmt + dlyCrg).toFixed(1);
    handlePayment(totalAllAmt, cartItems);
  }

  function checkoutHandle(e) {
    e.preventDefault();
    if (totalHomeAmt > 0) {
      navigate('/address');
    } else {
      navigate('/payment');
    }
  }

  // Responsive logic constants
  const isMobile = windowWidth < 640;
  const isMd = windowWidth >= 768;
  const containerWidth = isMobile ? '80%' : '25%';
  const buttonFontSize = isMd ? '14px' : '10px'; // Adjusted from 6px for better UX while keeping intent

  return (
    <>
      {cartItems.length !== 0 && (
        <div
          style={{
            width: containerWidth,
            border: '1px solid #e5e7eb',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', padding: '0.5rem', color: '#f87171', width: '100%', textAlign: 'center' }}>
            Total Amount
          </h2>
          <div style={{ width: '100%', height: 'auto' }}>
            {[
              { label: 'Delivery Total :', value: totalHomeAmt },
              { label: 'Dining in Total :', value: totalRestAmt },
              { label: 'Delivery Charge :', value: dlyCrg },
              { label: 'Total Amount: ', value: totalHomeAmt + totalRestAmt + dlyCrg, bold: true },
            ].map((row, idx) => (
              <p
                key={idx}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
              >
                <label>{row.label}</label>
                <strong>{Number(row.value).toFixed(1)}&#8377;</strong>
              </p>
            ))}
          </div>
          
          <button
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseEnter={() => setIsHovered('main')}
            onMouseLeave={() => { setIsHovered(null); setIsActive(false); }}
            style={{
              width: '100%',
              height: '50px',
              marginTop: '1rem',
              backgroundColor: isActive ? '#16a34a' : '#22c55e', // active:bg-green-600 vs bg-green-500
              color: 'black',
              borderRadius: '0.5rem',
              fontSize: payment ? '1.5rem' : buttonFontSize,
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              fontWeight: payment ? 'normal' : 'normal',
              transition: 'background-color 0.2s',
            }}
            onClick={payment ? payHandle : checkoutHandle}
          >
            {payment ? `Pay ${(totalHomeAmt + totalRestAmt + dlyCrg).toFixed(1)}₹` : 'Proceed to Checkout'}
          </button>
        </div>
      )}

      {cartItems.length === 0 && !payment && (
        <div
          style={{
            display: 'flex',
            minHeight: '70vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb', // bg-gray-50
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '28rem',
              borderRadius: '1rem',
              backgroundColor: 'white',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '1rem',
                display: 'flex',
                height: '5rem',
                width: '5rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: '#dcfce7', // bg-green-100
              }}
            >
              <span style={{ fontSize: '2.25rem' }}>🛒</span>
            </div>
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 600, color: '#1f2937' }}>
              Your cart is empty
            </h2>
            <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
              Looks like you haven’t added anything yet.
            </p>
            <button
              onMouseEnter={() => setIsHovered('browse')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate('/')}
              style={{
                width: '100%',
                borderRadius: '0.75rem',
                backgroundColor: isHovered === 'browse' ? '#16a34a' : '#22c55e',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                fontWeight: 600,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Browse Food 🍽️
            </button>
          </div>
        </div>
      )}

      {cartItems.length === 0 && payment && (
        <div
          style={{
            display: 'flex',
            minHeight: '70vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '28rem',
              borderRadius: '1rem',
              backgroundColor: 'white',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '1rem',
                display: 'flex',
                height: '4rem',
                width: '4rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: '#fee2e2', // bg-red-100
              }}
            >
              <span style={{ fontSize: '1.875rem' }}>⚠️</span>
            </div>
            <h1 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>
              Session refreshed
            </h1>
            <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
              Your address or payment session was refreshed. Please go back to your bag and try again.
            </p>
            <button
              onMouseEnter={() => setIsHovered('bag')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => navigate('/cart')}
              style={{
                width: '100%',
                borderRadius: '0.75rem',
                backgroundColor: isHovered === 'bag' ? '#16a34a' : '#22c55e',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                fontWeight: 600,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Go to Bag
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartTotalAmount;