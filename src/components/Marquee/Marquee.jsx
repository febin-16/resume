import gsap from "gsap";
import "../../styles/marquee.css";

import { useEffect } from "react";
export default function Marquee({ ltr, elements, delay, windowSize,margin }) {

  useEffect(() => {

    gsap.set(".box", {
      //   backgroundColor: (i) => colors[i % colors.length],
      x: (i) => i * 300,
    });
    gsap.set(".box2", {
      x: (i) => i * 300,
    });
    if (ltr)
      gsap.to(".box", {
        duration: delay,
        ease: "none",
        x: "+=3000",
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return parseFloat(x) % 3000;
          }),
        },
        repeat: -1,
      });
    else
      gsap.to(".box2", {
        duration: delay,
        ease: "none",
        x: "-=3000",
        modifiers: {
          x: gsap.utils.unitize((x) => {
            if (x <= 0) {
              return 3000 + x;
            }
            return parseFloat(x) % 3000;
          }),
        },
        repeat: -1,
      });
  }, []);
  return (
    <div className={`wrapper rotate-12 align-top`}>
      <div style={{ top: `-${windowSize}` ,left: `-${windowSize}`}} className="boxes">
        {elements.map((e, ind) => (
          <div key={ind} style={{ width: windowSize, height: windowSize }} className={`${ltr ? ' box ' : ' box2 '} rounded-card `}>
            <img style={{ aspectRatio: '1', height: windowSize, width: windowSize, objectFit: 'cover' }} src={e.src} alt={e.alt} className="px-1 py-6  rounded-card rounded-md hover:grayscale-0 cursor-pointer grayscale transition-all filter" />
          </div>
        ))}

      </div>
    </div>
  );
}
