import React from 'react';
import { useLocation } from 'react-router-dom';
import GoogleAuth from '../../components/auth/GoogleAuth.jsx';

import logoHestia from "../../assets/icons/logo_hestia.png";
import '../../styles/home.css'
import '../../styles/hero.css'


function LoginPage() {
    const {state} = useLocation();
    const redirectState = state?.redirectState || {};
    return (
        
          <div className='grid-background  w-full h-[90vh] md:min-h-screen  '
                          
          >  
          <div className='hero-section w-full h-full pt-32 flex justify-center items-center'>
            <div className='bg-black bg-opacity-80 w-3/4 lg:w-1/2 xl:w-1/4 bg-primary-dark border border-[#FBF0C2] rounded-xl p-4 flex flex-col items-center justify-center pb-24'>
                <p className='font-bold text-2xl py-4 w-full font-RobotoMono text-center text-[#FBF0C2] '>Sign In</p>
                <div className='flex justify-center py-4'>
                    <img src={logoHestia} className="w-28 h-28 rounded-xl " alt="user" />
                </div>
                <div className='w-3/4 mt-8 flex items-center justify-center'>
                    <GoogleAuth redirectState={redirectState} renderText={"Sign in with google"} authType={"loginGoogleAccountAPI"} redirectUrl={state?.redirectUrl || '/'} />
                </div>
            </div>
            </div>
           </div> 
    );
}

export default LoginPage;