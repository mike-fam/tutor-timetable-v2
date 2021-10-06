import React, { ElementType, useContext } from "react";
import { Icon } from "@chakra-ui/icons";
import { BsChevronLeft } from "react-icons/bs";
import { CarouselContext } from "./Carousel";

type Props = {
    as?: ElementType;
};

export const CarouselPrevButton: React.FC<Props> = ({ as }) => {
    const { previousSlide } = useContext(CarouselContext);
    return <Icon as={as || BsChevronLeft} onClick={() => previousSlide()} />;
};
