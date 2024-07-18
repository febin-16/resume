import React from "react";
import "../../styles/hero.css";

function DottedLine({opacity}) {
  const width = 300;
  const dotSize = 2; 
  const dotSpacing = 0; 
  const numDots = Math.floor(width / (dotSize + dotSpacing)); 
  
  const dots = Array.from({ length: numDots }, (_, index) => (
    <span key={index} className={`dot ${index % 2 === 0 ? '' : 'white'}`}></span>
  ));

  return (
    <div className={`dotted-line ${opacity}`}>
      {dots}
    </div>
  );
}

export default DottedLine;
