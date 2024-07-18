import React, { useState, createContext, useEffect } from "react";
import "primereact/resources/primereact.min.css";
import logoHestia from "../assets/icons/logo_hestia.png";
export const LoadingContext = createContext();
import { ProgressSpinner } from "primereact/progressspinner";

export const LoadingContextProvider = (props) => {
  const [showLoad, setLoad] = useState(false);
  return (
    <LoadingContext.Provider value={{ setLoad }}>
      {showLoad && (
        <div className={` h-screen w-screen bg-black z-[999] bg-opacity-60 fixed flex justify-center items-center`}>
          <div className="absolute md:left-1/2 top-1/2">
            <ProgressSpinner/>
          </div>
        </div>
      )}

      {props.children}
    </LoadingContext.Provider>
  );
};
