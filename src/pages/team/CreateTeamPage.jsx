import React, { useContext, useEffect, useState } from 'react';


import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createTeamAPI, getTeamDetailsAPI, submitTeamAPI } from '../../services/registration.js';
import { UserContext } from '../../context/user.jsx';
import { ModalContext } from '../../context/modal.jsx';
import { PopUpContext } from '../../context/popup.jsx';
import { LoadingContext } from '../../context/loading.jsx';
import gatewayResolver from '../../utils/razor-pay-utils.js';


// import React, { useContext, useEffect, useState } from 'react';
// import {RiAddLine} from "react-icons/ri";
// import {FiMinus} from "react-icons/fi";
// import {AiOutlineExclamation} from "react-icons/ai";

// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';
// import { LoaderContext } from '../../context/LoaderContext';
// import { PopUpContext } from '../../context/PopUpContext';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../constants/urls.js';
import { DialogPopup } from '../../context/dialog.jsx';
import { data } from 'autoprefixer';
import "../../styles/home.css"
import "../../styles/hero.css"
import CashfreePaymentResolver from '../../utils/cashfree.jsx';
// import { BASE_URL } from '../../constants/urls';
// import { register_event } from '../../apis/register_event';
// import LocalLoader from '../../components/LocalLoader';
// import { UserContext } from '../context/user';
// import { ModalContext } from '../context/modal';
// import { PopUpContext } from '../context/popup';



export default function CreateTeam(props) {


    const { slug } = useParams();

    const { error, isPending, data: event } = useFetch(BASE_URL + '/api/events/event/' + slug);
    //console.log(event)
    const navigate = useNavigate();
    const { showLoad, setLoad } = useContext(LoadingContext);
    const { userState, tokenState } = useContext(UserContext);

    const [userDetails, setUserDetails] = userState;
    const [token, setToken] = tokenState;


    const { popUpState, contentState, clearContent } = useContext(PopUpContext);
    const [popUp, setPopUp] = popUpState;
    const [content, setContent] = contentState;
    const [popUpContent, setPopUpContent] = contentState;
    const [teamName, setTeamName] = useState("");

    const { showDialog } = useContext(DialogPopup);


    const [referral, setReferral] = useState("");
    const [coupon, setCoupon] = useState("");


    // const {tokenState} = useContext(UserContext);
    // const [token,setToken] = tokenState;

    // const { popUpState,contentState,clearContent } = useContext(PopUpContext);
    // const [popUp, setPopUp] =popUpState;
    // const [content, setContent] =contentState;

    // const {showState} = useContext(ModalContext);
    // const [show,setShow] = showState;

    const [disabledAdd, setDisabledAdd] = useState(true);
    const [disabledSubmit, setDisabledSubmit] = useState(true);

    const [teamMembers, setTeamMembers] = useState([]);


    //const {state} = useLocation();
    // const navigate = useNavigate();

    const [checkVerification, setCheckVerification] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState([]);
    const [file, setFile] = useState(null);


    // console.log(event);



    const handleChange = (e, index) => {
        const { value } = e.target;
        setTeamMembers(state => {
            let items = [...state];
            items[index] = value;
            return items;
        });
        setCheckVerification(state => {
            let items = [...state];
            items[index] = false;
            return items;
        });
    };
    const handleAdd = (e) => {
        e.preventDefault();
        setTeamMembers(team => [...team, ""]);
        setCheckVerification(team => [...team, false])

    }
    const handleRemove = (e, index) => {
        e.preventDefault();

        setTeamMembers(team => {
            let items = [...team];
            items.splice(index, 1);
            return items;
        });
        setResponseStatus(team => {
            let items = [...team];
            items.splice(index, 1);
            return items;
        });

    };

    function navigateToExternalUrl(url) {
        window.location.href = url;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("This cant be modified\nAre you sure to submit?")) {
            setLoad(true);
            const formData = new FormData()
            formData.append('event', event.id)
            formData.append('team_name', teamName)
            formData.append('members', teamMembers)
            formData.append('coupon', coupon)
            formData.append('referral', referral)
            formData.append('gateway', 2)
            if (event?.is_file_upload === true) {
                formData.append('user_file', file, file.name)
            }

            const response = await createTeamAPI(token,
                formData
            );

            if (response.status === 403)
                // alert("Already registered.", "Info");
                showDialog("Already registered.", "Info");

            else if (response.status === 400) {
                showDialog("Not enough data.", "Info");

            }
            else if (response.status === 202) {
                showDialog("Registered for the event successfully.", "Success");
                navigate("/events");


            } else if (response.status === 200) {
                const resp = await response.json();
                CashfreePaymentResolver(resp.
                    payment_session_id,resp.order_id
                    )
                //navigateToExternalUrl(event.redirect_link);
                //alert ("registered successfully");
                //gatewayResolver(resp);
                // window.location.href = resp.url
            }
            else if (response.status === 404) {
                showDialog("Invalid coupon.", "Info");


            }
            else {
                showDialog("Something went wrong.", "Info");

            }
            setLoad(false);


        }

    }




    useEffect(() => {
        if (event && teamMembers) {
            if (event.max_members_in_team <= teamMembers.length + 1)
                setDisabledAdd(true);
            else
                setDisabledAdd(false);
        }

    }, [event, teamMembers]);

    useEffect(() => {
        if (event && teamMembers) {
            if (event.min_members_in_team > teamMembers.length + 1 || event.max_members_in_team < teamMembers.length + 1)
                setDisabledSubmit(true);
            else
                setDisabledSubmit(false);
        }

    }, [event, teamMembers]);
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    return (
        <form data-aos="fade-zoom-in" data-aos-duration="1000" onSubmit={handleSubmit} className='w-full min-h-screen text-small  scale-100  grid-background' >
            {/* <img className='w-full h-full absolute top-0 left-0 opacity-[0.04]' src={event.image} /> */}
            <div className='hero-section py-4 pt-10  md:px-8'>
                <div className={` h-full rounded-xl p-2 flex flex-col items-center relative `} >

                    {error && <div className='p-2'>{error}</div>}
                    {/* {isPending && <div className='p-2'><LocalLoader /></div>} */}
                    <div className='w-full md:w-1/2 p-4 flex flex-col border-2  border-[#FBF0C2] rounded-xl mt-20 backdrop-blur'>
                        <p className='w-full text-center text-smedium md:text-medium mt-4  text-general text-[#FBF0C2]'>CREATE TEAM</p>
                        <div className='w-full'>
                            <div className=" w-full flex flex-col items-center mt-3">
                                <div className="h-6 text-xs font-bold uppercase leading-8 text-general  text-[#FBF0C2]">
                                    EVENT :
                                </div>
                                <div className="text-[#FBF0C2] text-xl font-bold uppercase leading-8 text-general">
                                    {event?.title}
                                </div>

                            </div>

                        </div>
                        <div className='w-full'>
                            {event?.collect_team_name &&

                                <div className="w-full md:w-11/12">
                                    <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-general text-[#FBF0C2]">
                                        Team name
                                    </div>
                                    <div className="my-2 p-1 flex border border-[#FBF0C2] rounded">
                                        <input
                                            value={teamName} minLength={2} maxLength={50} onChange={(e) => setTeamName(e.target.value)} required
                                            className="w-full text-small p-1 px-2  text-general text-[#FBF0C2] placeholder-white bg-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            }
                            <div className="w-full md:w-11/12">
                                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-general text-[#FBF0C2]">
                                    Leader
                                </div>
                                <div className="my-2 p-1 flex border border-[#FBF0C2] rounded">
                                    <input
                                        value={userDetails?.email}
                                        disabled={true}
                                        className="w-full text-small p-1 px-2 text-general text-general text-[#FBF0C2] placeholder-white bg-transparent outline-none"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='mt-5 w-full'>
                            <div className="my-3 h-6 text-xs flex flex-row items-center font-bold uppercase leading-8 text-general">

                                <button disabled={disabledAdd} className={`${disabledAdd ? "opacity-40" : "group hover:bg-accent"} text-small mb-2 flex px-4 font-bold border border-[#FBF0C2] rounded items-center`} onClick={(e) => handleAdd(e)}>
                                    {/* <RiAddLine className='text-xl group-hover:text-primary-dark' /> */}
                                    <p className='pi pi-plus text-[#FBF0C2]'></p>
                                    <p className='ml-5 text-xsmall  text-[#FBF0C2] group-hover:text-white'>MEMBER</p>
                                </button>
                            </div>

                            <div className="w-full ">
                                {teamMembers.length > 0 && teamMembers.map((item, index) => {
                                    return (
                                        <div key={index} className={`mb-4 flex flex-col  w-full relative`}>
                                            <div className={`flex border ${checkVerification[index] === true ? 'border-[#FBF0C2]' : 'border-[#FBF0C2]'} rounded w-full md:w-11/12 p-1`}>
                                                <input
                                                    required={true}
                                                    onChange={(e) => handleChange(e, index)}
                                                    value={teamMembers[index]}
                                                    type="email"
                                                    placeholder="Enter email ID"
                                                    className="w-full appearance-none text-small p-1 px-2 text-general text-[#FBF0C2] placeholder-[#FBF0C2] bg-transparent outline-none"
                                                />
                                                <button disabled={loading ? true : false} onClick={(e) => handleRemove(e, index)}>
                                                    {/* <FiMinus className={`${loading && "opacity-40"} md:ml-5 text-xl font-bold  rounded`} /> */}
                                                    <p className='pi pi-minus text-general'></p>

                                                    {/* ADD */}
                                                </button>
                                            </div>

                                        </div>
                                    )
                                })}
                                {event?.is_file_upload === true &&
                                    <div className="w-full md:w-11/12 p-1 mt-20 flex flex-col items-start justify-center font-bold text-small ">
                                        <p className="text-xsmall font-bold mb-1 text-general text-[#FBF0C2]">upload file</p>
                                        <input className='text-general font-light text-[#FBF0C2]' required type="file" onChange={handleFileChange} />
                                    </div>}
                                <div className="w-full md:w-11/12 p-1 mt-20 flex flex-col items-center justify-center font-bold text-small ">
                                    {event?.coupon_available && <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon" className="w-full border-b border-[#FBF0C2] px-3 py-2 bg-transparent rounded font-light text-general outline-none placeholder-general" />}
                                    {event?.fees > 0 && <input value={referral} onChange={(e) => setReferral(e.target.value)} placeholder="Referral" className="w-full mt-10 border-b border-[#FBF0C2] px-3 py-2 bg-transparent rounded font-light text-general outline-none placeholder-general" />}
                                </div>
                            </div>
                            <div className='w-full flex justify-center'>
                                <button disabled={disabledSubmit} type={"submit"} className={`font-bold border border-[#FBF0C2] text-accent  text-[#FBF0C2] rounded px-4 py-2 my-5 text-small flex items-center justify-center ${disabledSubmit ? 'opacity-40' : 'hover:bg-accent hover:text-white'} `}>
                                    <p>REGISTER</p>
                                </button>

                            </div>
                        </div>
                        {event !== null &&
                            <div className=" flex flex-col items-start font-normal   text-xs  justify-between mt-8 opacity-[0.6] mb-10">

                                <h1 className="text-lg font-semibold underline text-[#FBF0C2]">Contact</h1>
                                {event?.coordinator_1 !== null && <div className="flex flex-col md:flex-row md:items-center">
                                    <a className="flex items-center justify-between  opacity-[0.8] " aria-label="Chat on WhatsApp" href={`https://wa.me/${event?.coordinator_1?.phone_number}`} target="_blank" >
                                        <p className="md:text-lg font-light">{event?.coordinator_1?.name}</p>
                                        <p className="ml-3 md:text-lg  scale-90 md:ml-5">{event?.coordinator_1?.phone_number}</p>
                                    </a>
                                </div>}

                                {event?.coordinator_2 !== null && <div className="flex flex-col mt-3 md:mt-0 md:flex-row md:items-center">
                                    <a className="flex items-center justify-between opacity-[0.8] " aria-label="Chat on WhatsApp" href={`https://wa.me/${event?.coordinator_2?.phone_number}`} target="_blank" >
                                        <p className="md:text-lg font-light">{event?.coordinator_2?.name} </p>
                                        <p className="ml-3 md:text-lg scale-90 md:ml-5">{event?.coordinator_2?.phone_number}</p>
                                    </a>
                                </div>}



                            </div>
                        }


                    </div>
                </div>
            </div>
        </form>
    );
}