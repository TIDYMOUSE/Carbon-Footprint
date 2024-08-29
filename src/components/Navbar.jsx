import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const activeLink= location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
  const [top, setTop] = useState(0);
  useEffect(()=>{
    console.log(activeLink);
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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[prevScrollpos])
  return (
    <nav className="w-full relative" >
      <div className="bg-gradient-to-b from-secondary/25 via-secondary/50 to-secondary  text-4xl text-secondary py-2 px-3 font-action tracking-wide font-semibold">
        TEAM AI-HTML
      </div>
      <div className= {`w-[100%] z-50 transition-all ease-in-out  bg-secondary flex justify-center p-2 gap-3 text-background ${isScrolled ? `fixed`:''}`} style={{top: `${top}px`}}>
        <NavLink to="/" className=  {`px-2 py-1 ${activeLink === '/' ? 'text-accent' :''} hover:font-semibold cursor-pointer`} >
          Home
        </NavLink>
        <div className= {`px-2 py-1 hover:font-semibold cursor-pointer`} >About Us</div>
        <NavLink
          to="carbon-emission"
          className={`px-2 py-1 ${activeLink === '/carbon-emission' ? 'text-accent':''} hover:font-semibold cursor-pointer `}
        >
          Carbon Emission
        </NavLink>
        <div className="px-2 py-1 hover:font-semibold cursor-pointer ">
          Carbon Credit
        </div>
        <NavLink to="chat-bot" className="px-2 py-1 hover:font-semibold cursor-pointer ">
          Coal Chatterman
        </NavLink>
      </div>
      {/* <div className="bg-accent px-2">News</div> */}
    </nav>
  );
}

export default Navbar;
