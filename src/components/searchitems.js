import React from "react";
import SearchItem from "./searchitem";
function Searchitems({restinfo}){
  
  return (
      <div className='w-auto  m-2 p-3'>
            <h1 className="w-full border-b-2 border-green-600 text-2xl text-black">{restinfo.rest.Restaurant_name}</h1>
            <div className='w-auto flex gap-4 p-2 bg-green-100 border'>
                 {restinfo.items?.map((item, index)=>(
                    <SearchItem key={index} iteminfo={item} rest={restinfo?.rest}></SearchItem>
                ))}
            </div>
      </div>
  )
}
export default Searchitems;