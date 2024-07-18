import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useMatch, Navigate } from "react-router-dom";
import logoHestia from "../../assets/icons/logo_hestia.png";
import { UserContext } from "../../context/user.jsx";
import DottedLine from "../home/DottedLine.jsx";

export function HamBurgerButton({ setVisibile, visible }) {
  return (
    <button className="block" onClick={() => { setVisibile(!visible) }}>
      <i className={`${visible && ' mx-3 rotate-180 text-accent'} transition-all pi pi-user pi-bars`}></i>
    </button>
  )
}

function Navbar() {
  const navigationLinks = [
    ["Combos", "/combos"],
    ["Merchandise", "/merchandise"],
    ["Events", "/events"],
    ["Sponsors", "/sponsors"],
  ];
  const { tokenState } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = tokenState;
  const navigate = useNavigate();
  const handleCheckAuth = () => {
    navigate(token !== null ? "/dashboard" : "/loginPage", {
      state: {
        renderText: "Sign with google",
        authType: "loginGoogleAccountAPI",
        redirectUrl: "/",
      },
    });
  };



  return (<>

    <div className="flex bg-[#7F00FF] py-2 bg-opacity-5 animate-pulse justify-center items-center absolute top-12 w-full px-5 z-[100]  font-Geomanist ">

      <div className="flex justify-between min-w-full bg-primary-dark rounded-md lg:bg-transparent px-2 lg:w-[93%] overflow-x-auto lg:px-10">
        <div className="flex justify-start text-white  items-center rounded-md">
          <div className=" flex items-center font-bold mr-5 overflow-none w-10 md:w-14  ">
            <Link to="/">
              <img className="w-10 md:w-14  " src={logoHestia} alt="" />
            </Link>
          </div>
        </div>
        <div className="flex bg-primary-dark lg:min-w-[45%] items-center rounded-md py-2 px-5 justify-around" style={{ fontFamily: 'azonix', color: '#FBF0C2' }}>
          {navigationLinks.map((link, key) => (
            <Link key={key} className={`text-sm mx-2 lg:text-md uppercase  font-bold `} to={link[1]}>{link[0]}</Link>
          ))}
          <button
            onClick={handleCheckAuth}
            className={`font-bold mx-2 ${useMatch(
              token !== null ? "/dashboard/*" : "/loginGoogleAccountAPI"
            ) && "bg-accent-dark px-2 py-1 rounded-xl"
              }`}
          >
            {token !== null ? "DASHBOARD" : "LOGIN"}
          </button>
        </div>

      </div>
    </div>
  </>
  );
}

export default Navbar;
