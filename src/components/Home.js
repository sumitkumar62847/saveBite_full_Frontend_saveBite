import React, { useState } from 'react'
import Header from './header';
import Footer from './Footer';
import Ads from './Ads';
import Items from './Items';
import icon from '../images/location.png';
import { useNavigate } from 'react-router-dom';
import './AllComponent.css'
import deliveryIcon from '../images/delivery.png';
import OrderCart from './orderCart.js'
// import { getOrderNumber } from '../Slices/DeliverySection';
// import { useDispatch} from 'react-redux';


function Home() {
  const navigate = useNavigate();

  const [openSize, setOpenSize] = useState(false);
  const [Onumber, setOnumber] = useState(1);

  const coods = localStorage.getItem('coods');
  const add = coods?.split(',');
  function sizeHandle(e){
    e.preventDefault();
    setOpenSize(true);
  }
  function closeHandle(e){
    e.preventDefault();
    e.stopPropagation();
    setOpenSize(false);
  }  
  return(
    <div className='overflow-hidden'>
       <Header search={true}></Header>

        <div onClick={() => navigate("/addressinfo")}
          className="flex h-[48px] items-center gap-3 bg-orange-500 px-6 text-white"
        >
          <img src={icon} alt="location" className="h-5 w-5" />
          <div className="flex flex-col cursor-pointer"
            onClick={() => navigate("/addressinfo")}
          >
            <span className="text-[11px] uppercase tracking-wide text-orange-100">
              Deliver to
            </span>
            <span className="max-w-[420px] truncate text-sm font-medium">
              {add ?`${add.slice(2,5)}` : "Select your delivery location"}
            </span>
          </div>
        </div>



       

       {Onumber !== 0 && <div className={`simindexnav fixed bottom-10 bg-white border border-green-400 shadow-2xl right-10 ${openSize? 'w-[400px]':'w-[50px]'} ${openSize?'h-[90vh]':'h-[50px]'} border transition-all rounded-2xl overflow-hidden `} onClick={sizeHandle}>
          {!openSize && <div className=' cursor-pointer shadow-xl '><img className='border' src={deliveryIcon} alt='icon' width='50px'></img></div>}
          {openSize && <div className='w-full h-full'>
            <button className='border bg-gray-300 w-[50px] h-[30px]  m-2 rounded-lg shadow-lg text-center' onClick={closeHandle}>close</button>
            <div className='w-full p-2 h-[90%] border'>
              <OrderCart setOnumber={setOnumber}></OrderCart>
            </div>
          </div>}
       </div>}
       <Ads></Ads>
       <Items></Items>
       <Footer></Footer>
    </div>
  )
}


export default Home;



