import React, { useState } from "react";
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

const MapComponent = ({ responsiveness }) => {
  const cood = localStorage.getItem("coods")?.split(',');
  const coods = cood;
  const [position, setPosition] = useState(coods?.splice(0, 2) || [30.70996281562157, 76.76782608032228]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(cood ? coods?.splice(0)?.join(',') : null);
  const [zoom, setZoom] = useState(cood ? 16 : 12);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States for interactive styles (hover/focus/active)
  const [hoveredResult, setHoveredResult] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isHoveredContinue, setIsHoveredContinue] = useState(false);
  const [isHoveredSubmit, setIsHoveredSubmit] = useState(false);
  const [isActiveSubmit, setIsActiveSubmit] = useState(false);

  const additionalData = { houseNo: '', landmark: '', mobileNo: '' };
  const [data, setData] = useState(additionalData);

  function getCoods(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
        getAddress(location.coords.latitude, location.coords.longitude);
        setZoom(16);
      },
      () => { console.log("Could not fetch location, using default."); }
    );
  }

  async function getAddress(lat, lon) {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: { lat: lat, lon: lon, format: "json" },
      });
      setCurrentLocation(response.data.display_name);
    } catch (error) { console.error("Location Error:", error); }
  }

  const fetchSearchSuggestions = async (query) => {
    if (query.length <= 3) { setSearchResults([]); return; }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: query, format: "json", limit: 7, countrycodes: 'IN' },
      });
      setSearchResults(response.data);
    } catch (error) { console.error("Search Error:", error); }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSearchSuggestions(value);
  };

  const handleSelectLocation = (place) => {
    if (!place) return;
    const { lat, lon, display_name } = place;
    const newPosition = [parseFloat(lat), parseFloat(lon)];
    setCurrentLocation(display_name);
    setPosition(newPosition);
    setSearchQuery(display_name);
    setSearchResults([]);
  };

  function continueHandle(e) {
    navigate('/');
    localStorage.setItem('coods', [position, currentLocation]);
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
      zoomend: (e) => { setZoom(Math.floor(e.target.getZoom())); },
    });
    return null;
  }

  function submitHandle(e) {
    e.preventDefault();
    const userid = localStorage.getItem('idtity');
    dispatch(createAddress({ data, position, currentLocation, userid }))
    navigate('/payment');
  }

  function changeHandle(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // Common Styles
  const inputBaseStyle = {
    width: '100%',
    height: '40px',
    padding: '0 16px',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  return (
    <>
      {responsiveness && (
        <div className="simindexdiv" style={{ border: '1px solid #e5e7eb', width: '50%', height: 'auto', margin: '8px', borderRadius: '0.5rem' }}>
          <input
            style={{ ...inputBaseStyle, border: 'none' }}
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSelectLocation(searchResults[0])}
          />
          {searchResults.length > 0 && (
            <ul style={{ width: '100%', backgroundColor: 'white', listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #e5e7eb' }}>
              {searchResults.map((place, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectLocation(place)}
                  onMouseEnter={() => setHoveredResult(index)}
                  onMouseLeave={() => setHoveredResult(null)}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: hoveredResult === index ? '#f9fafb' : 'white'
                  }}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <div style={{
          position: 'relative',
          width: !responsiveness ? '50%' : '40%',
          backgroundColor: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #9ca3af',
          borderRadius: '1rem',
          overflow: 'hidden'
        }}>
          {!responsiveness && (
            <h1 style={{ height: '10%', textAlign: 'center', padding: '8px', fontSize: '30px', borderBottom: '2px solid #e5e7eb', margin: 0 }}>
              Address Information
            </h1>
          )}

          {!responsiveness && (
            <div className="simindexdiv" style={{ position: 'absolute', top: '11%', left: '15%', width: '70%', zIndex: 1000 }}>
              <input
                style={inputBaseStyle}
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectLocation(searchResults[0])}
              />
              {searchResults.length > 0 && (
                <ul style={{ width: '100%', backgroundColor: 'white', listStyle: 'none', padding: 0, margin: 0, border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                  {searchResults.map((place, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectLocation(place)}
                      onMouseEnter={() => setHoveredResult(index)}
                      onMouseLeave={() => setHoveredResult(null)}
                      style={{ padding: '8px 16px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb', backgroundColor: hoveredResult === index ? '#f9fafb' : 'white' }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!responsiveness && (currentLocation || cood) && (
            <div className="simindexdiv" style={{
              position: 'absolute',
              width: '80%',
              padding: '16px',
              height: 'auto',
              left: '10%',
              bottom: '16px',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              borderRadius: '0.75rem',
              zIndex: 1000
            }}>
              <h1 style={{ padding: '8px', width: '100%', height: '60px', overflow: 'hidden', margin: 0, fontSize: '14px' }}>{currentLocation}</h1>
              <button
                onMouseEnter={() => setIsHoveredContinue(true)}
                onMouseLeave={() => setIsHoveredContinue(false)}
                style={{
                  width: '60%',
                  height: '40px',
                  textAlign: 'center',
                  color: 'white',
                  padding: '8px 0',
                  backgroundColor: isHoveredContinue ? '#166534' : '#16a34a',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onClick={continueHandle}
              >
                Continue
              </button>
            </div>
          )}

          <div className="simindexdiv" style={{
            width: '50px',
            height: '50px',
            borderRadius: '9999px',
            position: 'absolute',
            bottom: responsiveness ? '12px' : '170px',
            right: '12px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <img width='50px' src={currentLocationicon} alt="getLocation" onClick={getCoods} />
            </button>
          </div>

          <div style={{ width: '100%', height: '60vh', border: '1px solid #e5e7eb' }}>
            <MapContainer center={position} zoom={zoom} zoomSnap={0.5} minZoom={3} style={{ width: '100%', height: '100%' }}>
              <SetMapView position={position} zoom={zoom} />
              <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" attribution="&copy; Google" maxZoom={20} />
              <TileLayer url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}" attribution="&copy; Google" maxZoom={20} />
              <Marker position={position} icon={locationIcon}><Popup>Your Location</Popup></Marker>
              <LocationMarker />
              <ZoomHandler />
            </MapContainer>
          </div>
        </div>

        {responsiveness && (
          <div style={{ width: '30%', borderLeft: '1px solid #e5e7eb', height: 'auto', paddingLeft: '8px' }}>
            <div style={{ width: '100%', height: 'auto', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '8px', borderRadius: '0.75rem' }}>
              <label style={{ padding: '8px' }}><strong style={{ fontSize: '1.25rem' }}>Your Location Selected At Map</strong></label>
              <h1 style={{ width: '100%', height: '55px', textAlign: 'start', overflow: 'hidden', padding: '0 8px', margin: 0, fontSize: '14px' }}>{currentLocation}</h1>
            </div>
            <form onSubmit={submitHandle} style={{ width: '100%', height: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
              {['houseNo', 'landmark', 'mobileNo'].map((field) => (
                <div key={field} style={{ width: '100%', margin: '8px 0' }}>
                  <label style={{ textTransform: 'capitalize' }}>
                    {field === 'houseNo' ? 'House/Building No.' : field === 'mobileNo' ? 'Mobile Number' : 'Landmark'}
                  </label>
                  <input
                    required
                    type={field === 'mobileNo' ? "number" : "text"}
                    value={data[field]}
                    name={field}
                    onChange={changeHandle}
                    onFocus={() => setFocusedInput(field)}
                    onBlur={() => setFocusedInput(null)}
                    style={{
                      ...inputBaseStyle,
                      border: focusedInput === field ? '1px solid #22c55e' : '1px solid #e5e7eb',
                      padding: '8px'
                    }}
                  />
                </div>
              ))}
              <div style={{ width: '100%', margin: '8px 0' }}>
                <button
                  type="submit"
                  onMouseEnter={() => setIsHoveredSubmit(true)}
                  onMouseLeave={() => setIsHoveredSubmit(false)}
                  onMouseDown={() => setIsActiveSubmit(true)}
                  onMouseUp={() => setIsActiveSubmit(false)}
                  style={{
                    width: '100%',
                    height: '50px',
                    marginTop: '16px',
                    backgroundColor: isActiveSubmit ? '#16a34a' : (isHoveredSubmit ? '#16a34a' : '#22c55e'),
                    color: 'black',
                    borderRadius: '0.5rem',
                    fontSize: '14px',
                    textAlign: 'center',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.1s'
                  }}
                >
                  Go at Payment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default MapComponent;