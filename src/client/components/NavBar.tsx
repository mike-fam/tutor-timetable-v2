import { ChevronDownIcon, Icon } from "@chakra-ui/icons";
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
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../utils/user";
import { NavBarMenuButton } from "./navbar/NavBarMenuButton";
import { BsPersonFill } from "react-icons/all";
import { EditUserDetailsModalContainer } from "../containers/navbar/EditUserDetailsModalContainer";

type Props = {};

export const NavBar: React.FunctionComponent<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const { user } = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box w="100%" bgColor={bgColor}>
                <Flex w="80%" mx="auto" h={14} alignItems="center">
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
                        <RouterLink to="/availabilities">
                            Availability
                        </RouterLink>
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
                                <RouterLink to="/allocator">
                                    Allocator
                                </RouterLink>
                            </MenuItem>
                            <MenuItem>
                                <RouterLink to="/course-staff">
                                    Course Staff
                                </RouterLink>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={NavBarMenuButton}
                            leftIcon={<Icon as={BsPersonFill} mr={1} />}
                            rightIcon={<ChevronDownIcon ml={1} />}
                        >
                            {user.username}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen}>
                                Edit Personal Details
                            </MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                    <NavBarMenuButton onClick={toggleColorMode}>
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </NavBarMenuButton>
                </Flex>
            </Box>
            <EditUserDetailsModalContainer
                isOpen={isOpen}
                openModal={onOpen}
                closeModal={onClose}
                user={user}
            />
            <Divider />
        </>
    );
};
