"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import "./index.css";
const Gallery = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Image
          src="/classroom.jpeg"
          alt="Event Image 1"
          height={400}
          width={"700"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/campus-facilities-2(1).jpg"
          alt="Location Image 1"
          height={400}
          width={"700"}
          //   width={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/land and building.jpg"
          alt="Facility Image 1"
          height={400}
          width={"700"}
          //   width={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/cathall.jpg"
          alt="Facility Image 1"
          height={400}
          width={"700"}
          //   width={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/classroom.jpeg"
          alt="Facility Image 1"
          height={400}
          width={"700"}
          //   width={400}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Gallery;
