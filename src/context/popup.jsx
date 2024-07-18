import React, { useState, createContext } from "react";

export const PopUpContext = createContext();

export const PopUpContextProvider = (props) => {
  const [popUp, setPopUp] = useState(false);
  const [content, setContent] = useState({ title: "", desc: "" });

  const clearContent = () => {
    setTimeout(() => {
      setPopUp(false);
      setContent({ title: "", desc: "" });
    }, 3000);
  }
  return (
    <PopUpContext.Provider
      value={{
        popUpState: [popUp, setPopUp],
        contentState: [content, setContent],
        clearContent: clearContent
      }}
    >
      {props.children}
    </PopUpContext.Provider>
  );
};

