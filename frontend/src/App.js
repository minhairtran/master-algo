import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";
import FeedbackButton from "./components/Feedback/FeedbackButton";

const App = (props) => {
  const [loginedUser, setLoginedUser] = useState();

  return (
    <>
      <Navbar />
      <Routes user={loginedUser} setLoginedUser={setLoginedUser} />
      <FeedbackButton />
      <Footer />
    </>
  );
};

export default App;
