import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Restaurent from './Restaurent';
import Header from './header';
import Searchites from './searchitems';
import { getSearchitems } from '../Slices/searchSlice';
import Item from './Item';
import Loader from './Loader';

function Searchdata(){
    const dispatch = useDispatch();
    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
    const Data = useSelector((state)=> state.search.searchData);
    const isLoader = useSelector((state)=> state.search.isLoader);
    const searchFor = Data?.search;
    const searchData = Data?.data;
    
    useEffect(()=>{
        const querySearch = localStorage.getItem('querySearch');
        const querySuggest = localStorage.getItem('querySuggest');
        dispatch(getSearchitems({search:querySearch,suggested:querySuggest}))
    },[dispatch]);

    return (
        <div className='w-full bg-slate-50 min-h-[100vh]'>
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
            {searchFor === 'ai' &&
                <div className='w-full bg-slate-50 min-h-[100vh]'>
                    <Header search={true} islogin={!isRegistered}></Header>
                    {searchData?.data?.highMatch?.lenght !==0 && 
                        <div className='w-full flex flex-wrap'>
                            <h1 className='w-full text-center'>highMatch</h1>
                            <div className='w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-[10px] justify-center my-5'>
                                {searchData?.data?.highMatch?.map((item, index)=>(
                                    <Item key={index} iteminfo = {item}></Item>
                                ))}
                            </div>
                        </div>
                    }
                    {searchData?.data?.mediumMatch?.lenght !==0 && 
                        <div className='w-full flex flex-wrap'>
                            <h1 className='w-full text-center'>mediumMatch</h1>
                            <div className='w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-[10px] justify-center my-5'>
                                {searchData?.data?.mediumMatch?.map((item, index)=>(
                                    <Item key={index} iteminfo = {item}></Item>
                                ))}
                            </div>
                        </div>
                    }
                    {searchData?.data?.lowMatch?.lenght !==0 && 
                        <div className='w-full flex flex-wrap'>
                            <h1 className='w-full text-center'>lowMatch</h1>
                            <div className='w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-[10px] justify-center my-5'>
                                {searchData?.data?.lowMatch?.map((item, index)=>(
                                    <Item key={index} iteminfo = {item}></Item>
                                ))}
                            </div>
                        </div>
                    }
                    
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
            {isLoader && <div> <Header search={true} islogin={!isRegistered}></Header> <Loader searchByAi={true}></Loader></div> }
         </div>
    )
}

export default Searchdata;