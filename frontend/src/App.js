import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import FeedbackButton from "./components/Feedback/FeedbackButton";

const App = (props) => {
  return (
    <>
      <Navbar/>
      <Routes dataset={props}/>
      <FeedbackButton />
      <Footer />
    </>
  );
};

export default App;
