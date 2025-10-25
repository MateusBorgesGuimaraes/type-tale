"use client";

import { transformLinkImage } from "@/lib/utils/transform-link-image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleDotIcon,
  CircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

type ImageSliderProps = {
  images: {
    id: string;
    title: string;
    link: string;
    banner: string;
  }[];
};

export function ImagesSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  function showPrevImage() {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  useEffect(() => {
    const interval = setInterval(showNextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-sm">
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out will-change-transform"
        style={{ transform: `translateX(${-100 * imageIndex}%)` }}
      >
        {images.map(({ id, title, link, banner }, index) => {
          const isActive = index === imageIndex;

          const ImageElement = (
            <img
              src={transformLinkImage(banner)}
              alt={title}
              className="object-cover w-full h-full block"
            />
          );
          return isActive ? (
            <Link
              key={id}
              href={link}
              className="shrink-0 grow-0 w-full h-full"
            >
              {ImageElement}
            </Link>
          ) : (
            <div key={id} className="shrink-0 grow-0 w-full h-full">
              {ImageElement}
            </div>
          );
        })}
      </div>

      <button
        onClick={showPrevImage}
        className="absolute top-0 bottom-0 left-0 p-4 cursor-pointer hover:bg-black/30 transition"
        aria-label="Imagem anterior"
      >
        <ArrowLeftIcon className="text-white" />
      </button>

      <button
        onClick={showNextImage}
        className="absolute top-0 bottom-0 right-0 p-4 cursor-pointer hover:bg-black/30 transition"
        aria-label="Próxima imagem"
      >
        <ArrowRightIcon className="text-white" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setImageIndex(index)}
            aria-label={`Ver imagem ${index + 1}`}
            className="w-4 h-4"
          >
            {index === imageIndex ? (
              <CircleDotIcon className="text-white cursor-pointer w-4 h-4 transition-transform hover:scale-125" />
            ) : (
              <CircleIcon className="text-white cursor-pointer w-4 h-4 transition-transform hover:scale-125" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
