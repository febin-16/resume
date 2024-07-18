import React, { useState, useEffect, useContext } from 'react'

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { registerComboAPI } from "../../services/registration.js";
import { getUserDetailsAPI } from "../../services/user.js";

import { BASE_URL } from "../../constants/urls.js";
import { ModalContext } from "../../context/modal.jsx";
import { PopUpContext } from "../../context/popup.jsx";
import { UserContext } from "../../context/user.jsx";
import useFetch from "../../hooks/useFetch.js";
import arrow from "../../assets/icons/arrow.png"
import { LoaderContext } from "../../context/loader.jsx";
import { LoadingContext } from '../../context/loading.jsx';
import gatewayResolver from "../../utils/razor-pay-utils.js";
import { DialogPopup } from '../../context/dialog.jsx';

import EventcardVar2 from '../../components/events/EventcardVar2.jsx';

import Majorcard from '../../components/events/MajorCard.jsx';
import Hero from '../../components/home/Hero.jsx';
import "../../styles/home.css";
import "../../index.css";


const Combos = () => {

  const [search, setSearch] = useState("");
  const { state } = useLocation();
  const { tokenState, userState } = useContext(UserContext);
  const { popUpState, contentState, clearContent } = useContext(PopUpContext);
  const { showState } = useContext(ModalContext);
  const { setLoader } = useContext(LoaderContext);
  const { showLoad, setLoad } = useContext(LoadingContext);

  const [token, setToken] = tokenState;
  const [userDetails, setUserDetails] = userState;

  const [disabled, setDisabled] = useState(true);

  const [referral, setReferral] = useState("");
  const [coupon, setCoupon] = useState("");
  const [file, setFile] = useState(null);
  const [end, setEnd] = useState(false);

  const [popUp, setPopUp] = popUpState;
  const [content, setContent] = contentState;
  const [show, setShow] = showState;
  const params = useParams();
  const navigate = useNavigate();

  const { showDialog } = useContext(DialogPopup);

  
  function navigateToExternalUrl(url) {
    window.location.href = url;
  }    
  async function handleSubmit(redirect_link,id)
  {
    setShow(true);
    if (token !== null && id) {
      // if (state.team_id===null){  
      try {
        const userResponse = await getUserDetailsAPI(token);
        if (userResponse.status === 200) {
          const user = await userResponse.json();
          if (user.is_completed) {
              setLoad(true);
              const formData = new FormData()
              formData.append('combo', id)
              const response = await registerComboAPI(token, formData);
              if (response.status === 200) {
                const resp = await response.json();
                navigateToExternalUrl(redirect_link);

              } else if (response.status === 202) {

                showDialog("Registered successfully", "Success");
                // clearContent();
                navigate("/events");
              } else if (response.status === 403) {

                showDialog("Already registered.", "Info");

                clearContent();
              } else if (response.status === 410) {

                showDialog("Registration closed.", "Info");
              } else if (response.status === 404) {
                setShow(false);
                showDialog("Invalid coupon.", "Info");

              } else if (response.status === 411) {
                showDialog("Registration not started.", "Info");

              } else {
                showDialog("Something went wrong.Try again later", "Info");

              }
              setLoad(false);
          } else {

            showDialog("Complete your profile before registration", "Info");
            navigate("/dashboard/profile");
          }
        } else {

          showDialog("User not found", "Info");

          navigate("/");
        }
      } catch (e) {

        console.log(e)

        showDialog("Failed to fetch", "Info");

      }
    } else {

      showDialog("Login before registration", "Info");
      navigate("/loginpage");


    }
  }

  const { error, isPending, data: details } = useFetch(BASE_URL + `/api/offers/combo/all/`);

  const fileteredEvents = details !== null && details.results && details.results.filter((item) => {
    return search !== "" ? item.name.toLowerCase().includes(search.toLowerCase()) : item.is_visible==true
  });
  console.log(fileteredEvents);
  return  (
    <div className="hero-section grid-background w-full  flex flex-col">
        <Hero title={"COMBO OFFERS"} />
        <div className='mx-2 pt-2'>
            <div className="p-2 w-full  border-2 border-[#FBF0C2] bg-black px-2 md:py-1 rounded-xl flex items-center">
                    <p className="pi pi-search "></p>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className=" ml-3 w-full py-1 md:py-2 text-lg outline-none bg-black text-[#FBF0C2]"
                        placeholder="Search"
                    />
            </div> 
        </div>
        <div className='w-full p-4 grid  grid-cols-1 md:grid-cols-2 '>
        {!error &&
          fileteredEvents !== null &&
          fileteredEvents?.length > 0 &&
          fileteredEvents.map((item, index) => {
            return (
            <div className='  my-2 py-2 md:py-4 md:mx-2 rounded-xl  border-2 border-[#FBF0C2] ' key={index}>  
            {console.log(item)}  
                <p className="w-full  uppercase text-center text-[25px] md:text-[40px]" style={{ fontFamily: 'bungee', color: '#FBF0C2' }}>{item.name}</p>
                <p className='text-center text-red-800' style={{ fontFamily: "azonix" }}>{item.desc}</p>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2   w-full pt-4 md:pt-5 mt-5">
                {
                    item.events.map((element, i) => { 
                        return (
                            <Majorcard
                            eventPage
                            key={i}
                            title={element.title}
                            description={element.desc}
                            image={element.image}
                            category={element.category}
                            id={i}
                            slug={element.event_category=="PR"?"PROSHOW":element.slug}
                        />
                        );
                    })
                } 
             </div> 
            <div className="w-full h-1/6 flex flex-col items-center justify-start font-bold text-small ">
                <button
                    onClick={()=>handleSubmit(item.redirect_link,item.id)}
                    style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                    className={`rounded-lg border border-1 border-[#FBF0C2] font-bold  md:px-8  md:py-4  mt-1 md:mt-4 text-xl md:text-4xl  w-2/3 md:w-5/6 bg-[#FBF0C2] bg-opacity-30 ${"hover:text-white rounded-card text-general transition-all  bg-accent hover:bg-black hover:border hover:border-accent"
                    }  flex items-center justify-center `}
                >
                {`AVAIL NOW FOR RS ${item.fees}` }
                {<span><img src={arrow} alt="" className="scale-50 md:scale-100" /></span>}
                </button>
                </div>  
            </div>  
            );
          })}
        </div>  
        {!error && details !== null && fileteredEvents?.length === 0 && (
          <div className="text-center text-red-500 p-2 border border-red-500">
            <p>No Combo yet!</p>
          </div>
        )}
        {details === null && (
          <div className="text-center text-red-500 p-2 border border-red-500">
            <p>No Combo yet!</p>
          </div>
        )}
      </div>
  );

}
export default Combos;