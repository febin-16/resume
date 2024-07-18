import React, {
  useEffect,
  useRef,
  useState,
  useContext
} from "react";
import { Link, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";


import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
import arrow from "../../assets/images/merch/arrow.png"
import tshirt from "../../assets/images/merch/new1.png"
import tshirt2 from "../../assets/images/merch/tshirt2.jpg"
import "../../styles/hero.css";
import "../../styles/home.css";

import { LoaderContext } from "../../context/loader.jsx";
import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../constants/urls.js";
import { UserContext } from "../../context/user.jsx";
import { getUserDetailsAPI } from "../../services/user.js";
import { registerMerchAPI } from "../../services/registration.js";
import { DialogPopup } from "../../context/dialog";
import { PopUpContext } from "../../context/popup";
import { ModalContext } from "../../context/modal";
import gatewayResolver from "../../utils/razor-pay-utils.js";

function Merchandise({ title, subtitle, keyC }) {

  const {
    error,
    isPending,
    data: merchs,
  } = useFetch(BASE_URL + "/api/merchandise/list/");

  const navigate = useNavigate();
  const [size, setSize] = useState('');
  const { tokenState, userState } = useContext(UserContext);
  const [userDetails, setUserDetails] = userState;
  const [token, setToken] = tokenState;
  const { showState } = useContext(ModalContext);

  const { showDialog } = useContext(DialogPopup);
  const { popUpState, contentState, clearContent } = useContext(PopUpContext);
  const [show, setShow] = showState;

  const handleClick = async (e) => {
    e.preventDefault();

    if (token !== null) {

      if (size != '') {
        // if (state.team_id===null){
        try {
          const userResponse = await getUserDetailsAPI(token);
          if (userResponse.status === 200) {
            const user = await userResponse.json();
            console.log(user)
            if (user.is_completed) {
              const obj = {
                "size": size,
                "type": "R",
                "sleeve": "F",
                "merchandise": 1
              }
              const response = await registerMerchAPI(token, obj);
              console.log(obj, response)
              if (response.status === 200) {
                // indivigual event
                const resp = await response.json();
                gatewayResolver(resp);
                setShow(false);
                navigate({ pathname: resp.url });
                console.log("oohoo", resp)

              } else if (response.status === 202) {

                showDialog("Registered successfully", "Success");
                // clearContent();
                // navigate("/events");
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
      }
      else {
        showDialog("Select the size", "Info");
      }
      // }else{
      //     navigate('team_details',{state:{team_id:state.team_id}});
      // }
    } else {

      showDialog("Login before registration", "Info");
      navigate("/loginPage");


    }


  }

  console.log(size)
  const { setLoader } = useContext(LoaderContext);
  const colors =
    ["#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#000000",
      "#00071",
      "#000003",
      "#111111",
      "#222222",
      "#333333",
      "#741BD4",
      "#741BD4",
      "#741BD0",
      "#741BD7",
      "#333333",
      "#666666",
      "#9F4FFF",
      "#F3E8BB"
    ];
  const colors2 = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000003",
    "#333333",
    "#111111",
    "#222222",
    "#333333",
  ];

  const heroSectionRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);


  useEffect(() => {
    setLoader(true);
    if (heroSectionRef.current) {
      setHeroWidth(heroSectionRef.current.offsetWidth);
      setHeroHeight(heroSectionRef.current.offsetHeight);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    const numGridItems = gridItems.length;

    const updateGridItemColors = () => {
      for (let i = 0; i < numGridItems; i++) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        while (gridItems[i] && gridItems[i].style.backgroundColor === color) {
          color = colors[Math.floor(Math.random() * colors.length)];
        }
        gridItems[i] && (gridItems[i].style.backgroundColor = color);
      }
    };

    // Update the grid item colors every 1 second
    const intervalId = setInterval(updateGridItemColors, 2000);

    // Clear the interval if the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [heroWidth, heroHeight]);



  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");
    const numGridItems = gridItems.length;

    for (let i = 0; i < numGridItems; i++) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      while (gridItems[i] && gridItems[i].style.backgroundColor === color) {
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      gridItems[i] && (gridItems[i].style.backgroundColor = color);
    }

  }, [heroWidth, heroHeight]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroSectionRef.current) {
        setHeroWidthScroll(heroSectionRef.current.clientWidth);
        setHeroHeightScroll(heroSectionRef.current.clientHeight);
      }
      if (scrollY > 0) {
        gsap.to(".grid-item", {
          backgroundColor: () => colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  function renderGridItems() {
    const gridSize = 10; // Size of each grid item
    const numCols = Math.ceil(heroWidth / gridSize);
    const numRows = Math.ceil(heroHeight / gridSize);
    const totalGridItems = numCols * numRows;
    const gridItems = [];

    for (let i = 0; i < totalGridItems / 17; i++) {
      gridItems.push(<div className="grid-item opacity-15" key={i}></div>);
    }

    return gridItems;
  }

  return (
    <div className="hero-section relative flex flex-col items-center grid-background" >
      <div
        className="pl-[2%] md:pl-[1%]  grid-container w-full h-[660px] overflow-y-hidden max-h-screen md:h-screen hero-section"
        ref={heroSectionRef}
      >
        {renderGridItems()}
      </div>

      <div className="absolute top-64 text-center flex flex-col">
        <h1 className="text-6xl md:text-[160px] lg:text-[200px]" style={{ fontFamily: 'CharlieDotted', color: '#FBF0C2' }}>Merchandise</h1>
        <p className="text-md md:text-5xl mt-0 md:mt-10" style={{ fontFamily: 'Bungee', color: '#FBF0C2', letterSpacing: '0.2em' }}>Claim your <span className="text-[#6913C7]">merchs</span> now !!</p>
      </div>
      <div className="relative -mt-48 md:-mt-0  flex flex-col justify-center items-center h-auto w-screen bg-[#6913C7] grid-background">
        <div className="absolute top-[-4%] md:top-[-9%] lg:top-[-22%] right-16 md:right-72 w-12 h-12 md:3-36 md:h-36 lg:w-48 lg:w-48">
          <img className="hidden md:block" src={arrow} alt="arrow"></img>
        </div>
        <div className="  flex justify-center items-center md:items-end  w-[400px] md:w-[800px] h-[300px] md:h-[600px]  mt-[-50px] ">
          <img src={tshirt} alt="Black t-shirt" className="w-[500px] md:w-[800px] h-[260px] md:h-[550px] object-cover" />
          {/* src={merchs?.results[0].image}  */}
        </div>


        <div className="h-3 md:h-5 w-full bg-[#FBF0C2]"></div>
        <div className="flex md:flex-row justify-between w-screen space-y-1 flex-col  ">
          <div className="tracking-wider flex flex-col text-xl md:mt-10 md:text-2xl ml-5 md:ml-10 text-center md:text-left" style={{ fontFamily: 'Bungee', color: '#FBF0C2', letterSpacing: '0.4em' }}>
            <h3>Last Date</h3>
            <h1 className="md:text-3xl md:mt-5 ">25 TH APRIL</h1>
          </div>
          <div className="h-auto md:h-64 bg-[#F3E8BB] flex flex-col md:flex-row gap-8 justify-between" style={{ fontFamily: 'Bungee', }}>
            <div className="flex flex-row gap-16 mr-16 ">
              <div className="md:hidden md:ml-10 w-20 bg-[#6913C7] grid-background h-full"></div>
              <div className="md:hidden w-20 bg-[#6913C7] grid-background h-full"></div>
              <div className="w-20 bg-[#6913C7] grid-background h-full"></div>

              <div className="w-16 bg-[#6913C7] grid-background h-full"></div>
              <div className="w-16 bg-[#6913C7] grid-background h-full"></div>
            </div>

            <div className="text-[#6913C7] text-xl md:text-2xl mt-5 md:mt-3  flex flex-col gap-1 " >
              <h1 className="text-center md:text-left ml-0 md:mr-10 " style={{ letterSpacing: '0.2em' }}>AVAILABLE SIZES</h1>
              <div className="flex flex-wrap gap-2 md:gap-4 text-xl md:text-3xl md:justify-start justify-center mb-5 ml-0 md:mr-10">
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'XS' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('XS')}>XS</button>
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'S' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('S')}>S</button>
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'M' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('M')}>M</button>
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'L' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('L')}>L</button>
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'XL' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('XL')}>XL</button>
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'XXL' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('XXL')}>XXL</button>
                <button className={` border-4 border-[#6913C7] text-[#6913C7]  px-2 md:px-4 rounded-3xl ${size === 'XXXL' ? 'bg-[#6913C7] text-[#F3E8BB]' : 'hover:bg-[#6913C7] hover:text-[#F3E8BB]'} `} onClick={() => setSize('XXXL')}>XXXL</button>
              </div>
            </div>

          </div>
          <div className=" md:ml-10 py-5 md:py-10 flex flex-col mb-0 md:mb-10 mr-5 md:mr-10" style={{ fontFamily: 'Bungee', color: '#FBF0C2' }}>
            <p className="text-center text-3xl md:text-6xl" style={{ letterSpacing: '0.2em' }}>&#8377;{merchs?.results[0].price}</p>
            <a target="_blank" href="https://bit.ly/Hestia24_Tshirt" className="mx-auto border-4  border-[#FBF0C2] text-[#FBF0C2] py-2 px-2 rounded-3xl hover:bg-white hover:text-[#6913C7] hover:border-white mt-5">
              <button  className="text-2xl" >GRAB NOW ↗</button>
            </a>
          </div>
        </div>
      </div>
      <div className="h-8 md:h-16 w-screen"></div>
      {/* <div className="h-auto md:h-64 w-screen bg-[#F3E8BB] flex flex-col md:flex-row gap-8 justify-between" style={{ fontFamily: 'Bungee', }}>
        <div className="text-[#6913C7] text-xl md:text-5xl mt-5 md:mt-10 flex flex-col gap-5 " >
          <h1 className="text-center md:text-left ml-0 md:ml-10 " style={{ letterSpacing: '0.2em' }}>AVAILABLE SIZES</h1>
          <div className="flex flex-row gap-2 md:gap-8 text-xl md:text-4xl md:justify-start justify-center ml-0 md:ml-10">
            <button className="border-4 border-[#6913C7] text-[#6913C7] md:py-2 px-2 md:px-4 rounded-3xl hover:bg-[#6913C7] hover:text-[#F3E8BB]">S</button>
            <button className="border-4 border-[#6913C7] text-[#6913C7] md:py-2 px-2 md:px-4 rounded-3xl hover:bg-[#6913C7] hover:text-[#F3E8BB]">M</button>
            <button className="border-4 border-[#6913C7] text-[#6913C7] md:py-2 px-2 md:px-4 rounded-3xl hover:bg-[#6913C7] hover:text-[#F3E8BB]">L</button>
            <button className="border-4 border-[#6913C7] text-[#6913C7] md:py-2 px-2 md:px-4 rounded-3xl hover:bg-[#6913C7] hover:text-[#F3E8BB]">XL</button>
            <button className="border-4 border-[#6913C7] text-[#6913C7] md:py-2 px-2 md:px-4 rounded-3xl hover:bg-[#6913C7] hover:text-[#F3E8BB]">XXL</button>
          </div>
        </div>
        <div className="flex flex-row gap-16 mr-16">
          <div className="w-16 bg-[#6913C7] grid-background h-full"></div>
          <div className="w-16 bg-[#6913C7] grid-background h-full"></div>
          <div className="w-16 bg-[#6913C7] grid-background h-full"></div>
          <div className="w-16 bg-[#6913C7] grid-background h-full"></div>
        </div>
      </div> */}
      <div className="grid-background w-screen h-8 md:h-16" />
    </div>
  );
}

export default Merchandise;
