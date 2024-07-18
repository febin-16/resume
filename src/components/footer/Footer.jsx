import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/footer.css'
import 'primeicons/primeicons.css'
import * as ROUTES from "../../constants/routes";
import hestiaLogo from "../../assets/icons/logo_hestia.png"
import "../../styles/home.css"
import { useWindowScroll } from 'react-use';
import DottedLine from '../home/DottedLine';
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
        { title: "General", link: "/events/general" },
        { title: "Workshops", link: "/events/workshops" },
       { title: "Proshow", link: "/events/proshows" },


    ]
    const quicklinks2 = [
        { title: "Contact Us", link: ROUTES.CONTACTUS },
        { title: "About Us", link: ROUTES.ABOUT_US },
    ]


    return (
        <>
            <DottedLine opacity="opacity-5" />
            {/* <DottedLine opacity="opacity-20" /> */}
            {/* <HomeMarque className="w-full" /> */}
            {/* <DottedLine opacity="opacity-20" /> */}
            {/* <DottedLine opacity="opacity-10" /> */}
            <div className=" relative grid-background  border-opacity-25 footer-container  w-full  py-10  px-4 md:px-16 flex flex-col justify-between  items-center text-general ">
                <div className="hover:animate-spin absolute top-14  md:top-20 md:left-8 left-3 opacity-[50%] " onClick={top}>
                    <a href='#' className='scroll-smooth' ><img src={hestiaLogo} alt="Hestia Logo" className='md:w-13 w-8' /></a>
                </div>
                <div className='ml-4 mt-5 w-full flex flex-row justify-between pt-5 md:pt-10 pl-8 md:pl-20'>
                    <div className='relative flex flex-row  justify-start gap-5 md:gap-10'>
                        <div className='absolute top-0 '>
                            <h1 className='text-[13px] md:text-[18px]  text-[#FBF0C2] font-semibold '>Quick Links</h1>
                        </div>
                        <div className=' grid grid-rows-7 text-[10px] md:text-[15px] mt-12 text-general  md:space-y-1.5'>
                            {quicklinks1.map((e, ind) => (
                                <Link key={ind} className='justify-self-start text-[#FBF0C2] opacity-70 hover:opacity-100 transition-all ' to={e.link}>{e.title}</Link>
                            ))}

                        </div>
                        <div className=' grid grid-rows-7 text-[10px] md:text-[15px]  md:text-center mt-12 text-general space-y-1.5'>
                            {quicklinks2.map((e, ind) => (
                                <Link key={ind} className='justify-self-start text-[#FBF0C2] opacity-70 hover:opacity-100 transition-all    ' to={e.link}>{e.title}</Link>
                            ))}

                        </div>


                    </div>


                    <div className='flex flex-col justify-around gap-0 items-end py-8'>
                        <div className="footer-btns w-10/11 mx-2   flex justify-end  ">
                            <a href="https://twitter.com/hestiatkmce?t=bRAw2W7hEFL7NLjZfLsu4Q&s=08" target="_blank" className='w-1/5'>
                                <button className='p-button rounded-full'>
                                    <span className='pi pi-twitter p-button-icon text-general'></span>
                                </button>
                            </a>
                            <a href="https://instagram.com/hestia.tkmce?igshid=YmMyMTA2M2Y=" target="_blank" className='w-1/5'>
                                <button className='p-button ml-1'>
                                    <span className='pi pi-instagram p-button-icon text-general'></span>
                                </button>
                            </a>
                            <a href="https://m.facebook.com/hestiatkmce/" target="_blank" className='w-1/5'>
                                <button className='p-button ml-1'>
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
                        <div className="text-xs md:text-base bg-[#FBF0C2] bg-opacity-60 mt-8 p-1 md:px-4 md:py-1 text-black rounded-lg text-left">

                            <h2 className=" italic">Any Issues?</h2>
                            <div className="flex justify-center" >
                                Connect with us :
                                <a href="mailto:mail@hestiatkmce.in" target="_blank">
                                    <i className="ml-3  scale-[0.9]  pi pi-envelope mr-3" target="_blank" style={{ fontSize: '1rem' }}></i></a>

                                <a aria-label="Chat on WhatsApp" href="https://wa.me/7559961630" target="_blank" >
                                    <i className="ml-3  scale-[0.9]  pi pi-whatsapp mr-3" style={{ fontSize: '1rem' }}></i></a>
                                <a aria-label="Chat on WhatsApp" href="https://wa.me/7558950722" target="_blank" >
                                    <i className="ml-3  scale-[0.9]  pi pi-whatsapp mr-3" style={{ fontSize: '1rem' }}></i></a>    


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
        </>
    )

}

export default Footer