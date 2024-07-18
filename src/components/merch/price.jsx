import React,{
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
  } from "react";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import gsap from "gsap";
  gsap.registerPlugin(ScrollTrigger);

  import arrow from "../../assets/images/merch/arrow.png"
  import tshirt from "../../assets/images/merch/tshirt.png"
  import "../../styles/hero.css";
  import "../../styles/home.css";

  function Price({ }) {
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
  
    const carouselRef = useRef(null);
    const [heroWidth, setHeroWidth] = useState(0);
    const [heroHeight, setHeroHeight] = useState(0);
    const [heroWidthScroll, setHeroWidthScroll] = useState(0);
    const [heroHeightScroll, setHeroHeightScroll] = useState(0);
    const [scrolled,setScrolled]=useState(false);
  
    useEffect(() => {
      if (carouselRef.current) {
        setHeroWidth(carouselRef.current.offsetWidth);
        setHeroHeight(carouselRef.current.offsetHeight);
      }
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
        if (carouselRef.current) {
          setHeroWidthScroll(carouselRef.current.clientWidth);
          setHeroHeightScroll(carouselRef.current.clientHeight);
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
  
      for (let i = 0; i < totalGridItems/17; i++) {
        gridItems.push(<div className="grid-item opacity-15" key={i}></div>);
      }
  
      return gridItems;
    }
  
    return (
      <div className="relative flex flex-col items-center grid-background  w-screen h-auto mb-20" >
        <div
          className="pl-[2%] md:pl-[1%]  grid-container w-full "
          ref={carouselRef}
        >
          {renderGridItems()}
        </div>
        <div className="absolute hidden md:block h-24 w-24 top-[-10%] right-96"><img src={arrow}/></div>
        <div className="flex flex-col gap- ">
            <div className="flex flex-row items-center w-48 md:w-[700px] h-48 md:h-[700px] mt-0 md:mt-[-50px]">
                <img src={tshirt}/>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col text-2xl md:text-5xl tetx" style={{ fontFamily: 'azonix',color:'#FBF0C2' }}>
                    <h1>LAST DATE</h1>
                    <h1>10 TH APRIL</h1>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Price;
  