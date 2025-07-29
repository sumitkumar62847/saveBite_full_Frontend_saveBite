import React, { useEffect, useState } from 'react'
import ToggleButton from './btn';
import { useDispatch, useSelector} from 'react-redux';
import { decQuantity, DeleteToCart, incQuantity, pushInHome } from '../Slices/cartSlice';
import CartItemTime from './CartItemTime';


function CartItem({iteminfo}){
    const dispatch = useDispatch();
    const imageUrl = iteminfo.imageUrl[0];
    useEffect(()=>{
        dispatch(pushInHome({_id:iteminfo._id, amt:Number(iteminfo.price - ((iteminfo.price)*(iteminfo.discount)/100)).toFixed(2),userQty:1,name:iteminfo.item_name,userid:iteminfo.userid}))
    },[dispatch,iteminfo.userid,iteminfo._id,iteminfo.price,iteminfo.discount,iteminfo.item_name])
    
    function RemoveHandle(e){
        e?.preventDefault();
        dispatch(DeleteToCart(iteminfo?._id));
    }
  return (
    <>
        <div className='w-[80vw] mb-3 sm:w-[60vw] lg:w-[50vw]   h-auto  flex justify-between border shadow-xl p-4'>
            <img src={imageUrl} alt='item-img' className='w-[20vw] h-[20vw] sm:w-[15vw] sm:h-[15vw] lg:w-[10vw] lg:h-[10vw] rounded-xl border'></img>
            <div className='flex flex-col items-end justify-between'>
                <button className='w-[30px] h-[20px] md:w-[45px] md:h-[25px] text-black rounded-lg text-[6px] md:text-[10px] text-center border' onClick={RemoveHandle}>Remove</button>
                <div className='flex flex-col items-end w-[25vw] sm:w-[22vw] md:w-[20vw]  lg:w-[15vw] xl:w-[12vw]'>
                    <ToggleButton iteminfo={iteminfo}></ToggleButton>
                    <h2 className='text-[10px] lg:text-[15px] text-gray-800 '><strong>{iteminfo.item_name}</strong></h2>
                    <p className='text-gray-600 text-end text-[12px] lg:text-[16px]'><strong>{Number(iteminfo.price - ((iteminfo.price)*(iteminfo.discount)/100)).toFixed(2)}&#8377;</strong></p>
                    <div>
                        <QuantityHandle iteminfo={iteminfo} ></QuantityHandle>
                    </div>
                    <CartItemTime iteminfo={iteminfo}></CartItemTime>
                </div>
            </div>
        </div>
    </> 
    )
}

export default CartItem;


function QuantityHandle({iteminfo}){
    const HomeItemAmt = useSelector((state)=> state.cart.HomeItemAmt);
    const RestItemAmt = useSelector((state)=> state.cart.RestItemAmt);
    const Huserqty = HomeItemAmt.filter(item => item._id === iteminfo._id);
    const Ruserqty = RestItemAmt.filter(item => item._id === iteminfo._id);
    let userqty = 1
    if(Huserqty[0]){
        userqty =  Huserqty[0].userQty;
    }
    if(Ruserqty[0]){
        userqty = Ruserqty[0].userQty
    }
    let [incShow , setincShow] = useState(true);
    let [decShow , setdecShow] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(userqty >= 2){
            setdecShow(true);
        }
        else{
            setdecShow(false);
        }
        if(iteminfo.quantity <=  userqty){
            setincShow(false);
        }
        else{
            setincShow(true);
        }
    },[userqty,iteminfo.quantity]);

    function incHandle(e){
        e?.preventDefault();
        dispatch(incQuantity({_id:iteminfo._id}))

    }
    function decHandle(e){
        e?.preventDefault();
        dispatch(decQuantity({_id:iteminfo._id}))
    }
    return (
        <div className='flex justify-between items-center md:my-1'>
            <button disabled={!decShow} className='w-[20px] h-[20px] lg:w-[30px] text-black rounded-lg text-[10px] text-center border border-black' onClick={(e)=>decHandle(e)}>-</button>
            <p className='text-[12px] text-gray-800 mx-2'>{userqty}</p>
            <button disabled={!incShow} className='w-[20px] h-[20px] lg:w-[30px] text-black rounded-lg text-[10px] text-center border border-black' onClick={(e)=>incHandle(e)}>+</button>
        </div>
    )
}

