import React, { useEffect, useState } from "react";
import "../../styles/hero.css";

function HomeMarque() {
  const data = ["HESTIA'24", "Pixel", "MAY", "03-05", "Peak",]
  const width = 300;
  const dotSize = 10;
  const dotSpacing = 5;
  const numItems = Math.ceil(width / (dotSize + dotSpacing)); // Calculate the number of items needed to fill the width
  const repeatedData = Array.from({ length: numItems }, (_, index) => data[index % data.length]); // Repeat data to fill the width

  return (
    <div className="max-h[10px] md:max-h-[40px] w-full overflow-x-hidden whitespace-nowrap">
      {repeatedData.map((item, index) => (
        <span key={index} className="marquee-item px-5 text-1xl" style={{ fontFamily: 'azonix', color: '#FBF0C2' }}>{item}</span>
      ))}
    </div>
  );
}

export default HomeMarque;
