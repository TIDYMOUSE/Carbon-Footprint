import React from "react";
import Data from "../components/Data";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <main className="bg-background w-full min-h-screen flex flex-col font-primary">
      <section className="relative h-screen">
        <div className="flex flex-col absolute top-8 left-8">
          <p className="font-action font-semibold text-5xl">Carbon Footprint</p>
          <p className=" text-xs pl-2">Calculate Your's now!</p>
        </div>

        <img alt="" src="/hero.jpg" className="w-full h-screen object-fill " />
      </section>
      <Data />
      <Footer />
    </main>
  );
}

export default HomePage;
