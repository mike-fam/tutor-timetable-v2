import React from "react";
import { Props as TimetableSessionProps } from "../timetable/TimetableSession";
import { Props as SessionProps } from "../timetable/Session";
import { SessionTheme } from "../../types/timetable";
import { useColorMode } from "@chakra-ui/react";
import { TimetableSession } from "../timetable/TimetableSession";

export type RequestSessionProps = {
    onClick: (sessionId: number) => void;
    theme: SessionTheme;
    disabled: boolean;
} & Omit<TimetableSessionProps, keyof SessionProps>;

type Props = Omit<SessionProps, "_hover" | "onClick" | "opacity"> &
    RequestSessionProps;

export const RequestSession: React.FC<Props> = ({
    onClick,
    disabled,
    ...props
}) => {
    const { colorMode } = useColorMode();
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
                !disabled && onClick(props.id);
            }}
            opacity={disabled ? 0.5 : 1}
        />
    );
};
