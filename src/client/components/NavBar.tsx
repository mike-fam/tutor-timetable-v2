import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    useColorMode,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../utils/user";
import { NavBarMenuButton } from "./navbar/NavBarMenuButton";

type Props = {};

export const NavBar: React.FunctionComponent<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const {
        user: { username },
    } = useContext(UserContext);
    return (
        <>
            <Flex maxW="80%" mx="auto" h={14} alignItems="center">
                <Box>
                    <Heading size="md" fontWeight="normal">
                        Tutor TimeTable
                    </Heading>
                </Box>
                <Spacer />
                <NavBarMenuButton>
                    <RouterLink to="/">Home</RouterLink>
                </NavBarMenuButton>
                <NavBarMenuButton>
                    <RouterLink to="/requests">Requests</RouterLink>
                </NavBarMenuButton>
                <NavBarMenuButton>
                    <RouterLink to="/availabilities">Availability</RouterLink>
                </NavBarMenuButton>
                <NavBarMenuButton>
                    <RouterLink to="/preferences">Preferences</RouterLink>
                </NavBarMenuButton>
                {/*Dropdown menu. Update with proper items when ready.*/}
                <Menu>
                    <MenuButton
                        as={NavBarMenuButton}
                        rightIcon={<ChevronDownIcon />}
                    >
                        Tools
                    </MenuButton>
                    <MenuList style={{ margin: 0 }}>
                        <MenuItem>
                            <RouterLink to="/allocator">Allocator</RouterLink>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton
                        as={NavBarMenuButton}
                        rightIcon={<ChevronDownIcon />}
                    >
                        Logged in as: {username}
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
                <NavBarMenuButton onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </NavBarMenuButton>
            </Flex>
            <Divider />
        </>
    );
};
