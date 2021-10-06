import React, { useContext, useEffect } from "react";
import { CarouselContext } from "./Carousel";
import { Box } from "@chakra-ui/react";

type Props = {};

export const CarouselSlide: React.FC<Props> = ({ children }) => {
    const { setTotalSlides, width, height } = useContext(CarouselContext);
    useEffect(() => {
        setTotalSlides((prev) => prev + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box width={width} height={height}>
            {children}
        </Box>
    );
};
