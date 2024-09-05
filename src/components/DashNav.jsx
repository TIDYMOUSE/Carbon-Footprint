import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

function DashNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname;
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
      if (!currentUser) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    console.log(activeLink);
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setTop(0); // Show navbar
      } else {
        setTop(-50); // Hide navbar
      }
      setPrevScrollpos(currentScrollPos);

      if (window.scrollY > 50) {
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
      <div
        className={`z-50 w-full transition-all ease-in-out ${
          isScrolled ? `fixed` : ""
        }`}
        style={{ top: `${top}px` }}
      >
        <div
          className={`   bg-secondary flex justify-center p-2 gap-3 text-background `}
        >
          <NavLink
            to=""
            className={`px-2 py-1 ${
              activeLink === "/dashboard" ? "text-accent" : ""
            } hover:font-semibold cursor-pointer`}
          >
            Home
          </NavLink>
          <NavLink
            to="carbon-emission"
            className={`px-2 py-1 ${
              activeLink === "/dashboard/carbon-emission" ? "text-accent" : ""
            } hover:font-semibold cursor-pointer `}
          >
            Carbon Emission
          </NavLink>
          <NavLink             
          to="carbon-credit"
            className={`px-2 py-1 ${
              activeLink === "/dashboard/carbon-credit" ? "text-accent" : ""
            } hover:font-semibold cursor-pointer `}>
            Carbon Credit
          </NavLink>
          <NavLink
            to="chat-bot"
            className={`px-2 py-1 ${
              activeLink === "/dashboard/chat-bot" ? "text-accent" : ""
            } hover:font-semibold cursor-pointer `}
          >
            Coal Chatterman
          </NavLink>
          <NavLink
            to="mine-map"
            className={`px-2 py-1 ${
              activeLink === "/dashboard/mine-map" ? "text-accent" : ""
            } hover:font-semibold cursor-pointer `}
          >
            Mine Map
          </NavLink>
        </div>
        <div className="absolute right-3 top-3">
          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              className="text-white focus:outline-none"
              onClick={toggleDropdown}
            >
              <FaRegCircleUser className="text-2xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-8 right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 overflow-hidden">
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
                  className="block px-4 py-2 hover:bg-black/20  "
                  onClick={closeDropdown}
                >
                  Dashboard
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashNav;
