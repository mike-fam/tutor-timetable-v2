import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    ButtonGroup,
    Flex,
    Heading,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
    user: string;
};

export const NavBar: React.FunctionComponent<Props> = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex backgroundColor="grey">
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
                {/*Dropdown menu. Update with proper items when ready.*/}
                <Menu>
                    <MenuButton righticon={<ChevronDownIcon />}>
                        Dropdown
                    </MenuButton>
                    <MenuList style={{ margin: 0 }}>
                        <MenuItem>option 1</MenuItem>
                        <MenuItem>option 2</MenuItem>
                        <MenuItem>option 3</MenuItem>
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton righticon={<ChevronDownIcon />}>
                        Logged in as: {props.user}
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
    );
};
