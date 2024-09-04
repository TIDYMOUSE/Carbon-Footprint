import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname;
  const [user,setUser]=useState(null)
  const [showSearch, setshowSearch] = useState(false);
  const [inputHover, setinputHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
  const [top, setTop] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else{
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setTop(0); // Show navbar
      } else {
        setTop(-50); // Hide navbar
      }
      setPrevScrollpos(currentScrollPos);

      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);
  return (
    <nav className="w-full relative ">
      <div className="items-center px-6 h-16 bg-gradient-to-r from-secondary from-[25%] via-secondary/90  to-secondary to-[75%]   text-accent py-2 font-action tracking-wide  flex justify-between">
        <span className="text-4xl font-semibold">TEAM AI-HTML</span>
        <div className="flex items-center">
          {/* <div
            className={`flex px-3 text-white text-base py-1 gap-2 ${
              showSearch ? "border-white border-2 rounded-2xl" : ""
            }`}
          >
            <button
              onFocus={() => {
                setshowSearch(true);
              }}
              onBlur={() => {
                if (!inputHover) {
                  setshowSearch(false);
                }
              }}
            >
              <FaSearch className="text-[1.3rem]" />
            </button>
            <input
              className={`bg-secondary focus:outline-none ${
                showSearch ? "block" : "hidden"
              } `}
              type="text"
              name=""
              id=""
              placeholder="search"
              onMouseEnter={() => {
                setinputHover(true);
              }}
              onMouseLeave={() => {
                setinputHover(false);
              }}
              onBlur={() => {
                setinputHover(false);
                setshowSearch(false);
              }}
            />
          </div> */}
          {!user && 
          <button className="border-accent border-2 rounded-md px-2 py-1 text-xl text-white" onClick={()=>{navigate("/login")}}>
            Login
          </button>
          }
          {user && <div className="relative" ref={dropdownRef}>
            <button
              className="text-white focus:outline-none"
              onClick={toggleDropdown}
            >
              <FaBars className="text-2xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 overflow-hidden">
                <div
                  onClick={() => {
                    signOut(firebaseAuth);
                  }}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-black/20 "
                    onClick={closeDropdown}
                  >
                    Logout
                  </a>
                </div>
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-black/20 "
                  onClick={closeDropdown}
                >
                  Dashboard
                </NavLink>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-black/20 "
                  onClick={closeDropdown}
                >
                  List Item 3
                </a>
              </div>
            )}
          </div>}
        </div>
      </div>
      <div
        className={`w-[100%] z-50 transition-all ease-in-out  bg-secondary flex justify-center p-2 gap-3 text-background ${
          isScrolled ? `fixed` : ""
        }`}
        style={{ top: `${top}px` }}
      >
        <NavLink
          to="/"
          className={`px-2 py-1 ${
            activeLink === "/" ? "text-accent" : ""
          } hover:font-semibold cursor-pointer`}
        >
          Home
        </NavLink>
        <NavLink className={`px-2 py-1 hover:font-semibold cursor-pointer`}>
          About Us
        </NavLink>
        <NavLink
          to="carbon-emission"
          className={`px-2 py-1 ${
            activeLink === "/carbon-emission" ? "text-accent" : ""
          } hover:font-semibold cursor-pointer `}
        >
          Carbon Emission
        </NavLink>
        <NavLink
          to="carbon-credit"
          className={`px-2 py-1 ${
            activeLink === "/carbon-credit" ? "text-accent" : ""
          } hover:font-semibold cursor-pointer `}
        >
          Carbon Credit
        </NavLink>
        <NavLink
          to="chat-bot"
          className={`px-2 py-1 ${
            activeLink === "/chat-bot" ? "text-accent" : ""
          } hover:font-semibold cursor-pointer `}
        >
          Coal Chatterman
        </NavLink>
      </div>
      {/* <div className="bg-accent px-2">News</div> */}
    </nav>
  );
}

export default Navbar;
