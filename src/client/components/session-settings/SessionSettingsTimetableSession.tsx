import React, { useMemo } from "react";
import { PopoverSession } from "../timetable/PopoverSession";
import { Box, BoxProps } from "@chakra-ui/react";
import { TimetableSessionPopover } from "../timetable/TimetableSessionPopover";
import {
    ClickableSession,
    Props as ClickableSessionProps,
} from "../timetable/ClickableSession";

export type TimetableCustomSessionProps = {
    allocation: string[];
    location: string;
    courseCode: string;
    styles: Omit<BoxProps, "onClick" | "_hover" | "id">;
};

export type Props = ClickableSessionProps<TimetableCustomSessionProps>;

export const SessionSettingsTimetableSession: React.FC<Props> = (props) => {
    const { custom, sessionId, name } = props;
    const { allocation, location, courseCode } = useMemo(
        () => custom(sessionId),
        [custom, sessionId]
    );
    return (
        <PopoverSession
            sessionComponent={
                <ClickableSession {...props}>
                    <Box p={1}>{name}</Box>
                </ClickableSession>
            }
            popoverContent={
                <TimetableSessionPopover
                    name={name}
                    allocation={allocation}
                    location={location}
                    courseCode={courseCode}
                />
            }
        />
    );
};
