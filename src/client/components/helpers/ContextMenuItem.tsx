import React, { MouseEventHandler, useContext, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ContextMenuContext } from "./ContextMenu";

type Props = {
    colorScheme?: string;
    onClick: MouseEventHandler;
};

export const ContextMenuItem: React.FC<Props> = ({
    children,
    colorScheme,
    onClick,
}) => {
    const [variant, setVariant] = useState("ghost");
    const { closeMenu } = useContext(ContextMenuContext);
    return (
        <Button
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
                closeMenu();
            }}
            variant={variant}
            onMouseOver={() => setVariant("solid")}
            onMouseOut={() => setVariant("ghost")}
            colorScheme={colorScheme}
            borderRadius={0}
            w="100%"
            justifyContent="left"
            size="sm"
            overflow="hidden"
            textOverflow="ellipsis"
        >
            {children}
        </Button>
    );
};
