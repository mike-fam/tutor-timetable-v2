import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useCallback,
    useState,
} from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type Props = BoxProps & {
    width?: number;
    height?: number;
    slideWidth?: number;
    slideHeight?: number;
    initialSlide?: number;
    cycle?: boolean;
    visibleSlidesInView?: number;
    gutters?: number;
    animate?: boolean; // TODO: maybe multiple animation modes
};

export type CarouselState = {
    currentSlide: number;
    setCurrentSlide: Dispatch<SetStateAction<number>>;
    totalSlides: number;
    setTotalSlides: Dispatch<SetStateAction<number>>;
    nextSlide: () => void;
    previousSlide: () => void;
    width: number;
    height: number;
    slideWidth: number;
    slideHeight: number;
    visibleSlidesInView: number;
    gutters: number;
    animate: boolean;
};

export const CarouselContext = createContext<CarouselState>({
    currentSlide: 0,
    setCurrentSlide: () => {},
    totalSlides: 1,
    setTotalSlides: () => {},
    nextSlide: () => {},
    previousSlide: () => {},
    width: 600,
    height: 400,
    slideWidth: 600,
    slideHeight: 400,
    visibleSlidesInView: 1,
    gutters: 20,
    animate: false,
});

const useCarousel = (
    initialSlide: number = 0,
    width: number = 600,
    height: number = 400,
    slideWidth: number = 600,
    slideHeight: number = 400,
    cycle: boolean = false,
    visibleSlidesInView: number = 1,
    gutters: number = 20,
    animate: boolean = false
): CarouselState => {
    const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
    const [totalSlides, setTotalSlides] = useState<number>(0);
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => {
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
        setCurrentSlide((prev) => {
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
        slideWidth,
        slideHeight,
        visibleSlidesInView,
        gutters,
        animate,
    };
};

export const Carousel: FC<Props> = ({
    width,
    height,
    slideWidth,
    slideHeight,
    initialSlide,
    cycle,
    children,
    visibleSlidesInView,
    gutters,
    animate,
    ...boxProps
}) => {
    const carousel = useCarousel(
        initialSlide,
        width,
        height,
        slideWidth,
        slideHeight,
        cycle,
        visibleSlidesInView,
        gutters,
        animate
    );
    return (
        <CarouselContext.Provider value={carousel}>
            <Box {...boxProps}>{children}</Box>
        </CarouselContext.Provider>
    );
};
