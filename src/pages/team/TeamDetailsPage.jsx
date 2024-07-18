import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTeamAPI, getTeamDetailsAPI, submitTeamAPI } from '../../services/registration.js';
import { UserContext } from '../../context/user.jsx';
import { ModalContext } from '../../context/modal.jsx';
import { PopUpContext } from '../../context/popup.jsx';


const ResponseReply = ({status})=>{
    switch(status){
        case 200:
            return <p className='text-[10px] opacity-40'>request sent to user</p>
        default:
            return null
    }
};

function TeamDetailsPage(props) {

    useEffect(()=>{
        if(!state.team_id)
            navigate("/events");
    },[state]);

    const {tokenState} = useContext(UserContext);
    const [token,setToken] = tokenState;

    const { popUpState,contentState,clearContent } = useContext(PopUpContext);
    const [popUp, setPopUp] =popUpState;
    const [content, setContent] =contentState;

    const {showState} = useContext(ModalContext);
    const [show,setShow] = showState;


    const [teamMembers,setTeamMembers] = useState([]);
    const [teamDetails,setTeamDetails] = useState(null);


    const {state} = useLocation();
    const navigate = useNavigate();


    useEffect(()=>{
        (async()=>{
            if (!state){
                navigate('/');
            }
            setShow(true);
            const response = await getTeamDetailsAPI(token,state.team_id);
            if (response.status===200){
                const resp = await response.json();
                setTeamDetails(resp);
            }else if (response.status===404){
                // console.log(response)
                setContent({ title: "Info", desc: "Team not found" });
                setPopUp(true);
                clearContent();
                setTimeout(()=>{navigate("/dashboard")},3000);
            }
            setShow(false);
        })()

    },[token,state]);

    return (
        <div className='w-full min-h-screen text-small py-4 px-4 md:px-8'>
            {teamDetails &&
            <form className={`bg-primary-dark border h-full border-secondary-dark rounded-xl p-2 flex flex-col items-center`}>
                <p className='w-full text-center text-smedium md:text-medium py-4 headerFont'>DETAILS</p>
                <div className='w-full md:w-1/2 p-4 flex flex-col'>
                    <div className='w-full'>
                        <div className=" w-full flex items-center mt-3">
                            <div className="h-6 text-xs font-bold uppercase leading-8 text-secondary-light">
                                EVENT :
                            </div>
                            <div className="h-6 ml-5 text-xs font-bold uppercase leading-8 text-secondary-light">
                                {state?.event_name}
                            </div>
                            
                        </div>
                        <div className=" w-full flex items-center mt-3">
                            <div className="h-6 text-[10px] font-bold leading-8 text-secondary-light opacity-40 z-0">
                                <p>//{state.team_id}</p>
                            </div>  
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className=" w-11/12">
                            <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-secondary-light">
                                Leader
                            </div>
                            <div className="my-2 p-1 flex border border-[#615f55] rounded">
                                <p
                                    className="w-full text-lg p-1 px-2 text-secondary-dark placeholder-secondary-dark bg-transparent outline-none font-RobotoMono"
                                >{teamDetails?.team_leader?.email}</p>
                            </div>
                        </div>
                    </div>
                   {(teamDetails?.members.accepted.length>0 || teamDetails?.members.pending.length>0) &&
                        <div className='w-full'>
                            <div className=" w-11/12">
                                <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-secondary-light">
                                    MEMBERS
                                </div>
                                {[...teamDetails.members.accepted,...teamDetails.members.pending].map((member,index)=>{
                                    return(
                                        <div className='flex flex-col my-1' >
                                            <div className="p-1 mt-1 flex flex-col border border-[#615f55] rounded">
                                                <p className="w-full text-xs p-1 px-2 text-secondary-dark placeholder-secondary-dark bg-transparent outline-none"
                                                >{member.user.email}</p>
                                            </div>
                                            {index>=teamDetails.members.accepted.length &&
                                            <div className='mb-3 mt-1 flex items-center'>
                                                <i className='pi pi-check text-[20px] text-yellow-500 rounded-full p-1 border border-yellow-500 mr-2' />
                                                <p className='text-[10px] font-bold opacity-40'>pending request</p>
                                            </div>
                                             }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                
            </form>
            }
        </div>
    );
}

export default TeamDetailsPage;