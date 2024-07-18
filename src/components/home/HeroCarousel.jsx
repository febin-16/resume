import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import "../../styles/hero.css";
import "../../styles/carousel.css";
import HeroCaro from "./HeroCaro";

gsap.registerPlugin(ScrollTrigger);

function Carousel() {
  const colors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000003",
    "#14062B",
    "#14062B",
    "#333333",
    "#111111",
    "#14062B",
    "#222222",
    "#333333",
  ];

  const colors2 = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000003",
    "#333333",
    "#111111",
    "#222222",
    "#333333",
  ];

  const carouselRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setHeroWidth(carouselRef.current.offsetWidth);
      setHeroHeight(carouselRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const gridItems1 = document.querySelectorAll(".grid-item1");
    const gridItems2 = document.querySelectorAll(".grid-item2");
    let colorIndex1 = 0;
    let colorIndex2 = 0;

    const updateGridItemColors = () => {
      gridItems1.forEach((item) => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[(colorIndex1 + randomIndex) % colors.length];
        item.style.backgroundColor = color;
      });
      colorIndex1++;

      gridItems2.forEach((item) => {
        const randomIndex = Math.floor(Math.random() * colors2.length);
        const color = colors2[(colorIndex2 + randomIndex) % colors2.length];
        item.style.backgroundColor = color;
      });
      colorIndex2++;
    };

    const intervalId = setInterval(updateGridItemColors, 2000);
    return () => clearInterval(intervalId);
  }, [heroWidth, heroHeight]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0 && carouselRef.current) {
        setHeroWidth(carouselRef.current.clientWidth);
        setHeroHeight(carouselRef.current.clientHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function renderGridItems(index) {
    const gridSize = 10; // Size of each grid item
    const numCols = Math.ceil(heroWidth / gridSize);
    const numRows = Math.ceil(heroHeight / gridSize);
    const totalGridItems = numCols * numRows;
    const gridItems = [];
    if (index == 1) {
      for (let i = 0; i < totalGridItems / 8; i++) {
        gridItems.push(
          <div className={`grid-item${index} opacity-40  `} key={i}></div>
        );
      }
    } else {
      for (let i = 0; i < totalGridItems / 8; i++) {
        gridItems.push(
          <div className={`grid-item${index} opacity-80  `} key={i}></div>
        );
      }
    }
    return gridItems;
  }

  return (
    <div className="flex flex-col items-center ">
      <div
        className="grid-container w-screen h-[96px] max-h-[83px] md:h-32 md:max-h-[83px] overflow-hidden"
        ref={carouselRef}
      >
        {renderGridItems(1)}
      </div>
      <div
        className="px-[2%] md:px-[0%] grid-container w-screen h-[96px] max-h-[83px] md:h-32 md:max-h-[83px] overflow-hidden"
        ref={carouselRef}
      >
        {renderGridItems(2)}
      </div>
      {/* <div className=" w-full min-w-screenflex flex-row justify-center overflow-hidden h-84 md:h-96 md:mt-[-50px] md:mb-[-70px] grid-backgroundd"> */}
      <div className="w-full h-84 min-w-screenflex pb-7 bg-[#F3E8BB] -z-0 grid-background bg-opacity-80 ">
      
       <HeroCaro />
      
      </div>
      {/* </div> */}
      <div
        className="px-[2%] md:px-[0%]  grid-container w-screen h-[96px] max-h-[83px] md:h-32 md:max-h-[83px] overflow-hidden"
        ref={carouselRef}
      >
        {renderGridItems(2)}
      </div>
      <div
        className="grid-container w-screen h-[96px] max-h-[83px] md:h-32 md:max-h-[83px] overflow-hidden"
        ref={carouselRef}
      >
        {renderGridItems(1)}
      </div>
    </div>
  );
}

export default Carousel;
