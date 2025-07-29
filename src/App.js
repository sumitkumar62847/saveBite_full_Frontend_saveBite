import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import ScrollToTop from './components/scrollHandle';
import Profile from './components/profile';
import Cart from './components/Cart';
import Help from './components/help';
import PopFly from './components/PopFly';
import Login from './components/Login';
import Searchdata from './components/searchdata';
import { useSelector } from 'react-redux';
import FullitemInfo from './components/fullitemInfo';
import AddressField from './components/AddressField';
import Payment from './components/Payment';

function App() {
  const navigate = localStorage.getItem('navigate');
  const Path = localStorage.getItem('path');
  const searchpath = useSelector((state)=> state.search.navigatePath);
  const itemPath = useSelector((state)=> state.items.itemPath);

  return (
    <Router>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/addressinfo' element={<PopFly></PopFly>}/>
        <Route path='/profile' element={<Profile></Profile>}/>
        <Route path='/cart' element={<Cart></Cart>}/>
        <Route path='/help' element={<Help></Help>}/>
        <Route path={`/search`} element={<Searchdata></Searchdata>}/>
        <Route path='/address' element={<AddressField></AddressField>}/>
        <Route path='/payment' element={<Payment></Payment>}/>
        <Route path={`/${itemPath || Path}`} element={<FullitemInfo></FullitemInfo>}/>
        <Route path={`/${searchpath || navigate}`} element={<Searchdata></Searchdata>}/>
        <Route path='*' element={<Home></Home>}/>
      </Routes>
    </Router>
  );
}

export default App;
