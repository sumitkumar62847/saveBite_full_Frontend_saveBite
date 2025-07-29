import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAddressData,deleteUserAdd } from '../Slices/Addressinfo';


function AddressInfo() {
  const dispatch = useDispatch();
  const [isadd, setIsadd] = useState(false);
  const addinfo = useSelector((state)=> state.restAdd.restAdd);

   useEffect(()=>{
        dispatch(getAddressData())
        if(addinfo?.AddData?.length > 0){ 
          setIsadd(true)
        }
      },[dispatch,addinfo?.AddData?.length,setIsadd])

    function removeHandle(e,id){
      e.preventDefault();
      e.stopPropagation();
      console.log('cdwcwcq');
      dispatch(deleteUserAdd(id))
    }
  return (
    <div className='w-[850px] h-auto  bg-green-100 m-4 border'>
          {!isadd && <div className='w-full h-[80%] flex justify-center items-center'>
            <h1 className='text-center text-2xl'>Not any Address has Added</h1>
          </div>}
          {isadd && <div className=' relative w-full h-[400px]  flex flex-col p-2'>
            <h1 className='w-full text-center text-2xl pb-2 border-b'>Save Address</h1>
            {addinfo?.AddData?.map((ele,index)=>(
              <div key={index} className='border-b p-2'>
                <button className=' absolute right-2 text-xs border px-1 rounded bg-red-300 hover:bg-red-400' onClick={(e)=>removeHandle(e,ele?._id)}>remove</button>
                <h1>{ele?.Locality}</h1>
                <h1>{ele?.Landmark}</h1>
                <h1>{ele?.Map_Address}</h1>
              </div>
            )
            )}
          </div>} 
    </div>
  )
}

export default AddressInfo;