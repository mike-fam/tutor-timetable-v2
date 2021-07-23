import React, { useMemo } from "react";
import { SessionTheme } from "../../types/session";
import { Props as SessionProps, Session } from "./Session";
import { PopoverSession } from "./PopoverSession";
import { Box } from "@chakra-ui/react";
import { TimetableSessionPopover } from "./TimetableSessionPopover";

export type TimetableCustomSessionProps = {
    allocation: string[];
    numberOfStaff: number;
    location: string;
    courseCode: string;
    theme?: SessionTheme;
};

export type Props = SessionProps<TimetableCustomSessionProps>;

export const TimetableSession2: React.FC<Props> = (props) => {
    const { custom, sessionId, name } = props;
    const { allocation, location, courseCode, numberOfStaff } = useMemo(
        () => custom(sessionId),
        [custom, sessionId]
    );
    return (
        <PopoverSession
            sessionComponent={
                <Session {...props}>
                    <Box p={1}>{name}</Box>
                </Session>
            }
            popoverContent={
                <TimetableSessionPopover
                    name={name}
                    allocation={allocation}
                    location={location}
                    courseCode={courseCode}
                    numberOfStaff={numberOfStaff}
                />
            }
        />
    );
};
