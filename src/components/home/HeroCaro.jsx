import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

const HeroCaro = () => {

  function getExpandedCategory(short) {
    if (short === "W") return "events/workshops/";
    if (short === "T") return "events/technical/";
    if (short === "G") return "events/general/";
    if (short === "F") return "/events/future/";
    if (short === "M") return "/events/merchandise/";
  }
  
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 100,
    cssEase: "linear",
    swipeToSlide : true,
    swipe: true,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed : 4000
        }
      }
    ]

  };

  const nav = useNavigate();

    const {error,isPending,data: trendeve} = useFetch(BASE_URL + "/api/events/trending/");

  
   const handleClick =(item) =>
   {

    console.log(getExpandedCategory(item.event.event_category));
   

    nav(getExpandedCategory(item.event.event_category)+ item.event.slug);
   }    


  

  const renderSlides = () => {
    if(trendeve && trendeve.results)
    {
    return trendeve.results.map((item) => (
      <div key={item.id} className=" h-[275px]  text-white rounded-[45px] text-center md:mb-0 hover:cursor-pointer" onClick={()=>handleClick(item)}>
        <div className="opacity-95 mx-8 h-full rounded-[79px] border-8 border-black ">

          <img src={item.event.image} className="object-cover w-full h-full rounded-[70px] " alt={item.event.title} />
        </div>

      </div>
    ));
  }
};

  return (
    <div className="slider-container mt-10 ">
      <p className="text-5xl  md:text-6xl lg:text-8xl text-center my-5 font-semibold uppercase px-2" style={{ fontFamily: "CharlieDotted", color: "#741BD4" }}>Trending events</p>
      <Slider {...settings} >
        {renderSlides()}
      </Slider>
    </div>
  );
};


export default HeroCaro




/*
var list1 = [
  {
    id:1,
    img:'../home/dude.jpeg'
  },
  {
    id:2,
    img:'../home/dude_2.jpeg'
  },
  {
    id:3,
    img:'../home/dude_3.jpeg'
  },
  {
    id:4,
    img:'../home/dude_4.jpeg'
  },
 
];

*/