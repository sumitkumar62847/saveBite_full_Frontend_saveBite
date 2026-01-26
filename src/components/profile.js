import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import ShortInfo from './ShortInfo';
import ProfileInfo from './profileInfo';
import AddressInfo from './AddressInfo';
import Footer from './Footer';
import OrderInfo from './OrderInfo';



function Profile() {
  const [showProfileItem, setShowProfileItem] = useState([true, false, false]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function toggleProfileItem(num) {
    let newArr = showProfileItem.map((_, index) => index === num);
    setShowProfileItem(newArr);
  }

  return (
    <>
      <div className="profile-page">
        <Header search={false} />
        <button
          className="profile-back-btn"
          onClick={() => navigate(-1)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: isHovered ? '#166534' : '#16a34a'
          }}
        >
          {'<-'}
        </button>

        <div className="profile-content">
          <ShortInfo
            toggleProfileItem={toggleProfileItem}
            showProfileItem={showProfileItem}
          />
          {showProfileItem[0] && <ProfileInfo />}
          {showProfileItem[1] && <AddressInfo />}
          {showProfileItem[2] && <OrderInfo />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;