import React,{useContext, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import { UserContext } from '../../context/user.jsx';
import { ModalContext } from '../../context/modal.jsx';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../constants/urls';



function CertificateVerifierPage(props) {

    const {tokenState} = useContext(UserContext);
     const [token, setToken] = tokenState;

     const {showState} = useContext(ModalContext);
    const [show,setShow] = showState;

    const [certificates,setCertificates] = useState([]);

    const params = useParams();


       


    const { error, isPending, data: verification } = useFetch(BASE_URL+'/api/v1/certificate/'+params.slug);

    return (
        <div  className='w-full min-h-screen text-small py-4 px-4 md:px-8'>
            <div className='w-full flex flex-col items-center border border-secondary-dark rounded-xl overflow-hidden z-10 bg-primary-dark text-smedium mb-4 p-4'>
            { error && <div className='text-sm w-full text-center mb-5'>{ error }</div> }
                    
                    
               {
                verification && verification.status===true?
                    <div className='w-full flex flex-col text-sm items-center py-10'>
                        <p>Verified certificate</p>
                        <p className='my-3'>certificate id : {verification.id}</p>
                    </div>
                    :
                    <div className='w-full flex flex-col text-sm items-center py-10'>
                        <p>Not verified</p>
                    </div>
               }
            </div>
        </div>
    );
}

export default CertificateVerifierPage;