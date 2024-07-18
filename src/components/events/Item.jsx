  import { Button } from "primereact/button";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";

  function Item({ index, backgroundImage, title, content, slug, filterColor, backgroundSize  }) {
    const [hover, setHover] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    `${filterColor}`
    const handleClick = () => {
      if(slug==="proshows")
      {
        navigate(`/events/${slug}/PROSHOW`);
        return;
      }
      navigate(`/events/${slug}`);
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      if (width <= 768) {
        if (index === 1) {
          if (scrollPosition >= 0 && scrollPosition < 20) {
            setHover(true);
          } else {
            setHover(false);
          }
        }
        for (let i = 20, j = 2; j <= 6; i += 200, j++) {
          if (index === j) {
            if (scrollPosition >= i && scrollPosition < i + 200) {
              setHover(true);
            } else {
              setHover(false);
            }
          }
        }
      }
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [scrollPosition]);
    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);
    return (
      <div
        onClick={handleClick}
        className="h-[40vh] w-full lg:h-full overflow-hidden cursor-pointer "
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className=" grid h-full w-full place-items-center">
          <div style={{ backgroundImage: hover ? `url(${backgroundImage})` : `url(${filterColor})`,backgroundSize: backgroundSize }}
            className={`border-white page-header opacity-[0.4]  ${hover ? "block ease-in duration-300 blur-none" : "blur-sm"
              } w-full h-full object-fill ${index === 1
                ? "rounded-r-none"
                : index === 3
                  ? "   rounded-b-none"
                  : index === 4
                    ? " rounded-l-none"
                    : index === 2 && "rounded-none"
              }`} >

          </div>

          <div className={`${hover ? "text-white" : ""} absolute`}>
            <div className="flex items-center justify-center">
              <p className="font-anton mt-14 md:mt-0 text-5xl  tracking-4 text-white  xl:text-8xl h-full capitalize ">
                {title}
              </p>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Item;