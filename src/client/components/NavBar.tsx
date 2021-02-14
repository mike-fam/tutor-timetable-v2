import { ChevronDownIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    Tooltip,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../utils/user";
import { NavBarMenuButton } from "./navbar/NavBarMenuButton";
import { BsPersonFill } from "react-icons/all";
import { TimetableSettingsModal } from "../containers/TimetableSettingsModal";

type Props = {};

export const NavBar: React.FunctionComponent<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const {
        user: { username },
    } = useContext(UserContext);
    const {
        isOpen: isTimetableSettingsModalOpen,
        onOpen: openTimetableSettingsModal,
        onClose: closeTimetableSettingsModal,
    } = useDisclosure();
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
                    <RouterLink to="/" style={{ height: "100%" }}>
                        <NavBarMenuButton>Home</NavBarMenuButton>
                    </RouterLink>
                    <RouterLink to="/requests" style={{ height: "100%" }}>
                        <NavBarMenuButton>Requests</NavBarMenuButton>
                    </RouterLink>
                    <RouterLink to="/availabilities" style={{ height: "100%" }}>
                        <NavBarMenuButton>Availability</NavBarMenuButton>
                    </RouterLink>
                    <RouterLink to="/preferences" style={{ height: "100%" }}>
                        <NavBarMenuButton>Preferences</NavBarMenuButton>
                    </RouterLink>
                    <Menu>
                        <MenuButton
                            as={NavBarMenuButton}
                            rightIcon={<ChevronDownIcon />}
                            style={{ cursor: "pointer" }}
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
                            style={{ cursor: "pointer" }}
                        >
                            {username}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={openTimetableSettingsModal}>
                                Timetable Settings
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                    <Tooltip
                        label={
                            colorMode === "light"
                                ? "Toggle Dark Mode"
                                : "Toggle Light Mode"
                        }
                    >
                        <NavBarMenuButton
                            onClick={toggleColorMode}
                            style={{ cursor: "pointer" }}
                        >
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </NavBarMenuButton>
                    </Tooltip>
                </Flex>
            </Box>
            <Divider />
            <TimetableSettingsModal
                isOpen={isTimetableSettingsModalOpen}
                onClose={closeTimetableSettingsModal}
            />
        </>
    );
};
