import React, { useEffect, useState } from 'react'
import Header from './header';
import Footer from './Footer';
import Ads from './Ads';
import Items from './Items';
import icon from '../images/location.png';
import { useNavigate } from 'react-router-dom';
import './AllComponent.css'
import deliveryIcon from '../images/delivery.png';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrderItems, restAddforDelivery } from '../Slices/DeliverySection';
import resticon from '../images/restaurant.png'
import usericon from '../images/profile-user.png'


function Home() {
  const [isActive, setIsActive] = useState(false);
  const deliveryitems = useSelector((state)=> state.delivery.deliveryItems);
  const diningitems = useSelector((state)=> state.delivery.diningItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSize, setOpenSize] = useState(false);
  const coods = localStorage.getItem('coods');
  const add = coods?.split(',');
  // console.log(deliveryitems) 
  function sizeHandle(e){
    e.preventDefault();
    setOpenSize(true);
    if(!openSize){
      dispatch(getCurrentOrderItems());
    }
  }
  function closeHandle(e){
    e.preventDefault();
    e.stopPropagation();
    setOpenSize(false);
  }
  const handleToggle = (e) => {
      e.preventDefault();
      if(isActive){
        setIsActive(false);
      }else{
        setIsActive(true);
      }
    };
  return(
    <div className='overflow-hidden'>
       <Header search={true}></Header>
       <div className='w-full h-[60px] bg-[rgb(255,141,65)]  flex items-center px-10 ' onClick={()=>navigate('/addressinfo')}>
          <img className='text-white ' src={icon} alt='icon' width={50}/>
          {add && <h1 className='text-xl text-white cursor-pointer font-extralight' >{`${add.slice(2,5)}`}</h1>}
          {!add && <h1 className='text-xl text-white cursor-pointer font-extralight' >Please Select Your Location First</h1>}
       </div>
       <div className={`simindexnav fixed bottom-10 bg-white border border-green-400 shadow-2xl right-10 ${openSize? 'w-[400px]':'w-[50px]'} ${openSize?'h-[90vh]':'h-[50px]'} border transition-all rounded-2xl overflow-hidden `} onClick={sizeHandle}>
          {!openSize && <div className=' cursor-pointer shadow-xl '><img className='border' src={deliveryIcon} alt='icon' width='50px'></img></div>}
          {openSize && <div className='w-full h-full'>
            <button className='border bg-gray-300 w-[50px] h-[30px]  m-2 rounded-lg shadow-lg text-center' onClick={closeHandle}>close</button>
            <div className='w-full p-2 h-auto'>
              <button onClick={handleToggle} className={`relative my-2  flex  items-center w-full h-10 rounded-full transition-colors duration-500 border bg-white`}>
                <div className={`absolute top-[1px] w-1/2 h-9 bg-white rounded-full z-1 shadow-md transition-all duration-500 ${ isActive ? 'left-[calc(50%-1px)]' : 'left-[1px]' }`} style={isActive? {backgroundColor:'orange'} : {backgroundColor:'green'}}></div>
                <span className={`w-1/2 text-center text-[12px] font-semibold z-10 transition-colors duration-500 ${isActive ? 'text-orange-500' : 'text-white' }`}>Delivery</span>
                <span className={`w-1/2 text-center text-[12px] font-semibold z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'text-green-500'}`}>Dining in</span>
              </button>
              {!isActive ? <div className='w-full h-auto rounded-xl p-2'>
                    {deliveryitems?.map((items,index) => (
                      <DeliveryItems item={items} key={index}></DeliveryItems>
                    ))}
                  </div>:<div className='w-full h-auto rounded-xl p-2'>
                      {diningitems?.map((items,index) => (
                      <DiningItems item={items} key={index}></DiningItems>
                    ))}
                  </div>}
            </div>
          </div>}
       </div>
       <Ads></Ads>
       <Items></Items>
       <Footer></Footer>
    </div>
  )
}


export default Home;



function DeliveryItems({item}){
  const restAddresses = useSelector((state)=> state.delivery.restAddresses);
  const userInfo = useSelector((state) => state.mainSB.userinfo);
  
  const dispatch = useDispatch();
 useEffect(() => {
  if (item?.orderid && item?.restAdds){
    dispatch(restAddforDelivery({
        orderid: item.orderid,
        restuserid: item.restAdds
    }));
  }
}, [dispatch, item.orderid, item.restAdds]);
  return(
    <div className='w-full h-auto border my-2 p-1 rounded-2xl'>
      <h1 className='text-center'><strong>Your Food Delivered in <Deliverytime></Deliverytime> Minutes</strong></h1>
      <div className='w-full flex items-center border-b pb-2'>
        <div className='w-[45%] h-auto  flex flex-col'>
          {restAddresses?.restadd?.map((ele,index) => (
            <div className='w-full h-[50px]  flex' key={index}>
              <img className='h-[40px]' width='30px' src={`${resticon}`} alt='icon'></img>
              <div className='w-full h-[50px] px-1'>
                <h1 className='h-[25px] '>{ele?.detail?.Restaurant_name}</h1>
                <h1 className='w-full h-[25px] overflow-hidden text-[8px]'>{ele.location?.Map_Address}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className='w-[10%] h-auto  flex justify-center items-center'>to</div>
        <div className='w-[45%] h-auto  flex items-center justify-center'>
              <img className='h-[30px]' width='30px' src={`${usericon}`} alt='icon'></img>
              <div className='w-full h-[50px] px-1'>
                <h1 className='h-[25px] '>{userInfo?.userInfo?.name}</h1>
                <h1 className='w-full h-[25px] overflow-hidden text-[8px]'>{item.orderAdd.Map_Address}</h1>
              </div>
        </div>
      </div>
      <div className='w-full h-[60px] px-2'>
        items: 
        <h1 className='flex items-center'>{item?.items?.map((item,index)=>(
          <span key={index}> {item.name}, </span>
        ))}</h1>

      </div>

    </div>
  )
}


function DiningItems({item}){
  const restAddresses = useSelector((state)=> state.delivery.restAddresses);
  
  const dispatch = useDispatch();
  const finalData = [];
  restAddresses?.restadd?.forEach(restadd =>{
    const items = item?.items?.filter(item => restadd.userid.includes(item.userid));
    finalData.push({restadd,items});
  })
 useEffect(() => {
  if (item?.orderid && item?.restAdds){
    dispatch(restAddforDelivery({
        orderid: item.orderid,
        restuserid: item.restAdds
    }));
  }
}, [dispatch, item.orderid, item.restAdds]);
  return(
    <div className='w-full h-auto my-2 p-1 flex flex-col gap-2 overflow-y-auto'>
      {finalData?.map((ele,index) => (
        <div key={index} className='w-full h-auto border p-2 rounded-2xl'>
          <h1 className='text-center w-full h-[40px]'>Your Order Ready In <strong>{ele?.restadd?.detail?.Restaurant_name}</strong> </h1>
          <h1 className='w-full h-[30px] overflow-hidden'>Address: <span className='text-[8px]'>{ele?.restadd?.location?.Map_Address}</span></h1>
          <h1 className='w-full h-auto'>Food Items : {ele?.items?.map(((item,index) =>(<span key={index} className='h-[30px]'><strong>{item.name}</strong>, </span>)))}</h1>
        </div>
      ))}
    </div>
  )
}


function Deliverytime(){
  const [time, setTime] = useState(15)
  const xyz = setInterval(()=>{
    if(time <=0){
      clearInterval(xyz)
    }else{
      setTime(pre => pre -1);
    }
  },60000)
  return(
    <>{time}</>
  )
}


