import React, { Component } from "react";
import "../../style.css";

const Algorithm = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <img className="card-img-top" src={`http://localhost:8000${props.algorithm.image}`} />
          <h4 className="card-title">{props.algorithm.title}</h4>
          <p className="card-text">{props.algorithm.description}</p>
          <a href={`algorithms/${props.algorithm.title}`}>
            <button className="btn btn-outline-primary">
              {props.algorithm.title}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Algorithm;
