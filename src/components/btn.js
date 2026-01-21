import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { popByRest, pushInRest } from '../Slices/cartSlice';

export default function ToggleButton({ iteminfo }) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = (e) => {
    e.preventDefault();
    const calculatedPrice = Number(iteminfo.price - ((iteminfo.price) * (iteminfo.discount) / 100)).toFixed(2);
    
    if (isActive) {
      setIsActive(false);
      dispatch(popByRest({
        _id: iteminfo._id,
        amt: calculatedPrice,
        userQty: 1,
        name: iteminfo.item_name,
        userid: iteminfo.userid
      }));
    } else {
      setIsActive(true);
      dispatch(pushInRest({
        _id: iteminfo._id,
        amt: calculatedPrice,
        userQty: 1,
        name: iteminfo.item_name,
        userid: iteminfo.userid
      }));
    }
  };

  // Base styles for the container
  const containerStyle = {
    position: 'relative',
    marginTop: '8px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '40px',
    borderRadius: '9999px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    padding: 0,
    overflow: 'hidden',
    transition: 'background-color 500ms'
  };

  // The sliding "pill" background
  const sliderStyle = {
    position: 'absolute',
    top: '1px',
    width: 'calc(50% - 1px)',
    height: '36px',
    borderRadius: '9999px',
    zIndex: 1,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 500ms ease-in-out',
    left: isActive ? 'calc(50% + 0px)' : '1px',
    backgroundColor: isActive ? 'orange' : 'green'
  };

  // Shared text style
  const textBaseStyle = {
    width: '50%',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    zIndex: 10,
    transition: 'color 500ms'
  };

  return (
    <button onClick={handleToggle} style={containerStyle}>
      {/* Sliding background element */}
      <div style={sliderStyle}></div>

      {/* Label: Delivery */}
      <span style={{
        ...textBaseStyle,
        color: isActive ? '#f97316' : '#ffffff' // text-orange-500 vs text-white
      }}>
        Delivery
      </span>

      {/* Label: Dining in */}
      <span style={{
        ...textBaseStyle,
        color: isActive ? '#ffffff' : '#22c55e' // text-white vs text-green-500
      }}>
        Dining in
      </span>
    </button>
  );
}