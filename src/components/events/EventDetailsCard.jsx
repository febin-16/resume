import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { registerEventAPI } from "../../services/registration.js";
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
import CashfreePaymentResolver from "../../utils/cashfree.jsx";


function EventDetailsCard({ eventDetails }) {
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

  // const {
  //   error,
  //   isPending,
  //   data: eventDetails,
  // } = useFetch(BASE_URL + "/api/v1/event/" + params.slug);
  let error = "";
  // let eventDetails = {
  //   id: "689998",
  //   image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/dj-flyer-template-design-be97f51fd114dea20cf6e1ccab137c48_screen.jpg?ts=1637007043",
  //   title: "My Event Title",
  //   short_desc: "A short description of my event",
  //   prize: "1000 USD",
  //   fees: "50 USD",
  //   min_members_in_team: 1,
  //   max_members_in_team: 5,
  //   reg_end: "2023-05-01",
  //   desc: "A longer description of my event jd skdj skdj skjfslkjda lksjflks sdjkfsk alosh ",
  //   guideline_file: "https://example.com/guidelines.pdf",
  //   event_category: "W",
  // };

  // event/register post id if indivigual
  // if team event event/team/

  //200 ind
  // 201 team
  // 202 fees 0
  function navigateToExternalUrl(url) {
    window.location.href = url;
  }
  const handleClick = async (e) => {
    e.preventDefault();
    setShow(true);

    if (eventDetails.event_category === "PR") {
      navigateToExternalUrl(eventDetails.redirect_link);
      return;
    }

    if (token !== null && eventDetails) {
      // if (state.team_id===null){  
      try {
        const userResponse = await getUserDetailsAPI(token);
        if (userResponse.status === 200) {
          const user = await userResponse.json();
          if (user.is_completed) {
            if (!eventDetails.is_team) {
              setLoad(true);
              const formData = new FormData()
              formData.append('event', eventDetails.id)
              formData.append('referral', referral)
              formData.append('coupon', coupon)
              if (eventDetails?.is_file_upload === true) {
                formData.append('user_file', file, file.name)
              }
              //formData.append('gateway', 2)
              const response = await registerEventAPI(token, formData);
              if (response.status === 200) {
                const resp = await response.json();
                CashfreePaymentResolver(resp.
                  payment_session_id,resp.order_id
                  )
                //navigateToExternalUrl(eventDetails.redirect_link);

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
              // team event
              setShow(false);
              if (window.confirm("Continue as team leader?")) {
                navigate(`create_team`, {
                  state: {
                    collect_team_name: eventDetails.collect_team_name,
                    event_name: eventDetails.title,
                    leader: userDetails.email,
                    min_members_in_team: eventDetails.min_members_in_team,
                    max_members_in_team: eventDetails.max_members_in_team,
                    coupon: coupon,
                    referral: referral,

                  },
                });
              }
            }
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
      // }else{
      //     navigate('team_details',{state:{team_id:state.team_id}});
      // }
    } else {

      showDialog("Login before registration", "Info");
      navigate("/loginpage");


    }
  };


  const getDate = (iso) => {
    if (eventDetails.event_category === "PR") {
      return "MAY 4,5 2024"
    }
    const date = new Date(iso);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const dayWithSuffix = addOrdinalSuffix(day);

    const formattedDate = `${month} ${dayWithSuffix} ${year}`;

    return formattedDate;
  };

  const addOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1: return day + "st";
      case 2: return day + "nd";
      case 3: return day + "rd";
      default: return day + "th";
    }
  };
  function extractTimeFromISO(isoString) {
    if (eventDetails.event_category === "PR") {
      return "From 4pm"
    }
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;

    return formattedTime;
  }

  useEffect(() => {
    setLoader(true);
    console.log(eventDetails);
    if (eventDetails) {
      let currentTime = new Date();
      let reg_end = new Date(eventDetails.reg_end)
      if (eventDetails.user_registered) { setDisabled(true); }
      else { setDisabled(false); }
      if (reg_end < currentTime) {
        setEnd(true);
        setDisabled(true);
      }
    }
    setLoader(false);
  }, [eventDetails]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    setLoader(true);
    window.scrollTo(0, 0);
    setLoader(false);
  }, [])

  return (
    <div className="h-full w-full md:px-4 pt-3 flex justify-center text-white">


      {error && <div>{error}</div>}
      {/* { isPending && <h3 className="text-center text-ssmall">Loading...</h3> } */}

      {eventDetails && (
        <form disabled={disabled} onSubmit={handleClick} className=" rounded-lg border-[#FBF0C2] md:border  shadow-cardShadow w-full h-full  flex flex-col md:flex-row ">
          <div className="md:p-4  rounded-lg w-full overflow-hidden relative h-1/2   md:w-1/2  md:h-full flex items-center justify-center"  >
            <img
              alt=""
              src={eventDetails.image}
              className="rounded-lg absolute top-0 left-0 object-cover w-full h-full z-0 blur-lg opacity-[0.2]"
            />
            <img
              className="rounded-lg  h-full    overflow-hidden object-fit z-[2]"
              src={eventDetails.image}
              alt="pic"
            />
          </div>
          <div className="w-full   md:text-justify md:w-1/2 flex flex-col">
            <div className=" no-scrollbar h-[25rem] md:h-4/6 w-full  px-2 mr-4 md:px-10 py-2 " style={{ fontFamily: 'bungee', color: '#FBF0C2' }}>
              {eventDetails.event_category === "PR" &&
                <div className="flex flex-col mt-10 text-xs items-center">   <h1 className='text-center text-red-800' style={{ fontFamily: "azonix" }}>Disclaimer!</h1>
                  <p className='text-center text-red-800' style={{ fontFamily: "azonix" }}>Pro show tickets are for Students Only</p></div>}
              <div className="flex flex-col w-full h-full overflow-y-scroll hideScrollBar justify-between px-2 md:pr-4 py-5">
                <p className="pl-2 md:pl-4 text-xl">ABOUT</p>
                <p className="pl-2 md:pl-4 mt-2 opacity-[0.6]  text-base ">{eventDetails.desc}</p>
                {eventDetails?.guideline_file !== null &&
                  <a href={eventDetails?.guideline_file} download className=" border p-2 w-fit mt-2 opacity-[0.6] underline">guidelines</a>

                }
                {params.category !== "future" ? <>
                  <p className="pl-2 md:pl-4 text-xl mt-10">VENUE</p>
                  <p className="pl-2 md:pl-4 pt-2 opacity-[0.6] font-normal">{eventDetails.venue.title}</p>
                </> : <>
                  <p className="pl-2 text-xl mt-10">SIZE</p>
                  <p className="pl-2 mt-2 opacity-[0.6] font-normal">{eventDetails.short_title} </p>
                </>}

                <div className="flex flex-col items-start justify-between mt-10">
                  <div className="flex flex-col md:flex-row  justify-around">
                    <div className="flex flex-col items-start px-2 md:px-2">
                      <p className="text-xl uppercase font-light">{"TIME"}</p>
                      <p className="text-2xl md:text-3xl md:mt-3 text-accent font-bold font-anton" style={{ color: '#3A0A6E' }}>{extractTimeFromISO(eventDetails.event_start)}</p>
                    </div>
                    <div className="flex flex-col items-start px-2 md:px-16">
                      <p className="text-xl uppercase font-light">{"DATE"}</p>
                      <p className="text-2xl md:text-3xl md:mt-3  tracking-tight text-accent font-bold font-anton" style={{ color: '#3A0A6E' }}>{getDate(eventDetails.event_start)}</p>
                    </div>
                    <div className="flex flex-col items-start px-2 md:px-2">
                      <p className="text-xl uppercase font-light">{params.category === "future" ? "Price" : "Reg Fees"}</p>
                      <p className="text-2xl md:text-3xl md:mt-3 text-accent font-bold font-anton" style={{ color: '#3A0A6E' }}>{eventDetails.fees > 0 ? "Rs " + eventDetails.fees / 100 : "Free"}</p>
                      <p>{!eventDetails.is_fees_team && eventDetails.is_team ? "/per head" : eventDetails.is_team ? "/per team" : "/per head"}</p>
                    </div>

                  </div>
                  {(eventDetails.prize && (eventDetails.prize > 0)) ?
                    <>
                      <div className="flex flex-col items-start px-2 md:px-4">
                        <p className="text-xl font-light">Prize worth</p>
                        <p className="text-2xl md:text-5xl md:mt-3 text-accent font-bold " style={{ color: '#3A0A6E' }}>Rs {parseFloat(eventDetails.prize / 1000)}k</p>
                      </div>
                    </>
                    :
                    <></>
                  }
                </div>
                {
                  (eventDetails.coordinator_1 !== null || eventDetails.coordinator_2 !== null) &&
                  <p className="text-xl mt-10">CONTACT</p>
                }
                <div className="flex flex-col  justify-between mt-3 opacity-[0.6] mb-10">
                  {eventDetails.coordinator_1 !== null && <div className="flex flex-col md:flex-row md:items-center">
                    <a className="flex items-center justify-between  opacity-[0.6] " aria-label="Chat on WhatsApp" href={`https://wa.me/${eventDetails.coordinator_1.phone_number}`} target="_blank" >
                      <p className="text-xl font-light">{eventDetails.coordinator_1.name}</p>
                      <p className="md:ml-5">{eventDetails.coordinator_1.phone_number}</p>
                    </a>
                  </div>}

                  {eventDetails.coordinator_2 !== null && <div className="flex flex-col md:flex-row md:items-center">
                    <a className="flex items-center justify-between mt-3 opacity-[0.6] mb-10" aria-label="Chat on WhatsApp" href={`https://wa.me/${eventDetails.coordinator_2.phone_number}`} target="_blank" >
                      <p className="text-xl font-light">{eventDetails.coordinator_2.name}</p>
                      <p className="md:ml-5">{eventDetails.coordinator_2.phone_number}</p>
                    </a>
                  </div>}



                </div>

                {(eventDetails?.is_file_upload === true && eventDetails?.is_team === false) &&
                  <div className="flex flex-col mb-5">
                    <p className="text-xl font-light mb-1">upload file</p>
                    <input required type="file" onChange={handleFileChange} />
                  </div>

                }
                {(params.category !== "future" && eventDetails?.is_team === false) && (
                  <div className="w-full  flex flex-col items-center justify-center font-bold text-small ">
                    {eventDetails.coupon_available ? <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon" className="w-full border-b border-accent px-3 py-2 bg-transparent rounded font-light text-accent outline-none placeholder-[#444] text-[#444] font-normal" /> : " "}
                    {eventDetails.fees != 0 ? <input value={referral} onChange={(e) => setReferral(e.target.value)} placeholder="Referral" className="w-full mt-10 border-b border-accent px-3 py-2 bg-transparent rounded font-light text-accent outline-none placeholder-[#444] text-[#444] font-normal" /> : ""}

                  </div>
                )}


              </div>
            </div>
            <div className="w-full h-1/6 flex flex-col items-center justify-center font-bold text-small ">

              <button
                // disabled={true}
                disabled={disabled}
                type="submit"
                // onClick={handleClick}
                // className={`font-bold px-8 py-2 rounded-xl ${!true? "hover:text-primary-dark hover:bg-yellow-light": "opacity-40"}  flex items-center justify-center `}
                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                className={`rounded-lg border border-1 border-[#FBF0C2] font-bold  md:px-8 py-1 md:py-4 mt-10 text-2xl md:text-4xl  w-2/3 md:w-5/6 bg-[#FBF0C2] bg-opacity-30 ${!disabled
                  ? "hover:text-white rounded-card text-general transition-all  bg-accent hover:bg-black hover:border hover:border-accent"
                  : "opacity-40"
                  }  flex items-center justify-center `}
              >
                {end ? "REGISTRATION CLOSED" : (disabled ? "REGISTERED" : (eventDetails.event_category === 'PR' ? "BOOK NOW" : "REGISTER NOW"))}
                {disabled ? null : <span><img src={arrow} alt="" className="scale-50 md:scale-100" /></span>}
                {/* {disabled ? "REGISTERED" : state.team_id===null?"REGISTER":"VIEW TEAM"} */}
              </button>

            </div>


          </div>
        </form>
      )}
    </div>
  );
}

export default EventDetailsCard;
