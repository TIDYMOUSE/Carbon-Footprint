import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {FaSearch} from 'react-icons/fa'

function Navbar() {
  const location = useLocation();
  const activeLink= location.pathname;
  const [showSearch,setshowSearch] = useState(false)
  const [inputHover,setinputHover] = useState(false)
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
    <nav className="w-full relative " >
      <div className="items-center px-6 h-16 bg-gradient-to-r from-secondary from-[25%] via-secondary/70  to-secondary to-[75%]  text-4xl text-accent py-2 font-action tracking-wide font-semibold flex justify-between">
        TEAM AI-HTML
        <div className={`flex px-2 text-white text-base py-1 gap-2 ${showSearch?"border-white border-2 rounded" :""}`}>
                    <button onFocus={()=>{
                        setshowSearch(true)
                    }}
                    onBlur={()=>{
                        if(!inputHover){
                            setshowSearch(false)
                        }}
                    }>
                        <FaSearch className='text-[1.5rem]' />
                    </button>
                    <input className={`bg-secondary focus:outline-none ${showSearch ?'block':'hidden'}`} type="text" name="" id="" placeholder='search' 
                    onMouseEnter={()=>{setinputHover(true)}}
                    onMouseLeave={()=>{setinputHover(false)}}
                    onBlur={()=>{setinputHover(false)
                        setshowSearch(false)
                    }}/>
                </div>
      </div>
      <div className= {`w-[100%] z-50 transition-all ease-in-out  bg-secondary flex justify-center p-2 gap-3 text-background ${isScrolled ? `fixed`:''}`} style={{top: `${top}px`}}>
        <NavLink to="/" className=  {`px-2 py-1 ${activeLink === '/' ? 'text-accent' :''} hover:font-semibold cursor-pointer`} >
          Home
        </NavLink>
        <NavLink className= {`px-2 py-1 hover:font-semibold cursor-pointer`} >About Us</NavLink>
        <NavLink
          to="carbon-emission"
          className={`px-2 py-1 ${activeLink === '/carbon-emission' ? 'text-accent':''} hover:font-semibold cursor-pointer `}
        >
          Carbon Emission
        </NavLink>
        <NavLink className="px-2 py-1 hover:font-semibold cursor-pointer ">
          Carbon Credit
        </NavLink>
        <NavLink to="chat-bot" className={`px-2 py-1 ${activeLink === '/chat-bot' ? 'text-accent':''} hover:font-semibold cursor-pointer `}>
          Coal Chatterman
        </NavLink>
      </div>
      {/* <div className="bg-accent px-2">News</div> */}
    </nav>
  );
}

export default Navbar;
