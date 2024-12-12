import React from "react";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import Populardestination from "../components/Populardestination";
import Search from "../components/Search";
import Trending from "../components/Trending";
import Faq from "../components/Faq";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <Banner />
      <div className="pt-16">
        <Search />
      </div>
      <Hero />
      <Populardestination />
      <Trending />
      <Testimonial />
      <Faq />
      <Footer />
    </>
  );
};

export default Homepage;
