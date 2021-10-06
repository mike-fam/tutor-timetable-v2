import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useState,
} from "react";

type Props = {
    width?: number;
    height?: number;
    initialSlide?: number;
    cycle?: boolean;
};

export type CarouselState = {
    currentSlide: number;
    setCurrentSlide: Dispatch<SetStateAction<number>>;
    totalSlides: number;
    setTotalSlides: Dispatch<SetStateAction<number>>;
    nextSlide: () => void;
    previousSlide: () => void;
    width?: number;
    height?: number;
};

export const CarouselContext = createContext<CarouselState>({
    currentSlide: 0,
    setCurrentSlide: () => {},
    totalSlides: 1,
    setTotalSlides: () => {},
    nextSlide: () => {},
    previousSlide: () => {},
    width: 0,
    height: 0,
});

const useCarousel = (
    initialSlide: number,
    width?: number,
    height?: number,
    cycle: boolean = false
): CarouselState => {
    const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
    const [totalSlides, setTotalSlides] = useState<number>(0);
    const nextSlide = useCallback(() => {
        setTotalSlides((prev) => {
            if (++prev >= totalSlides) {
                if (cycle) {
                    return 0;
                } else {
                    return totalSlides - 1;
                }
            }
            return prev;
        });
    }, [totalSlides, cycle]);
    const previousSlide = useCallback(() => {
        setTotalSlides((prev) => {
            if (--prev < 0) {
                if (cycle) {
                    return totalSlides - 1;
                } else {
                    return 0;
                }
            }
            return prev;
        });
    }, [totalSlides, cycle]);
    return {
        currentSlide,
        setCurrentSlide,
        totalSlides,
        setTotalSlides,
        nextSlide,
        previousSlide,
        width,
        height,
    };
};

export const Carousel: React.FC<Props> = ({
    width,
    height,
    initialSlide = 0,
    cycle = false,
    children,
}) => {
    const carousel = useCarousel(initialSlide, width, height, cycle);
    return (
        <CarouselContext.Provider value={carousel}>
            {children}
        </CarouselContext.Provider>
    );
};
