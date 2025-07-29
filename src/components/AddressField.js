import React, { useEffect, useState } from 'react'
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import { deleteUserAdd, getAddressData, setCurrentAdd } from '../Slices/Addressinfo';
import { useNavigate } from 'react-router-dom';


function AddressField() {
    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
    const addinfo = useSelector((state)=> state.restAdd.restAdd);
    const [isadd, setIsadd] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      dispatch(getAddressData())
      if(addinfo?.AddData?.length > 0){ 
        setIsadd(true)
      }else{
        setIsadd(false)
      }
    },[dispatch,addinfo?.AddData?.length,setIsadd])

    function clickHandle(e,id,userid){
      e.preventDefault();
      dispatch(setCurrentAdd({id,userid}))
      dispatch(getAddressData());
    }
    
    function removeHandle(e,id){
      e.preventDefault();
      e.stopPropagation();
      dispatch(deleteUserAdd(id))
    }
    
  return (
    <div className="w-full h-[100vh]  bg-[#ffffff] simindexMap">
        <Header islogin={!isRegistered}></Header>
        {isadd &&<div className='w-full h-[87vh] bg-white flex flex-col gap-4 items-center justify-center'>
            <div className=' w-[50%] min-h-[50vh] bg-green-100 rounded-lg'>
                <div className='w-full h-[60px] border-b flex items-center relative'>
                  <h1 className='w-full text-center text-2xl'>Save Address</h1>
                  <button className='absolute right-2 text-2xl w-10 h-10 border rounded-full ' onClick={()=> navigate(-1)}>X</button>
                </div>
                <div className='w-full h-auto  flex flex-col'>
                  {addinfo?.AddData?.map((ele,index)=>(
                    <div key={index} className={`relative flex  border-b p-2 cursor-pointer ${ele?.isUseNow ? ' border border-green-400' :''} hover:bg-green-200 `} onClick={(e)=>clickHandle(e,ele._id,ele.userid)}>
                      <button className=' absolute right-2 text-xs border px-1 rounded bg-red-300 hover:bg-red-400' onClick={(e)=>removeHandle(e,ele?._id)}>remove</button>
                      <input type='radio' checked={ele?.isUseNow} className='mr-2'></input>
                      <div>
                        <h1>{ele?.Locality}</h1>
                        <h1>{ele?.Landmark}</h1>
                        <h1>{ele?.Map_Address}</h1>
                      </div>
                    </div>
                  )
                  )}
                  <div className='w-full flex items-center justify-center my-4 '><button className=' bg-green-400 rounded-lg w-[120px] h-[40px] text-xs' onClick={()=> setIsadd(false)}>Add New Address</button></div>
                </div>
            </div>
            <button className='p-2 bg-green-500 rounded-lg w-[300px]' onClick={()=> navigate('/payment')}>Continue</button>
        </div>}
        {!isadd && <div className='w-full h-auto my-4 flex flex-col justify-center items-center'>
          <MapComponent responsiveness={true}></MapComponent>
        </div>}
    </div>
  )
}

export default AddressField;