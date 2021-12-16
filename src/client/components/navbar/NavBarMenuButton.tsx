import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { FC, forwardRef, ReactElement } from "react";

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

export const NavBarMenuButton: FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({ leftIcon, rightIcon, ...props }, ref) => {
        const colour = useColorModeValue("gray.200", "blue.900");
        return (
            <Box
                {...buttonStyle}
                {...props}
                _hover={{
                    bgColor: colour,
                }}
                ref={ref}
            >
                {leftIcon || null}
                {props.children}
                {rightIcon || null}
            </Box>
        );
    }
);
