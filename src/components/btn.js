import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { popByRest, pushInRest } from '../Slices/cartSlice';

export default function ToggleButton({iteminfo}) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = (e) => {
    e.preventDefault();
    if(isActive){
      setIsActive(false);
      dispatch(popByRest({_id:iteminfo._id, amt:Number(iteminfo.price - ((iteminfo.price)*(iteminfo.discount)/100)).toFixed(2),userQty:1,name:iteminfo.item_name,userid:iteminfo.userid}));
    }else{
      setIsActive(true);
      dispatch(pushInRest({_id:iteminfo._id, amt:Number(iteminfo.price - ((iteminfo.price)*(iteminfo.discount)/100)).toFixed(2),userQty:1,name:iteminfo.item_name,userid:iteminfo.userid}))
    }
  };

  return (
    <button onClick={handleToggle} className={`relative my-2 flex  items-center w-full h-10 rounded-full transition-colors duration-500 border bg-white`}>
      <div className={`absolute top-[1px] w-1/2 h-9 bg-white rounded-full z-1 shadow-md transition-all duration-500 ${ isActive ? 'left-[calc(50%-1px)]' : 'left-[1px]' }`} style={isActive? {backgroundColor:'orange'} : {backgroundColor:'green'}}></div>
      <span className={`w-1/2 text-center text-[12px] font-semibold z-10 transition-colors duration-500 ${isActive ? 'text-orange-500' : 'text-white' }`}>Delivery</span>
      <span className={`w-1/2 text-center text-[12px] font-semibold z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'text-green-500'}`}>Dining in</span>
    </button>
  );
}