import React, {  useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap, Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import './AllComponent.css'
import currentLocationicon from '../images/current-location.svg'
import { createAddress } from "../Slices/Addressinfo.js";
import { useDispatch } from "react-redux";

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});




const MapComponent = ({responsiveness}) => {
  const cood = localStorage.getItem("coods")?.split(',');
  const coods = cood;
  const [position, setPosition] = useState(coods?.splice(0,2) || [30.70996281562157,76.76782608032228]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(cood ? coods?.splice(0)?.join(','):null);
  const [zoom, setZoom] = useState(cood ? 16 : 12);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  function getCoods(e){
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
        getAddress(location.coords.latitude, location.coords.longitude);
        setZoom(16);
      },
      () =>{
        console.log("Could not fetch location, using default.");
      }
    );
  }


  async function getAddress(lat, lon) {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: lat,
          lon: lon,
          format: "json", 
        },
      });
      setCurrentLocation(response.data.display_name);
    } catch (error) { 
      console.error("Location Error:", error);
    }
  }


  const fetchSearchSuggestions = async (query) => {
    if (query.length <= 3) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: "json",
          limit: 7,
          countrycodes:'IN',
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSearchSuggestions(value);
  };

  const handleSelectLocation = (place) => {
    const { lat, lon, display_name } = place;
    const newPosition = [parseFloat(lat), parseFloat(lon)];
    setCurrentLocation(display_name);
    setPosition(newPosition);
    setSearchQuery(display_name); 
    setSearchResults([]);
  };

  function continueHandle(e){
    navigate('/');
   localStorage.setItem('coods',[position,currentLocation]);
  }


  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        getAddress(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }
  const SetMapView = ({ position, zoom }) => {
  const map = useMap();
      map.setView(position, zoom);
    return null;
  };
  function ZoomHandler() {
    useMapEvents({
      zoomend: (e) => {
        setZoom(Math.floor(e.target.getZoom()));
      },
    });
    return null;
  }

  function submitHandle(e){
    e.preventDefault();
    const userid = localStorage.getItem('idtity');
    dispatch(createAddress({data,position,currentLocation,userid}))
    console.log(data,position,currentLocation)
    navigate('/payment');
  }
 


  const additionalData = {
    houseNo:'',
    landmark:'',
    mobileNo:'',
  }
  const [data, setData] = useState(additionalData);
  function changeHandle(e){
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value})
  }
  return (
    <>{responsiveness&&
      <div className=" border w-[40%] h-auto simindexdiv m-4 rounded-lg">
        <input className="w-[100%] h-[40px] px-4 focus:outline-none rounded-lg"  type="text" placeholder="Search for a location..." value={searchQuery} onChange={handleSearchChange}
          onKeyDown={(e)=>e.key === 'Enter' && handleSelectLocation(searchResults[0])} />
        {searchResults.length > 0 && (
          <ul className="w-full bg-white" >
            {searchResults.map((place, index) => (
              <li key={index} onClick={() => handleSelectLocation(place)}
                className="p-4 cursor-pointer border py-2">
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>}
      <div className="w-full flex  justify-center gap-4">
          <div className={`relative w-[${!responsiveness?'40%':'30%'}] border bg-white  shadow-xl  border-gray-400 rounded-2xl overflow-hidden`}>
            {!responsiveness&&<h1 className="h-[10%] text-center p-2 text-[30px] border-b-2 ">Address Information</h1>}  
            {!responsiveness&&
            <div className="absolute top-[11%] left-[15%] simindexdiv w-[70%]">
              <input className="w-[100%] h-[40px] px-4 focus:outline-none rounded-lg "  type="text" placeholder="Search for a location..." value={searchQuery} onChange={handleSearchChange}
                onKeyDown={(e)=>e.key === 'Enter' && handleSelectLocation(searchResults[0])} />
              {searchResults.length > 0 && (
                <ul className="w-full bg-white" >
                  {searchResults.map((place, index) => (
                    <li key={index} onClick={() => handleSelectLocation(place)}
                      className="p-4 cursor-pointer border py-2">
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>}
            {!responsiveness && (currentLocation || cood)  && <div className="absolute w-[80%] p-4 h-auto left-[10%] bottom-4 bg-white simindexdiv flex flex-col justify-center items-center gap-4 rounded-xl">
                <h1 className="p-2 w-full h-[60px] overflow-hidden  ">{currentLocation}</h1>
                <button className="w-[60%] h-[40px] text-center text-white py-2 bg-green-600 hover:bg-green-800 rounded-lg" onClick={continueHandle}>Continue</button>
            </div>}
            <div className={`w-[50px] h-[50px] rounded-full absolute ${responsiveness ? 'bottom-3' : 'bottom-[170px]'} right-3  bg-white border simindexdiv` }><button><img width='50px' src={currentLocationicon} alt="getLocation" onClick={getCoods}/></button></div>
            <div className="w-full h-[60vh]">
              <MapContainer center={position} zoom={zoom} zoomSnap={0.5} minZoom={3} className="w-full h-full">
                <SetMapView position={position} zoom={zoom}/>
                <TileLayer
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                attribution="&copy; Google"
                maxZoom={20}/>

                <TileLayer
                url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
                attribution="&copy; Google"
                maxZoom={20} />

                <Marker position={position} icon={locationIcon}>
                  <Popup>Your Location</Popup>
                </Marker>      
                <LocationMarker/>
                <ZoomHandler />
              </MapContainer>
            </div>
          </div>
          {responsiveness &&
          <div className="w-[30%] border-l h-auto pl-2 ">
            <div className=" w-full h-auto  bg-white flex flex-col justify-center items-start gap-2 rounded-xl">
                <label className="p-2"><strong className="text-xl">Your Location Selected At Map</strong></label><h1 className=" w-full h-[55px] text-start overflow-hidden px-2 ">{currentLocation}</h1>
            </div>
            <form onSubmit={submitHandle} className="w-full  h-auto p-2 flex flex-col justify-center items-start">
              <div className="w-full my-2">
                <label>House/Building No. </label>
                <input required type="text" value={data.houseNo} name="houseNo" onChange={changeHandle} className="w-[100%] h-[40px] border focus:border-green-500 focus:outline-none p-2 rounded-md"></input>
              </div>
              <div className="w-full my-2">
                <label> Landmark </label>
                <input required type="text" value={data.landmark} name="landmark" onChange={changeHandle}  className="w-[100%] h-[40px] border focus:border-green-500 focus:outline-none p-2 rounded-md"></input>
              </div>
              <div className="w-full my-2">
                <label>Mobile Number </label>
                <input required type="number" value={data.mobileNo} name="mobileNo" onChange={changeHandle}  className="w-[100%] h-[40px] border focus:border-green-500 focus:outline-none p-2 rounded-md"></input>
              </div>
              <div className="w-full my-2">
                  <button type="submit" className='w-full h-[50px] mt-4 bg-green-500 active:bg-green-600 text-black rounded-lg text-[6px] md:text-[14px] text-center border'>Go at Payment</button>
              </div>
            </form>
          </div>}
      </div>
    </>
  );
};

export default MapComponent;
