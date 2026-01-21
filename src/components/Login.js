import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, otpVerification } from '../Slices/Register.js'

const initialState = {
    mobile_no: '',
    motp: '',
}

function Login() {
    const [isOpt, setIsOpt] = useState(false);
    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Interaction states for inline styling
    const [focusedField, setFocusedField] = useState(null);
    const [isBtnActive, setIsBtnActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const isRegistered = useSelector((state) => state.mainSB.isRegistered);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleOpt(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            alert('please fill in required fill');
            return;
        } else if (user.mobile_no.length !== 10) {
            alert('please fill correct mobile number');
        } else {
            dispatch(createUser(user));
            setIsOpt(true);
        }
    }

    function handleVerification(e) {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            alert('please fill in required fill');
            return;
        } else if (user.motp.length !== 6) {
            alert('please fill correct OTP');
            return;
        } else {
            dispatch(otpVerification(user));
        }
    }

    useEffect(() => {
        if (isRegistered) {
            navigate('/');
        }
    }, [isRegistered, navigate]);

    function changehandle(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // Responsive width calculation
    const getContainerWidth = () => {
        if (windowWidth >= 1024) return '40%'; // lg
        if (windowWidth >= 768) return '50%';  // md
        return '80%';                          // default/mobile
    };

    const inputStyle = (name) => ({
        width: '70%',
        height: '50px',
        fontSize: '1.5rem', // text-2xl
        border: 'none',
        borderBottom: `2px solid ${focusedField === name ? '#22c55e' : '#e5e7eb'}`, // focus:border-green-500
        outline: 'none',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        backgroundColor: 'transparent',
        transition: 'border-color 0.2s',
    });

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: getContainerWidth(),
                height: '80%',
                backgroundColor: '#f0fdf4', // bg-green-50
                borderRadius: '0.75rem',     // rounded-xl
                display: 'flex',
                flexDirection: 'column',
                itemsCenter: 'center',
                justifyContent: 'space-around',
                padding: '1rem'
            }}>
                <div style={{
                    width: '100%',
                    height: 'auto',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        fontSize: '1.875rem', // text-3xl
                        color: '#22c55e',      // text-green-500
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        Register your New Account
                    </h1>
                    <p style={{ color: '#94a3b8', textAlign: 'center' }}>something about website</p>
                </div>

                <div style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    {!isOpt ? (
                        <form
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}
                            onSubmit={handleOpt}
                        >
                            <input
                                type='number'
                                required
                                name='mobile_no'
                                placeholder='Mobile Number'
                                pattern='\d*'
                                onChange={changehandle}
                                onFocus={() => setFocusedField('mobile_no')}
                                onBlur={() => setFocusedField(null)}
                                style={inputStyle('mobile_no')}
                            />
                            <button
                                type='submit'
                                style={{
                                    width: '200px',
                                    height: '50px',
                                    backgroundColor: '#22c55e',
                                    color: 'white',
                                    borderRadius: '0.75rem',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Send OTP
                            </button>
                        </form>
                    ) : (
                        <form
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}
                            onSubmit={handleVerification}
                        >
                            <input
                                type='number'
                                required
                                name='motp'
                                placeholder='OTP'
                                pattern='\d*'
                                onChange={changehandle}
                                onFocus={() => setFocusedField('motp')}
                                onBlur={() => setFocusedField(null)}
                                style={inputStyle('motp')}
                            />
                            <button
                                type='submit'
                                onMouseDown={() => setIsBtnActive(true)}
                                onMouseUp={() => setIsBtnActive(false)}
                                style={{
                                    width: '200px',
                                    height: '50px',
                                    backgroundColor: isBtnActive ? '#16a34a' : '#22c55e', // active:bg-green-600
                                    color: 'white',
                                    borderRadius: '0.75rem',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.1s'
                                }}
                            >
                                Verify & Next
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login;