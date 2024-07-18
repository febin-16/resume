import React, { useRef, useEffect, useState, useContext } from "react";
import About from "../../components/home/About.jsx";
import LatestEvents from "../../components/home/LatestEvents.jsx";
import MainHero from "../../components/home/MainHero.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "../../styles/home.css";
import PastEvents from "../../components/home/PastEvents.jsx";
import Proshow from "../../components/home/Proshow.jsx";
import Events from "../../components/home/Events.jsx";
import FaQ from "../../components/faq/Faq.jsx";
import { AlertBar } from "../../components/home/AlertBar.jsx";
import { BASE_URL } from "../../constants/urls.js";
import GetApp from "../../components/home/GetApp.jsx";
import Carousel from "../../components/home/HeroCarousel.jsx";
import { DialogPopup } from '../../context/dialog.jsx';
import { ModalContext } from "../../context/modal.jsx";
import { PopUpContext } from "../../context/popup.jsx";
import { UserContext } from "../../context/user.jsx";


const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const { showDialog } = useContext(DialogPopup);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  useEffect(() => {
   
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/contact/faq`);
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);


  const getAppRef = useRef(null);
  useEffect(() => {

    console.log("dwqdwq", localStorage.getItem('firstTimeUser'));
    const val = localStorage.getItem('firstTimeUser');
    if (val != null) {
      setFirstTimeUser(false);
    } else {
      document.body.style.overflowY = 'hidden'
      setFirstTimeUser(true);

    }
    // if (localStorage.getItem('firstTimeUser') == true) {


    // }
  }, []);

  const handlePopupClose = () => {

    localStorage.setItem('firstTimeUser', true);
    console.log('okayokay', localStorage.getItem('firstTimeUser'));

    if (getAppRef.current) {
      setFirstTimeUser(false);
      document.body.style.overflowY = "scroll";
      getAppRef.current.scrollIntoView({ behavior: 'smooth' });
    }


  }

  const handleClose = () =>{
localStorage.setItem('firstTimeUser', true);
console.log('okayokay', localStorage.getItem('firstTimeUser'));

if (getAppRef.current) {
  setFirstTimeUser(false);
  document.body.style.overflowY = "scroll";
  //getAppRef.current.scrollIntoView({ behavior: 'smooth' });
}
   }


  return (
    <div className=" w-full max-w-screen overflow-hidden h-full grid-background " >
      <div>

      {firstTimeUser && (
          <div className="h-screen w-screen flex absolute top-0 left-0 justify-center items-center bg-black z-[100] bg-opacity-60">

            <div style={{ fontFamily: 'CharlieDotted', color: '#FBF0C2' }} className="flex text-lg  flex-col items-center justify-center"  >
             
              <div className="relative w-fit h-fit p-4 border rounded-sm flex flex-col items-center  bg-black">
              <i className="pi pi-times right-2 top-2 absolute" onClick={()=>{handleClose()}}></i>
              <h2>Welcome!</h2>
                <p>Hestia'24 App is Out Now !!</p>
                <button className="mt-3 text-center border rounded px-2 py-1 hover:bg-violet-950" onClick={() => { handlePopupClose() }}>Checkout</button>
              </div>
            </div>
          </div>
        )}
        {/* <HomePage1/> */}

        <>
          <MainHero title={"Hestia"} subtitle={"PIXEL PEAK : FROM BITS TO BEATS"} keyC={1} />
          <Carousel />
          <About />
          {/* <Events /> */}
          <Proshow />


          <PastEvents />
          <div ref={getAppRef}>
            <GetApp />
          </div>
          {/* <AlertBar /> */}
          <FaQ questions={questions} />
        </>


      </div>
    </div>

  )
}

export default HomePage;