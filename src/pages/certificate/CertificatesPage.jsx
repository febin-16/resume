import React,{useContext, useEffect, useState} from 'react';
import { UserContext } from '../../context/user.jsx';
import { ModalContext } from '../../context/modal.jsx';
import { generateCertificateAPI } from '../../services/certificates';
import { saveAs } from 'file-saver';



function CertificatesPage(props) {

    const {tokenState} = useContext(UserContext);
     const [token, setToken] = tokenState;

     const {showState} = useContext(ModalContext);
    const [show,setShow] = showState;

    const [certificates,setCertificates] = useState([]);


    useEffect(()=>{
        (async()=>{
            setShow(true);
            const response = await generateCertificateAPI(token);
            if (response.status===200){
                const res = await response.json();
                setCertificates(res);
            }
            setShow(false);
    
          }
        )()
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[token]);

    

      const downloadCertificate = (file,slug) => {
        saveAs(file, `${slug}.jpg`) // Put your image url here.
      }

    return (
        <div  className='w-full min-h-screen text-small py-4 px-4 md:px-8'>
            <div className='w-full flex flex-col items-center border border-secondary-dark rounded-xl overflow-hidden z-10 bg-primary-dark text-smedium mb-4 p-4'>
                <p className='w-full text-center text-medium pb-4 headerFont'>CERTIFICATES</p>

                    {certificates.length>0?
                        <div className='w-full flex flex-col items-center md:place-items-center   md:grid md:grid-cols-2 lg:grid-cols-3'>
                            {
                                certificates.map((certificate, index) => (
                                    <div
                                            className="relative border border-secondary-dark  group my-4 overflow-hidden shadow-xl w-72 h-60  rounded-xl cursor-pointer"
                                    >
                                        <a key={index} className="text-small font-RobotoMono font-bold lg:text-small lg:px-4 underline" href={certificate.file} rel="noreferrer" target="_blank">
                                            <img
                                                src={certificate.file}
                                                alt={"certificate"}
                                                className="absolute group-hover:blur-sm group-hover:grayscale  group-hover:opacity-100 group-hover:scale-150 transition-all w-full h-full  duration-500 ease-in-out transform bg-center bg-cover"
                                            />
                                        </a>
                                        <button onClick={()=>downloadCertificate(certificate.file,certificate.slug)} className=" absolute bottom-0 right-0 bg-primary-dark p-2 px-4 text-xsmall border border-primary-dark">

                                        </button>
                                    </div>
                                ))
                            }
                        </div>   
                    :
                     (!show && <p className='text-secondary-dark w-full text-sm text-center mb-5'>No certificates issued, contact event coordinator for info</p>)
                    }
            </div>
        </div>
    );
}

export default CertificatesPage;