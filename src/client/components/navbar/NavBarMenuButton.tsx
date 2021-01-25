import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React, { forwardRef, ReactElement } from "react";

const buttonStyle = {
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 250ms",
    userSelect: "none",
    position: "relative",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    outline: "none",
    px: 3,
    mx: 1,
    h: "100%",
} as const;

type Props = Partial<Omit<BoxProps, keyof typeof buttonStyle | "_hover">> & {
    rightIcon?: ReactElement;
    leftIcon?: ReactElement;
};

export const NavBarMenuButton: React.FC<Props> = forwardRef<
    HTMLDivElement,
    Props
>((props, ref) => {
    const colour = useColorModeValue("gray.100", "blue.900");
    return (
        <Box
            {...buttonStyle}
            {...props}
            _hover={{
                bgColor: colour,
            }}
            ref={ref}
        >
            {props.leftIcon || null}
            {props.children}
            {props.rightIcon || null}
        </Box>
    );
});
