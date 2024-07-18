import React, { useContext, useEffect, useState } from 'react';


import EventcardVar2 from '../../components/events/EventcardVar2.jsx';
import { Link } from 'react-router-dom';

import GoogleAuth from '../../components/auth/GoogleAuth.jsx';
import { UserContext } from '../../context/user.jsx';
import { ModalContext } from '../../context/modal.jsx';
import { getRegisteredEventsAPI } from '../../services/user.js';
import { PopUpContext } from '../../context/popup.jsx';
import useFetchAuth from '../../hooks/useFetchAuth.js';
import { BASE_URL } from '../../constants/urls.js';
import EventCard from '../../components/dashboard/EventCard.jsx';
import EventProShowCard from '../../components/dashboard/ProShowCard.jsx';
import { EditIcon } from '../../assets/svgs/edit.jsx';
import ProfileCard from '../../components/dashboard/ProfileCard.jsx';
import "../../styles/hero.css"
import "../../styles/home.css"
function DashboardPage(props) {

    const { userState, tokenState } = useContext(UserContext);
    // eslint-disable-next-line no-unused-vars
    const [userDetails, setUserDetails] = userState;
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = tokenState;

    const { popUpState, contentState, clearContent } = useContext(PopUpContext);
    // eslint-disable-next-line no-unused-vars
    const [popUp, setPopUp] = popUpState;
    // eslint-disable-next-line no-unused-vars
    const [content, setContent] = contentState;


    const { showState } = useContext(ModalContext);
    const [show, setShow] = showState;

    const [isNewNotification, setIsNewNotification] = useState(true);

    // eslint-disable-next-line no-unused-vars

    const { error, isPending, data: reg_events } = useFetchAuth(BASE_URL + '/api/events/reg/events', token);

    const list = [
        {
            title: "The Cros's",
            desc: "dsakjshdkj",
        },
        {
            title: "sdjh",
            desc: "dsakjshdkj",
        },
        {
            title: "sdjh",
            desc: "dsakjshdkj",
        },

    ];

    const eventList = [
        {
            event: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5LCrfExNzMjGAe7cPKx1lYZZ20sX_BVdohFUoqAipA&s",
                event_start: "12th April, 5:00 pm",
                title: "LOGO,WEB AND APP DESIGN COMPETITION",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            latest_events: false
        },
        {
            event: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5LCrfExNzMjGAe7cPKx1lYZZ20sX_BVdohFUoqAipA&s",
                event_start: "12th April, 5:00 pm",
                title: "LOGO,WEB AND APP DESIGN COMPETITION",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            latest_events: false
        },
        {
            event: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5LCrfExNzMjGAe7cPKx1lYZZ20sX_BVdohFUoqAipA&s",
                event_start: "12th April, 5:00 pm",
                title: "LOGO,WEB AND APP DESIGN COMPETITION",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            latest_events: false
        },
        {
            event: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5LCrfExNzMjGAe7cPKx1lYZZ20sX_BVdohFUoqAipA&s",
                event_start: "12th April, 5:00 pm",
                title: "LOGO,WEB AND APP DESIGN COMPETITION",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            latest_events: false
        },
        {
            event: {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5LCrfExNzMjGAe7cPKx1lYZZ20sX_BVdohFUoqAipA&s",
                event_start: "12th April, 5:00 pm",
                title: "LOGO,WEB AND APP DESIGN COMPETITION",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            latest_events: false
        }
    ]; 

    return (
        <div className='relative grid-background text-white font-poppins w-full min-h-[100vh]  py-4 px-4 md:px-8 bg-black'>
            <div className='absolute top-0 right-0 profile-section  md:w-1/4 h-full '>

            </div>
            <div className=" flex flex-col items-center justify-start w-full h-full rounded-3xl relative ">
                <ProfileCard />
                <div className='flex flex-col xl:flex-row h-[60%]  w-full p-2 mt-24 text-general shadow-xl rounded-b-3xl'>
                    <div className='flex flex-col items-start w-full xl:w-[70%] md:px-5'>
                        <p className='ml-5 text-xl md:text-3xl mb-2 font-bungee'><span className='text-[#FBF0C2]'>REGISTERED </span>EVENTS</p>
                        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 w-full '>
                          
                            {/* {!error && reg_events !== null && reg_events.results.length === 0 && <p className='w-3/4 ml-5 mt-5 text-red-500 border border-red-500 p-2 rounded text-center'>No registered events.</p>} */}
                            {reg_events?.results?.map((item,index) => {
                                return (
                                    
                                    <EventCard  key={index} {...item} />
                                )
                            })}
                            
                        </div>
                        <p className='py-8 text-md'>Note: Some events are managed by Yepdesk, and those events will not be displayed here. To access and download your tickets, please log in to<a className='text-blue-500 font-bold' href='https://www.yepdesk.com'>Yepdesk</a>.</p>
                    </div>
                    <div className='flex flex-col mt-10 xl:mt-0  xl:flex-col items-start w-full xl:w-[30%] md:px-5'>
                        <div className='w-full xl:w-full'>
                            <p className='ml-5 text-xl md:text-3xl mb-2 font-bungee '><span className='text-[#FBF0C2]'>PRO </span>SHOWS</p>
                            <div className='grid gap-5 grid-cols-1 w-full '>
                                <EventProShowCard />
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className='flex flex-col items-start w-full md:px-5 mt-10'>
                    <p className='ml-5 text-xl md:text-3xl mb-2 text-white font-bold uppercase'>Suggested Events</p>
                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full '>

                        {
                            list.map((item, index) => {
                                return (
                                    <EventCard key={index} {...item} />
                                )
                            })
                        }
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default DashboardPage;