import React, { useContext, useEffect, useMemo } from "react";
import { Box, BoxProps, theme, useColorMode } from "@chakra-ui/react";
import { CarouselContext } from "./Carousel";
import { CarouselSlide } from "./CarouselSlide";

type Props = Omit<
    BoxProps,
    "w" | "width" | "h" | "height" | "pos" | "position" | "overflow"
>;

export const CarouselSlides: React.FC<Props> = ({ children, ...boxProps }) => {
    const { width, height, setTotalSlides } = useContext(CarouselContext);
    useEffect(() => {
        setTotalSlides(React.Children.count(children));
    }, [setTotalSlides, children]);
    const featherWidth = useMemo(() => width / 6, [width]);
    const featherBlur = useMemo(() => featherWidth / 3, [featherWidth]);
    const { colorMode } = useColorMode();
    const featherColor =
        colorMode === "light" ? "white" : theme.colors.gray["800"];
    return (
        <Box
            w={`${width}px`}
            h={`${height}px`}
            pos="relative"
            overflow="hidden"
            _after={{
                content: '""',
                zIndex: 1000,
                display: "block",
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                boxShadow:
                    `${featherWidth}px 0 ${featherBlur}px -${featherBlur}px ${featherColor} inset, ` +
                    `-${featherWidth}px 0 ${featherBlur}px -${featherBlur}px ${featherColor} inset`,
                pointerEvents: "none",
            }}
            {...boxProps}
        >
            {React.Children.map(children, (child, index) => (
                <CarouselSlide slideIndex={index}>{child}</CarouselSlide>
            ))}
        </Box>
    );
};
