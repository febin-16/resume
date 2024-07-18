import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import logoHestia from "../../assets/icons/logo_hestia.png";
import bgimg from "../../assets/images/bgimg2.jpg";
import Wave from "react-wavify";
function HomePage1() {
  const screenWidth = window.innerWidth;
  const points = screenWidth >= 624 ? 8 : 3;
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bgimg})`,
        backgroundSize: "cover",
      }}
      className=" pt-48 overflow-hidden w-full min-h-screen flex flex-col  Home bg-black items-center justify-center"
    >
      <img
        className="cursor-none w-36 md:w-80 shadow-lg z-10 "
        src={logoHestia}
        alt=""
      />

      <div className="  flex flex-col w-fit text-center justify-between text-3xl font-bold ">
        <h1 className="text-white text-4xl font-RobotoMono z-10">
          HESTIA XXIV
        </h1>
        <h1 className=" mt-40 animate-pulse-slow text-white z-10">
          COMING SOON
        </h1>
      </div>
      <Wave
        mask="url(#mask)"
        fill="#fd7600"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.35,
          points: points,
        }}
        className="opacity-30"
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
          </mask>
        </defs>
      </Wave>
      <Wave
        mask="url(#mask)"
        fill="#DAF7A6"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 50,
          amplitude: 50,
          speed: 0.1,
          points: points,
        }}
        className="absolute opacity-60"
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
          </mask>
        </defs>
      </Wave>
      <Wave
        mask="url(#mask)"
        fill="#DAF7A6"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 50,
          amplitude: 40,
          speed: 0.25,
          points: points,
        }}
        className="absolute bottom-56 opacity-30"
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
          </mask>
        </defs>
      </Wave>
      <Wave
        mask="url(#mask)"
        fill="#fd7600"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 50,
          amplitude: 40,
          speed: 0.2,
          points: points,
        }}
        className="absolute bottom-24 opacity-80"
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0" stopColor="white" />
            <stop offset="0.5" stopColor="black" />
          </linearGradient>
          <mask id="mask">
            <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
          </mask>
        </defs>
      </Wave>
    </div>
  );
}

export default HomePage1;
