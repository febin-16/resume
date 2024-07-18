import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
import DottedLine from "./DottedLine";
import HomeMarque from "./HomeMarque";

import { LoaderContext } from "../../context/loader";
import "../../styles/hero.css";
import TextScramble from "./TextScramble";
/**
 * Render a hero section with a title.
 * @function
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to display in the hero section.
 * @param {string} [props.textSize="330px"] - The font size of the title.
 * @param {number} props.keyC - The unique key for the component instance.
 * @returns {JSX.Element} The JSX element representing the hero section.
 */
function Hero({ title, subtitle, keyC }) {
  const colors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#00071",
    "#000003",
    "#111111",
    "#222222",
    "#333333",
    "#741BD4",
    "#741BD4",
    "#741BD0",
    "#741BD7",
    "#333333",
    "#666666",
    "#9F4FFF",
    "#F3E8BB",
  ];

  const heroSectionRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [heroWidthScroll, setHeroWidthScroll] = useState(0);
  const [heroHeightScroll, setHeroHeightScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (heroSectionRef.current) {
      setHeroWidth(heroSectionRef.current.offsetWidth);
      setHeroHeight(heroSectionRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    const numGridItems = gridItems.length;

    const updateGridItemColors = () => {
      for (let i = 0; i < numGridItems; i++) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        while (gridItems[i] && gridItems[i].style.backgroundColor === color) {
          color = colors[Math.floor(Math.random() * colors.length)];
        }
        gridItems[i] && (gridItems[i].style.backgroundColor = color);
      }
    };

    // Update the grid item colors every 1 second
    const intervalId = setInterval(updateGridItemColors, 2000);

    // Clear the interval if the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [heroWidth, heroHeight]);

  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    const numGridItems = gridItems.length;

    for (let i = 0; i < numGridItems; i++) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      while (gridItems[i] && gridItems[i].style.backgroundColor === color) {
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      gridItems[i] && (gridItems[i].style.backgroundColor = color);
    }
  }, [heroWidth, heroHeight]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroSectionRef.current) {
        setHeroWidthScroll(heroSectionRef.current.clientWidth);
        setHeroHeightScroll(heroSectionRef.current.clientHeight);
      }
      if (scrollY > 0) {
        gsap.to(".grid-item", {
          backgroundColor: () =>
            colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function renderGridItems() {
    const gridSize = 10; // Size of each grid item
    const numCols = Math.ceil(heroWidth / gridSize);
    const numRows = Math.ceil(heroHeight / gridSize);
    const totalGridItems = numCols * numRows;
    const gridItems = [];

    for (let i = 0; i < totalGridItems / 17; i++) {
      gridItems.push(<div className="grid-item opacity-15" key={i}></div>);
    }

    return gridItems;
  }

  return (
    <div className="hero-section w-full relative flex flex-col items-center">
      <div
        className="pl-[2%] md:pl-[1%]  grid-container w-full h-[480px] md:h-[400px] max-h-screen overflow-y-hidden"
        ref={heroSectionRef}
      >
        {renderGridItems()}
      </div>
      <h1
        className="text-center leading-[60px] md:leading-[80px] w-full absolute top-[40%] md:top-[45%] text-[55px] md:text-[110px] z-10 uppercase"
        style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
      >
        {title}
        {subtitle && <TextScramble phrases={[subtitle]} />}
      </h1>
      <DottedLine opacity="opacity-10" />
      <DottedLine opacity="opacity-20" />
      <HomeMarque className="w-full" />
      <DottedLine opacity="opacity-20" />
      <DottedLine opacity="opacity-10" />
    </div>
  );
}

export default Hero;
