import React, { useMemo } from "react";
import { Link, useColorMode } from "@chakra-ui/react";

type Props = {
    name: string;
    onClick: () => void;
    selected: boolean;
};

export const AdminSidebarLink: React.FC<Props> = ({
    name,
    onClick,
    selected,
}) => {
    const { colorMode } = useColorMode();
    const bgColour = useMemo(
        () => (colorMode === "light" ? "teal.50" : "teal.900"),
        [colorMode]
    );
    const textColour = useMemo(
        () => (colorMode === "light" ? "teal.900" : "teal.100"),
        [colorMode]
    );
    return (
        <Link
            onClick={onClick}
            _hover={{
                textDecoration: "none",
            }}
            h="100%"
            w="100%"
            d="block"
            borderRadius="5px"
            fontWeight={selected ? "600" : "500"}
            bgColor={selected ? bgColour : "none"}
            color={selected ? textColour : "inherit"}
            p={1}
        >
            {name}
        </Link>
    );
};
