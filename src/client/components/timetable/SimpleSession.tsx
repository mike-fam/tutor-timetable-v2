import { Box } from "@chakra-ui/react";
import React from "react";
import { Props as SessionProps, Session } from "./Session";

type Props = SessionProps;

export const SimpleSession: React.FC<Props> = (props) => {
    return (
        <Session {...props}>
            <Box p={1}>{props.name}</Box>
        </Session>
    );
};
