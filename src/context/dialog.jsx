import React, { useState, createContext } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/md-dark-deeppurple/theme.css";
export const DialogPopup = createContext();


const FooterDialog = ({ content }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full max-w-full">
      <div className="flex flex-row items-center">
        {!visible &&
          <p>more info</p>
        }
        <p onClick={() => setVisible(!visible)} className={`pi ${!visible ? "pi-info-circle" : "pi-chevron-up"} ml-3 cursor-pointer hover:text-blue-400`}></p>
        {
          visible &&
          <p className="w-full break-words">{content}</p>
        }

      </div>

    </div>
  )
}
export const DialogPopupProvider = (props) => {

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [header, setHeader] = useState('');
  const [footer, setFooter] = useState(null);

  const showDialog = (message, header, footer = null) => {
    setVisible(true);
    setMessage(message);
    setHeader(header);
    setFooter(footer);
  };

  const hideDialog = () => {
    setVisible(false);
  };


  return (
    <DialogPopup.Provider
      value={{ showDialog }}
    >
      <>
        <Dialog className="max-w-[90%]" footer={footer !== null && <FooterDialog content={footer} />} visible={visible} header={header} onHide={hideDialog}>
          <p>{message}</p>
        </Dialog>
        {props.children}
      </>
    </DialogPopup.Provider>
  );
};
