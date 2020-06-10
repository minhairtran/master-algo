import React, { Component } from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://localhost:3000/">
          <h5>MasterAlgo</h5>
        </a>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarToggle"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggle">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="http://localhost:3000/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            {localStorage.getItem("username") ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/profile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/logout">
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://localhost:3000/login-and-register"
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
