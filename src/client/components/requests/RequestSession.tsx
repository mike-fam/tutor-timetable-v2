import React from "react";
import {
    TimetableCustomSessionProps,
    TimetableSession,
} from "../timetable/TimetableSession";
import { Props as SessionProps } from "../timetable/Session";
import { useColorMode } from "@chakra-ui/react";

export type RequestSessionProps = {
    onClick: (sessionId: string) => void;
    disabled: boolean;
} & TimetableCustomSessionProps;

type Props = Omit<
    SessionProps<RequestSessionProps>,
    "_hover" | "onClick" | "opacity"
>;

export const RequestSession: React.FC<Props> = (props) => {
    const { colorMode } = useColorMode();
    const { disabled, onClick } = props.custom(props.sessionId);
    return (
        <TimetableSession
            {...props}
            _hover={
                disabled
                    ? {}
                    : {
                          filter:
                              colorMode === "light"
                                  ? "brightness(1.3)"
                                  : "brightness(0.7)",
                      }
            }
            onClick={() => {
                !disabled && onClick(props.sessionId);
            }}
            opacity={disabled ? 0.5 : 1}
        />
    );
};
