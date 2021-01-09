import React from "react";
import { Props as SessionProps, Session } from "./timetable/Session";
import { Box } from "@chakra-ui/react";

type Props = SessionProps & {
    name: string;
    key?: number;
};

export const TimetableSession: React.FC<Props> = ({
    children: _,
    ...props
}) => {
    return (
        <Session {...props}>
            <Box p={1}>{props.name}</Box>
        </Session>
    );
};
