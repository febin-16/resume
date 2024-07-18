
import { useState, useEffect } from "react";
import Marquee from "../Marquee/Marquee";
import img1 from "../../assets/images/pastEvents/img1.jpg"
import img4 from "../../assets/images/pastEvents/img4.jpg"
import img6 from "../../assets/images/pastEvents/img6.jpg"
import img2 from "../../assets/images/pastEvents/img2.JPG"
import img3 from "../../assets/images/pastEvents/img3.JPG"
import img5 from "../../assets/images/pastEvents/img5.JPG"
import img7 from "../../assets/images/pastEvents/img7.JPG"
import img8 from "../../assets/images/pastEvents/img8.JPG"
import img9 from "../../assets/images/pastEvents/img9.JPG"
import img10 from "../../assets/images/pastEvents/img10.JPG"
import img11 from "../../assets/images/pastEvents/img11.JPG"
import img12 from "../../assets/images/pastEvents/img12.JPG"
import img13 from "../../assets/images/pastEvents/img13.JPG"
import img14 from "../../assets/images/pastEvents/img14.JPG"
import img15 from "../../assets/images/pastEvents/img15.JPG"
import img16 from "../../assets/images/pastEvents/img16.JPG"
import img17 from "../../assets/images/pastEvents/img17.JPG"
import img18 from "../../assets/images/pastEvents/img18.JPG"
import img19 from "../../assets/images/pastEvents/img19.JPG"
import img20 from "../../assets/images/pastEvents/img20.JPG"
import img21 from "../../assets/images/pastEvents/img21.JPG"
import img22 from "../../assets/images/pastEvents/img22.JPG"
import img23 from "../../assets/images/pastEvents/img23.JPG"
import img24 from "../../assets/images/pastEvents/img24.JPG"
import img25 from "../../assets/images/pastEvents/img25.JPG"
import img26 from "../../assets/images/pastEvents/img26.JPG"
import img27 from "../../assets/images/pastEvents/img27.JPG"
import img28 from "../../assets/images/pastEvents/img28.JPG"

const images = [

  {
    src: img1,
    alt: "Image 1",
  },
  {
    src: img2,
    alt: "Image 2",
  },
  {
    src: img3,
    alt: "Image 1",
  },
  {
    src: img4,
    alt: "Image 1",
  },
  {
    src: img5,
    alt: "Image 2",
  },
  {
    src: img6,
    alt: "Image 1",
  },
  {
    src: img7,
    alt: "Image 1",
  },
  {
    src: img8,
    alt: "Image 2",
  },
  {
    src: img9,
    alt: "Image 1",
  },
  {
    src: img10,
    alt: "Image 1",
  },
  {
    src: img11,
    alt: "Image 2",
  },
  {
    src: img12,
    alt: "Image 1",
  },
  {
    src: img13,
    alt: "Image 1",
  },
  {
    src: img14,
    alt: "Image 2",
  },
  {
    src: img1,
    alt: "Image 1",
  },


];

const imagesClass2 = [

  {
    src: img15,
    alt: "Image 1",
  },
  {
    src: img16,
    alt: "Image 2",
  },
  {
    src: img17,
    alt: "Image 1",
  },
  {
    src: img18,
    alt: "Image 1",
  },
  {
    src: img19,
    alt: "Image 2",
  },
  {
    src: img20,
    alt: "Image 1",
  },

  {
    src: img21,
    alt: "Image 1",
  },
  {
    src: img22,
    alt: "Image 2",
  },
  {
    src: img23,
    alt: "Image 1",
  },

  {
    src: img24,
    alt: "Image 1",
  },
  {
    src: img25,
    alt: "Image 2",
  },
  {
    src: img26,
    alt: "Image 1",
  },
  {
    src: img27,
    alt: "Image 1",
  },
  {
    src: img28,
    alt: "Image 2",
  },

];




const PastEvents = () => {
  const [delay, setDelay] = useState(150);
  const [windowSize, setWindowSize] = useState("220px");

  useEffect(() => {
    if (window.innerWidth > 768) {
      setWindowSize("280px");
    } else {
      setWindowSize("200px");
    }
  }, []);
  return (
    <div className="bg-black max-h-[400px] md:max-h-[600px] overflow-hidden">
      <div className=" relative flex flex-col  items-center">
        <div className="absolute top-[25%] md:top-[20%] z-20">
          <h1 className=" text-[50px] md:text-[100px]  text-gray-200 hover:text-[#FBF0C2]" style={{ fontFamily: 'CharlieDotted' }} >EXPLORE HESTIA</h1>
        </div>
        <Marquee ltr delay={delay} windowSize={windowSize} elements={images} />
        <Marquee delay={delay} windowSize={windowSize} elements={imagesClass2} />
        <Marquee delay={delay} windowSize={windowSize} elements={images} />
        <Marquee ltr delay={delay} windowSize={windowSize} elements={imagesClass2} />
      </div>
    </div>
  );
};

export default PastEvents;
