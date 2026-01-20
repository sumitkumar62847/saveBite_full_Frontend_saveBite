import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ads1 from "../images/ads1.jpg";
import ads2 from "../images/ads2.jpg";

function Ads() {
  const swiperRef = useRef(null);

  const adsImg = [
    {
      img: ads1,
      title: "Save Food, Save Money",
      desc: "Up to 50% off surplus food near you",
    },
    {
      img: ads2,
      title: "Fresh Deals Everyday",
      desc: "AI-powered smart food discovery",
    },
  ];

  // function handleExploreClick() {
  //   const section = document.getElementById("restaurants-section");
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // }

  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-100 py-4 md:py-6">
      <div
        className="
          w-[95%] mx-auto
          h-[200px] sm:h-[260px] md:h-[360px]
          rounded-3xl overflow-hidden
          shadow-xl
        "
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, EffectFade, Pagination]}
          loop
          effect="fade"
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          speed={700}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !bg-white/60 !opacity-100",
            bulletActiveClass:
              "!bg-green-400 !scale-125 transition-transform",
          }}
          slidesPerView={1}
          className="w-full h-full"
        >
          {adsImg.map((ad, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                
                <img
                  src={ad.img}
                  alt={"ad-" + index}
                  className="w-full h-full object-cover"
                />

                
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                
                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-12">
                  <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                    {ad.title}
                  </h2>

                 

                  {/* <button
                    onClick={handleExploreClick}
                    className="
                      w-fit px-4 md:px-6 py-2 md:py-3
                      rounded-xl font-semibold
                      bg-gradient-to-r from-green-400 to-green-600
                      text-white
                      hover:scale-105 transition
                    "
                  >
                    Explore Restaurants →
                  </button> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Ads;

