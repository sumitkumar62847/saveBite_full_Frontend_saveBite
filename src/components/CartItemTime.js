import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DeleteToCart } from '../Slices/cartSlice';

function CartItemTime({iteminfo}) {

    const [dealSec, setDealSec] = useState(null);
    const dispatch = useDispatch();

        useEffect(() => {
            const liveTime = new Date(iteminfo.LiveUntil);
            const abc = setInterval(() => {
                const now = Date.now();
                const diffMs = liveTime - now;
                const sec = Math.floor(diffMs / 1000);
                if (sec < 0){
                    clearInterval(abc);
                    dispatch(DeleteToCart(iteminfo?._id));
                } else {
                    setDealSec(sec);
                }
            }, 1000);
            return () => clearInterval(abc);
        }, [iteminfo?._id,dispatch,iteminfo.LiveUntil]);
  return (
    <p className='text-center text-red-600 bg-red-100 '>{`${Math.floor(dealSec/3600)?`0${Math.floor(dealSec/3600)}h :`: ''} ${Math.floor((dealSec % 3600)/60)}min : ${Math.floor(dealSec % 60)}sec`}</p>
  )
}

export default CartItemTime