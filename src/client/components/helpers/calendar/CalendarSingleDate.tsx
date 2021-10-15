import React, { useState } from "react";
import { CalendarCore } from "./CalendarCore";
import { CalendarMonth } from "../../../types/calendar";
import { today } from "../../../constants/date";

type Props = {
    selectedDate?: Date;
    onChange: (date: Date) => void;
    defaultViewedMonth?: CalendarMonth;
};

export const CalendarSingleDate: React.FC<Props> = ({
    selectedDate,
    onChange,
    defaultViewedMonth,
}) => {
    return (
        <div></div>
        // <CalendarCore
        //     selectedDays={selectedDate ? [selectedDate] : []}
        //     onDateClick={onChange}
        //     viewedMonth={month}
        //     setViewedMonth={setMonth}
        // />
    );
};
