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

  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    if (addressRef.current) addressRef.current.style.backgroundColor = showProfileItem[1] ? '#F2F2F2' : '#ffffff';
    if (perInfoRef.current) perInfoRef.current.style.backgroundColor = showProfileItem[0] ? '#F2F2F2' : '#ffffff';
    if (orderRef.current) orderRef.current.style.backgroundColor = showProfileItem[2] ? '#F2F2F2' : '#ffffff';
  }, [showProfileItem]);


  function LogoutHnadle(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <div className='shortinfo-main'>
      <div className="shortinfo-card" >
        <div className="shortinfo-header">
          <div
            className="shortinfo-avatar"
          >
            <img src={userImage} alt="user" />
          </div>
          <h1 className="shortinfo-name">
            {userInfo?.userInfo?.name}
          </h1>
        </div>

        <div ref={perInfoRef} className="shortinfo-item" onClick={() => toggleProfileItem(0)}>
          <h2>Personal Information</h2>
        </div>

        <div ref={addressRef} className="shortinfo-item" onClick={() => toggleProfileItem(1)}>
          <h2>Address Information</h2>
        </div>

        <div ref={orderRef} className="shortinfo-item" onClick={() => toggleProfileItem(2)}>
          <h2>Order</h2>
        </div>

        <div className="shortinfo-item" onClick={() => navigate('/cart')}>
          <h2>Cart</h2>
        </div>
      </div>

      <div className="shortinfo-logout" >
        <div
          className="shortinfo-logout-btn"
          style={{ backgroundColor: isLogoutHovered ? '#fcebeb' : 'white' }}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          onClick={LogoutHnadle}
        >
          <h2 className="logout-text">Log Out</h2>
        </div>
      </div>
    </div>
  );
}
  

export default ShortInfo;