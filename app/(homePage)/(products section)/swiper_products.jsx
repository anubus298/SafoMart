"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { Suspense, useEffect, useState } from "react";
import Fallback_productCard from "./(fallback)/Fallback_productCard";
function SwiperProducts(props) {
  const [swiperPreview, setSwiperPreview] = useState(4);
  const [navigationEnabled, setNavigationEnabled] = useState(true);
  const [domloaded, setdomloaded] = useState(false);
  useEffect(() => {
    if (document.documentElement.clientWidth < 1024) {
      setSwiperPreview(2);
      setNavigationEnabled(false);
    }
    if (document.documentElement.clientWidth < 768) {
      setSwiperPreview(1);
      setNavigationEnabled(false);
    }
    setdomloaded(true);
  }, []);

  return (
    <div className="text-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={navigationEnabled}
        className=""
        slidesPerView={swiperPreview}
        effect={swiperPreview == 1 ? "fade" : false}
        autoplay={{
          delay: 7000,
          disableOnInteraction: true,
        }}
      >
        {props.data &&
          props.data.items.map((item) => {
            return (
              <SwiperSlide className="flex justify-center" key={item.id}>
                {domloaded ? (
                  <ProductCard item={item} type={props.type} />
                ) : (
                  <Fallback_productCard />
                )}
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default SwiperProducts;
