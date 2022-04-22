import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Pagination, Navigation, Autoplay} from "swiper";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function Carousel({settings, prevRefNavigation, nextRefNavigation, item, itemsData, selectedSlide}) {

  const [swiper, setSwiper] = useState(null);
  const [selectIndex, setSelectIndex] = useState(0);

  // вшитые пропы, если не передан settings
  const innerSettings = {
    slidesPerView: "auto",
    centeredSlides: true
  };
  // подмена пропов на вшитые, если не пришли
  settings = settings ?? innerSettings;
  selectedSlide = selectedSlide ?? 0;

  // работает с обновлением навигации пре смене рефов
  useEffect(() => {
    if (!swiper) return;
    const {navigation, navigation: {nextEl, prevEl}, params: {navigation: paramsNavigation}} = swiper;
    if (prevRefNavigation || nextRefNavigation) {
      // (prevRefNavigation) ? paramsNavigation.prevEl = prevRefNavigation.current : null;
      // (nextRefNavigation) ? paramsNavigation.nextEl = nextRefNavigation.current : null;
      if (nextEl || prevEl)
        navigation.destroy();
      navigation.init();
    }
  }, [prevRefNavigation, nextRefNavigation, swiper]);

  // работает с переданным в карусель слайдом
  useEffect(() => {
    if (!swiper) return;
    if (swiper.realIndex !== selectedSlide && selectedSlide !== null)
      swiper.slideTo(selectedSlide, swiper.speed);
  }, [selectedSlide]);


  // добавление on-метода к основым
  const addOnMethods = (callback, swiper) => {
    if (typeof callback === "function") {
      callback(swiper, swiper.realIndex, swiper.slides.length);
    }
    return null;
  };


  return (
    <div className={"carousel"}>
      <Swiper {...settings}
              onInit={swiper => {
                setSwiper(swiper);
                addOnMethods(settings.onInit, swiper);
              }}
              initialSlide={selectedSlide}
              onSlideChange={(swiper) => {
                setSelectIndex(swiper.realIndex)
                addOnMethods(settings.onSlideChange, swiper)
              }}>
        {SwiperSlides(item, itemsData, selectIndex)}
      </Swiper>
    </div>
  );
}

function SwiperSlides(Item, itemsData, selectedSlide) {
  return itemsData.map((data, index) => {
    return (
      <SwiperSlide key={data.key ?? index}>
        <Item {...data} total={itemsData.length} selectedSlide={selectedSlide}/>
      </SwiperSlide>
    );
  })

}


