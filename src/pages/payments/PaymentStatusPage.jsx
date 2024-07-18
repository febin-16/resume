import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

export default function PaymentStatusPage() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const successStatus = searchParams.get("success");
    const cancelStatus = searchParams.get("canceled");
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        setTimeout(() => {
            navigate("/events");
        }, 5000)
    }, [successStatus, cancelStatus, sessionId]);
    return (
        <div className="w-full h-screen bg-black overflow-hidden flex justify-center items-center text-white">
            {(successStatus || cancelStatus) &&
                <div className=' p-4 absolute rounded-xl border border-secondary-dark py-10 flex flex-col w-11/12 sm:w-1/2 md:w-2/4 lg:w-1/4 '>
                    <p className='w-full text-left text-small'>PAYMENT {successStatus ? "SUCCESSFULL" : cancelStatus && "FAILED"}</p>
                    {/* <p className='w-full text-left text-[10px] font-RobotoMono opacity-40 mt-5'>session id : {sessionId}</p> */}
                </div>
            }
        </div>
    )
}