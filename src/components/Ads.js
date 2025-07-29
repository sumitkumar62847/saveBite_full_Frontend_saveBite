import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import ads1 from '../images/ads1.jpg'
import ads2 from '../images/ads2.jpg'


function Ads() {
const adsImg = [ads1, ads2];
 

  return (
    <section className='w-full h-[400px] p-5 flex justify-center items-center bg-white'>
        <div className='w-[95%] h-[95%] bg-[rgb(80,89,98)] rounded-xl overflow-hidden'>
          <div className="w-full h-[100%]" >
            <Swiper
              modules={[Autoplay, EffectFade]}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false  }}
              speed={400}
              slidesPerView={1}
              className="w-full h-full"
            >{adsImg.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={'add'+index} className="w-full h-full object-fill transition-opacity duration-1000 cursor-pointer" />
              </SwiperSlide>
            ))}
            </Swiper>
          </div>
        </div>
    </section>
  )
}

export default Ads;