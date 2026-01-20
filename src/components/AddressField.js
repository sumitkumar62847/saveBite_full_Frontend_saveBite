import React, { useEffect, useState } from 'react'
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import { deleteUserAdd, getAddressData, setCurrentAdd, setCurrentAddAtF } from '../Slices/Addressinfo';
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

    function clickHandle(e,id,userid, ele){
      e.preventDefault();
      console.log(ele,"/n", ele?.isUseNow);
      dispatch(setCurrentAddAtF(id));
      dispatch(setCurrentAdd({id,userid}));
      // dispatch(getAddressData());
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
            <div className="w-[50%] min-h-[60vh] bg-white rounded-xl shadow-lg">

              <div className="w-full h-[64px] border-b flex items-center justify-center relative">
                <h1 className="text-xl font-semibold text-gray-700">
                  Save Address
                </h1>
                <button
                  className="absolute right-4 text-gray-500 hover:text-red-500 text-lg"
                  onClick={() => navigate(-1)}
                >
                  ✕
                </button>
              </div>


              <div className="p-4 space-y-3">
                {addinfo?.AddData?.map((ele, index) => (
                  <div
                    key={index}
                    onClick={(e) => clickHandle(e, ele._id, ele.userid, ele)}
                    className={`relative flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition
                      ${
                        ele?.isUseNow
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      checked={ele?.isUseNow}
                      readOnly
                      className="mt-1 accent-green-500"
                    />


                    <div className="text-sm text-gray-700 leading-5">
                      <p className="font-medium">{ele?.Locality}</p>
                      <p className="text-gray-500">{ele?.Landmark}</p>
                      <p className="text-gray-500">{ele?.Map_Address}</p>
                    </div>


                    <button
                      onClick={(e) => removeHandle(e, ele?._id)}
                      className="absolute top-3 right-3 text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}


                <div className="pt-4 flex justify-center">
                  <button
                    className="px-6 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={() => setIsadd(false)}
                  >
                    + Add New Address
                  </button>
                </div>
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