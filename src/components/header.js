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
//   const [isopen, setIsopen] = useState(false);

  const socketRef = useRef(null);
  const typingTimeRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const jwttoken = localStorage.getItem("jwt_token");
  const coods = localStorage.getItem("coods");

  const Api = "https://savebite-full-version-server.onrender.com";

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
        data?.restaurants?.forEach((r) =>
          set.add(r.Restaurant_name)
        );
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

      location.pathname === "/search"
        ? navigate(0)
        : navigate("/search");
    }
  }

  function suggestionHandler(i) {
    localStorage.setItem("querySuggest", i);
    setQuery("");
    setSuggestions(new Set());
    navigate("/search");
  }

  function cardHandle() {
    navigate("/cart");
  }

  return (
    <header className="w-full h-[90px]">
      <nav
        className="
        fixed top-0 z-50 w-full h-[90px]
        bg-white/80 backdrop-blur-xl
        shadow-lg border-b border-green-200
        flex items-center justify-between px-[3%]
      "
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[60px] hover:scale-105 transition"
          />
          <div>
            <p className="text-3xl font-extrabold text-green-500">
              SAVE<span className="text-orange-400">BITE</span>
            </p>
            <p className="text-xs text-gray-500">
              Smart AI Food Search
            </p>
          </div>
        </div>

        {search && (
          <div className="relative w-[45%] hidden md:block">
            <form onSubmit={searchHandler}>
              <div
                className="
                flex items-center bg-white
                rounded-2xl border shadow-md
                focus-within:ring-2 ring-green-400
              "
              >
                <img
                  src={Aicon}
                  alt="ai"
                  className="w-10 h-10 ml-2 rounded-full"
                />
                <input
                  value={query}
                  onChange={changeHandler}
                  placeholder="Ask AI: high protein, fever dinner..."
                  className="w-full px-4 py-3 text-lg outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="
                  mx-2 px-4 py-2 rounded-xl
                  bg-gradient-to-r from-green-400 to-green-600
                  text-white font-semibold hover:scale-105 transition
                "
                >
                  🔍
                </button>
              </div>
            </form>

            {suggestions.size > 0 && (
              <div className="absolute mt-3 w-full bg-white rounded-xl shadow-xl overflow-hidden">
                {Array.from(suggestions).map((i, idx) => (
                  <div
                    key={idx}
                    onClick={() => suggestionHandler(i)}
                    className="px-5 py-4 hover:bg-green-50 cursor-pointer flex gap-3"
                  >
                    🤖 <span>{i}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isRegistered && (
            <button
              onClick={() => navigate("/login")}
              className="
              px-6 py-2 rounded-xl
              bg-gradient-to-r from-green-400 to-green-600
              text-white font-semibold shadow-md
              hover:scale-105 transition
            "
            >
              Login
            </button>
          )}

          {isRegistered && (
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-green-50 cursor-pointer"
            >
              <img alt="icon" src={proficon} className="w-6" />
              <span className="font-medium">
                {userInfo?.userInfo?.name || "Guest"}
              </span>
            </div>
          )}

          {isRegistered && (
            <div
              onClick={cardHandle}
              className="p-2 rounded-full hover:bg-green-50 cursor-pointer"
            >
              <img alt="icon" src={bagicon} className="w-7" />
            </div>
          )}

          <div
            onClick={() => navigate("/help")}
            className="p-2 rounded-full hover:bg-green-50 cursor-pointer"
          >
            <img alt="icon" src={helpicon} className="w-7" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
