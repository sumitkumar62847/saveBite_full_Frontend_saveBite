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
    <div className="w-[50%] bg-white m-4 rounded-xl shadow-md border">
  

  {!isadd && (
    <div className="flex flex-col items-center justify-center h-[420px] text-gray-600">
      <h1 className="text-lg font-medium">
        No address added yet
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Please add a delivery address to continue
      </p>
    </div>
  )}


  {isadd && (
    <div className="relative w-full flex flex-col">
      <div className="h-[60px] flex items-center justify-center border-b">
        <h1 className="text-xl font-semibold text-gray-700">
          Saved Addresses
        </h1>
      </div>
      <div className="p-4 space-y-3 max-h-[340px] overflow-y-auto">
        {addinfo?.AddData?.map((ele, index) => (
          <div
            key={index}
            className="relative p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <button
              className="absolute top-3 right-3 text-xs text-red-500 hover:text-red-700"
              onClick={(e) => removeHandle(e, ele?._id)}
            >
              Remove
            </button>

            <p className="font-medium text-gray-800">
              {ele?.Locality}
            </p>
            <p className="text-sm text-gray-500">
              {ele?.Landmark}
            </p>
            <p className="text-sm text-gray-500">
              {ele?.Map_Address}
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
  )
}

export default AddressInfo;