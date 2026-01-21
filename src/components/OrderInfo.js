import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItems } from '../Slices/DeliverySection';
import { useNavigate } from 'react-router-dom';
import OrderCart from './orderCart';

function OrderInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false); // To handle hover:bg-green-800
  
  const OrderItems = useSelector((state) => state.delivery.allOrderItems);
  const yes = OrderItems?.length === 0;

  useEffect(() => {
    dispatch(getOrderItems());
  }, [dispatch]);

  return (
    <div
      style={{
        width: '850px',
        height: 'auto',
        backgroundColor: 'white',
        margin: '1rem',
        border: '1px solid #e5e7eb', // border (default gray-200)
      }}
    >
      {yes && (
        <div>
          <div
            style={{
              width: '100%',
              height: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                textAlign: 'center',
                fontSize: '1.5rem', // text-2xl
                lineHeight: '2rem',
              }}
            >
              Not any Order Place at yet
            </h1>
          </div>
          <div
            style={{
              width: '100%',
              height: '20%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => navigate('/')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: '200px',
                height: '40px',
                textAlign: 'center',
                color: 'white',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                backgroundColor: isHovered ? '#166534' : '#16a34a', // hover:bg-green-800 vs bg-green-600
                borderRadius: '0.75rem', // rounded-xl
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      )}

      {!yes && (
        <div
          style={{
            width: '100%',
            height: '80%',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <OrderCart allOrder={true} AllOrderItems={OrderItems} />
        </div>
      )}
    </div>
  );
}

export default OrderInfo;