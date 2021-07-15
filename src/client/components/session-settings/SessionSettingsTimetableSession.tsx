import React, { useMemo } from "react";
import { SessionTheme } from "../../types/session";
import { Props as SessionProps } from "../timetable/Session";
import { PopoverSession } from "../timetable/PopoverSession";
import { Box, } from "@chakra-ui/react";
import { TimetableSessionPopover } from "../timetable/TimetableSessionPopover";
import { ClickableSession, Props as ClickableSessionProps } from "../timetable/ClickableSession";

export type TimetableCustomSessionProps = {
    allocation: string[];
    location: string;
    courseCode: string;
    theme?: SessionTheme;
};

export type Props = ClickableSessionProps<TimetableCustomSessionProps>;

export const SessionSettingsTimetableSession: React.FC<Props> = (props) => {
    const { custom, id, name } = props;
    const { allocation, location, courseCode } = useMemo(
        () => custom(id),
        [custom, id]
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
