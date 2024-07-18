import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import toggle from "../../assets/icons/toggle.png"
const ListViewEventcard = ({ name, image, description, registrationLink }) => {
    const navigate = useNavigate()
    return (
        <div className="text-white w-full border-white border-2 bg-[#272727] hover:bg-[#161616]">
            <div className="grid md:grid-cols-12 gap-8">
                <div className="col-span-4">
                    <img src={image} alt="event image" className="object object-cover h-full" />
                </div>
                <div className="col-span-8 flex flex-col justify-end mb-8">
                    <div className="flex justify-between w-full pt-8 pr-8">
                        <div className="text-2xl uppercase">{name}</div>
                        <div className="grid place-items-center">
                            <img src={toggle} alt="toggle" />
                        </div>
                    </div>
                    <div className="text-md pr-16 pt-8">
                        {description}
                    </div>
                    <button onClick={() => navigate(`${registrationLink}`)} className="bg-[#FFD730] mt-8 items-center text-xl gap-4 justify-center flex w-[200px] h-10 rounded-[8px]">
                        <div className="grid place-items-center h-full">
                            <div className="text-black font-bold">Regsiter</div>

                        </div>
                        <div className="pi pi-arrow-up-right text-black"></div>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ListViewEventcard;