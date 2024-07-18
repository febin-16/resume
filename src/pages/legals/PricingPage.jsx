import React from "react";
import "../../styles/home.css"

const PricingPage = () => {
  return (
    <div className="md:h-screen h-fit  grid-background flex justify-center items-center">
      <div className="flex  justify-center text-center  font-Geomanist">
        <div className="mt-[10rem] md:mt-0 container m-10 bg-black h-full w-fit md:w-3/4 p-5 border-[0.2px] border-gradient-to-tr from-white-700 to-transparent rounded-xl  bg-clip-padding backdrop-filter backdrop-blur-sm opacity-80 ">
          <h1 className="text-4xl text-[#FBF0C2] no-underline">PRICING</h1>
          <hr className="m-2 w-half"></hr>
          <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
            One time payment of ₹(corresponding to the registered event) is
            required for an individual/or team to participate in any
            event/workshop. After the event goodies(depending on the
            participated event) will be allocated.Detailed pricing can be found
            in /event/event_id.For any queries regarding the pricing contact :{" "}
            <a
              className="text-blue-700  animate-pulse duration-75 delay-75"
              href="mailto:190950@tkmce.ac.in"
            >
              support@hestiatkmce.live
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
