import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrderItems } from '../Slices/DeliverySection';
import { useEffect, useState } from 'react';


function OrderCart({allOrder, AllOrderItems, setOnumber}) {
  const dispatch = useDispatch();
  const OItems = useSelector((state) => state.delivery.ordersItems);
  const OrderItems = allOrder ? AllOrderItems : OItems;

  useEffect(() => {
    dispatch(getCurrentOrderItems());
  }, [dispatch]);
  console.log(OItems)

  return (
    <div className="w-full h-[100%] overflow-y-auto p-4 space-y-4 bg-gray-50">
      {OrderItems.length !== 0 ? OrderItems.map((item) => (
        <OrderItem key={item.orderid} item={item} />
      )) : <div className='w-full h-full flex justify-center items-center'>
            
        </div>}
    </div>
  );
}


export default OrderCart;


function OrderItem({ item }) {
  const [isDining, setIsDining] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 space-y-3 border border-green-100">

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="text-sm font-semibold truncate w-[150px]">
            {item.orderid}
          </p>
        </div>

        <span className="px-3 py-1 text-[13px] rounded-full bg-green-100 text-green-700">
          {item.orderStatus}
        </span>
      </div>

      <div className="flex bg-gray-100 rounded-full p-1 text-sm font-medium">
        <button
          onClick={() => setIsDining(false)}
          className={`w-1/2 py-1 rounded-full transition-all ${
            !isDining ? 'bg-green-600 text-white' : 'text-gray-600'
          }`}
        >
          🚚 Delivery
        </button>
        <button
          onClick={() => setIsDining(true)}
          className={`w-1/2 py-1 rounded-full transition-all ${
            isDining ? 'bg-orange-500 text-white' : 'text-gray-600'
          }`}
        >
          🍽 Dining
        </button>
      </div>
      <div className="space-y-2">
        {!isDining &&
          (item?.Deliveryitems?.length ? (
            item.Deliveryitems.map((i, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
              >
                <span className="text-gray-700">{i.itemName}</span>
                <span className="font-semibold text-green-600">
                  × {i.orderOty}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 text-center">
              No delivery items
            </p>
          ))}

        {isDining &&
          (item?.DiningInitems?.length ? (
            <div>
                <p className="text-sm pb-2 text-center">
                    Ready At Restaurent
                </p>
                {item.DiningInitems.map((i, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
              >
                <span className="text-gray-700">{i.itemName}</span>
                <span className="font-semibold text-green-600">
                  × {i.orderOty}
                </span>
              </div>
            ))}
            </div>
            
            
          ) : (
            <p className="text-sm text-gray-400 text-center">
              No dining items
            </p>
          ))}
      </div>
    </div>
  );
}



