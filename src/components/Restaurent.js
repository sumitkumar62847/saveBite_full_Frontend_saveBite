import React from 'react'
import Item from './Item';
import { useNavigate } from 'react-router-dom';
import { setPath } from '../Slices/searchSlice';
import { useDispatch } from 'react-redux';


function Restaurent({restinfo,relative}){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = restinfo.rest;
  const items = restinfo.items;
  function clickHandle(e){
    e.preventDefault();
    const result = rest?.Restaurant_name?.replace(/\s+/g, '');
    localStorage.setItem('navigate',result);
    localStorage.setItem('querySearch',null);
    localStorage.setItem('querySuggest',rest?.Restaurant_name);
    dispatch(setPath(result));
    navigate(`/${result}`);
  }
  return (
    <div className='w-full h-auto mb-4'>
      {!relative && <h1 className='text-[30px] md:text-[40px] text-slate-500 border rounded-2xl mx-auto cursor-pointer text-center' onClick={clickHandle}>{rest?.Restaurant_name}</h1>}
      {relative && <h1 className='pl-8 text-2xl m-4'>Relative Items</h1>}        
        <div className='w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-[10px] justify-center my-5'>
            {items?.map((item, index)=>(
                <Item key={index} iteminfo = {item} rest={rest}></Item>
              ))}
        </div>
    </div>
  )
}

export default Restaurent;