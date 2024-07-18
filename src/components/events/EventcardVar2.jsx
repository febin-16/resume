import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EventcardVar2 = ({ title, slug, description, event_image, category,teamId,dept,merchandise }) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        navigate((category!=="M")?`/events/${category}/${slug}`:`/merchandise/${slug}/order_preview`, {
          state: { category, slug, description, event_image,team_id:teamId },
        });
      }}
      className="relative border border-secondary-dark  group my-4 overflow-hidden shadow-xl w-60 h-72  rounded-xl cursor-pointer"
    >
      <img
        src={event_image}
        alt={merchandise?"T-shirt":"event"}
        className="absolute group-hover:blur-sm group-hover:grayscale  group-hover:opacity-100 group-hover:scale-150 transition-all w-full h-full  duration-500 ease-in-out transform bg-center bg-cover"
      />
      <div className="shadow-sm  h-full w-full justify-end items-center flex flex-col left-0 ">
        <h3 className="text-secondary-dark tracking-widest shadow-sm duration-300 w-full py-4  inset-0 z-10 flex justify-center items-center text-small font-bold  bg-primary-dark transition-opacity ease-in-out delay-150 text-center">
          {title}
        </h3>
        {(category!=="M" )&& <p className="duration-300 inset-0 z-10 flex justify-center items-center text-xsmall text-secondary-dark w-full pb-5 bg-primary-dark transition-opacity ease-in-out delay-150">
          {dept.title}
        </p>
        }
      </div>
      {/* <div className=" absolute bottom-0 right-0 bg-primary-dark p-2 px-4 text-xsmall border border-primary-dark">
        view/register
      </div> */}
    </div>
  );
};

export default EventcardVar2;
