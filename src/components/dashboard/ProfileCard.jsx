import React, { useContext } from 'react';
import { Link, useMatch,useNavigate } from "react-router-dom";
import { EditIcon } from '../../assets/svgs/edit';
import { UserContext } from '../../context/user';
import bg from "../../assets/images/categoryBackgrounds/bg.jpg";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants/key";
import "../../styles/home.css"
import { Button } from 'primereact/button';

function ProfileCard(props) {


    const { userState } = useContext(UserContext);
    const [token, setToken] = userState;
    const [userDetails, setUserDetails] = userState;
    const shadowColor = { lex: "#00100E", leo: "#000", loki: "#e2cbad" };

    const navigate = useNavigate();

    const logout = () => {
        window.location.reload();
        setToken(null);
        setUserDetails(null);
        navigate("/");
        localStorage.setItem("hestiaUser", "");
        localStorage.setItem("hestiaUserToken", "");
        localStorage.setItem("referral", "");
    }
    return (
        <div
            className='bg-transparent w-full h-64 rounded-t-3xl relative'>
            <div className=' absolute  md:h-36  w-full flex flex-row justify-between mb-10 items-center bottom-0 translate-y-[50px] md:translate-y-16 px-2 md:px-10' >
                <div className='flex flex-row  '>
                    <img src={userDetails?.profile_image ? userDetails.profile_image : "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" } className='rounded-full bg-white h-16 w-16 md:h-24 md:w-24 md:h-36 md:w-36' />
                    <div className='flex flex-col py-3 md:py-0 items-start justify-start mt-0  ml-5 h-full'>
                        <div className='w-full flex items-center justify-between md:justify-start'>
                            <p className='md:text-3xl font-semibold text-white mr-5'>{userDetails?.name ? userDetails.name : "Full Name Here"}</p>
                            <Link to={'/dashboard/profile'} className='w-5 h-5'><EditIcon /></Link>
                        </div>
                        <p className='text-gray-500 text-white text-xs md:text-base md:mt-2'>{userDetails?.college_name || "TKMCE"}</p>
                        <p className='text-gray-500 text-white text-xs md:text-base md:mt-2'>{userDetails?.phone_number || "1234567890"}</p>
                    </div>
                </div>
                <div className='flex flex-col md:p-5  '>
                    
                        <button className='bg-opacity-50 w-28 md:w-32 font-Geomanist font-bold text-white  bg-secondary-dark hover:bg-primary-dark   rounded-md px-3 mb-5 md:py-1 mr-5' onClick={logout}> Logout</button>
                
                    {
                        useMatch(
                            "/dashboard"
                        ) &&
                        <Link to={'/dashboard/profile'} >  <button className='hover:text-white   bg-opacity-50 font-Geomanist   font-bold  text-white bg-secondary-dark hover:bg-primary-dark  px-3 rounded-md  md:py-1 mb-5  mr-5 w-28 md:w-32 '>
                            Edit Profile
                        </button>
                        </Link>

                    }



                </div>
            </div>
        </div>
    );
}

export default ProfileCard;