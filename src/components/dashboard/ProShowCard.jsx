import React from 'react';
import image from "../../assets/images/dashboard/proshow.png"
import { Link } from 'react-router-dom';

function EventProShowCard(props) {
    return (
        <div className={`w-full group overflow-hidden rounded-lg h-[500px] flex-col bg-gray-800 my-3 flex items-center relative group bg-primary-light justify-self-center relative`}>
            <img src={image} className={`w-full group-hover:scale-[1.2] transition-all rounded-lg opacity-[0.5] h-full bg-primary-dark overflow-hidden absolute top-0 left-0 z-0 object-cover`} />
            <div className={`flex flex-col justify-center h-full items-center p-3 items-start w-full z-10`}>
                {/* <p className='font-bold text-white text-3xl'>COMING SOON</p> */}
                <Link to={'/events/proshows'} className='font-bold text-white text-xs border border-white px-10 rounded py-2 mt-5 hover:scale-[1.03]'><p>CHECK IT OUT</p></Link>
            </div>
        </div >
    );
}

export default EventProShowCard;