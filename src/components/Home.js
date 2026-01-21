import React, { useState } from 'react';
import Header from './header';
import Footer from './Footer';
import Items from './Items';
import icon from '../images/location.png';
import { useNavigate } from 'react-router-dom';
import './AllComponent.css';
import deliveryIcon from '../images/delivery.png';
import OrderCart from './orderCart.js';

function Home() {
  const navigate = useNavigate();

  const [openSize, setOpenSize] = useState(false);
  const [Onumber, setOnumber] = useState(1);
  const [isHoveredClose, setIsHoveredClose] = useState(false);

  const coods = localStorage.getItem('coods');
  const add = coods?.split(',');

  function sizeHandle(e) {
    e.preventDefault();
    setOpenSize(true);
  }

  function closeHandle(e) {
    e.preventDefault();
    e.stopPropagation();
    setOpenSize(false);
  }

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Header search={true}></Header>

      
      <div
        onClick={() => navigate("/addressinfo")}
        style={{
          display: 'flex',
          height: '48px',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#f97316', // orange-500
          paddingLeft: '24px',
          paddingRight: '24px',
          color: '#ffffff',
          cursor: 'pointer'
        }}
      >
        <img src={icon} alt="location" style={{ height: '20px', width: '20px' }} />
        <div 
          style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          onClick={() => navigate("/addressinfo")}
        >
          <span style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.025em', 
            color: '#ffedd5' // orange-100
          }}>
            Deliver to
          </span>
          <span style={{ 
            maxWidth: '420px', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            fontSize: '14px', 
            fontWeight: 500 
          }}>
            {add ? `${add.slice(2, 5)}` : "Select your delivery location"}
          </span>
        </div>
      </div>

      {/* Floating Order Cart Bubble */}
      {Onumber !== 0 && (
        <div
          className="simindexnav"
          onClick={sizeHandle}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            backgroundColor: 'white',
            border: '1px solid #4ade80', // green-400
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl
            width: openSize ? '400px' : '50px',
            height: openSize ? '90vh' : '50px',
            transition: 'all 0.5s ease-in-out',
            borderRadius: '1rem',
            overflow: 'hidden',
            zIndex: 1000,
            cursor: !openSize ? 'pointer' : 'default'
          }}
        >
          {!openSize && (
            <div style={{ cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <img 
                style={{ border: 'none' }} 
                src={deliveryIcon} 
                alt='icon' 
                width='50px' 
              />
            </div>
          )}
          
          {openSize && (
            <div style={{ width: '100%', height: '100%' }}>
              <button
                onMouseEnter={() => setIsHoveredClose(true)}
                onMouseLeave={() => setIsHoveredClose(false)}
                style={{
                  border: '1px solid #e5e7eb',
                  backgroundColor: isHoveredClose ? '#e5e7eb' : '#d1d5db', // gray-300
                  width: '50px',
                  height: '30px',
                  margin: '8px',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onClick={closeHandle}
              >
                close
              </button>
              <div style={{ 
                width: '100%', 
                padding: '8px', 
                height: '90%', 
                borderTop: '1px solid #f3f4f6' 
              }}>
                <OrderCart setOnumber={setOnumber}></OrderCart>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Sections */}
      <Items></Items>
      <Footer></Footer>
    </div>
  );
}

export default Home;



