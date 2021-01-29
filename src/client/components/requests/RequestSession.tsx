import React from "react";
import { Props as SessionProps, Session } from "../timetable/Session";
import { SessionTheme } from "../../types/timetable";
import { Box } from "@chakra-ui/react";

export type RequestSessionProps = {
    onClick: (sessionId: number) => void;
    theme: SessionTheme;
};

type Props = SessionProps & RequestSessionProps;

export const RequestSession: React.FC<Props> = ({
    onClick,
    theme,
    ...props
}) => {
    return (
        <Session
            {...props}
            _hover={{
                filter: "brightness(0.8)",
            }}
            onClick={() => {
                onClick(props.id);
            }}
        >
            <Box p={1}>{props.name}</Box>
        </Session>
    );
};
