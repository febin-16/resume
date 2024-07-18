import { Swiper, SwiperSlide } from "swiper/react";
import sponsoor from "../../assets/images/Frame.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

const SponsorCard = ({ sponser }) => {

  const rendercard = () => {
    return sponser?.cat?.map((spons) => (
      <SwiperSlide key={spons.id} >
        <div className=" my-10 flex w-[200px] md:w-[270px] xl:w-[400px] justify-center items-center">
          <div className="w-full h-[200px] bg-transparent border-2 rounded-lg flex justify-center items-center">
            {spons.logo?<img src={spons.logo} className="w-3/4 h-full" alt={spons.name} />
            :
            <h1  style={{ fontFamily: 'Bungee',color:'#FBF0C2' }}>{spons.name}</h1>
            }
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <div className="pb-24">
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
        {rendercard()}
      </Swiper>
    </div>
  );
};

export default SponsorCard;
