import React, { Component } from "react";
import Algorithm from "./Algorithm";

const AllAlgorithms = (props) => {
  return (
    <section className="p-5">
      <div className="container">
        <div className="row">
          {props.displayedAlgorithms.map((algorithm) => {
            return <Algorithm key={algorithm.id} algorithm={algorithm} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default AllAlgorithms;
