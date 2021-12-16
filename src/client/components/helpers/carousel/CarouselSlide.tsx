import { FC, useContext, useMemo } from "react";
import { CarouselContext } from "./Carousel";
import { Box } from "@chakra-ui/react";

type Props = {
    slideIndex: number;
};

export const CarouselSlide: FC<Props> = ({ slideIndex, children }) => {
    const {
        slideWidth,
        slideHeight,
        gutters,
        width,
        height,
        currentSlide,
        visibleSlidesInView,
    } = useContext(CarouselContext);
    const middleWidth = useMemo(() => width / 2, [width]);
    const leftEdgeCurrentSlide = useMemo(
        () => middleWidth - slideWidth / 2,
        [middleWidth, slideWidth]
    );

    return (
        <Box
            width={`${slideWidth}px`}
            height={`${slideHeight}px`}
            pos="absolute"
            left={`${
                leftEdgeCurrentSlide +
                (slideIndex - currentSlide) * (slideWidth + gutters)
            }px`}
            top={`${(height - slideHeight) / 2}px`}
            transition="all 0.3s ease"
            opacity={
                Math.abs(currentSlide - slideIndex) * 2 + 1 <=
                visibleSlidesInView
                    ? 1
                    : 0
            }
            zIndex={-1}
        >
            {children}
        </Box>
    );
};
