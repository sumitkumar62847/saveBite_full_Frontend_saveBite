import React, { useState, useEffect } from 'react';
import Item from './Item';
import { useNavigate } from 'react-router-dom';
import { setPath } from '../Slices/searchSlice';
import { useDispatch } from 'react-redux';

function Restaurent({ restinfo, relative }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = restinfo.rest;
  const items = restinfo.items;

  // State to track window width for responsive breakpoints
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function clickHandle(e) {
    e.preventDefault();
    const result = rest?.Restaurant_name?.replace(/\s+/g, '');
    localStorage.setItem('navigate', result);
    localStorage.setItem('querySearch', null);
    localStorage.setItem('querySuggest', rest?.Restaurant_name);
    dispatch(setPath(result));
    navigate(`/${result}`);
  }

  // Responsive logic for grid columns
  const getGridColumns = () => {
    if (windowWidth >= 1280) return 'repeat(5, minmax(0, 1fr))'; // xl:grid-cols-5
    if (windowWidth >= 1024) return 'repeat(4, minmax(0, 1fr))'; // lg:grid-cols-4
    if (windowWidth >= 640) return 'repeat(3, minmax(0, 1fr))';  // sm:grid-cols-3
    return 'repeat(2, minmax(0, 1fr))';                         // grid-cols-2
  };

  // Responsive logic for title font size
  const titleFontSize = windowWidth >= 768 ? '40px' : '30px'; // md:text-[40px] vs text-[30px]

  return (
    <div style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}>
      {!relative && (
        <h1
          onClick={clickHandle}
          style={{
            fontSize: titleFontSize,
            color: '#64748b', // text-slate-500
            border: '1px solid #e5e7eb', // border (default gray-200)
            borderRadius: '1rem', // rounded-2xl
            marginLeft: 'auto',
            marginRight: 'auto',
            cursor: 'pointer',
            textAlign: 'center',
            padding: '0.5rem', // Added slight padding for visual balance (standard for bordered headers)
          }}
        >
          {rest?.Restaurant_name}
        </h1>
      )}

      {relative && (
        <h1
          style={{
            paddingLeft: '2rem', // pl-8
            fontSize: '1.5rem', // text-2xl
            lineHeight: '2rem',
            margin: '1rem', // m-4
          }}
        >
          Relative Items
        </h1>
      )}

      <div
        style={{
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'grid',
          gridTemplateColumns: getGridColumns(),
          gap: '10px',
          justifyContent: 'center',
          marginTop: '1.25rem', // my-5
          marginBottom: '1.25rem', // my-5
        }}
      >
        {items?.map((item, index) => (
          <Item key={index} iteminfo={item} rest={rest} />
        ))}
      </div>
    </div>
  );
}

export default Restaurent;