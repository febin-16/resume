import React,{useContext} from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/user.jsx';
import {BASE_URL} from '../../constants/urls.js';
import { PopUpContext } from "../../context/popup.jsx";
import { ModalContext } from "../../context/modal.jsx";
import { useLocation, useNavigate } from "react-router-dom";


function RequestCard({ title, link1, link2,description, notifId }) {

  const {userState,tokenState} = useContext(UserContext);
  const [token, setToken] = tokenState;
  const { popUpState, contentState, clearContent } = useContext(PopUpContext);
  const [popUp, setPopUp] = popUpState;

  const { showState } = useContext(ModalContext);

  const [userDetails, setUserDetails] = userState;

  const [disabled, setDisabled] = useState(true);

  const [content, setContent] = contentState;
  const [show, setShow] = showState;

  const navigate = useNavigate();



  const [isPending, setIsPending] = useState(false);
  const handleClick = (link) => {

    setIsPending(true);

    fetch(BASE_URL+link+`&id=${notifId}`, { 
      method:"GET",
      headers:{
        "Authorization": `token ${token}`
      }
    })
    .then(res => {
      // console.log(">>", res.status)
      switch(res.status) {
        case 200:
            setShow(false);
            setContent({
              title: "Invitation Accepted",
              desc: "Joined team",
            });
            setPopUp(true);
            clearContent();
            navigate("/dashboard");
          break;
          case 403:
            setShow(false);
            setContent({
              title: "Cannot join",
              desc: "Already in another team",
            });
            setPopUp(true);
            clearContent();
            navigate("/dashboard");
          break;
          case 204:
            setShow(false);
            setContent({
              title: "Cannot Join",
              desc: "Team already formed",
            });
            setPopUp(true);
            clearContent();
            navigate("/dashboard");
          break;
          case 208:
            setShow(false);
            setContent({
              title: "Cannot Join",
              desc: "Already Joined",
            });
            setPopUp(true);
            clearContent();
            navigate("/dashboard");
          break;
          case 201:
            setShow(false);
            setContent({
              title: "Cannot Join",
              desc: "Rejected",
            });
            setPopUp(true);
            clearContent();
            navigate("/dashboard");
          break;
          case 303:
            setShow(false);
            setContent({
              title: "Cannot Join",
              desc: "Invitation Expired",
            });
            setPopUp(true);
            clearContent();
            navigate("/dashboard");
          break;
        default:
          // code block
      }

      
      setIsPending(false);
    })
    .catch((e)=>{

      setShow(false);
      setContent({
        title: "Cannot Join",
        desc: "Oops! Something went wrong",
      });
      setPopUp(true);
      clearContent();
      navigate("/dashboard");

    });
    
  };




    return (
        <div className="card w-full bg-primary-dark text-neutral-content">
        <div className="card-body items-center text-center">
            <h2 className="card-title text-secondary-dark">{title}</h2>
            <p className="text-small text-secondary-light"> {description} </p>

            { isPending ? <h3 className="text-center text-ssmall">...</h3> :
            
          
            <div className="card-actions justify-end">
            
            <button onClick={()=>handleClick(link1)} className="btn btn-primary-light text-secondary-dark"> { isPending }Accept</button>
            <button onClick={()=>handleClick(link2)} className="btn btn-ghost text-secondary-dark">Deny</button>
            </div>
            }

        </div>
        </div>
      );
    }
  
  export default RequestCard;
  