import React from "react";
import "../../styles/home.css"

const AboutUs = () => {
  return (
    <div className="md:pt-48 md:min-h-screen h-fit  grid-background flex justify-center items-center">
      <div className="flex  justify-center text-center  font-Geomanist">
        <div className="mt-[10rem] md:mt-0 container m-10 bg-black h-full w-fit md:w-3/4 p-5 border-[0.2px] border-gradient-to-tr from-white-700 to-transparent rounded-xl  bg-clip-padding backdrop-filter backdrop-blur-sm opacity-80 ">
          <h1 className="text-4xl text-[#FBF0C2] no-underline">ABOUT US</h1>
          <hr className="m-2 w-half"></hr>
          <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          Hestia '24 is the annual techno-cultural fest of TKM College of Engineering, Kollam. TKM College of Engineering, founded in 1958, is the first government aided college in Kerala and the only engineering college in the state under the government aided and semi government sector to have been accredited with A grade by NAAC. Throughout its 60-year-old legacy, TKMCE has been a minefield of talents, brimming with exceptional calibre, technological excellence and innovation.The four day event from the 3rd to the 6th of May 2024 is expected to witness a footfall of more than 30,000 students from institutes all over the country. Hestia '24 will bring together over 80 events spanning art, culture, and technology. One of the state's top Techno-Cultural events, Hestia '24 aims to merge art, culture, and technical knowledge through a variety of quizzes, hackathons, dance, music, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
