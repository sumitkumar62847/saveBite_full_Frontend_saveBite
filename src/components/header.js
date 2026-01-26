import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../mainlogo.svg";
import bagicon from "../images/shopping-bag.png";
import helpicon from "../images/help.png";
import proficon from "../images/profile-user.png";
import Aicon from "../images/AiIcon.gif";
import "./AllComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getitems } from "../Slices/items.js";
import { mainLogin, getUser } from "../Slices/Register.js";

function Header({ search }) {
  const isRegistered = useSelector((state) => state.mainSB.isRegistered);
  const userInfo = useSelector((state) => state.mainSB.userinfo);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(new Set());
  const [hoverScale, setHoverScale] = useState(null); // Track hover for animations

  const socketRef = useRef(null);
  const typingTimeRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const jwttoken = localStorage.getItem("jwt_token");
  const coods = localStorage.getItem("coods");
  const Api = process.env.REACT_APP_API_URL;
  // const Api = 'http://localhost:8088';

  useEffect(() => {
    if (jwttoken && !isRegistered) dispatch(mainLogin(jwttoken));
  }, [jwttoken, isRegistered, dispatch]);

  useEffect(() => {
    if (coods) dispatch(getitems());
    else navigate("/addressinfo");
  }, [coods, dispatch, navigate]);

  useEffect(() => {
    if (jwttoken && isRegistered) dispatch(getUser());
  }, [jwttoken, isRegistered, dispatch]);

  function changeHandler(e) {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(new Set());

    if (!value) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io(Api);
      socketRef.current.on("suggestions", (data) => {
        const set = new Set();
        data?.items?.forEach((i) => set.add(i.item_name));
        data?.restaurants?.forEach((r) => set.add(r.Restaurant_name));
        setSuggestions(set);
      });
    }

    socketRef.current.emit("search", value);

    clearTimeout(typingTimeRef.current);
    typingTimeRef.current = setTimeout(() => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    }, 2000);
  }

  function searchHandler(e) {
    e.preventDefault();
    const first = Array.from(suggestions)[0];
    if (first || query.length > 2) {
      localStorage.setItem("querySearch", query);
      localStorage.setItem("querySuggest", first);
      setQuery("");
      setSuggestions(new Set());
      location.pathname === "/search" ? navigate(0) : navigate("/search");
    }
  }

  function suggestionHandler(i) {
    localStorage.setItem("querySuggest", i);
    setQuery("");
    setSuggestions(new Set());
    navigate("/search");
  }

  const btnStyle = {
    padding: "8px 24px",
    borderRadius: "12px",
    backgroundImage: "linear-gradient(to right, #4ade80, #16a34a)",
    color: "white",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  };

  return (
    <header className={`${search ? "header" : "header1"}`}>
      <nav className="navbar">
        <div
          className="logo-box"
          onClick={() => navigate("/")}
          onMouseEnter={() => setHoverScale("logo")}
          onMouseLeave={() => setHoverScale(null)}
        >
          <img
            src={logo}
            alt="logo"
            className="logo-img"
            style={{
              transform:
                hoverScale === "logo" ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div>
            <p className="logo-text">
              SAVE<span>BITE</span>
            </p>
            <p className="logo-subtext">Smart AI Food Search</p>
          </div>
        </div>
        {search && (
          <div className="search-wrapper mobile-search">
            <form onSubmit={searchHandler}>
              <div className="search-box">
                <img src={Aicon} alt="ai" className="ai-icon" />
                <input
                  value={query}
                  onChange={changeHandler}
                  placeholder="Ask AI: high protein, fever dinner..."
                  className="search-input"
                />
                <button
                  type="submit"
                  className="search-btn"
                  style={{
                    ...btnStyle,
                    transform:
                      hoverScale === "search"
                        ? "scale(1.05)"
                        : "scale(1)",
                  }}
                  onMouseEnter={() => setHoverScale("search")}
                  onMouseLeave={() => setHoverScale(null)}
                >
                  🔍
                </button>
              </div>
            </form>

            {suggestions.size > 0 && (
              <div className="suggestions">
                {Array.from(suggestions).map((i, idx) => (
                  <div
                    key={idx}
                    onClick={() => suggestionHandler(i)}
                    className="suggestion-item"
                  >
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="nav-actions">
          {!isRegistered && (
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
              style={{
                transform:
                  hoverScale === "login"
                    ? "scale(1.05)"
                    : "scale(1)",
              }}
              onMouseEnter={() => setHoverScale("login")}
              onMouseLeave={() => setHoverScale(null)}
            >
              Login
            </button>
          )}

          {isRegistered && (
            <div
              className="profile-box"
              onClick={() => navigate("/profile")}
            >
              <img src={proficon} alt="icon" />
              <span>
                {userInfo?.userInfo?.name || "Guest"}
              </span>
            </div>
          )}

          {isRegistered && (
            <div
              className="icon-btn"
              onClick={() => navigate("/cart")}
            >
              <img src={bagicon} alt="icon" />
            </div>
          )}

          <div
            className="icon-btn"
            onClick={() => navigate("/help")}
          >
            <img src={helpicon} alt="icon" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;