import React, { useState, createContext, useEffect } from "react";
import "primereact/resources/primereact.min.css";
import logoHestia from "../assets/icons/logo_hestia.png";
export const LoaderContext = createContext();
import { ProgressSpinner } from "primereact/progressspinner";

export const LoaderContextProvider = (props) => {
  const [show, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ setLoader }}>
      {show && (
        <div className={` h-screen w-screen bg-black z-[999] fixed flex justify-center items-center`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img className="animate-spin  " src={logoHestia}/>
          </div>
        </div>
      )}

      {props.children}
    </LoaderContext.Provider>
  );
};
