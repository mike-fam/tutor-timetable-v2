import { useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { SessionTheme } from "../types/session";

type ColourTheme = {
    light: string;
    dark: string;
};

export const useSessionBgColour = (theme: SessionTheme) => {
    const colour = useMemo((): ColourTheme => {
        switch (theme) {
            case SessionTheme.ERROR:
                return { light: "red.700", dark: "red.600" };
            case SessionTheme.SUCCESS:
                return { light: "green.600", dark: "green.500" };
            case SessionTheme.WARNING:
                return { light: "yellow.600", dark: "yellow.500" };
            case SessionTheme.OTHER: // TODO: check
                return { light: "teal.600", dark: "teal.500" };
            case SessionTheme.SECONDARY: // TODO: check
                return { light: "gray.400", dark: "gray.400" };
            case SessionTheme.PRIMARY:
            default:
                return { light: "gray.800", dark: "blue.600" };
        }
    }, [theme]);
    return useColorModeValue(colour.light, colour.dark);
};
