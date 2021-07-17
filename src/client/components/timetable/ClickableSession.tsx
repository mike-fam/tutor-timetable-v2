import React, { ForwardedRef, forwardRef } from "react";
import { Props as SessionProps, Session } from "../timetable/Session";
import { useColorMode } from "@chakra-ui/react";

export type Props<T> = Omit<SessionProps<T>, "_hover" | "onClick"> & {
    disabled?: boolean;
    onClick: (sessionId: string) => void;
};

const ClickableSessionInner = <T,>(
    { children, onClick, disabled = false, ...props }: Props<T>,
    ref: ForwardedRef<HTMLDivElement>
) => {
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
                                  ? "brightness(1.5)"
                                  : "brightness(0.7)",
                          cursor: "pointer",
                      }
            }
            onClick={() => {
                !disabled && onClick(props.sessionId);
            }}
            ref={ref}
        >
            {children}
        </Session>
    );
};

export const ClickableSession = forwardRef(ClickableSessionInner);
