import React from 'react';
import Restaurent from './Restaurent';
import { useSelector } from 'react-redux';

function Items() {
  const rests = useSelector((state) => state.items.itemsinfo);
  const msg = rests?.message;

  return (
    <section className="restaurants-section">
  {rests?.length !== 0 && (
    <div className="restaurants-container">
      {!msg &&
        rests?.map((rest, index) => (
          <Restaurent key={index} restinfo={rest} />
        ))}

      {msg && (
        <h1 className="restaurants-message">
          {msg}
        </h1>
      )}
    </div>
  )}

  {rests?.length === 0 && (
    <div className="restaurants-empty">
      <h1>Sorry nothing is available</h1>
    </div>
  )}
</section>

  );
}

export default Items;