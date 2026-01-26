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

  const getGridColumns = () => {
    if (windowWidth >= 1280) return 'repeat(5, minmax(0, 1fr))';
    if (windowWidth >= 1024) return 'repeat(4, minmax(0, 1fr))';
    if (windowWidth >= 640) return 'repeat(3, minmax(0, 1fr))';
    return 'repeat(2, minmax(0, 1fr))';
  };

  const titleFontSize = windowWidth >= 768 ? '40px' : '30px';

  return (
    <div className="restaurant-wrapper">
      {!relative && (
        <h1
          onClick={clickHandle}
          className="restaurant-title"
          style={{ fontSize: titleFontSize }}   // 🔑 dynamic → stays inline
        >
          {rest?.Restaurant_name}
        </h1>
      )}

      {relative && (
        <h1 className="restaurant-relative-title">
          Relative Items
        </h1>
      )}

      <div
        className="restaurant-grid"
        style={{ gridTemplateColumns: getGridColumns() }} // 🔑 dynamic → stays inline
      >
        {items?.map((item, index) => (
          <Item key={index} iteminfo={item} rest={rest} />
        ))}
      </div>
    </div>
  );
}

export default Restaurent;
