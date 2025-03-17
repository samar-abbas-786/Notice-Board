import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import Shownotices from "../components/shownotices";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Shownotices />
    </div>
  );
};

export default Home;
