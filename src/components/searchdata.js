import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Restaurent from './Restaurent';
import Header from './header';
import Searchites from './searchitems';
import { getSearchitems } from '../Slices/searchSlice';

function Searchdata(){
    const dispatch = useDispatch();
    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
    const Data = useSelector((state)=> state.search.searchData);
    const searchFor = Data?.search;
    const searchData = Data?.data;
    useEffect(()=>{
        const querySearch = localStorage.getItem('querySearch');
        const querySuggest = localStorage.getItem('querySuggest');
        dispatch(getSearchitems({search:querySearch,suggested:querySuggest}))
    },[dispatch]);

    return (
        <>
            {searchFor === 'item' && 
            <div className='w-full bg-slate-50 min-h-[100vh]'>
                <Header search={true} islogin={!isRegistered}></Header>
                <div className='w-full flex flex-wrap'>
                    {searchData?.map((rest, index)=>(
                        <Searchites key={index} restinfo={rest}></Searchites>
                    ))}
                </div>
            </div>
            }
            {searchFor === 'rest' && 
            <div className='flex flex-col items-center bg-slate-50 w-full min-h-[100vh] '>
                <Header search={true} islogin={!isRegistered}></Header>
                 <div className='w-[95%] h-auto bg-slate-50 rounded-2xl my-5 '>
                    {searchData?.map((rest, index)=>(
                    <Restaurent key={index} restinfo = {rest}></Restaurent>
                    ))}
                 </div>
                
            </div>} 
            {!searchFor && <div>
                <Header search={true} islogin={!isRegistered}></Header>
                Data not found</div>}
         </>
    )
}

export default Searchdata;