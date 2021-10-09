import React, { useContext, useMemo } from "react";
import { CarouselContext } from "./Carousel";
import { Box } from "@chakra-ui/react";

type Props = {
    slideIndex: number;
};

export const CarouselSlide: React.FC<Props> = ({ slideIndex, children }) => {
    const { slideWidth, slideHeight, gutters, width, height, currentSlide } =
        useContext(CarouselContext);
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
            transition="0.1s ease"
        >
            {children}
        </Box>
    );
};
