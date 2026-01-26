import React, { useEffect, useRef, useState } from 'react';
import './AllComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../Slices/Register.js';

function ProfileInfo() {
  const userInfo = useSelector((state) => state.mainSB.userinfo);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullname: userInfo?.userInfo?.name || 'Guest765',
    email: userInfo?.userInfo?.email || 'example@gmail.com',
    gender: userInfo?.userInfo?.gender || '',
  });

  const [disable, setDisable] = useState(true);
  
  const [focusedField, setFocusedField] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  function editHandle(e) {
    e.preventDefault();
    if (disable) {
      setDisable(false);
    } else {
      dispatch(createProfile({ ...form, userid: localStorage.getItem('idtity') }));
      setDisable(true);
    }
  }

  useEffect(() => {
    if (userInfo?.userInfo?.name && userInfo?.userInfo?.email && userInfo?.userInfo?.gender) {
      setForm({
        fullname: userInfo?.userInfo?.name,
        email: userInfo?.userInfo?.email,
        gender: userInfo?.userInfo?.gender,
      });
    }
  }, [userInfo?.userInfo?.email, userInfo?.userInfo?.gender, userInfo?.userInfo?.name]);

  useEffect(() => {
    if (!disable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disable]);

  function changehandle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Common styles for inputs to replicate Tailwind's focus/hover logic
  const getInputStyle = (fieldName) => ({
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
    width: '60%',
    height: '40px',
    backgroundColor: focusedField === fieldName ? '#f1f5f9' : (isHovered === fieldName ? '#ffffff' : 'transparent'),
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    outline: 'none',
    border: 'none',
    borderBottom: `2px solid ${focusedField === fieldName ? '#22c55e' : '#e2e8f0'}`,
    transition: 'all 0.2s ease',
  });

  return (
    <div className='profile-wrapper' >
      <div style={{ width: '80%', height: 'auto', marginTop: '2.5rem', marginLeft: 'auto', marginRight: 'auto', marginBottom: '1rem' }}>
        <form name="personalInfo" style={{ width: '100%', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
          <label style={{ color: '#020617', fontSize: '1.5rem', lineHeight: '2rem' }}>Personal Information</label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              onChange={changehandle}
              onFocus={() => setFocusedField('fullname')}
              onBlur={() => setFocusedField(null)}
              onMouseEnter={() => setIsHovered('fullname')}
              onMouseLeave={() => setIsHovered(null)}
              value={form.fullname}
              disabled={disable}
              ref={inputRef}
              type="text"
              placeholder="Full Name"
              name="fullname"
              required
              style={getInputStyle('fullname')}
            />
          </div>

          <label style={{ color: '#64748b' }}>Gender</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              disabled={disable}
              checked={form.gender === 'male'}
              type="radio"
              onChange={changehandle}
              id="male"
              name="gender"
              value="male"
              style={{ margin: '0.75rem 0', width: '20px', height: '20px', backgroundColor: '#f8fafc', borderRadius: '9999px', cursor: 'pointer' }}
            />
            <label htmlFor="male" style={{ color: '#475569' }}>Male</label>
            
            <input
              disabled={disable}
              checked={form.gender === 'female'}
              type="radio"
              onChange={changehandle}
              id="female"
              name="gender"
              value="female"
              style={{ margin: '0.75rem 0', width: '20px', height: '20px', backgroundColor: '#f8fafc', borderRadius: '9999px', cursor: 'pointer' }}
            />
            <label htmlFor="female" style={{ color: '#475569' }}>Female</label>
          </div>

          <label style={{ color: '#020617', fontSize: '1.5rem', lineHeight: '2rem', display: 'block', margin: '1rem 0' }}>Email Address</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              value={form.email}
              disabled={disable}
              onChange={changehandle}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              onMouseEnter={() => setIsHovered('email')}
              onMouseLeave={() => setIsHovered(null)}
              type="email"
              placeholder="Email"
              name="email"
              required
              style={getInputStyle('email')}
            />
          </div>
        </form>

        <button
          style={{
            color: '#60a5fa',
            width: '100px',
            height: '40px',
            border: '1px solid #e5e7eb',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
          onClick={editHandle}
        >
          {disable ? 'Edit' : 'Save'}
        </button>

        <form name="mobileNoInfo" style={{ width: '100%', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
          <label style={{ color: '#020617', fontSize: '1.5rem', lineHeight: '2rem' }}>Mobile Number</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              disabled={true}
              value={userInfo?.userInfo?.mobile}
              type="number"
              placeholder="Mobile Number"
              name="mobileNo"
              required
              style={{
                ...getInputStyle('mobile'),
                appearance: 'none',
                MozAppearance: 'textfield'
              }}
            />
          </div>
        </form>
      </div>

      <div style={{ width: '80%', height: 'auto', marginLeft: 'auto', marginRight: 'auto', marginTop: '1.25rem', marginBottom: '1.25rem', paddingBottom: '1.25rem' }}>
        <p style={{ color: '#1f2937', fontSize: '1rem', lineHeight: '1.5' }}>
          Your login ( mobile number) changes, likewise. You'll receive all your account related communication on 
          your updated email address (or mobile number).
          When will my account be updated with the new email address (or mobile number)?
          It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
          What happens to my existing account when I update my email address (or mobile number)?
          Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. 
          You'll continue seeing your Order history, saved information and personal details.
        </p>
      </div>
    </div>
  );
}

export default ProfileInfo;