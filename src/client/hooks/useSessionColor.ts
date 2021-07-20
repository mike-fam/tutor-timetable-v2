import { useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { SessionTheme } from "../types/session";

type ColourTheme = {
    light: string;
    dark: string;
};

// TODO: Change colors

export const useSessionColor = (theme: SessionTheme) => {
    const colour = useMemo((): ColourTheme => {
        switch (theme) {
            case SessionTheme.ERROR:
                return { light: "red.500", dark: "red.500" };
            case SessionTheme.SUCCESS:
                return { light: "green.500", dark: "green.500" };
            case SessionTheme.WARNING:
                return { light: "yellow.500", dark: "yellow.500" };
            case SessionTheme.OTHER: // TODO: check
                return { light: "teal.500", dark: "teal.500" };
            case SessionTheme.SECONDARY: // TODO: check
                return { light: "gray.500", dark: "gray.500" };
            case SessionTheme.PRIMARY:
            default:
                return { light: "gray.500", dark: "blue.500" };
        }
    }, [theme]);
    return useColorModeValue(colour.light, colour.dark);
};
