import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full">
      <div className="bg-gradient-to-r from-secondary   to-secondary/80  text-4xl text-background py-2 px-3 font-action tracking-wide font-semibold">
        TEAM AI-HTML
      </div>
      <div className="bg-secondary flex justify-center p-2 gap-3 text-background ">
        <NavLink to="/" className=" hover:font-semibold cursor-pointer ">
          Home
        </NavLink>
        <div className=" hover:font-semibold cursor-pointer ">About Us</div>
        <NavLink
          to="carbon-emission"
          className=" hover:font-semibold cursor-pointer "
        >
          Carbon Emission
        </NavLink>
        <div className=" hover:font-semibold cursor-pointer ">
          Carbon Credit
        </div>
        <NavLink to="chat-bot" className=" hover:font-semibold cursor-pointer ">
          Coal Chatterman
        </NavLink>
      </div>
      {/* <div className="bg-accent px-2">News</div> */}
    </nav>
  );
}

export default Navbar;
