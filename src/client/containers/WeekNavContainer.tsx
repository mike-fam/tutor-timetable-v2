import React from "react";
import { WeekNav } from "../components/WeekNav";

type Props = {};

// Placeholder data
export const WeekNavContainer: React.FunctionComponent<Props> = () => {
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    return (
        <div>
            <WeekNav numOfWeeks={weeks} />
        </div>
    );
};
