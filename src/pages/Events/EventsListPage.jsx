import React, { useState, useEffect, useContext } from 'react'
import EventcardVar2 from '../../components/events/EventcardVar2.jsx';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/urls.js';
import useFetch from "../../hooks/useFetch.js";
import { ModalContext } from '../../context/modal.jsx';
import ListViewEventcard from '../../components/events/ListViewEventcard.jsx';
import sampleImage from "../../assets/images/eventSample/sampleImage.png"
import bgImage from "../../assets/images/eventSample/backgroundProshows.png"
import bgImagev1 from "../../assets/images/eventSample/background.png"
import { Button } from 'primereact/button';
import Eventcard from '../../components/events/Eventcard.jsx';
import Majorcard from '../../components/events/MajorCard.jsx';
import Hero from '../../components/home/Hero.jsx';
import "../../styles/home.css";
import tech from "../../assets/images/Events/Technicals.png"
import culture from "../../assets/images/Events/Culturals.png"

import technicalsBackground from "../../assets/images/categoryBackgrounds/technicals.jpg"
import culturalsBackground from "../../assets/images/categoryBackgrounds/culturals.png"
import informalsBackground from "../../assets/images/categoryBackgrounds/informals.jpg"
import proshowsBackground from "../../assets/images/categoryBackgrounds/proshows.png"
import workshopBackground from "../../assets/images/categoryBackgrounds/workshop.jpg"
import { LoaderContext } from "../../context/loader.jsx";
import "../../index.css";
import NotFoundPage from '../not_found/NotFound.jsx';


const EventsListPage = () => {
  const { category } = useParams();
  const [shortCat, setShortCat] = useState("");

  const [currentDeptId, setCurrentDeptId] = useState(-1);
  const [bg, setBg] = useState("");
  const [search, setSearch] = useState("");
  const { setLoader } = useContext(LoaderContext);
  const circleStyle = {
    background: "#FFD730",
    boxShadow: '0 0 20px #fff, 0 0 30px #FFD730, 0 0 40px #FFD730',
    borderRadius: '50%'
  }
  const shadowColor = { lex: "#00100E", leo: "#000", loki: "#e2cbad" };
  useEffect(() => {
    setLoader(true);
    switch (category) {
      case "workshops":
        setShortCat("W")
        setBg(workshopBackground)
        break;
      case "culturals":
        setShortCat("C")
        setBg(culturalsBackground)
        break;
      case "technical":
        setShortCat("T")
        setBg(technicalsBackground)
        break;
      case "lectures":
        setShortCat("L")
        setBg(informalsBackground)

        break;
      case "general":
        setShortCat("G")
        setBg(informalsBackground)

        break;
      case "proshows":
        setShortCat("PR")
        setBg(proshowsBackground)

        break;
      default:
        setShortCat("")
      // code block
    }
    setLoader(false);

  }, [category])


  const { error, isPending, data: details } = useFetch(BASE_URL + `/api/events/all/?${currentDeptId !== -1 && `dept=${currentDeptId}`}&event_category=${shortCat}`);
  const { error_d, isPending_d, data: departments } = useFetch(BASE_URL + `/api/events/category/${shortCat}/`);



  const fileteredEvents = details !== null && details.results && details.results.filter((item) => {
    return search !== "" ? item.title.toLowerCase().includes(search.toLowerCase()) : item.is_visible==true
  });

  return !["workshops", "culturals", "technical", "general", "proshows"].includes(
    category
  ) ? (
    <NotFoundPage />
  ) : (
    <div className="hero-section grid-background w-full pb-4 md:pb-12  flex flex-col">
        <Hero title={category} />
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
      <div className="hero-section  w-full mt-5 text-white flex flex-row px-4 md:px-5 overflow-x-scroll scrollBar pb-10 select-none" style={{ fontFamily: 'azonix',color:'#FBF0C2' }}>
        <div
          onClick={() => setCurrentDeptId(-1)}
          className={`font-Geomanist cursor-pointer  font-bold border border-accent mt-2 px-5 py-2 rounded ml-5  hover:bg-accent hover:text-white ${currentDeptId === -1 ? "bg-[#741BD4] text-[#FBF0C2]" : "text-general"}`}
        >
          <p className="w-full whitespace-nowrap uppercase">All</p>
        </div>
        {departments !== null && category !== "proshows" && departments?.results?.length > 0 && departments.results.map((item, ind) => {
          return (
            !["S", "M", "L", "XL", "XXL"].includes(item.title) && (
              <div
                onClick={() => setCurrentDeptId(item.id)}
                className={`font-Geomanist ${item.title === "merchandise" && "hidden"} flex items-center justify-center cursor-pointer border border-accent mt-2 px-5 py-2 rounded ml-5 hover:bg-accent font-bold  ${currentDeptId === item.id ? "bg-[#741BD4] text-[#FBF0C2]" : "text-general"}`}
                key={ind}
              >
                <p className=" w-full whitespace-nowrap uppercase">{item.title}</p>
              </div>
            )
          );
        })}
      </div>
      <div className="hero-section grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full px-4 md:px-5 mt-20">
        {!error &&
          fileteredEvents !== null &&
          fileteredEvents?.length > 0 &&
          fileteredEvents.map((item, index) => {
            return (
              <Majorcard
                eventPage
                key={index}
                title={item.title}
                description={item.desc}
                image={item.image}
                category={category}
                id={item.id}
                slug={item.slug}
              />
            );
          })}
        {!error && details !== null && fileteredEvents?.length === 0 && (
          <div className="text-center text-red-500 p-2 border border-red-500">
            <p>No Events yet!</p>
          </div>
        )}
        {details === null && (
          <div className="text-center text-red-500 p-2 border border-red-500">
            <p>No Events yet!</p>
          </div>
        )}
      </div>
    </div>
  );

}
export default EventsListPage