import React, { useContext, useState } from "react";
import dash from "../../assets/images/Events/Union.png";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import Technical from "../../assets/images/Events/Technicals.png";
import { Link, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom";
import { shortenString } from "../../utils/string";
import { getUserDetailsAPI } from "../../services/user";
import { UserContext } from "../../context/user";
import { PopUpContext } from "../../context/popup";
import { ModalContext } from "../../context/modal";
//import { registerMerchAPI } from "../../services/registration";
import gatewayResolver from "../../utils/razor-pay-utils.js";
function getExpandedCategory(short) {
  if (short === "W") return "events/workshops/";
  if (short === "T") return "events/technical/";
  if (short === "G") return "events/general/";
  if (short === "F") return "/events/future/";
  if (short === "M") return "/events/merchandise/";
}

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

const Majorcard = ({ title, category, description, image, slug, home, size, merch, id, type = "regular" }) => {

  const { state } = useLocation();
  const { tokenState, userState } = useContext(UserContext);
  const { popUpState, contentState, clearContent } = useContext(PopUpContext);
  const { showState } = useContext(ModalContext);

  const [token, setToken] = tokenState;
  const [userDetails, setUserDetails] = userState;

  const [disabled, setDisabled] = useState(true);

  const [referral, setReferral] = useState("");
  const [coupon, setCoupon] = useState("");
  const [file, setFile] = useState(null);

  const [popUp, setPopUp] = popUpState;
  const [content, setContent] = contentState;
  const [show, setShow] = showState;
  const params = useParams();



  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!merch) {
      if (home || category === 'F') {
        navigate(getExpandedCategory(category) + slug)
      } else {
        navigate(slug);
      }
    } else {
      if (token !== null) {
        // if (state.team_id===null){
        try {
          const userResponse = await getUserDetailsAPI(token);
          if (userResponse.status === 200) {
            const user = await userResponse.json();
            if (user.is_completed) {
              const obj = {
                size: sizes[size - 1],
                sleeve: "H",
                type: "R",
                merchandise: id,
                gateway: 2
              }
              /*const response = await registerMerchAPI(token, obj);
              if (response.status === 200) {
                // indivigual event
                const resp = await response.json();
                gatewayResolver(resp);
                // setShow(false);
                // navigate({ pathname: resp.url });

              } else if (response.status === 202) {

                showDialog("Registered successfully", "Success");
                // clearContent();
                // navigate("/events");
              } else if (response.status === 403) {

                showDialog("Already registered.", "Info");

                clearContent();
              } else if (response.status === 410) {

                showDialog("Registration closed.", "Info");
              } else if (response.status === 404) {
                setShow(false);
                showDialog("Invalid coupon.", "Info");

              } else if (response.status === 411) {
                showDialog("Registration not started.", "Info");

              } else {
                showDialog("Something went wrong.Try again later", "Info");

              }*/

            } else {

              alert("Complete your profile before registration", "Info");
              navigate("/dashboard/profile");
            }
          } else {

            alert("User not found", "Info");

            navigate("/");
          }
        } catch (e) {

          alert("Failed to fetch", "Info");

        }
        // }else{
        //     navigate('team_details',{state:{team_id:state.team_id}});
        // }
      } else {

        alert("Login before registration", "Info");


      }


    }
  }
  return (
    <div className='text-white flex flex-col border-2 border-[#FBF0C2] p-2 gap-2 rounded-lg mx-5 '>
      <div >
        
        <div
          style={{
            backgroundImage: `url('${image}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[250px] overflow-hidden rounded-t-card relative bg-primary-light"
        >
          {merch && (
            <div className="absolute font-anton text-xl bottom-0 right-0 bg-cardBg text-white  font-bold p-2 rounded-tl-xl">{sizes[size - 1]}</div>
          )}



        </div>
        {/* )} */}
        <div className={`px-6 pt-4 max-h-[160px] ${description && "min-h-[50px]"}`} style={{fontFamily:'Anonymous pro',color:'#FFFBEC'}}>
          

          {description &&
            <p >
              {shortenString(description, 90)}
            </p>
          }
          {merch &&
            <p>

            </p>
          }
        </div>
        <div className="mt-4 flex w-full justify-end">
          {merch &&
            size === -1 && <p className="text-sm lowercase px-2 text-general my-2 text-red-400">*Select a size</p>
          }
          <button disabled={size === -1 ? true : false} onClick={handleClick} className='border-2 px-2 py-1 border-[#FBF0C2] rounded-lg bg-[#6913C7] uppercase text-[#FBF0C2] hover:scale-105 flex' style={{ fontFamily: 'Azonix' }}>
            <p >
              Check it out
            </p>
            <i className="ml-2  pi pi-arrow-up-right mt-1"></i>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Majorcard;
