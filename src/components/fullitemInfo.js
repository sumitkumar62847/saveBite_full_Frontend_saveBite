import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getitem } from '../Slices/items';
import { getSearchitems } from '../Slices/searchSlice';
import Restaurent from './Restaurent';
import Header from './header';
import { addToCart} from '../Slices/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import DealTime from './DealTime.js';


function FullitemInfo(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [itemShow , setitemShow] = useState(true);
  const Data = useSelector((state)=> state.search.searchData);
  const mainitem = useSelector((state)=> state.items.iteminfo);
  const isRegistered = useSelector((state) => state.mainSB.isRegistered);
  const suggestData = Data?.data[0]?.items;
  const filterData = suggestData?.filter(item => item._id !== mainitem?.item?._id);
  const liveuntiltime = new Date(mainitem?.item?.LiveUntil);
  const rest = { rest:Data?.data[0]?.rest, items:filterData}
  const image = mainitem?.item?.imageUrl;
  let [isAdd, setIsAdd] = useState(mainitem?.item?.inCart || false);
  function capitalizeWords(str) {
  return str?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

function handleBag(e){
    e.preventDefault();
    if(!isAdd){
      if(isRegistered){
      const newiteminfo = {
        ...mainitem?.item,
        inCart:true,
        userQuantity:1
      }
        dispatch(addToCart(newiteminfo));
        setIsAdd(true);
    }else{
      navigate('/login')
    }
  }
}
  useEffect(()=>{
    if(mainitem?.item?.inCart){
      setIsAdd(true);
    }else{
      setIsAdd(false);
    }
    dispatch(getitem())
  },[dispatch,mainitem?.item?.inCart])
  useEffect(()=>{
    if(!itemShow) navigate('/');
      const querySearch = localStorage.getItem('querySearch');
      const querySuggest = localStorage.getItem('querySuggest');
      dispatch(getSearchitems({search:querySearch,suggested:querySuggest}))
  },[dispatch,itemShow,navigate]);
  return (
  <>
    <Header search={true}></Header>
    <div className='w-full h-auto  pt-10 bg-white flex justify-center items-center'>
      <div className='w-[30%] h-auto  m-4'>
          <img src={image} alt='item-img' className='w-[100%] object-cover rounded border-b'></img>
          <DealTime liveTime={liveuntiltime} SetitemShow={setitemShow}></DealTime>
      </div>
      <div className='w-[40%] h-auto m-4 border-l-2'>
          <div className='w-full h-auto p-4 object-cover  rounded  flex flex-col justify-center items-start'>
            <div className='w-full h-auto  p-2'>
              <h1 className='text-2xl'>{capitalizeWords(mainitem?.item?.item_name)}</h1>
              <h1 className='py-1'>Ingredient: {mainitem?.item?.discription}</h1>
              <h1 className='py-1'>Quantity: 250grams</h1>
            </div>
            <div className='w-full h-auto  p-2'>
              <h1 className='text-xl py-1'><strong>{capitalizeWords(mainitem?.item?.rest?.Restaurant_name)}</strong></h1>
              <h1>Verka Double Toned Fresh Milk ensures health, provides essential vitamins and energy along with a smooth taste. provides essential vitamins and energy along with </h1>
              <h1><strong>Address:</strong> {mainitem?.item?.address.Landmark} / {mainitem?.item?.address.Locality} / {mainitem?.item?.address.City} / {mainitem?.item?.address.State}</h1>
              <h1><strong>FSSAI NO. </strong>{mainitem?.item?.rest?.Fssai_no}</h1>
              <h1><strong>Owner Name: </strong>{mainitem?.item?.rest?.Owner_name}</h1>
            </div>
            <div className='w-full h-auto  p-2 flex'>
              <div className='w-1/2'>
                <h1 className='py-1'><strong>Price: </strong> {Number(mainitem?.item?.price - ((mainitem?.item?.price)*(mainitem?.item?.discount)/100)).toFixed(2)}&#8377;</h1>
                <h1 className='py-1'><strong>You Save: </strong> {((mainitem?.item?.price)*(mainitem?.item?.discount)/100)}&#8377; (off {mainitem?.item?.discount}%)</h1>
              </div>
              <div className='w-1/2  flex justify-end items-center'>
                    <button className={`w-[105px] sm:w-[110px] md:w-[130px] lg:w-[150px] text-[10px] sm:text-[12px] lg:text-[15px] h-[45px] ${isAdd ? 'bg-orange-500' : 'bg-green-500'} text-white rounded-xl text-center `} onClick={handleBag}>{isAdd ? 'Added': 'Add to Bag'}</button>
              </div>
                
            </div>

          </div>
      </div>
    </div>
    <div className='w-full h-auto flex justify-center items-center bg-white'>
            {rest && <Restaurent restinfo = {rest} relative={true}></Restaurent>}
    </div>
  </>
  )
}

export default FullitemInfo;