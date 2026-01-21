import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getitem } from '../Slices/items';
import { getSearchitems } from '../Slices/searchSlice';
import Restaurent from './Restaurent';
import Header from './header';
import { addToCart } from '../Slices/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import DealTime from './DealTime.js';

function FullitemInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [itemShow, setitemShow] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const Data = useSelector((state) => state.search.searchData);
  const mainitem = useSelector((state) => state.items.iteminfo);
  const isRegistered = useSelector((state) => state.mainSB.isRegistered);
  
  const suggestData = Data?.data[0]?.items;
  const filterData = suggestData?.filter(item => item._id !== mainitem?.item?._id);
  const liveuntiltime = new Date(mainitem?.item?.LiveUntil);
  const rest = { rest: Data?.data[0]?.rest, items: filterData };
  const image = mainitem?.item?.imageUrl;
  
  let [isAdd, setIsAdd] = useState(mainitem?.item?.inCart || false);

  // Handle responsive behavior for the button
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function capitalizeWords(str) {
    return str?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  function handleBag(e) {
    e.preventDefault();
    if (!isAdd) {
      if (isRegistered) {
        const newiteminfo = {
          ...mainitem?.item,
          inCart: true,
          userQuantity: 1
        };
        dispatch(addToCart(newiteminfo));
        setIsAdd(true);
      } else {
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    if (mainitem?.item?.inCart) {
      setIsAdd(true);
    } else {
      setIsAdd(false);
    }
    dispatch(getitem());
  }, [dispatch, mainitem?.item?.inCart]);

  useEffect(() => {
    if (!itemShow) navigate('/');
    const querySearch = localStorage.getItem('querySearch');
    const querySuggest = localStorage.getItem('querySuggest');
    dispatch(getSearchitems({ search: querySearch, suggested: querySuggest }));
  }, [dispatch, itemShow, navigate]);

  // Responsive button calculations
  const getButtonStyles = () => {
    let width = '105px';
    let fontSize = '10px';
    
    if (windowWidth >= 1024) { // lg
      width = '150px';
      fontSize = '15px';
    } else if (windowWidth >= 768) { // md
      width = '130px';
      fontSize = '12px';
    } else if (windowWidth >= 640) { // sm
      width = '110px';
      fontSize = '12px';
    }

    return {
      width: width,
      fontSize: fontSize,
      height: '45px',
      backgroundColor: isAdd ? '#f97316' : '#22c55e', // orange-500 : green-500
      color: '#ffffff',
      borderRadius: '0.75rem',
      textAlign: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    };
  };

  return (
    <>
      <Header search={true}></Header>
      
      <div style={{
        width: '100%',
        height: 'auto',
        paddingTop: '40px',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Left Side: Image and Deal Timer */}
        <div style={{ width: '30%', height: 'auto', margin: '16px' }}>
          <img 
            src={image} 
            alt='item-img' 
            style={{ 
              width: '100%', 
              objectFit: 'cover', 
              borderRadius: '0.25rem', 
              borderBottom: '1px solid #e5e7eb' 
            }} 
          />
          <DealTime liveTime={liveuntiltime} SetitemShow={setitemShow}></DealTime>
        </div>

        {/* Right Side: Info Content */}
        <div style={{ 
          width: '40%', 
          height: 'auto', 
          margin: '16px', 
          borderLeft: '2px solid #e5e7eb' 
        }}>
          <div style={{
            width: '100%',
            height: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            {/* Title and Ingredients */}
            <div style={{ width: '100%', height: 'auto', padding: '8px' }}>
              <h1 style={{ fontSize: '1.5rem', lineHeight: '2rem', margin: '0 0 8px 0' }}>
                {capitalizeWords(mainitem?.item?.item_name)}
              </h1>
              <h1 style={{ padding: '4px 0', margin: 0 }}>Ingredient: {mainitem?.item?.discription}</h1>
              <h1 style={{ padding: '4px 0', margin: 0 }}>Quantity: 250grams</h1>
            </div>

            {/* Restaurant Info */}
            <div style={{ width: '100%', height: 'auto', padding: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', lineHeight: '1.75rem', padding: '4px 0', margin: 0 }}>
                <strong>{capitalizeWords(mainitem?.item?.rest?.Restaurant_name)}</strong>
              </h1>
              <h1 style={{ margin: '4px 0' }}>Verka Double Toned Fresh Milk ensures health, provides essential vitamins and energy along with a smooth taste.</h1>
              <h1 style={{ margin: '4px 0' }}>
                <strong>Address:</strong> {mainitem?.item?.address?.Landmark} / {mainitem?.item?.address?.Locality} / {mainitem?.item?.address?.City} / {mainitem?.item?.address?.State}
              </h1>
              <h1 style={{ margin: '4px 0' }}><strong>FSSAI NO. </strong>{mainitem?.item?.rest?.Fssai_no}</h1>
              <h1 style={{ margin: '4px 0' }}><strong>Owner Name: </strong>{mainitem?.item?.rest?.Owner_name}</h1>
            </div>

            {/* Price and Add to Bag Row */}
            <div style={{ width: '100%', height: 'auto', padding: '8px', display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <h1 style={{ padding: '4px 0', margin: 0 }}>
                  <strong>Price: </strong> 
                  {Number(mainitem?.item?.price - ((mainitem?.item?.price) * (mainitem?.item?.discount) / 100)).toFixed(2)}&#8377;
                </h1>
                <h1 style={{ padding: '4px 0', margin: 0 }}>
                  <strong>You Save: </strong> 
                  {((mainitem?.item?.price) * (mainitem?.item?.discount) / 100)}&#8377; (off {mainitem?.item?.discount}%)
                </h1>
              </div>
              
              <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button 
                  style={getButtonStyles()} 
                  onClick={handleBag}
                >
                  {isAdd ? 'Added' : 'Add to Bag'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Related Restaurant */}
      <div style={{ 
        width: '100%', 
        height: 'auto', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#ffffff' 
      }}>
        {rest && <Restaurent restinfo={rest} relative={true}></Restaurent>}
      </div>
    </>
  );
}

export default FullitemInfo;