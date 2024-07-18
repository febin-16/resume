import React, { useState, useEffect } from "react";
import Majorcard from "../events/MajorCard";
import { BASE_URL } from "../../constants/urls";
import stickSvg from "../../assets/svgs/elements/stick.svg";
import logo_hestia from "../../assets/icons/logo_hestia.png"
import "../../styles/majorevents.css";
import Culturals from "../../assets/images/Events/Culturals.png";
import Technicals from "../../assets/images/Events/Technicals.png";
import Workshop from "../../assets/images/Events/Workshops.png";
import Proshow from "../../assets/images/Events/pro1.png";
import { Link, useNavigate, useMatch, Navigate } from "react-router-dom";
import "../../styles/home.css";
function Cube(props) {

  var cubeStyle = {
    width: props.size + "px",
    height: props.size + "px",
    transform: `rotateY(${props.rotation}deg)`,

  };

  return (
    <div className="cube" style={cubeStyle}
    >
      <div className="front">
        <Link to="/events/technical">
          <img src={Technicals} />
        </Link>  
      </div>
      <div className="back">
        <Link to="/events/general">
          <img src={Culturals} />
        </Link>  
      </div>
      <div className="top overflow-hidden relative">
        <img src={logo_hestia} className="w-[50%] h-[50%] absolute top-[35%] left-[25%]" />
      </div>
      <div className="bottom"></div>
      <div className="left">
        <Link to="/events/workshops">
          <img src={Workshop} />
        </Link>  
      </div>
      <div className="right">
        <Link to="/events/proshows">
          <img src={Proshow} />
        </Link>  
      </div>
    </div>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const [windowSize, setWindowSize] = useState(300);
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  //const windowSize = window.innerWidth;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(BASE_URL + "/api/events/trending/");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setWindowSize(250);
    } else {
      setWindowSize(200);
    }
  }, []);

  return (
    <div className="mb-32 hero-section h-screen md:h-[820px] flex flex-col justify-around items-center w-full max-w-screen ">
      <div className="flex flex-col items-center md:flex-row justify-center md:justify-between">
        <span
          className="h-16 md:h-auto text-[100px] md:text-[150px]  md:pr-6"
          style={{ fontFamily: "CharlieDotted", color: "#741BD4" }}
        >
          MAJOR
        </span>
        <span
          className="text-[100px] md:text-[150px]"
          style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
        >
          EVENTS
        </span>
      </div>
      <div className="pb-16 md:pb-24">
        <div className="container">
            <Cube size={windowSize} rotation={-scrollPosition}/>
        </div>
      </div>
    </div>
  );
}

export default Events;
