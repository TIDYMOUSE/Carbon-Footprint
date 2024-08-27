import React from "react";

function Navbar() {
  return (
    <nav className="w-full">
      <div className="bg-gradient-to-r from-secondary   to-secondary/80  text-4xl text-background py-2 px-3 font-heading font-semibold">
        TEAM AI-HTML
      </div>
      <div className="bg-secondary flex justify-center p-2 space-x-3 text-background ">
        <div className=" hover:underline cursor-pointer ">Home</div>
        <div className=" hover:underline cursor-pointer ">About Us</div>
        <div className=" hover:underline cursor-pointer ">Carbon Emission</div>
        <div className=" hover:underline cursor-pointer ">Carbon Credit</div>
      </div>
      {/* <div className="bg-accent px-2">News</div> */}
    </nav>
  );
}

export default Navbar;
