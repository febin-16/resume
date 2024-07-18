import DottedLine from '../../components/home/DottedLine'
import HomeMarque from '../../components/home/HomeMarque'

import useFetch from '../../hooks/useFetch';
import {BASE_URL} from '../../constants/urls.js';
import { Swiper, SwiperSlide } from 'swiper/react';

import pics from '../../assets/icons/logo_hestia.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


const Sponsor = () => {

  const { error, isPending, data: sponsors } = useFetch(BASE_URL+'/api/sponsors/all');

const spons_det = () =>{
  if(sponsors !== null)
  { 
 return sponsors.results.map((sponsor,index) => 
  {
    
   return(
    <div key={index} className='mt-16 md:mt-20 flex flex-col  gap-5 w-full'>
            <p className='uppercase text-2xl text-center md:text-4xl tracking-widest font-semibold' style={{ fontFamily: 'Bungee',color:'#FBF0C2' }}>{sponsor.partnerType}</p>
            <div className='pb-24' >
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        
        initialSlide={1} 
        breakpoints={{
          720: { slidesPerView: 3
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
        {sponsor.cat.map((items,keys) =>
            {
              
             return (
              <SwiperSlide key={keys}>
        <div className="my-10 flex justify-center  ">
          <div className="h-[200px] bg-transparent border-2 rounded-lg flex justify-center items-center py-3 md:w-[270px] xl:w-[350px] w-[250px]">
           <a className='flex justify-center' href={items.website}> <img src={items.logo ===null ?pics : items.logo } className="w-3/4 " alt={items.name} /></a>
           <p className='text-white text-4xl'>Sponsor</p>
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
    <div className='flex flex-col bg-black text-white'>
        <div className='flex flex-col w-full items-center justify-center h-64 mt-20'>
            <p className='text-[#741BD4] font-[bungee] tracking-widest text-lg lg:text-2xl xl:text-3xl lg:mt-4 font-semibold'>HESTIA 2024</p>
            <p className='uppercase text-7xl lg:text-8xl xl:text-9xl text-center mt-2' style={{ fontFamily: 'CharlieDotted',color:'#FBF0C2' }}>meet our sponsors</p>
        </div>
        <DottedLine/>
        <HomeMarque/>
        <DottedLine/>
        {spons_det()}
        
    </div>
  )
}

export default Sponsor