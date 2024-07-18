import React,{useContext} from 'react';
import NotificationCard from '../../components/notification/NotificatonCard.jsx';
import RequestCard from '../../components/request_handle/RequestCard.jsx';
import { BASE_URL } from "../../constants/urls.js";
import useFetchAuth from "../../hooks/useFetchAuth.js";
import { UserContext } from '../../context/user.jsx';
import { ModalContext } from '../../context/modal.jsx';



function NotificationsPage(props) {

    const {userState,tokenState} = useContext(UserContext);
     const [token, setToken] = tokenState;

     const {showState} = useContext(ModalContext);
    const [show,setShow] = showState;


    const { error, isPending, data: notifs } = useFetchAuth(BASE_URL+'/api/v1/notification/' , token);
    

    return (
        <div  className='w-full min-h-screen text-small py-4 px-4 md:px-8'>
            <div className='w-full flex flex-col items-center border border-secondary-dark rounded-xl overflow-hidden z-10 bg-primary-dark text-smedium mb-4 p-4'>
                <p className='w-full text-center text-medium pb-4 headerFont'>NOTIFICATIONS</p>

                { error && <div className='text-sm'>{ error }</div> }
                {notifs?.results?.length>0?
                    <div className='w-full bg-primary-light rounded-xl p-4 px-8 grid grid-col-1 gap-6 lg:w-2/3 lg:pt-4'>
                        {
                            notifs && notifs.results.map((notif, key) => (
                                notif.type ==="S" ? <NotificationCard title={notif.title} link1={notif.link1} link2={notif.link2} key={key} notifId={notif.id}  description={notif.description}/> : <RequestCard title={notif.title} link1={notif.link1} link2={notif.link2} key={key} notifId={notif.id}  description={notif.description}/>
                            ))
                        }
                    </div>
               :
               ((!error && !show) && <p className='text-secondary-dark w-full text-sm text-center'>No notification</p>)
               }
            </div>
        </div>
    );
}

export default NotificationsPage;