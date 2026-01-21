import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressData, deleteUserAdd } from '../Slices/Addressinfo';

function AddressInfo() {
  const dispatch = useDispatch();
  const [isadd, setIsadd] = useState(false);
  const addinfo = useSelector((state) => state.restAdd.restAdd);

  // State to track hover for inline CSS
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredRemove, setHoveredRemove] = useState(null);

  useEffect(() => {
    dispatch(getAddressData());
    if (addinfo?.AddData?.length > 0) {
      setIsadd(true);
    }
  }, [dispatch, addinfo?.AddData?.length]);

  function removeHandle(e, id) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteUserAdd(id));
  }

  return (
    <div
      style={{
        width: "50%",
        backgroundColor: "#ffffff",
        margin: "1rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Empty State */}
      {!isadd && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "420px",
            color: "#4b5563",
          }}
        >
          <h1 style={{ fontSize: "1.125rem", fontWeight: 500, margin: 0 }}>
            No address added yet
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>
            Please add a delivery address to continue
          </p>
        </div>
      )}

      {/* Saved Addresses List */}
      {isadd && (
        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#374151", margin: 0 }}>
              Saved Addresses
            </h1>
          </div>

          <div
            style={{
              padding: "1rem",
              maxHeight: "340px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem", // Replacement for space-y-3
            }}
          >
            {addinfo?.AddData?.map((ele, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "relative",
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  backgroundColor: hoveredCard === index ? "#f3f4f6" : "#f9fafb",
                  transition: "background-color 0.2s",
                }}
              >
                <button
                  onMouseEnter={() => setHoveredRemove(index)}
                  onMouseLeave={() => setHoveredRemove(null)}
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    fontSize: "0.75rem",
                    color: hoveredRemove === index ? "#b91c1c" : "#ef4444",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onClick={(e) => removeHandle(e, ele?._id)}
                >
                  Remove
                </button>

                <p style={{ fontWeight: 500, color: "#1f2937", margin: "0 0 0.25rem 0" }}>
                  {ele?.Locality}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0 0 0.125rem 0" }}>
                  {ele?.Landmark}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
                  {ele?.Map_Address}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressInfo;