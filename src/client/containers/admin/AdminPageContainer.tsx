import React, { useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Grid, GridItem, Heading, UnorderedList } from "@chakra-ui/react";
import { AdminSidebarLink } from "../../components/admin/AdminSidebarLink";
import { defaultStr } from "../../constants";
import { Carousel } from "../../components/helpers/carousel/Carousel";
import { CarouselPrevButton } from "../../components/helpers/carousel/CarouselPrevButton";
import { CarouselNextButton } from "../../components/helpers/carousel/CarouselNextButton";
import { CarouselSlides } from "../../components/helpers/carousel/CarouselSlides";
import range from "lodash/range";
import { WeekPreviewCard } from "../../components/admin/WeekPreviewCard";
import { endOfISOWeek, subWeeks } from "date-fns";
import startOfISOWeek from "date-fns/startOfISOWeek";
import { CalendarCore } from "../../components/helpers/calendar/CalendarCore";
import { CalendarMonth } from "../../types/calendar";
import { today } from "../../constants/date";
import { CalendarInputSingleDate } from "../../components/helpers/calendar/CalendarInputSingleDate";
import { CalendarInputSingleRange } from "../../components/helpers/calendar/CalendarInputSingleRange";

type Props = {};

const pages = ["Term", "Course", "Timetable"];

export const AdminPageContainer: React.FC<Props> = () => {
    const [selectedPage, selectPage] = useState(defaultStr);
    const [date, setDate] = useState(today);
    return (
        <Wrapper>
            <Grid templateColumns="1fr 6fr" gap={6}>
                <GridItem colStart={2}>
                    <Heading>Admin Controls</Heading>
                </GridItem>
                <UnorderedList styleType="none" spacing={1} ml={0}>
                    {pages.map((page, key) => (
                        <li key={`${page}-${key}`}>
                            <AdminSidebarLink
                                name={page}
                                onClick={() => {
                                    selectPage(page);
                                }}
                                selected={page === selectedPage}
                            />
                        </li>
                    ))}
                </UnorderedList>
                <GridItem>
                    <CalendarInputSingleRange value={[]} onChange={() => {}}
                    <Carousel
                        d="flex"
                        cycle
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
                            {range(1, 15).map((i) => (
                                <WeekPreviewCard
                                    name={`Week ${i}`}
                                    startDate={subWeeks(
                                        startOfISOWeek(new Date()),
                                        14 - i
                                    )}
                                    endDate={subWeeks(
                                        endOfISOWeek(new Date()),
                                        14 - i
                                    )}
                                    key={i}
                                />
                            ))}
                        </CarouselSlides>
                        <CarouselNextButton />
                    </Carousel>
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
