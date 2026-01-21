import React from 'react';
import Restaurent from './Restaurent';
import { useSelector } from 'react-redux';

function Items() {
  const rests = useSelector((state) => state.items.itemsinfo);
  const msg = rests?.message;

  return (
    <section
      style={{
        width: '100%',
        height: 'auto',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {rests?.length !== 0 && (
        <div
          style={{
            width: '95%',
            height: 'auto',
            backgroundColor: '#f8fafc', // bg-slate-50
            borderRadius: '1rem', // rounded-2xl
            marginTop: '1.25rem', // my-5 (20px)
            marginBottom: '1.25rem',
          }}
        >
          {!msg &&
            rests?.map((rest, index) => (
              <Restaurent key={index} restinfo={rest}></Restaurent>
            ))}
          
          {msg && (
            <h1
              style={{
                width: '100%',
                height: '300px',
                textAlign: 'center',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {msg}
            </h1>
          )}
        </div>
      )}

      {rests?.length === 0 && (
        <div
          style={{
            width: '100%',
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0 }}>Sorry nothing is available</h1>
        </div>
      )}
    </section>
  );
}

export default Items;