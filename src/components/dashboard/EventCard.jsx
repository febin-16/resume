import React from 'react';
import { shortenString } from '../../utils/string';
import { useNavigate } from "react-router-dom";
function EventCard(props) {
    const navigate = useNavigate();  
    const getDate = (iso) => {
    const date = new Date(iso);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const dayWithSuffix = addOrdinalSuffix(day);
    
    const formattedDate = `${dayWithSuffix} ${month}`;
    
    return formattedDate;
    };

    const addOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return day + 'th';
        switch (day % 10) {
            case 1:  return day + "st";
            case 2:  return day + "nd";
            case 3:  return day + "rd";
            default: return day + "th";
        }
    };

    function extractTimeFromISO(isoString) {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
        
        return formattedTime;
    }

    function handlePath()
    {
        let slug="";
        switch (props?.event?.event_category) {
            case "T":
              slug="technical";
              break;
            case "C":
                slug="cultural";
              break;
            case "W":
                slug="workshop";
              break;  
            case "G":
                slug="general";
      
              break;
            case "PR":
                slug="proshow";
      
              break;
            // code block
          }
          navigate(`/events/${slug}/${props?.event?.slug}`)
    }
    return (
        <div className={`w-[300px] h-[500px] flex-col  my-3 rounded-xl flex items-center  bg-primary-light justify-self-center`}>
            <div className='w-[95%] '>
            <div className={`border-[1px] border-[#FBF0C2] w-full h-[50%] bg-primary-light overflow-hidden  rounded-t-xl`}>
                <img src={props.event?.image} className="w-full" />
            </div >
            {/* <div className="flex items-center w-full justify-center">
                <img src={props.event?.image} className="md:w-full h-30  -mt-20" />
            </div> */}
            <div className={`border-[1px] border-[#FBF0C2] rounded-b-xl flex bg-[#111111] bg-opacity-75 flex-col justify-between h-[50%] p-3 items-start w-full`}>
                <div className={`${props.latest_events ? "w-4/5 overflow-y-scroll hideScrollBar" : "w-full overflow-y-scroll hideScrollBar"}`}>
                    <p className='w-full text-left text-gray-100 opacity-[0.5]'>{getDate(props.event?.event_start)} , {extractTimeFromISO(props.event?.event_start)}</p>
                    <p className='w-full text-left mt-2 font-semibold text-white text-lg'>{props.event?.title}</p>
                    <p className='w-full text-left mt-2 text-white text-sm opacity-[0.7]  '> {shortenString(props.event?.desc, 140)}.....</p>
                </div>
                 <div className='w-full flex justify-center '>

                    <button onClick={handlePath} className='w-full bg-[#FBF0C2] text-center text-black py-2 rounded-xl text-xl font-bold hover:scale-[1.03]'><p>VIEW MORE</p></button>
                </div> 
            </div>
            </div>
        </div >
    );
}

export default EventCard;