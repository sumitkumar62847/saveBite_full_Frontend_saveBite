import Headers from './header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import CartTotalAmount from './cartTotalAmount';

function Payment() {
  const cartItems = useSelector((state)=> state.cart.cartItems);
  return(
    <>
      <Headers search={false}></Headers>
     <div className='w-full bg-white pb-10 min-h-[90vh]'>
        <div className='w-full flex flex-col sm:flex-row justify-center gap-4 items-center sm:items-start'>
          <CartTotalAmount payment={true} cartItems={cartItems}></CartTotalAmount>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Payment;