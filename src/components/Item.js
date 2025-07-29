import { useEffect, useState } from 'react';
import DealTime from './DealTime.js';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart} from '../Slices/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import { setitemPath } from '../Slices/items.js';
 

function Item({iteminfo,rest}){
  let [itemShow , setitemShow] = useState(true);
  let [isAdd, setIsAdd] = useState(iteminfo?.inCart || false);
  const isRegistered = useSelector((state) => state.mainSB.isRegistered);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const liveuntiltime = new Date(iteminfo.LiveUntil);
  const images = iteminfo.imageUrl;
  
  useEffect(()=>{
    if(iteminfo?.inCart){
      setIsAdd(true);
    }else{
      setIsAdd(false);
    }
  },[iteminfo?.inCart])
  
  function handleBag(e){
      e.preventDefault();
      if(!isAdd){
        if(isRegistered){
        const newiteminfo = {
          ...iteminfo,
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
  function handleClick(e){
    e.preventDefault();
    const result = iteminfo?._id;
    localStorage.setItem('querySearch',null);
    localStorage.setItem('querySuggest',rest?.Restaurant_name);
    localStorage.setItem('path',result);
    dispatch(setitemPath(result));
    navigate(`/${result}`);
  }

  return(
    <>
      {itemShow && iteminfo.quantity > 0 && <div className='w-[100%] md:w-[90%] aspect-[3/4] bg-white rounded-xl shadow-md mx-auto'>
            <Swiper
              className='w-[100%] h-[60%]'
                modules={[Autoplay, EffectCards]}
                // loop={true}
                autoplay={{ delay: 3000, disableOnInteraction:false}}
                speed={100}
                slidesPerView={1}
            >
              {images.map((image, index) =>(
                <SwiperSlide key={index}>
                    <img src={image} alt='item-img' className='w-full h-full object-cover rounded-t-xl border-b cursor-pointer'onClick={handleClick}></img>
                </SwiperSlide>
              ))}
            </Swiper>
              <DealTime liveTime={liveuntiltime} SetitemShow={setitemShow}></DealTime>
              <h2 className=' text-center text-[15px] text-xl'>{iteminfo.item_name}</h2>
              <p className='text-center'>Price:<label className='line-through  '>{iteminfo.price}&#8377; </label><strong>{Number(iteminfo.price - ((iteminfo.price)*(iteminfo.discount)/100)).toFixed(2)}&#8377; </strong>  (off {iteminfo.discount}%)</p>
              <div className='w-full h-[40px] flex justify-between items-center px-2'>
                  <p className='text-xs'>Qty: {iteminfo.quantity}</p>
                  <button className={`w-[65px] sm:w-[70px] md:w-[80px] lg:w-[100px] text-[10px] sm:text-[12px] lg:text-[15px] h-[25px] ${isAdd ? 'bg-orange-500' : 'bg-green-500'} text-white rounded-xl text-center `} onClick={handleBag}>{isAdd ? 'Added': 'Add to Bag'}</button>
              </div>
        </div>}
      </>
  )
}

export default Item;