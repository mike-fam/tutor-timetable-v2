import React, { PropsWithChildren } from "react";
import { Props as SessionProps, Session } from "../timetable/Session";
import { useColorMode } from "@chakra-ui/react";

type Props<T> = Omit<SessionProps<T>, "_hover" | "onClick"> & {
    disabled: boolean;
    onClick: (sessionId: string) => void;
};

export const RequestSession = <T,>({
    children,
    onClick,
    disabled,
    ...props
}: PropsWithChildren<Props<T>>) => {
    const { colorMode } = useColorMode();
    return (
        <Session
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
        >
            {children}
        </Session>
    );
};
