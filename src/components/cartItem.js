import React, { useEffect, useState } from 'react'
import ToggleButton from './btn';
import { useDispatch, useSelector } from 'react-redux';
import { decQuantity, DeleteToCart, incQuantity, pushInHome } from '../Slices/cartSlice';
import CartItemTime from './CartItemTime';

function CartItem({ iteminfo }) {
    const dispatch = useDispatch();
    const imageUrl = iteminfo.imageUrl[0];

    // Screen width tracking for responsive inline styles
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isSm = width >= 640;
    const isMd = width >= 768;
    const isLg = width >= 1024;
    const isXl = width >= 1280;

    useEffect(() => {
        dispatch(pushInHome({
            _id: iteminfo._id,
            amt: Number(iteminfo.price - ((iteminfo.price) * (iteminfo.discount) / 100)).toFixed(2),
            userQty: 1,
            name: iteminfo.item_name,
            userid: iteminfo.userid
        }))
    }, [dispatch, iteminfo.userid, iteminfo._id, iteminfo.price, iteminfo.discount, iteminfo.item_name])

    function RemoveHandle(e) {
        e?.preventDefault();
        dispatch(DeleteToCart(iteminfo?._id));
    }

    // Dynamic responsive values
    const containerWidth = isLg ? '50vw' : (isSm ? '60vw' : '80vw');
    const imageSize = isLg ? '10vw' : (isSm ? '15vw' : '20vw');
    const infoWidth = isXl ? '12vw' : (isLg ? '15vw' : (isMd ? '20vw' : (isSm ? '22vw' : '25vw')));

    return (
        <div style={{
            width: containerWidth,
            marginBottom: '12px',
            height: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid #e5e7eb',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '16px',
            backgroundColor: '#ffffff'
        }}>
            <img 
                src={imageUrl} 
                alt='item-img' 
                style={{
                    width: imageSize,
                    height: imageSize,
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb',
                    objectFit: 'cover'
                }} 
            />
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
            }}>
                <button 
                    style={{
                        width: isMd ? '45px' : '30px',
                        height: isMd ? '25px' : '20px',
                        color: 'black',
                        backgroundColor: '#ffffff',
                        borderRadius: '0.5rem',
                        fontSize: isMd ? '10px' : '6px',
                        textAlign: 'center',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer'
                    }} 
                    onClick={RemoveHandle}
                >
                    Remove
                </button>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    width: infoWidth
                }}>
                    <ToggleButton iteminfo={iteminfo}></ToggleButton>
                    
                    <h2 style={{
                        fontSize: isLg ? '15px' : '10px',
                        color: '#1f2937',
                        margin: '4px 0',
                        textAlign: 'end'
                    }}>
                        <strong>{iteminfo.item_name}</strong>
                    </h2>

                    <p style={{
                        color: '#4b5563',
                        textAlign: 'end',
                        fontSize: isLg ? '16px' : '12px',
                        margin: '2px 0'
                    }}>
                        <strong>
                            {Number(iteminfo.price - ((iteminfo.price) * (iteminfo.discount) / 100)).toFixed(2)}&#8377;
                        </strong>
                    </p>

                    <div>
                        <QuantityHandle iteminfo={iteminfo} isLg={isLg} isMd={isMd} />
                    </div>
                    
                    <CartItemTime iteminfo={iteminfo}></CartItemTime>
                </div>
            </div>
        </div>
    )
}

function QuantityHandle({ iteminfo, isLg, isMd }) {
    const HomeItemAmt = useSelector((state) => state.cart.HomeItemAmt);
    const RestItemAmt = useSelector((state) => state.cart.RestItemAmt);
    
    const Huserqty = HomeItemAmt.filter(item => item._id === iteminfo._id);
    const Ruserqty = RestItemAmt.filter(item => item._id === iteminfo._id);
    
    let userqty = 1;
    if (Huserqty[0]) userqty = Huserqty[0].userQty;
    if (Ruserqty[0]) userqty = Ruserqty[0].userQty;

    let [incShow, setincShow] = useState(true);
    let [decShow, setdecShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setdecShow(userqty >= 2);
        setincShow(iteminfo.quantity > userqty);
    }, [userqty, iteminfo.quantity]);

    function incHandle(e) {
        e?.preventDefault();
        dispatch(incQuantity({ _id: iteminfo._id }))
    }

    function decHandle(e) {
        e?.preventDefault();
        dispatch(decQuantity({ _id: iteminfo._id }))
    }

    const btnStyle = {
        width: isLg ? '30px' : '20px',
        height: isLg ? '30px' : '20px',
        color: 'black',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        fontSize: '10px',
        textAlign: 'center',
        border: '1px solid black',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: isMd ? '4px' : '0px',
            marginBottom: isMd ? '4px' : '0px'
        }}>
            <button 
                disabled={!decShow} 
                style={{ ...btnStyle, opacity: decShow ? 1 : 0.5, cursor: decShow ? 'pointer' : 'not-allowed' }} 
                onClick={decHandle}
            >
                -
            </button>
            
            <p style={{ fontSize: '12px', color: '#1f2937', margin: '0 8px' }}>
                {userqty}
            </p>
            
            <button 
                disabled={!incShow} 
                style={{ ...btnStyle, opacity: incShow ? 1 : 0.5, cursor: incShow ? 'pointer' : 'not-allowed' }} 
                onClick={incHandle}
            >
                +
            </button>
        </div>
    )
}

export default CartItem;