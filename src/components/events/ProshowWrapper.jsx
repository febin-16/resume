import React from "react";
import "../../styles/hero.css";

function ProshowWrapper({ opacity, width, index }) {
  const dotSize = 2;
  const dotSpacing = 0;
  const numDots = Math.floor(width / (dotSize + dotSpacing));

  const dots = Array.from({ length: numDots }, (_, index) => (
    <span
      key={index}
      className={`dot ${index % 2 === 0 ? "" : "white"}`}
    ></span>
  ));

  if (index == 1) {
    return <div className={`dotted-line ${opacity}`}>{dots}</div>;
  } else {
    return <div className={`dotted-line ${opacity} flex flex-col`}>{dots}</div>;
  }
}

export default ProshowWrapper;
