"use client";

import * as React from "react";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

type CarouselContextType = {
  emblaApi: UseEmblaCarouselType[1];
  selectedIndex: number;
  scrollSnaps: number[];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  scrollTo: (index: number) => void;
} | null;

const CarouselContext = React.createContext<CarouselContextType>(null);

export const CarouselProvider: React.FC<
  React.PropsWithChildren<Parameters<typeof useEmblaCarousel>[0]>
> = ({ children, ...props }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(props);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);

  const onSelect = React.useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const onInit = React.useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const value = React.useMemo(
    () => ({
      emblaApi,
      selectedIndex,
      scrollSnaps,
      canScrollNext,
      canScrollPrev,
      scrollTo,
    }),
    [
      emblaApi,
      selectedIndex,
      scrollSnaps,
      canScrollNext,
      canScrollPrev,
      scrollTo,
    ]
  );

  return (
    <CarouselContext.Provider value={value}>
      <div ref={emblaRef}>{children}</div>
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
};
