import React,{useState, useRef, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../mainlogo.svg'
import bagicon from '../images/shopping-bag.png'
import helpicon from '../images/help.png'
import proficon from '../images/profile-user.png'
import searchicon from '../images/searchicon.png'
import Aicon from '../images/AiIcon.gif'
import './AllComponent.css'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client';
import { getitems } from '../Slices/items.js';
import { mainLogin } from '../Slices/Register.js';
import { getUser } from '../Slices/Register.js'

function Header({search}){
    const isRegistered = useSelector((state) => state.mainSB.isRegistered);
    const userInfo = useSelector((state) => state.mainSB.userinfo);
    const [query, setQuery] = useState('');
    const socketRef = useRef(null)
    const typingTimeRef = useRef(null);

    const [suggestions,setsuggestions] = useState(new Set());
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const jwttoken = localStorage.getItem('jwt_token');
    const coods = localStorage.getItem('coods');

    const Api = 'http://localhost:8088';
    
    useEffect(()=>{
        if(jwttoken && !isRegistered){
            dispatch(mainLogin(jwttoken));
        }
    },[jwttoken,isRegistered,dispatch]);

    useEffect(()=>{
        setTimeout(()=>{
        if(!coods){
            navigate('/addressinfo');
        }else{
            dispatch(getitems());
        }
        },100)
    },[navigate,coods,dispatch]);

    function changeHandler(e){
        const value = e.target.value;
        setQuery(value);
        suggestions.clear();
        if(!value){
            if(socketRef.current){
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        };
        if(!socketRef.current){
            socketRef.current = io(Api);
            socketRef.current.on('suggestions', (data)=>{
                const item = data?.items
                const restaurent = data?.restaurants;
                const newSuggestions = new Set();
                item.forEach(i => { newSuggestions.add(i.item_name)});
                restaurent.forEach(r => {newSuggestions.add(r.Restaurant_name)})
                setsuggestions(newSuggestions);
            });
        }
        socketRef.current.emit('search', value);

        if(typingTimeRef.current){
            clearTimeout(typingTimeRef.current);
        }

        typingTimeRef.current = setTimeout(()=>{
            if(socketRef.current){
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        },2000);
    };


    function searchHandler(e){
        e.preventDefault();
        const suggest = Array.from(suggestions)[0];
        if(suggest || query.length > 2){
            localStorage.setItem('querySearch',query);
            localStorage.setItem('querySuggest',suggest);
            setQuery("");
            setsuggestions(new Set());
            if (location.pathname === '/search') navigate(0);
            else navigate('/search');
        }   
    }

    function suggestionHandler(i,e){
        e.preventDefault();
        localStorage.setItem('querySearch',null);
        localStorage.setItem('querySuggest',i);
        setQuery("")
        setsuggestions(new Set())
        if (location.pathname === '/search') navigate(0);
        else navigate('/search');
    }

    function cardHandle(e){
        e.preventDefault();
        navigate('/cart')
    }

    useEffect(()=>{
        if(jwttoken && isRegistered){
            dispatch(getUser())
        }
        if(userInfo?.userInfo?.profileStatus){
            localStorage.setItem('pfystatus',userInfo?.userInfo?.profileStatus)
        }
    },[jwttoken,isRegistered,dispatch,userInfo?.userInfo?.profileStatus])

    const [isopen, setIsopen] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!localStorage.getItem('pfystatus') && isRegistered && coods) {
                document.body.style.overflow = 'hidden';
                setIsopen(true);
            } else{
                document.body.style.overflow = '';
            }
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [isRegistered,coods]);

    function closeHandle(e){
        e.preventDefault();
        setIsopen(false);
        document.body.style.overflow = '';
        localStorage.setItem('pfystatus',true);
    }

    function goClickHandle(e){
        e.preventDefault();
        setIsopen(false);
        document.body.style.overflow = '';
        localStorage.setItem('pfystatus',true);
        navigate('/profile');
    }

    return (
            <header className="w-full lg:h-[100px] md:h-[80px] h-[60px]">
                <nav className="fixed top-0 w-full lg:h-[100px] md:h-[80px] h-[60px] simindexnav flex justify-between items-center pt-1 px-[1%] bg-white border-b border-[rgb(106,154,52)] pb-1">
                    <div className="flex items-center justify-center lg:w-[30%] md:w-[35%] sm:w-[40%] w-[50%]">
                        <a href="/">
                            <img src={logo} alt='logo' className='cursor-pointer lg:w-[90px] md:w-[70px] sm:w-[50px] w-[30px]'/>
                        </a>
                        <i><span className='lg:text-[40px] md:text-[30px] pl-[10px] text-[rgb(76,201,105)]'>SAVE</span><label className='lg:text-[40px] md:text-[30px] text-[rgb(201,126,76)]'>BITE</label></i>
                    </div>
                     {search && <div className='lg:w-[45%] md:w-[40%] flex items-center relative'>
                        <form className='w-full flex relative' onSubmit={searchHandler}>
                            <img src={Aicon} alt='searchicon' className=' absolute left-0 lg:h-[50px] md:h-[40px] lg:w-[50px] md:w-[40px] border rounded-lg border-[rgb(76,136,166)] bg-white'/>
                            <input value={query} onChange={changeHandler} type="text" placeholder="Search foods, restaurent, Anythings By Ai " className="hidden md:block border border-blue-900 w-[100%]  lg:h-[50px] md:h-[40px] pl-[60px] rounded-lg text-xl focus:outline-none focus:bg-slate-50"/>
                            <button type='submit' className="flex justify-center items-center border-l border-blue-900 lg:w-[80px] md:w-[60px] lg:h-[50px] md:h-[40px] text-xxl absolute rounded-lg right-0 cursor-pointer border  bg-white  hover:bg-[rgb(237,237,237)]">
                                <img src={searchicon} alt='searchicon' className='lg:w-[30px] md:w-[25px]'/>
                            </button>
                        </form>
                        {
                            <div className=' hidden md:block w-full rounded bg-white absolute top-[65px]'>
                                {Array.from(suggestions).map((i, index) => (
                                    <h4 key={index} className='w-full h-[60px] rounded-md border flex items-center pl-4' onClick={(e)=>suggestionHandler(i,e)}>{i}</h4>
                                ))}
                            </div>
                        }
                    </div>}

                    <div className="flex items-center justify-end lg:w-[25%] md:w-[30%] sm:w-[35%] w-[45%] gap-2">
                       {!isRegistered && <button className='w-[130px] mr-4 border border-gray-400 text-xl h-[46px] bg-green-400 cursor-pointer rounded-lg shadow-xl hover:bg-green-500 ' onClick={() => navigate('/login')}>Login</button>}
                        {isRegistered && <div className="w-auto px-1 h-[50px] pr-1 hover:border flex items-center rounded-md " onClick={() => navigate('/profile')}>
                            <img src={proficon} alt='userprofile' className='cursor-pointer w-[20px] md:w-[25px] lg:w-[30px]'/>
                            <p className='pl-1 cursor-pointer text-xs md:text-lg lg:text-xl'>{userInfo?.userInfo?.name || 'Guest764'}</p>
                        </div>}
                        {isRegistered && <div className="pr-1 w-[25px] md:w-[30px] lg:w-[40px] " onClick={cardHandle}>
                            <img src={bagicon} alt='bagicon'  className='cursor-pointer w-[20px] md:w-[30px] lg:w-[40px] '/>
                        </div>}
                        <div onClick={()=>{navigate("/help")}} className="pr-1 w-[25px] md:w-[30px] lg:w-[40px]">
                            <img src={helpicon} alt='helpicon' className='cursor-pointer w-[20px] md:w-[30px] lg:w-[40px]'/>
                        </div>
                    </div>
                    {isopen && <div className='w-full h-[100vh] bg-[rgba(47,47,47,0.4)] absolute top-0 left-0 flex justify-center items-center'>
                        <div className=' w-[50%] h-[60vh] rounded-xl bg-green-100  shadow-lg flex flex-col items-center '>
                            <h1 className='w-full relative  text-2xl text-center flex items-center justify-center p-2 '>complete profile <button className='absolute right-2 top-2 border w-10 h-10 rounded-full' onClick={closeHandle}>X</button></h1>
                            <button className='w-[200px] h-[70px] border'onClick={goClickHandle}>Go to Profile</button>
                        </div>
                    </div>}
                </nav>
            </header>
    )
}

export default Header;