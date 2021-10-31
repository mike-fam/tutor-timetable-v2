import React from "react";
import { Carousel } from "../helpers/carousel/Carousel";
import { CarouselPrevButton } from "../helpers/carousel/CarouselPrevButton";
import { CarouselSlides } from "../helpers/carousel/CarouselSlides";
import range from "lodash/range";
import { WeekPreviewCard } from "./WeekPreviewCard";
import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";
import addWeeks from "date-fns/addWeeks";
import { CarouselNextButton } from "../helpers/carousel/CarouselNextButton";
import differenceInWeeks from "date-fns/differenceInWeeks";
import { isDateValid } from "../../../utils/date";

type Props = {
    startDate: Date;
    endDate: Date;
    weekNames: string[];
};

export const WeekCarousel: React.FC<Props> = ({
    startDate,
    endDate,
    weekNames,
}) => {
    if (!isDateValid(startDate) || !isDateValid(endDate)) {
        return null;
    }
    startDate = startOfISOWeek(startDate);
    endDate = startOfISOWeek(endDate);
    const weekNum = differenceInWeeks(endDate, startDate) + 1;
    return (
        <Carousel
            d="flex"
            cycle
            initialSlide={3}
            slideWidth={180}
            gutters={30}
            width={1000}
            slideHeight={200}
            alignItems="center"
            visibleSlidesInView={15}
            animate
        >
            <CarouselPrevButton />
            <CarouselSlides>
                {range(weekNum).map((i) => (
                    <WeekPreviewCard
                        name={weekNames[i] || `Week ${i}`}
                        startDate={addWeeks(startDate, i)}
                        endDate={endOfISOWeek(addWeeks(startDate, i))}
                        key={i}
                    />
                ))}
            </CarouselSlides>
            <CarouselNextButton />
        </Carousel>
    );
};
