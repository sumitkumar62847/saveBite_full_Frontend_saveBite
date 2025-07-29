import React from 'react'
import {  useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import Header from './header';
function PopFly() {
  const isRegistered = useSelector((state) => state.mainSB.isRegistered);

  return (
    <div className="w-full h-[100vh]  bg-[#ffffff] simindexMap "  onWheel={(e)=> {e.stopPropagation()}}>
        <Header islogin={!isRegistered}></Header>
        <div className='w-full h-auto my-4 flex flex-col justify-center items-center'>
          <MapComponent></MapComponent>
        </div>
    </div>
  )
}

export default PopFly;
