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
import { UserContext } from "../../utils/user";
import { NavBarMenuButton } from "./NavBarMenuButton";
import { BsPersonFill } from "react-icons/all";
import { EditUserDetailsModalContainer } from "../../containers/navbar/EditUserDetailsModalContainer";
import { TimetableSettingsModal } from "../../containers/TimetableSettingsModal";
import { Role } from "../../generated/graphql";
import { RouterLink } from "../helpers/RouterLink";

type Props = {};

export const NavBar: React.FunctionComponent<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const { user } = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <RouterLink to="/" fullHeight>
                        <NavBarMenuButton>Home</NavBarMenuButton>
                    </RouterLink>
                    <RouterLink to="/requests" fullHeight>
                        <NavBarMenuButton>Requests</NavBarMenuButton>
                    </RouterLink>
                    <RouterLink to="/availabilities" fullHeight>
                        <NavBarMenuButton>Availability</NavBarMenuButton>
                    </RouterLink>
                    <RouterLink to="/preferences" fullHeight>
                        <NavBarMenuButton>Preferences</NavBarMenuButton>
                    </RouterLink>
                    {user.courseStaffs.some(
                        (courseStaff) =>
                            courseStaff.role === Role.CourseCoordinator
                    ) && (
                        <Menu>
                            <MenuButton
                                as={NavBarMenuButton}
                                rightIcon={<ChevronDownIcon />}
                                style={{ cursor: "pointer" }}
                            >
                                Admin
                            </MenuButton>
                            <MenuList style={{ margin: 0 }}>
                                <MenuItem>
                                    <RouterLink
                                        to="/allocator"
                                        fullHeight
                                        fullWidth
                                    >
                                        Allocator
                                    </RouterLink>
                                </MenuItem>
                                <MenuItem>
                                    <RouterLink
                                        to="/course-staff"
                                        fullHeight
                                        fullWidth
                                    >
                                        Course Staff
                                    </RouterLink>
                                </MenuItem>
                                <MenuItem>
                                    <RouterLink
                                        to="/session-settings"
                                        fullHeight
                                        fullWidth
                                    >
                                        Session Settings
                                    </RouterLink>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                    <Menu>
                        <MenuButton
                            as={NavBarMenuButton}
                            leftIcon={<Icon as={BsPersonFill} mr={1} />}
                            rightIcon={<ChevronDownIcon ml={1} />}
                            style={{ cursor: "pointer" }}
                        >
                            {user.username}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen}>
                                Edit Personal Details
                            </MenuItem>
                            <MenuItem onClick={openTimetableSettingsModal}>
                                Timetable Settings
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                                as="a"
                                href="https://api.uqcloud.net/logout/"
                            >
                                Log out
                            </MenuItem>
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
            <EditUserDetailsModalContainer
                isOpen={isOpen}
                openModal={onOpen}
                closeModal={onClose}
            />
            <Divider />
            <TimetableSettingsModal
                isOpen={isTimetableSettingsModalOpen}
                onClose={closeTimetableSettingsModal}
            />
        </>
    );
};
