import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Link,
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
import { Wrapper } from "./helpers/Wrapper";

type Props = {};

class Divider extends React.Component {
    render() {
        return null;
    }
}

export const NavBar: React.FunctionComponent<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const {
        user: { username },
    } = useContext(UserContext);
    return (
        <>
            <Wrapper>
                <Flex>
                    <Box>
                        <Heading size="md">Tutor TimeTable</Heading>
                    </Box>
                    <Spacer />
                    <ButtonGroup spacing="6">
                        <Link as={RouterLink} to="/">
                            Home
                        </Link>
                        <Link as={RouterLink} to="/requests">
                            Requests
                        </Link>
                        <Link as={RouterLink} to="/availabilities">
                            Availability
                        </Link>
                        <Link as={RouterLink} to="/preferences">
                            Preferences
                        </Link>
                        {/*Dropdown menu. Update with proper items when ready.*/}
                        <Menu>
                            <MenuButton
                                as={NavBarMenuButton}
                                rightIcon={<ChevronDownIcon />}
                            >
                                Tools
                            </MenuButton>
                            <MenuList style={{ margin: 0 }}>
                                <MenuItem>option 1</MenuItem>
                                <MenuItem>option 2</MenuItem>
                                <MenuItem>option 3</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton righticon={<ChevronDownIcon />}>
                                Logged in as: {username}
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                        <Button onClick={toggleColorMode}>
                            Toggle {colorMode === "light" ? "Dark" : "Light"}
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Wrapper>
            <Divider />
        </>
    );
};
