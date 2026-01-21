import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrderItems } from '../Slices/DeliverySection';
import { useEffect, useState } from 'react';

function OrderCart({ allOrder, AllOrderItems, setOnumber }) {
  const dispatch = useDispatch();
  const OItems = useSelector((state) => state.delivery.ordersItems);
  const OrderItems = allOrder ? AllOrderItems : OItems;

  useEffect(() => {
    dispatch(getCurrentOrderItems());
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#f9fafb', // bg-gray-50
      }}
    >
      {OrderItems.length !== 0 ? (
        OrderItems.map((item) => <OrderItem key={item.orderid} item={item} />)
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      )}
    </div>
  );
}

export default OrderCart;

function OrderItem({ item }) {
  const [isDining, setIsDining] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem', // rounded-2xl
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem', // space-y-3
        border: '1px solid #dcfce7', // border-green-100
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Order ID</p>
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '150px',
            }}
          >
            {item.orderid}
          </p>
        </div>

        <span
          style={{
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
            fontSize: '13px',
            borderRadius: '9999px',
            backgroundColor: '#dcfce7', // bg-green-100
            color: '#15803d', // text-green-700
          }}
        >
          {item.orderStatus}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          backgroundColor: '#f3f4f6', // bg-gray-100
          borderRadius: '9999px',
          padding: '0.25rem',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        <button
          onClick={() => setIsDining(false)}
          style={{
            width: '50%',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
            borderRadius: '9999px',
            transition: 'all 0.2s',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: !isDining ? '#16a34a' : 'transparent', // bg-green-600
            color: !isDining ? 'white' : '#4b5563', // text-gray-600
          }}
        >
          🚚 Delivery
        </button>
        <button
          onClick={() => setIsDining(true)}
          style={{
            width: '50%',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
            borderRadius: '9999px',
            transition: 'all 0.2s',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: isDining ? '#f97316' : 'transparent', // bg-orange-500
            color: isDining ? 'white' : '#4b5563',
          }}
        >
          🍽 Dining
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {!isDining &&
          (item?.Deliveryitems?.length ? (
            item.Deliveryitems.map((i, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  paddingLeft: '0.75rem',
                  paddingRight: '0.75rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
              >
                <span style={{ color: '#374151' }}>{i.itemName}</span>
                <span style={{ fontWeight: 600, color: '#16a34a' }}>
                  × {i.orderOty}
                </span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center' }}>
              No delivery items
            </p>
          ))}

        {isDining &&
          (item?.DiningInitems?.length ? (
            <div>
              <p style={{ fontSize: '0.875rem', paddingBottom: '0.5rem', textAlign: 'center' }}>
                Ready At Restaurant
              </p>
              {item.DiningInitems.map((i, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  <span style={{ color: '#374151' }}>{i.itemName}</span>
                  <span style={{ fontWeight: 600, color: '#16a34a' }}>
                    × {i.orderOty}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center' }}>
              No dining items
            </p>
          ))}
      </div>
    </div>
  );
}