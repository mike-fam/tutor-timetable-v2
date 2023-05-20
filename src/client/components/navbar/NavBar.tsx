import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Tooltip,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { UserContext } from "../../utils/user";
import { NavBarMenuButton } from "./NavBarMenuButton";
import { EditUserDetailsModalContainer } from "../../containers/navbar/EditUserDetailsModalContainer";
import { Role } from "../../generated/graphql";
import { RouterLink } from "../helpers/RouterLink";
import { AdminMenu } from "./AdminMenu";
import { UserMenu } from "./UserMenu";

type Props = {};

export const NavBar: FC<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const { user } = useContext(UserContext);
    const {
        isOpen: isEditPersonalDetailsModalOpen,
        onOpen: openEditPersonalDetailsModal,
        onClose: closeEditPersonalDetailsModal,
    } = useDisclosure();
    const [isSmallerThan960] = useMediaQuery("(max-width: 960px)");
    return (
        <>
            <Box w="100%" bgColor={bgColor}>
                <Flex w="90%" mx="auto" h={14} alignItems="center">
                    <Heading size="md" fontWeight="normal">
                        Tutor TimeTable
                    </Heading>
                    <Spacer />
                    {isSmallerThan960 ? (
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<HamburgerIcon />}
                            />
                            <MenuList>
                                <MenuItem>
                                    <RouterLink to="/" fullHeight fullWidth>
                                        Home
                                    </RouterLink>
                                </MenuItem>
                                <MenuItem>
                                    <RouterLink
                                        to="/requests"
                                        fullHeight
                                        fullWidth
                                    >
                                        Requests
                                    </RouterLink>
                                </MenuItem>
                                <MenuItem>
                                    <RouterLink
                                        to="/availabilities"
                                        fullHeight
                                        fullWidth
                                    >
                                        Availability
                                    </RouterLink>
                                </MenuItem>
                                <MenuItem>
                                    <RouterLink
                                        to="/preferences"
                                        fullHeight
                                        fullWidth
                                    >
                                        Preferences
                                    </RouterLink>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <RouterLink to="/" fullHeight>
                                <NavBarMenuButton>Home</NavBarMenuButton>
                            </RouterLink>
                            <RouterLink to="/requests" fullHeight>
                                <NavBarMenuButton>Requests</NavBarMenuButton>
                            </RouterLink>
                            <RouterLink to="/availabilities" fullHeight>
                                <NavBarMenuButton>
                                    Availability
                                </NavBarMenuButton>
                            </RouterLink>
                            <RouterLink to="/preferences" fullHeight>
                                <NavBarMenuButton>Preferences</NavBarMenuButton>
                            </RouterLink>
                            {user.courseStaffs.some(
                                (courseStaff) =>
                                    courseStaff.role === Role.CourseCoordinator
                            ) && <AdminMenu showAdmin={user.isAdmin} />}
                            <UserMenu
                                username={user.username}
                                onEditPersonalDetails={
                                    openEditPersonalDetailsModal
                                }
                            />
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
                                    {colorMode === "light" ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )}
                                </NavBarMenuButton>
                            </Tooltip>
                        </>
                    )}
                </Flex>
                <Divider />
            </Box>
            <EditUserDetailsModalContainer
                isOpen={isEditPersonalDetailsModalOpen}
                openModal={openEditPersonalDetailsModal}
                closeModal={closeEditPersonalDetailsModal}
            />
        </>
    );
};
