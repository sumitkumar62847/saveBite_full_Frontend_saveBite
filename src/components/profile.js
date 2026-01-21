import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import ShortInfo from './ShortInfo';
import ProfileInfo from './profileInfo';
import AddressInfo from './AddressInfo';
import Footer from './Footer';
import OrderInfo from './OrderInfo';

let initItem = [true, false, false];

function Profile() {
  const [showProfileItem, setShowProfileItem] = useState(initItem);
  const [isHovered, setIsHovered] = useState(false); // To handle hover:bg-green-800
  const navigate = useNavigate();

  function toggleProfileItem(num) {
    let newArr = [...showProfileItem];
    newArr = newArr.map((_, index) => (index === num ? true : false));
    setShowProfileItem(newArr);
  }

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Header search={false} />

        <button
          onClick={() => {
            navigate(-1);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            color: 'white',
            fontSize: '1.5rem', // text-2xl
            backgroundColor: isHovered ? '#166534' : '#16a34a', // hover:bg-green-800 vs bg-green-600
            borderRadius: '0.75rem', // rounded-xl
            margin: '0.75rem', // m-3
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            zIndex: 10, // Ensures button stays clickable over content
          }}
        >
          {'<-'}
        </button>

        <div
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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