import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './header';
import ShortInfo from './ShortInfo';
import ProfileInfo from './profileInfo';
import AddressInfo from './AddressInfo';
import Footer from './Footer';
import OrderInfo from './OrderInfo';


let initItem = [true, false, false]
function Profile() {
    const [showProfileItem, setShowProfileItem] = useState(initItem);
    function toggleProfileItem(num){
        let newArr = [...showProfileItem];
        newArr = newArr.map((_, index) => (index === num ? true : false));
        setShowProfileItem(newArr); 
    }
    const navigate = useNavigate();
  return (
    <>
      <div className='bg-white w-full min-h-[100vh]'>
          <Header search={false}></Header>
          <button onClick={()=>{navigate(-1)}} className='px-4 py-2 text-white text-2xl bg-green-600 hover:bg-green-800 rounded-xl m-3 absolute'>{'<-'}</button>
          <div className='w-full h-auto  flex justify-center'>
              <ShortInfo toggleProfileItem={toggleProfileItem} showProfileItem={showProfileItem}></ShortInfo>
              {showProfileItem[0] && <ProfileInfo  ></ProfileInfo>}
              {showProfileItem[1] && <AddressInfo  ></AddressInfo>}
              {showProfileItem[2] && <OrderInfo></OrderInfo>}
          </div>
      </div>
      <Footer></Footer>
    </>
    
  )
}

export default Profile;