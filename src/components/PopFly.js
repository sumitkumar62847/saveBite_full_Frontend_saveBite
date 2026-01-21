import React from 'react'
import { useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import Header from './header';

function PopFly() {
  const isRegistered = useSelector((state) => state.mainSB.isRegistered);

  return (
    <div 
      className="simindexMap" // Preserving custom class for map indexing
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#ffffff'
      }} 
      onWheel={(e) => { e.stopPropagation() }}
    >
        <Header islogin={!isRegistered}></Header>
        <div 
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '1rem',    // my-4 (top)
            marginBottom: '1rem', // my-4 (bottom)
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MapComponent></MapComponent>
        </div>
    </div>
  )
}

export default PopFly;