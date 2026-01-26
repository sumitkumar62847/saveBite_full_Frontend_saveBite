import { useEffect, useState } from 'react';
import DealTime from './DealTime.js';
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
  {itemShow && iteminfo.quantity > 0 && (
    <div className="item-card">
      <img
        src={images[0]}
        alt="item-img"
        className="item-image"
        onClick={handleClick}
      />

      <DealTime liveTime={liveuntiltime} SetitemShow={setitemShow} />

      <h2 className="item-title">
        {iteminfo.item_name}
      </h2>

      <p className="item-price">
        Price:
        <label className="item-price-old">
          {iteminfo.price}&#8377;
        </label>
        <strong className="item-price-new">
          {Number(
            iteminfo.price -
              (iteminfo.price * iteminfo.discount) / 100
          ).toFixed(2)}
          &#8377;
        </strong>
        (off {iteminfo.discount}%)
      </p>

      <div className="item-footer">
        <p className="item-qty">Qty: {iteminfo.quantity}</p>

        <button
          className={`item-btn ${isAdd ? 'item-btn-added' : 'item-btn-add'}`}
          onClick={handleBag}
        >
          {isAdd ? 'Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  )}
</>

  )
}

export default Item;