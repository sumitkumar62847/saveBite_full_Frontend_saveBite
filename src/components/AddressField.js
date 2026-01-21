import React, { useEffect, useState } from 'react'
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import { deleteUserAdd, getAddressData, setCurrentAdd, setCurrentAddAtF } from '../Slices/Addressinfo';
import { useNavigate } from 'react-router-dom';

function AddressField() {
    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
    const addinfo = useSelector((state) => state.restAdd.restAdd);
    const [isadd, setIsadd] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isHoveringAddBtn, setIsHoveringAddBtn] = useState(false);
    const [isHoveringContinue, setIsHoveringContinue] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAddressData())
        if (addinfo?.AddData?.length > 0) {
            setIsadd(true)
        } else {
            setIsadd(false)
        }
    }, [dispatch, addinfo?.AddData?.length])

    function clickHandle(e, id, userid, ele) {
        e.preventDefault();
        dispatch(setCurrentAddAtF(id));
        dispatch(setCurrentAdd({ id, userid }));
    }

    function removeHandle(e, id) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteUserAdd(id))
    }

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff' }} className="simindexMap">
            <Header islogin={!isRegistered}></Header>
            
            {isadd && (
                <div style={{ 
                    width: '100%', 
                    height: '87vh', 
                    backgroundColor: 'white', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <div style={{ 
                        width: '50%', 
                        minHeight: '60vh', 
                        backgroundColor: 'white', 
                        borderRadius: '0.75rem', 
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
                    }}>
                        {/* Header Section */}
                        <div style={{ 
                            width: '100%', 
                            height: '64px', 
                            borderBottom: '1px solid #e5e7eb', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            position: 'relative' 
                        }}>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#374151' }}>
                                Save Address
                            </h1>
                            <button
                                style={{ 
                                    position: 'absolute', 
                                    right: '16px', 
                                    color: '#6b7280', 
                                    fontSize: '1.125rem', 
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer' 
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                                onClick={() => navigate(-1)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Address List */}
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {addinfo?.AddData?.map((ele, index) => (
                                <div
                                    key={index}
                                    onClick={(e) => clickHandle(e, ele._id, ele.userid, ele)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '12px',
                                        padding: '16px',
                                        borderRadius: '0.5rem',
                                        border: ele?.isUseNow ? '1px solid #22c55e' : '1px solid #e5e7eb',
                                        backgroundColor: ele?.isUseNow ? '#f0fdf4' : (hoveredIndex === index ? '#f9fafb' : 'transparent'),
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        checked={ele?.isUseNow}
                                        readOnly
                                        style={{ marginTop: '4px', accentColor: '#22c55e' }}
                                    />

                                    <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.25rem' }}>
                                        <p style={{ fontWeight: 500, margin: 0, color: '#374151' }}>{ele?.Locality}</p>
                                        <p style={{ color: '#6b7280', margin: 0 }}>{ele?.Landmark}</p>
                                        <p style={{ color: '#6b7280', margin: 0 }}>{ele?.Map_Address}</p>
                                    </div>

                                    <button
                                        onClick={(e) => removeHandle(e, ele?._id)}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            fontSize: '0.75rem',
                                            color: '#ef4444',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = '#b91c1c'}
                                        onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div style={{ paddingTop: '16px', display: 'flex', justifyContent: 'center' }}>
                                <button
                                    style={{
                                        padding: '8px 24px',
                                        fontSize: '0.875rem',
                                        backgroundColor: isHoveringAddBtn ? '#16a34a' : '#22c55e',
                                        color: 'white',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={() => setIsHoveringAddBtn(true)}
                                    onMouseLeave={() => setIsHoveringAddBtn(false)}
                                    onClick={() => setIsadd(false)}
                                >
                                    + Add New Address
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        style={{
                            padding: '8px',
                            backgroundColor: isHoveringContinue ? '#16a34a' : '#22c55e',
                            color: 'white',
                            borderRadius: '0.5rem',
                            width: '300px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'background-color 0.2s'
                        }} 
                        onMouseEnter={() => setIsHoveringContinue(true)}
                        onMouseLeave={() => setIsHoveringContinue(false)}
                        onClick={() => navigate('/payment')}
                    >
                        Continue
                    </button>
                </div>
            )}

            {!isadd && (
                <div style={{ width: '100%', height: 'auto', margin: '16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <MapComponent responsiveness={true}></MapComponent>
                </div>
            )}
        </div>
    )
}

export default AddressField;