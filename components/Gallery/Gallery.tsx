"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GalleryImage } from "@/types/camper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./Gallery.module.css";

type GalleryProps = {
  gallery: GalleryImage[];
  alt: string;
};

export default function Gallery({ gallery, alt }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!gallery || gallery.length === 0) {
    return (
      <div className={styles.empty} aria-label="No photos available">
        No photos
      </div>
    );
  }

  const images = [...gallery].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.wrap}>
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        loop={images.length > 1}
        spaceBetween={16}
        className={styles.main}
        a11y={{
          prevSlideMessage: "Previous image",
          nextSlideMessage: "Next image",
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className={styles.slide}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.original}
              alt={alt}
              className={styles.image}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          freeMode
          watchSlidesProgress
          slidesPerView={4}
          spaceBetween={32}
          className={styles.thumbs}
        >
          {images.map((image) => (
            <SwiperSlide
              key={`thumb-${image.id}`}
              className={styles.thumbSlide}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.thumb}
                alt=""
                className={styles.thumbImage}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
