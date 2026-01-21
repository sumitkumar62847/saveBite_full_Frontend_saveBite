import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../images/userImageIcon.png';
import { useSelector } from 'react-redux';

function ShortInfo({ toggleProfileItem, showProfileItem }) {
  const userInfo = useSelector((state) => state.mainSB.userinfo);
  const navigate = useNavigate();
  const addressRef = useRef(null);
  const perInfoRef = useRef(null);
  const orderRef = useRef(null);
  
  // States for responsiveness and hover
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handertoggle(num) {
    toggleProfileItem(num);
  }

  useEffect(() => {
    // Keeping your existing functional logic for tab selection
    if (addressRef.current) addressRef.current.style.backgroundColor = showProfileItem[1] ? '#F2F2F2' : '#ffffff';
    if (perInfoRef.current) perInfoRef.current.style.backgroundColor = showProfileItem[0] ? '#F2F2F2' : '#ffffff';
    if (orderRef.current) orderRef.current.style.backgroundColor = showProfileItem[2] ? '#F2F2F2' : '#ffffff';
  }, [showProfileItem]);

  function LogoutHnadle(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

  // Responsive width calculations
  const sidebarWidth = windowWidth >= 1024 ? '250px' : '100%'; // lg:w-[250px]
  const avatarSize = windowWidth >= 1024 ? '80px' : '60px'; // lg:w/h-80 vs md:w/h-60

  const itemStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    borderBottom: '2px solid #e5e7eb',
    cursor: 'pointer',
    backgroundColor: 'white',
  };

  const textStyle = {
    fontSize: '1.25rem', // text-xl
    margin: '0.75rem', // m-3
    paddingLeft: '0.5rem', // pl-2
    color: '#475569', // text-slate-600
  };

  return (
    <div>
      <div
        style={{
          width: sidebarWidth,
          height: '50vh',
          backgroundColor: 'white',
          margin: '1rem', // m-4
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            borderBottom: '2px solid #e5e7eb',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '0.75rem', // pb-3
          }}
        >
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: '9999px',
              backgroundColor: '#94a3b8', // bg-slate-400
              margin: '0.5rem', // m-2
              overflow: 'hidden'
            }}
          >
            <img
              src={userImage}
              alt="user-img"
              style={{ width: '100%', height: '100%', borderRadius: '9999px', objectFit: 'cover' }}
            />
          </div>
          <h1 style={{ fontSize: '1.25rem', color: '#14532d' }}>
            {userInfo?.userInfo?.name}
          </h1>
        </div>

        <div
          ref={perInfoRef}
          style={itemStyle}
          onClick={() => handertoggle(0)}
        >
          <h2 style={textStyle}>Personal Information</h2>
        </div>

        <div
          ref={addressRef}
          style={itemStyle}
          onClick={() => handertoggle(1)}
        >
          <h2 style={textStyle}>Address Information</h2>
        </div>

        <div
          ref={orderRef}
          style={itemStyle}
          onClick={() => handertoggle(2)}
        >
          <h2 style={textStyle}>Order</h2>
        </div>

        <div
          style={itemStyle}
          onClick={() => navigate('/cart')}
        >
          <h2 style={textStyle}>Cart</h2>
        </div>
      </div>

      <div
        style={{
          width: sidebarWidth,
          backgroundColor: 'white',
          margin: '1rem',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          style={{
            ...itemStyle,
            backgroundColor: isLogoutHovered ? '#f1f5f9' : 'white', // hover:bg-slate-100
          }}
          onClick={LogoutHnadle}
        >
          <h2 style={{ ...textStyle, color: '#f87171' }}>LogOut</h2>
        </div>
      </div>
    </div>
  );
}

export default ShortInfo;