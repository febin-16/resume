import DottedLine from '../../components/home/DottedLine'
import HomeMarque from '../../components/home/HomeMarque'
import "../../styles/hero.css"
import "../../styles/home.css"
import useFetch from '../../hooks/useFetch.js';
import { BASE_URL } from '../../constants/urls.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import Hero from '../../components/home/Hero.jsx';

import pics from '../../assets/icons/logo_hestia.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


const SponsorPage = () => {

  const { error, isPending, data: sponsors } = useFetch(BASE_URL + '/api/sponsors/all');

  const spons_det = () => {
    if (sponsors !== null) {
      return sponsors.results.map((sponsor, index) => {

        return (
          <div key={index} className=' mt-16 md:mt-20 flex flex-col  gap-5 w-full'>
            <p className='uppercase text-2xl text-center md:text-4xl tracking-widest font-semibold' style={{ fontFamily: 'Bungee', color: '#FBF0C2' }}>{sponsor.partnerType}</p>
            <div className='pb-24' >
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}

                initialSlide={1}
                breakpoints={{
                  720: {
                    slidesPerView: 3
                  },
                  1024: { slidesPerView: 4 }, // Adjusted for screens larger than 720px
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: -100,
                  modifier: 1,
                  slideShadows: false,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                {sponsor?.cat?.map((items, keys) => {

                  return (
                    <SwiperSlide key={keys}>
                      <div className="my-10 flex justify-center   ">
                      
                        <div className="h-[235px] md:h-[250px] bg-transparent border-2 rounded-lg flex flex-col gap-2 justify-center items-center  md:w-[270px] xl:w-[350px] w-[250px]">
                          {!items.logo && <h1 style={{ fontFamily: 'Bungee', color: '#FBF0C2' }}>{items.name}</h1>}
                          <a className='flex justify-center' href={items.website}> <img src={items.logo === null ? pics : items.logo} className="w-1/2 " alt={items.name} /></a>
                         
                         <p className=' text-xl text-center px-2' style={{fontFamily: 'azonix', color: '#FBF0C2'}}> {items.name} </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}

              </Swiper>
            </div>

          </div>
        )
      })
    }
  }

  return (
    <div className='grid-background flex flex-col bg-black text-white'>
      <Hero title={"MEET OUR SPONSORS"} />
      <div className='hero-section'>
        {spons_det()}
      </div>
      {!sponsors && <div className='grid-background w-full h-64 flex justify-center items-center'>
        <p className='text-5xl md:text-9xl animate-pulse' style={{ fontFamily: "CharlieDotted", color: "#FBF0C2" }}> REVEALING SOON</p>
      </div>}
      

    </div>
  )
}

export default SponsorPage;
/*import React, { useContext } from "react";
import {BASE_URL} from '../../constants/urls.js';
import { ModalContext } from "../../context/modal.jsx";
import useFetch from "../../hooks/useFetch.js";

import DottedLine from '../../components/home/DottedLine.jsx'
import HomeMarque from '../../components/home/HomeMarque.jsx'
import SponsorCard from '../../components/sponsor/SponsorCard.jsx'

function SponsorsPage(props) {


  const { error, isPending, data: sponsors } = useFetch(BASE_URL+'/api/sponsors/all/');

  const {showState} = useContext(ModalContext);
  const [show,setShow] = showState;
  return (
    <div className="w-full min-h-screen text-small">
      <div className="w-full flex flex-col items-center justify-center">
        { error && <div className="text-sm">{ error }</div> }
        { sponsors?.results?.length>0 ?
              <div className='flex flex-col bg-black text-white'>
              <div className='flex flex-col w-full items-center justify-center h-64 mt-20'>
                  <p className='text-[#741BD4] font-[bungee] tracking-widest text-lg lg:text-2xl xl:text-3xl lg:mt-4 font-semibold'>HESTIA 2024</p>
                  <p className='uppercase text-7xl lg:text-8xl xl:text-9xl text-center mt-2' style={{ fontFamily: 'CharlieDotted',color:'#FBF0C2' }}>meet our sponsors</p>
              </div>
              <DottedLine/>
              <HomeMarque/>
              <DottedLine/>
             {sponsors?.results?.map((sponser)=>{
                return(
                  <div className='w-full mt-10 flex flex-col mx-16 justify-center gap-5 '>
                    <p className='uppercase text-2xl text-center md:text-4xl' style={{ fontFamily: 'Bungee',color:'#FBF0C2' }}>{sponser.partnerType}</p>
                    <SponsorCard sponser={sponser}/>
                  </div>
                );
              })}
        </div>
              :
              ((!error && !show) && <p className='text-secondary-dark w-full text-sm text-center mb-5'>Revealing soon</p>)
        }
      </div>
     
    </div>
  );
}

export default SponsorsPage;
*/
