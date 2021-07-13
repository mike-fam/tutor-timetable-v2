import React, { PropsWithChildren, ReactElement } from "react";
import { Props as SessionProps } from "./Session";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";

type Props<T> = {
    popoverContent: ReactElement;
    sessionComponent: ReactElement<SessionProps<T>>;
};

export const PopoverSession = <T,>({
    children: _,
    popoverContent,
    sessionComponent,
}: PropsWithChildren<Props<T>>) => {
    return (
        <Popover trigger="hover" placement="auto">
            <PopoverTrigger>{sessionComponent}</PopoverTrigger>
            <PopoverContent>{popoverContent}</PopoverContent>
        </Popover>
    );
};
