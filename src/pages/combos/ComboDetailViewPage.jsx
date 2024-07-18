import React, { useEffect, useState,useRef ,useContext} from "react";
import EventDetailsCard from "../../components/events/EventDetailsCard.jsx";
import FaQ from "../../components/faq/Faq.jsx";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../constants/urls.js";
import logoHestia from "../../assets/icons/logo_hestia.png";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../styles/hero.css";
import "../../styles/home.css";
import Hero from "../../components/home/Hero.jsx";
import technicalsBackground from "../../assets/images/categoryBackgrounds/technicals.jpg"
import culturalsBackground from "../../assets/images/categoryBackgrounds/culturals.png"
import informalsBackground from "../../assets/images/categoryBackgrounds/informals.jpg"
import proshowsBackground from "../../assets/images/categoryBackgrounds/proshows.png"
import workshopBackground from "../../assets/images/categoryBackgrounds/workshop.jpg"
import redbull from "../../assets/images/Events/red_bull.png"
import { LoaderContext } from "../../context/loader.jsx";
function ComboDetailViewPage(props) {
  const { setLoader } = useContext(LoaderContext);


  const shadowColor = { lex: "rgba(0, 16, 14", leo: "rgba(0,0,0", loki: "rgba(226, 203, 173" };
  const {slug} = useParams();
  const [bg, setBg] = useState("");
  const [date, setDate] = useState(null);
  const category = props.category;
  const {
    error,
    isPending,
    data: eventDetails,
  } = useFetch(BASE_URL + "/api/events/event/" + slug);
  useEffect(() => {
    console.log(props);
    console.log(slug);

  }, [])


  useEffect(() => {
    const date_ = new Date(eventDetails?.event_start)
    setDate(date_);
  }, [eventDetails])
  return (
    <div 
      className="relative w-full  grid-background font-Geomanist ">
      {
        eventDetails !== null ?
        <Hero title={eventDetails.title}  keyC={1} />
        :
        <div className={` h-screen w-screen bg-black z-[999] fixed flex justify-center items-center`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img className="animate-spin  " src={logoHestia}/>
          </div>
        </div>

      }
      {eventDetails !== null &&
        <div className="lg:h-screen py-10 hero-section">
          {/*<div className="w-full flex justify-end items-center px-5">
            <img src={redbull} className="w-8" />
            <p className="text-general opacity-[0.8] ml-2 text-sm whitespace-nowrap">X 1</p>
            <p className="text-general opacity-[0.8] ml-4 text-sm">Reg'd participants with {">"}₹500 registration fee, gets a  free drink</p>
      </div>*/}
          <EventDetailsCard eventDetails={eventDetails} />
        </div>
      }
      {eventDetails !== null && eventDetails?.faqs && <FaQ questions={eventDetails.faqs} />}

    </div>
  );
}

export default ComboDetailViewPage;
