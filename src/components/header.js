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
    <header style={{ width: "100%", height: "90px" }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          zIndex: 50,
          width: "100%",
          height: "90px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #bbf7d0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "3%",
          paddingRight: "3%",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={() => navigate("/")}
          onMouseEnter={() => setHoverScale("logo")}
          onMouseLeave={() => setHoverScale(null)}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: "60px",
              transition: "transform 0.2s",
              transform: hoverScale === "logo" ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div>
            <p style={{ fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: 800, color: "#22c55e", margin: 0 }}>
              SAVE<span style={{ color: "#fb923c" }}>BITE</span>
            </p>
            <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>Smart AI Food Search</p>
          </div>
        </div>

        {search && (
          <div style={{ position: "relative", width: "45%" }}>
            <form onSubmit={searchHandler}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img src={Aicon} alt="ai" style={{ width: "40px", height: "40px", marginLeft: "8px", borderRadius: "9999px" }} />
                <input
                  value={query}
                  onChange={changeHandler}
                  placeholder="Ask AI: high protein, fever dinner..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "1.125rem",
                    outline: "none",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{ ...btnStyle, margin: "0 8px", transform: hoverScale === "search" ? "scale(1.05)" : "scale(1)" }}
                  onMouseEnter={() => setHoverScale("search")}
                  onMouseLeave={() => setHoverScale(null)}
                >
                  🔍
                </button>
              </div>
            </form>

            {suggestions.size > 0 && (
              <div
                style={{
                  position: "absolute",
                  marginTop: "12px",
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                {Array.from(suggestions).map((i, idx) => (
                  <div
                    key={idx}
                    onClick={() => suggestionHandler(i)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdf4")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    style={{
                      padding: "16px 20px",
                      cursor: "pointer",
                      display: "flex",
                      gap: "12px",
                      transition: "background-color 0.2s",
                    }}
                  >
                    🤖 <span>{i}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {!isRegistered && (
            <button
              onClick={() => navigate("/login")}
              style={{ ...btnStyle, transform: hoverScale === "login" ? "scale(1.05)" : "scale(1)" }}
              onMouseEnter={() => setHoverScale("login")}
              onMouseLeave={() => setHoverScale(null)}
            >
              Login
            </button>
          )}

          {isRegistered && (
            <div
              onClick={() => navigate("/profile")}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdf4")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "0.75rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <img alt="icon" src={proficon} style={{ width: "24px" }} />
              <span style={{ fontWeight: 500 }}>{userInfo?.userInfo?.name || "Guest"}</span>
            </div>
          )}

          {isRegistered && (
            <div
              onClick={() => navigate("/cart")}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdf4")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              style={{ padding: "8px", borderRadius: "9999px", cursor: "pointer", transition: "background-color 0.2s" }}
            >
              <img alt="icon" src={bagicon} style={{ width: "28px" }} />
            </div>
          )}

          <div
            onClick={() => navigate("/help")}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdf4")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            style={{ padding: "8px", borderRadius: "9999px", cursor: "pointer", transition: "background-color 0.2s" }}
          >
            <img alt="icon" src={helpicon} style={{ width: "28px" }} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;