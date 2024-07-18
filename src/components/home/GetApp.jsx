/**
 * Render the About Us section of the application.
 * Action button either leads to use the campus ambassador page/detail-view page depending on the coming soon/ production
 * @function
 * @param {string} content - About Us content
 * @param {string} actionRoute - Redirection Route for Action button,
 * @returns {JSX.Element} The JSX element representing the About Us section.
 */
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import logo from "../../assets/images/logo.jpeg";
import "../../styles/button.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import AppImg from "../../assets/images/appnew.png";
import AppImg2 from "../../assets/images/appnew2.png";
import "../../styles/proshowcard.css";
import "../../styles/home.css";
// gsap.registerPlugin(ScrollTrigger);
// const containerRef = useRef();
// const logoRef = useRef();

function GetApp() {
  return (
    <div
      // ref={containerRef}
      className="hero-section flex  mt-20 mb-12 py-4"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-row w-full justify-between ">
          <img
            className="md:px-10 mt-10  -mx-20 md:-mx-40 lg:-mx-48 xl:-mx-56 md:mt-0 h-[300px] md:h-[600px] -rotate-5"
            src={AppImg}
          />
          <img
            className="md:px-10 mt-10 hidden md:block md:mt-0 h-[300px] md:h-[600px] -rotate-5"
            src={AppImg2}
          />
          {/* <img
            className="md:px-10 mt-10 -mx-20 md:-mx-40 lg:-mx-48 xl:-mx-56 md:mt-0 h-[300px] md:h-[600px] -rotate-5"
            src={AppImg}
          />
          <img
            className="md:px-10 mt-10 -mx-20 md:-mx-40 lg:-mx-48 xl:-mx-56 md:mt-0 h-[300px] md:h-[600px] -rotate-5"
            src={AppImg}
          />
          <img
            className="md:px-10 mt-10 -mx-20 md:-mx-40 lg:-mx-48 xl:-mx-56 md:mt-0 h-[300px] md:h-[600px] -rotate-5"
            src={AppImg}
          /> */}
        </div>
        <div className="pt-5 md:pt-2 w-full md:3/4 text-center flex flex-col justify-center items-center lg:pt-8">
          <h1
            className="relative  lg:text-[125px] md:text-6xl text-[60px]"
            style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
          >
            CHECK OUT THE
            <a
              //href="https://appho.st/d/T9QPVuCD"
              target="_blank"
              text="Check it out"
              className="animate animate-pulse"
            >
              <div className="absolute top-8 md:top-16 left-[25%] text-[40px] md:text-[100px] ">
                <p
                  className="text-center text-proshowcard"
                  style={{ fontFamily: "dynalight", color: "#3A0A6E" }}
                >
                  Hestia App
                </p>

              </div>
            </a>
          </h1>
          <a href="https://hestia24backend.s3.amazonaws.com/apk/hestia24.apk" ><button style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }} className="md:mt-10  text-xl rounded hover:bg-[#7F00FF] hover:bg-opacity-15 border px-2">Download Now</button></a>
        </div>
      </div>
    </div>
  );
}

export default GetApp;