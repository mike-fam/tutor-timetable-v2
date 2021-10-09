import React, { useContext } from "react";
import { CarouselContext } from "./Carousel";
import { BsChevronRight } from "react-icons/all";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

type Props = {
    as?: IconButtonProps["icon"];
};

export const CarouselNextButton: React.FC<Props> = ({ as }) => {
    const { nextSlide } = useContext(CarouselContext);
    return (
        <IconButton
            aria-label="next-slide"
            icon={as || <BsChevronRight />}
            onClick={() => nextSlide()}
            isRound
            variant="ghost"
        />
    );
};
