import React, { useEffect, useState } from "react";
import pro1 from "../../assets/images/Events/pro1.png";
import { Image } from "primereact/image";
import "../../styles/proshowcard.css";
import ProshowWrapper from "./ProshowWrapper";

// import arr from '../../assets/images/Events/arrow-up-right.png'
import { Button } from "primereact/button";

const formatDay = (day) => {
  if (day === 1 || day === 21 || day === 31) {
    return day + "st";
  } else if (day === 2 || day === 22) {
    return day + "nd";
  } else if (day === 3 || day === 23) {
    return day + "rd";
  } else {
    return day + "th";
  }
};

const ProshowCard = ({ index, title, img, date }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(140);
  const [wrapperWidth1, setWrapperWidth1] = useState(100);

  useEffect(() => {
    if(window.innerWidth < 768)
    {
      setIsMobile(window.innerWidth < 768);
      setWrapperWidth(140)
    }  
    else
    {
      setWrapperWidth(100);
      setWrapperWidth1(60);
    }
  }, []);

  const flexDirection = !isMobile
    ? index % 2 == 0
      ? "row"
      : "row-reverse"
    : "column";
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const [month, day, year] = formattedDate.split(" ");
  /*  return (
    <div className="relative w-full pb-20">
      <div className="mx-auto group w-[280px] h-[280px] shadow-2xl transform duration-500 hover:-translate-y-2 cursor-pointer border-4 border-white bg-transparent flex">
        <div className="px-6 py-4 flex-1"></div>
        <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2">
          <div className="w-[250px] h-[250px] relative">
            <Image src={img} alt="dash" className="object-cover w-full h-full " />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-full">
              <div className="rounded-lg text-center font-bold">
                <h2 className="font-Geomanist text-3xl">{title}</h2>
                <p className="text-xl">{date}</p>
              </div>
            </div>
             <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
              <Image src={arr} alt="dash" className="object-cover transform scale-50" />
            </div> 
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            </div>
          </div>
        </div>
      </div>
    </div>
  );*/
  return (
    <div
      className="mb-12 w-full flex flex-col justify-around items-center px-1 "
      style={{ flexDirection }}
    >
      <div className=" w-[350px]  max-w-[350px] h-[250px]  max-h-[500px] md:w-[800px]  md:max-w-[800px] md:h-[500px]  md:max-h-[500px] relative">
        <img src={pro1} alt={title} className="w-full h-full p-3 md:p-6" />
      </div>
      <div className="md:ml-4 flex flex-col justify-center items-center relative">
        <h1
          className="text-[75px] md:text-[100px]"
          style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
        >
          {title}
        </h1>
        <h1
          className="animate-pulse absolute top-[45%] text-[50px] md:text-[80px] text-proshowcard"
          style={{ fontFamily: "dynalight", color: "#3A0A6E" }}
        >
          {`${month} ${formatDay(parseInt(day))}`}
        </h1>
      </div>
    </div>
  );
};

export default ProshowCard;