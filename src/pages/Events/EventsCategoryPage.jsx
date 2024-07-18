import React, {
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

import Item from "../../components/events/Item";
// import workshopBackground from "../../assets/images/categoryBackgrounds/workshop.jpg"
import technicalsBackground from "../../assets/images/categoryBackgrounds/events/technical.png"
import technicalsBackground_filter from "../../assets/images/categoryBackgrounds/events/technical_mask.png"
import culturalsBackground from "../../assets/images/categoryBackgrounds/events/culturals.png"
import culturalsBackground_filter from "../../assets/images/categoryBackgrounds/events/culturals_mask.jpg"
import informalsBackground from "../../assets/images/categoryBackgrounds/events/informals.png"
import informalsBackground_filter from "../../assets/images/categoryBackgrounds/events/informals_mask.jpg"
import proshowsBackground from "../../assets/images/categoryBackgrounds/events/proshow.png"
import proshowsBackground_filter from "../../assets/images/categoryBackgrounds/events/proshow_mask.png"
import "../../styles/home.css";
import DottedLine from "../../components/home/DottedLine";
import HomeMarque from "../../components/home/HomeMarque";
import "../../styles/hero.css";
import { LoaderContext } from "../../context/loader.jsx";
function EventsCategoryPage(props) {
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
      "#333333",
      "#666666",
      "#000000",
      "#00071",
      "#000003",
      "#111111",
      "#222222",
      "#333333",
      "#040404",
      "#080808",
      "#0F0F0F",
      "#1A1A1A",
      "#262626",
      "#333333"
    ];
  const colors1 =
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
  const heroSectionRef = useRef(null);
  const [heroWidth, setHeroWidth] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [heroWidthScroll, setHeroWidthScroll] = useState(0);
  const [heroHeightScroll, setHeroHeightScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLoader(true)
    if (heroSectionRef.current) {
      setHeroWidth(heroSectionRef.current.offsetWidth);
      setHeroHeight(heroSectionRef.current.offsetHeight);
    }
    setLoader(false)
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

    for (let i = 0; i < totalGridItems / 10; i++) {
      gridItems.push(<div className="grid-item opacity-15" key={i}></div>);
    }

    return gridItems;
  }




  return (
    <div className='mt-24 md:mt-0 relative flex flex-col items-center md:px-5 bg-black' style={{ overflow: 'hidden', fontFamily: 'CharlieDotted', color: '#FBF0C2' }} >
      <div
        className="pl-[2%] md:pl-[1%] grid-container w-full h-screen max-h-screen md:h-screen "
        ref={heroSectionRef}
      >
        {renderGridItems()}
      </div>
      <div className='absolute top-0 h-screen flex flex-col lg:flex-row w-screen' >
        <div className='relative w-screen lg:w-[25%] h-full vertical-text lg:vertical-text'>
          <Item slug={"proshows"} index={1} backgroundImage={proshowsBackground} title={"PROSHOWS"} content={"For exciting workshops"} filterColor={proshowsBackground_filter} />
        </div>
        <div className='w-full lg:w-[25%] h-full vertical-text md:vertical-text'>
          <Item slug={"technical"} index={2} backgroundImage={technicalsBackground} title={"TECHNICAL"} content={"For exciting workshops"} filterColor={technicalsBackground_filter} backgroundSize='cover'/>
        </div>
        <div className='w-full lg:w-[50%] h-full flex flex-col' >
          <div className="h-1/2"  >
            <Item slug={"workshops"} index={3} backgroundImage={informalsBackground} title={"WORKSHOPS"} content={"For exciting workshops"} filterColor={informalsBackground_filter} />
          </div>
          <div className="h-1/2"  >
            <Item slug={"general"} index={4} backgroundImage={culturalsBackground} title={"GENERAL"} content={"For exciting workshops"} filterColor={culturalsBackground_filter} />
          </div>

        </div>
        {/* <div className='w-full lg:w-[33%] h-full vertical-text md:vertical-text'>
        <Item slug={"workshops"} index={3} backgroundImage={informalsBackground} title={"WORKSHOPS"} content={"For exciting workshops"} filterColor={informalsBackground_filter} backgroundSize='cover'/>
        </div>
        <div className='w-full lg:w-[33%] h-full vertical-text md:vertical-text object-fill'>
        <Item slug={"general"} index={4} backgroundImage={culturalsBackground} title={"GENERAL"} content={"For exciting workshops"} filterColor={culturalsBackground_filter} backgroundSize='cover'/>
        </div> */}
      
      </div>
      <DottedLine opacity="mt-[430px] lg:mt-10 opacity-40 w-screen" />
      <DottedLine opacity="opacity-80 w-screen" />
      <HomeMarque className="w-screen" />
      <DottedLine opacity="opacity-80 w-screen" />
      <DottedLine opacity="opacity-40 w-screen" />
      <div className="h-16 md:h-24 flex flex-col">

      </div>
    </div>
  );
}

export default EventsCategoryPage;