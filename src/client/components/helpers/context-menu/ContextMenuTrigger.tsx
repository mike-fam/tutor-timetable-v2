import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { ContextMenuContext } from "./ContextMenu";

type Props = Omit<BoxProps, "onContextMenu">;

export const ContextMenuTrigger: FC<Props> = ({ children, ...boxProps }) => {
    const { openMenu } = useContext(ContextMenuContext);
    return (
        <Box
            onContextMenu={(e) => {
                e.preventDefault();
                openMenu(e.clientX, e.clientY);
            }}
            {...boxProps}
        >
            {children}
        </Box>
    );
};
