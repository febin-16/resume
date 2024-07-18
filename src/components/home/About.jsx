import React, { useEffect, useRef } from "react";
import trail2 from "../../assets/svgs/man.svg";
import trail1 from "../../assets/svgs/pattern5.svg";
import circle from "../../assets/svgs/circle.svg";
import logo from "../../assets/icons/logo_hestia.png";
// import aboutimglg from "../../assets/svgs/from_bits_to_beats.svg";
// import aboutimglg from "../../assets/svgs/frombitstobeats.svg";
import aboutimglg from "../../assets/svgs/frombitstobeatsfinal1.svg";
// import aboutimglg from "../../assets/svgs/aboutlg.svg";
//import Typewriter from 'typewriter-effect';
//import { TypeAnimation } from 'react-type-animation';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function About(props) {
  const maskRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    (async () => {
      const m0 = await divRef.current;
      const m1 = await maskRef.current;

      gsap.from(m1, {
        translateY: "0%",
      });
      gsap.to(m1, {
        scrollTrigger: {
          trigger: m0,
          scrub: true,
          start: "top 20%",
          end: "bottom 0px",
        },
        translateY: "600%",
        bottom: 0,
        ease: "none",
      });
    })();
  }, [divRef, maskRef]);

  return (
    <div className="h-screen  px-1 md:px-2 w-full  my-12">
      <div
        ref={divRef}
        className="  border border-[#FBF0C2] w-full h-full rounded-xl flex flex-col md:flex-row bg-primary-dark"
        style={{ fontFamily: "bungee", color: "#FBF0C2" }}
      >

        <div className="w-full h-3/6 md:h-full  flex flex-row">

          <div className="hidden lg:block flex flex-col h-full w-1/3">
            {/* <Link to={SPIN_THE_WHEEL}> */}
            <div className="h-1/3 border-b border-b-secondary-dark flex items-center justify-center">
              <div>
                <img src={circle} alt="" className="animate-spin" />
                {/* <h1 className={"text-center bg-accent-dark rounded"}>Feeling Luck?</h1> */}
              </div>
            </div>

            {/* </Link> */}
            <div className="h-2/3 px-4 py-2 flex items-center justify-center">
              <div className="border border-secondary-dark rounded-xl w-3/4 h-3/4 flex flex-col items-center justify-center">
                <p className="text-medium">☵</p>
                <p className="text-medium">∆</p>
                <p className="text-medium">∇</p>
                <p className="text-medium">☵</p>
              </div>
            </div>
          </div>
          <div className="flex w-full    md:w-11/12  lg:border-x py-2  lg:border-x-[#FBF0C2] relative overflow-y-hidden ">
            {/* <img src={aboutimg} alt="hestia" className=" object-fill w-10 lg:hidden absolute" /> */}
            <img src={aboutimglg} alt="hestia" className="     rounded-xl w-full h-full  absolute" />
            <svg className=" h-full   mt-7 md:mt-12 lg:mt-8  w-full rounded-xl items-center  flex flex-col  justify-center" >
              <mask className="h-full" id="myMask">
                <rect className="h-1/2 md:h-1/4 " ref={maskRef} width="100%" fill="#e9e2ca" />
              </mask>

              <rect x="0" y="0" width="100%" height="100%" fill="#FBF0C2" mask="url(#myMask)" />
            </svg>
          </div>
        </div>

        <div className="w-full h-3/6 md:h-full md:w-1/2  pt-2  border-rborder-r-[#FBF0C2] ">
          <div className="p-4 border-t border-t-[#FBF0C2] md:border-t-0 w-full h-5/6 py-2 lg:pl-8">
            <div className="h-full overflow-y-auto scrollDiv scrollDivV">
              <p
                className="pr-4   md:pt-2 text-xl md:text-2xl text-justify flex justify-center scroll-auto items-center"
                style={{ fontFamily: "azonix", color: "#FBF0C2" }}
              >
                "Hestia'24 is the annual techno-cultural fest of TKM College of Engineering, Kollam. TKM College of Engineering, founded in 1958, is the first government aided college in Kerala and the only engineering college in the state under the government aided and semi government sector to have been accredited with A grade by NAAC. Throughout its 60-year-old legacy, TKMCE has been a minefield of talents, brimming with exceptional calibre, technological excellence and innovation.The four day event from the 3rd to the 6th of May 2024 is expected to witness a footfall of more than 30,000 students from institutes all over the country. Hestia'24 will bring together over 80 events spanning art, culture, and technology. One of the state's top techno-cultural events, Hestia'24 aims to merge art, culture, and technical knowledge through a variety of quizzes, hackathons, dance, music, and more.",
              </p>
            </div>
          </div>
          <div className="w-full h-1/6 flex border-t border-t-[#FBF0C2]  border-b border-b-[#FBF0C2]  md:border-b-none">
            <div className="w-1/4 border-r border-r-[#FBF0C2] flex items-center justify-center">
              <img
                className="opacity-[0.6] w-10 whitespace-nowrap mx-2  lg:block"
                src={logo}
                alt=""
              />
            </div>
            <div className="w-1/4 border-r border-r-[#FBF0C2]  flex items-center justify-center">
              <p className="w-4 md:w-14">∆∇∆∇</p>
            </div>
            <div className="w-1/4 border-r border-r-[#FBF0C2]  flex items-center justify-center ">
              <img className="w-4 md:w-14 opacity-60" src={trail1} alt="" />
            </div>
            <div className="w-2/4 flex items-center justify-center lg:w-1/4 lg:text-smedium">
              <p className="">ABOUT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
