import React, { useContext } from "react";
import {
  GoogleOAuthProvider,
  useGoogleOneTapLogin,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/user.jsx";
import { ModalContext } from "../../context/modal.jsx";
import { PopUpContext } from "../../context/popup.jsx";
import config from "../../cred/Config.jsx";

import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants/key.js";
import loginGoogleAccountAPI from "../../services/loginGoogleAccountAPI.js";
import { CampusAmbassador } from "../../pages/index.jsx";

function GoogleAuth({
  renderButtonStyle,
  authType,
  redirectUrl,
  renderText,
  redirectState,
}) {
  const googleClientId = config.GOOGLE_CLIENT_ID;

  const { tokenState, userState } = useContext(UserContext);
  const { showState } = useContext(ModalContext);
  const [show, setShow] = showState;
  const [token, setToken] = tokenState;
  const [userDetails, setUserDetails] = userState;

  const { popUpState, contentState, clearContent } = useContext(PopUpContext);
  const [popUp, setPopUp] = popUpState;
  const [content, setContent] = contentState;

  const navigate = useNavigate();

  // Define the onSuccess callback function
  const handleSuccess = async (res) => {
    setShow(true);
    try {
      const response = await loginGoogleAccountAPI(res.access_token);
      if (response) {
        const resp = await response.json();
        setToken(resp.key);
        setUserDetails(res);
        await localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res));
        await localStorage.setItem(TOKEN_STORAGE_KEY, resp.key);
        setShow(false);
        setContent({ title: "Login", desc: "successfull" });
        setPopUp(true);
        clearContent();
        navigate("/");
        window.location.reload();
        //navigate(redirectUrl, { state: { ...redirectState } });
      } else {
        setShow(false);
        setContent({ title: "Info", desc: "Failed to loginGoogleAccountAPI" });
        alert("Login Failed", "Failed");
        setPopUp(true);
        clearContent();
      }
    } catch (e) {
      setShow(false);
      setContent({ title: "Info", desc: "LoginPage failed, try again later" });
      alert("Login Failed", "Failed");
      setPopUp(true);
      clearContent();
    }
  };

  // Define the onError callback function
  const handleError = () => {
    console.log("Login Failed");
  };

  //handlelogout
  const handleLogout = () => {
    setToken(null);
    setUserDetails(null);
    navigate("/");
    localStorage.setItem("hestiaUser", "");
    localStorage.setItem("hestiaUserToken", "");
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleSuccess(tokenResponse),
  });

  return (
    <>
      {!token ? (
        <button onClick={() => login()} className="border-2 rounded p-2 text-white ">Sign in with Google</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </>
  );
}

export default GoogleAuth;
