import React, { Component } from "react";
import Algorithm from "./Algorithm";

const AllAlgorithms = (props) => {
  return (
    <section className="p-5">
      {props.displayedAlgorithms.map((algorithm) => {
        return <Algorithm key={algorithm.id} algorithm={algorithm} />;
      })}
    </section>
  );
}
 
export default AllAlgorithms;

