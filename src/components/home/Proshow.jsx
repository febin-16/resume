import React, { useState, useEffect } from "react";
import ProshowCard from "../events/ProshowCard";
import bg from "../../assets/images/Events/bg.svg"
import { BASE_URL } from "../../constants/urls";
import "../../styles/home.css";

function Proshow() {
    const [proshowData, setProshowData] = useState([]);

    useEffect(() => {
        const fetchProshowData = async () => {
            try {
                const response = await fetch(
                    BASE_URL + '/api/events/all/'
                );
                const data = await response.json();
                setProshowData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProshowData();
    }, []);

    return (
        <div className="hero-section mt-16 flex flex-col justify-center items-center w-full max-w-screen">
            <div className="flex flex-row justify-center px-2">
                <span className="text-[85px] md:text-[180px]" style={{ fontFamily: 'CharlieDotted', color: '#741BD4' }}>PRO</span>
                <span className="text-[85px] md:text-[180px]" style={{ fontFamily: 'CharlieDotted', color: '#FBF0C2' }}>SHOWS</span>
            </div>
            <div className="pt-12 w-full flex flex-col">
                {/* {proshowData.results && proshowData.results.map((proshow, index) => { */}
                {/* if (proshow.event_category === "PR") {
                        return ( */}
                <div className="w-full" >
                    {/* <ProshowCard
                                    index={index}
                                    title={proshow.title}
                                    img={proshow.image}
                                    date={new Date(proshow.event_start).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                                /> */}
                    <div
                        className=" mb-12 w-full flex flex-col md:flex-row justify-center items-center px-1 ">

                        <div className=" w-[350px]  max-w-[350px] h-[250px]  max-h-[500px] md:w-[800px]  md:max-w-[800px] md:h-[500px]  md:max-h-[500px] ">
                            <video className="w-fit h-fit shadow-inner shadow-slate-100 rounded-xl   border-2 border-violet-800 border-opacity-20" loop autoPlay muted >
                                <source src="https://hestia24backend.s3.amazonaws.com/videos/IMG_3046.MP4" type="video/mp4" />
                            </video>
                        </div>
                        <div className=" md:ml-8 -mt-10 md:-mt-32 flex flex-col justify-center  items-center ">
                            <h1

                                className="p-0  m-0 text-[40px] md:text-[80px] text-center"

                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                ANTARA MITRA
                            </h1>

                            <h1
                                className="-mt-7 animate-pulse  text-[45px] md:text-[80px] text-proshowcard"
                                style={{ fontFamily: "dynalight", color: "#3A0A6E" }}
                            >
                                {/* {`${month} ${formatDay(parseInt(day))}`} */}
                                May 5th
                            </h1>
                        </div>

                    </div>
                    <div
                        className="  mb-12 w-full flex flex-col md:flex-row justify-center items-center px-1 ">
                        <div className="hidden  md:mr-10 -mt-5 md:flex flex-col  items-center ">
                            <h1

                                className="p-0  m-0 text-[40px] md:text-[70px]"

                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                MC COUPER
                            </h1>
                            <h1
                                className="-mt-10 text-[40px] md:text-[60px] "
                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                &
                            </h1>
                            <h1

                                className="-mt-10 text-[40px] md:text-[70px] text-center "

                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                MALAYALI MONKEYS
                            </h1>
                            
                            <h1

                                className="-mt-16 xl:-mt-12 animate-pulse  text-[45px] md:text-[80px] text-proshowcard"

                                style={{ fontFamily: "dynalight", color: "#3A0A6E" }}
                            >
                                {/* {`${month} ${formatDay(parseInt(day))}`} */}
                                May 4th
                            </h1>
                        </div>
                        <div className=" w-[350px]  max-w-[350px] h-[250px]  max-h-[500px] md:w-[800px]  md:max-w-[800px] md:h-[500px]  md:max-h-[500px] pt-16">
                            <video className="w-fit h-fit shadow-inner shadow-slate-100 rounded-xl   border-2 border-violet-800 border-opacity-20" loop autoPlay muted >
                                <source src="https://hestia24backend.s3.amazonaws.com/videos/IMG_3049.MP4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="md:hidden  md:ml-4 md:-mt-5 mt-3 flex flex-col justify-center items-center ">
                            <h1
                                className=" text-[40px] md:text-[60px] lg:text-[100px]"
                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                MC COUPER
                            </h1>
                            <h1

                                className="-mt-5 text-[30px] md:text-[100px] "

                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                &
                            </h1>
                            <h1

                                className="-mt-3 text-[40px] md:text-[100px] text-center leading-[40px]"

                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                                {/* {title} */}
                                MALAYALI MONKEYS
                            </h1>
                            <h1
                                className="-mt-4 animate-pulse  text-[45px] md:text-[80px] text-proshowcard"
                                style={{ fontFamily: "dynalight", color: "#3A0A6E" }}
                            >
                                {/* {`${month} ${formatDay(parseInt(day))}`} */}
                                May 4th
                            </h1>
                        </div>

                    </div>
                    {/* <div
                        className="  mb-12 w-full flex flex-col md:flex-row justify-center items-center px-1 ">

                        {/* <div className=" w-[350px]  max-w-[350px] h-[250px]  max-h-[500px] md:w-[800px]  md:max-w-[800px] md:h-[500px]  md:max-h-[500px] ">
                            <video className="w-fit h-fit shadow-inner shadow-slate-100 rounded-xl   border-2 border-violet-800 border-opacity-20" loop autoPlay muted >
                                <source src="https://hestia24backend.s3.amazonaws.com/videos/IMG_3052.MP4" type="video/mp4" />
                            </video>
                        </div> */}
                    {/* <div className=" md:ml-4 -mt-5 flex flex-col  items-center ">
                            <h1
                                className="p-0  m-0 text-[40px] md:text-[100px]"
                                style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}
                            >
                               
                                GOWWLI
                            </h1>

                            <h1
                                className="-mt-7 animate-pulse  text-[45px] md:text-[80px] text-proshowcard"
                                style={{ fontFamily: "dynalight", color: "#3A0A6E" }}
                            >
                              
                                May 3rd
                            </h1>
                        </div> 

                    </div>  */}
                </div>
                {/* );
                    // } else { */}
                {/*     return null;
                     } */}
                {/* })} */}
            </div>
        </div>

    );
}

export default Proshow;