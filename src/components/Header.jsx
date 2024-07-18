import React, { useRef, useEffect } from "react";
import "../styles/header.css"

function Header({title,textSize='180px',keyC}) {
    useEffect(()=>{
       
        (async()=>{
            const header = await document.getElementById("headerTextId+"+keyC);
            const headerSvg = await document.getElementById("headerSvgId+"+keyC);
            header.style.fontSize=textSize;
            headerSvg.style.fontSize=textSize;
        })();
      },[textSize,keyC]);

    return (
        <div className='w-full relative py-4 select-none'>
            <svg id={`headerSvgId+${keyC}`} className='headerSvg' viewBox="0 0 1320 250">
                <text id={`headerTextId+${keyC}`} className='headerText' x="50%" y="39%" dy=".35em" textAnchor="middle">
                    {title}
                </text>
            </svg>
        </div>	
    );
  }
  
  export default Header;