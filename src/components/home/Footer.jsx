import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/footer.css'
import 'primeicons/primeicons.css'
import * as ROUTES from "../../constants/routes";
import hestiaLogo from "../../assets/icons/logo_hestia.png"
import "../../styles/home.css"
/**
 * Render the footer section.
 * @returns {JSX.Element} The JSX element representing the footer section.
 */

const Footer = () => {
    const links = [
        { title: "Privacy Policy", link: ROUTES.PRIVACY_POLICIES },
        { title: "Terms & Conditions", link: ROUTES.TERMS_AND_CONDITIONS },
        { title: "Pricing", link: ROUTES.PRICING },
        { title: "Return Policy", link: ROUTES.REFUND_POLICY },
        { title: "Contact  Us", link: ROUTES.CONTACTUS },
        { title: "About Us", link: ROUTES.ABOUT_US },
        { title: "shipping", link: ROUTES.SHIPPING }
    ]
    const quicklinks1 = [
        { title: "Technicals", link: "/events/technical" },
        { title: "Culturals", link: "/events/general" },
        { title: "Informals", link: "/events/informals" },
        { title: "Proshow", link: "/events/proshows" },
        { title: "Login", link: ROUTES.CONTACTUS },
        { title: "Contact Us", link: ROUTES.CONTACTUS },
        { title: "Team", link: ROUTES.SHIPPING }
    ]
    const quicklinks2 = [
        { title: "Contact Us", link: ROUTES.CONTACTUS },
        { title: "Team", link: ROUTES.SHIPPING }
    ]
    return (
        <div className=" relative grid-background footer-container  w-full  py-10  px-4 md:px-16 flex flex-col justify-between  items-center text-general ">
            <div className="absolute top-3 left-3 opacity-[50%] "> 
                <img src={hestiaLogo} alt="Hestia Logo" className='md:w-13 w-12' />
            </div>
            <div className='w-full flex flex-row justify-between pt-5 md:pt-10 pl-8 md:pl-20'>
                <div className='relative flex flex-row  justify-start gap-5 md:gap-10'>
                    <div className='absolute top-0 px-3'>
                        <h1 className='text-[13px] md:text-[18px]  text-[#FBF0C2] font-semibold '>Quick Links</h1>
                    </div>
                    <div className=' grid grid-rows-7 text-[10px] md:text-[15px] mt-12 text-general  md:space-y-1.5'>
                        {quicklinks1.map((e, ind) => (
                            <Link key={ind} className='justify-self-start text-[#FBF0C2] opacity-70 hover:opacity-100 transition-all ' to={e.link}>{e.title}</Link>
                        ))}

                    </div>
                    <div className='grid grid-rows-7 text-[10px] md:text-[15px]  text-center mt-12 text-general space-y-1.5'>
                        {quicklinks2.map((e, ind) => (
                            <Link key={ind} className='justify-self-start text-[#FBF0C2] opacity-70 hover:opacity-100 transition-all   ' to={e.link}>{e.title}</Link>
                        ))}

                    </div>
                </div>
                <div className='flex flex-col justify-around gap-0 items-end py-8'>
                    <div className="footer-btns w-10/12   flex justify-end  ">
                        <a href="https://twitter.com/hestiatkmce?t=bRAw2W7hEFL7NLjZfLsu4Q&s=08" target="_blank">
                            <button className='p-button rounded-full'>
                                <span className='pi pi-twitter p-button-icon text-general'></span>
                            </button>
                        </a>
                        <a href="https://instagram.com/hestia.tkmce?igshid=YmMyMTA2M2Y=" target="_blank">
                            <button className='p-button ml-4'>
                                <span className='pi pi-instagram p-button-icon text-general'></span>
                            </button>
                        </a>
                        <a href="https://m.facebook.com/hestiatkmce/" target="_blank">
                            <button className='p-button ml-4'>
                                <span className='pi pi-facebook p-button-icon text-general'></span>
                            </button>
                        </a>
                    </div>
                    <div className="overflow-hidden rounded-lg lg:col-span-2 h-20 lg:h-36 w-40 lg:w-96 pt-0">
                        <div >
                            <iframe
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=tkm%20college%20of%20enfineering+(tkmce)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-7 text-[6px] md:text-[12px]  text-center mt-12 text-general '>
                {links.map((e, ind) => (
                    <Link key={ind} className='text-center text-[#FBF0C2] opacity-70 hover:opacity-100 transition-all uppercase' to={e.link}>{e.title}</Link>
                ))}

            </div>
        </div>
    )

}

export default Footer