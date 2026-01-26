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
    <div className="orders-wrapper">
  {yes && (
    <div className="orders-empty">
      <div className="orders-empty-text">
        <h1>Not any Order Place at yet</h1>
      </div>

      <div className="orders-empty-action">
        <button
          onClick={() => navigate('/')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="orders-btn"
          style={{
            backgroundColor: isHovered ? '#166534' : '#16a34a'
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  )}

  {!yes && (
    <div className="orders-list">
      <OrderCart allOrder={true} AllOrderItems={OrderItems} />
    </div>
  )}
</div>

  );
}

export default OrderInfo;