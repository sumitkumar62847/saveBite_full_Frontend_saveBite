import Restaurent from './Restaurent';
import {  useSelector } from 'react-redux';


function Items() {
    const rests = useSelector((state) => state.items.itemsinfo);
    const msg = rests?.message;
  return (
    <section className='w-full h-auto bg-white flex justify-center items-center'>
        {rests?.length !== 0 && <div className='w-[95%] h-auto bg-slate-50 rounded-2xl my-5 '>
          {!msg && rests?.map((rest, index)=>(
              
              <Restaurent key={index} restinfo = {rest}></Restaurent>
          ))}
          {msg && <h1 className='w-full h-[300px] text-center '>{msg}</h1>}
        </div>}
        {
          rests?.length === 0 && <div className='w-full h-[60vh] flex justify-center items-center'>
            <h1>Sorry nothing is available</h1>
          </div>
        }
    </section>
  )
}

export default Items;