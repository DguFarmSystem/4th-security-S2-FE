import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import ImageHeader from "./ImageHeader";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onDotClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full relative">
      <ImageHeader isEditable={true} />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div
              className="relative w-full flex-shrink-0 aspect-[385.593/260] flex items-center justify-center overflow-hidden"
              key={i}
            >
              <img
                src={src}
                alt={`이미지 ${i + 1}`}
                className="w-full object-contain"
              />
              <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={twMerge(
              "w-[6px] h-[6px] rounded-full transition-all duration-200",
              selectedIndex === i
                ? "bg-white scale-110"
                : "bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
