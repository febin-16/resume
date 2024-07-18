import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from 'primereact/button';
const Eventcard = ({ type, title, slug, description, event_image, category, teamId, dept, merchandise }) => {
    const navigate = useNavigate();
    const params = useParams();
    const stripeStyles = {
        background: 'repeating-linear-gradient(135deg, transparent 0px, transparent 5px, transparent 0px, transparent 5px, white 0px, white 5px, white 10px, white 20px)',
    }
    switch (type) {
        case 0:
            {
                return (
                    <div className="md:w-full md:h-[700px] text-white">
                        <div className="grid place-items-center">

                            <div className="flex items-center justify-center w-full mt-20">
                                <div className="inner card border-white border-2 md:h-full md:w-11/12 px-4 pb-6">
                                    <div className="flex items-center justify-center">
                                        <img src={event_image} className="md:w-full -mt-20" />
                                    </div>
                                    <div className="details mt-4 grid gap-8">
                                        <div className="heading">
                                        <div className="text-3xl uppercase mb-2">
                                            {title}
                                        </div>
                                        <div className="w-full h-[10px]" style={stripeStyles} />
                                        </div>
                                        <div className="details text-sm w-10/12">
                                            {description}
                                        </div>
                                        <button className="bg-[#D5BA95] uppercase text-black text-2xl">Check it out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        case 1:
            {

            }
    }
}
export default Eventcard