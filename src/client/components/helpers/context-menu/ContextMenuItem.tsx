import { FC, MouseEventHandler, useContext, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ContextMenuContext } from "./ContextMenu";

type Props = {
    onClick: MouseEventHandler;
    colorScheme?: string;
    disabled?: boolean;
};

export const ContextMenuItem: FC<Props> = ({
    children,
    onClick,
    colorScheme,
    disabled = false,
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
            borderRadius={0}
            w="100%"
            justifyContent="left"
            size="sm"
            overflow="hidden"
            textOverflow="ellipsis"
            colorScheme={colorScheme}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};
