import React,{useState, createContext} from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (props) => {
  const [show, setShow] = useState(false);
  // const [content, setContent] = useState({title:"Registration",desc:"payment successfull",comp:<div>hello</div>});
  return (
    <ModalContext.Provider
      value={{
        showState:[show, setShow],
        // contentState:[content,setContent],
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
