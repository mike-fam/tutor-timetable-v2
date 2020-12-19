import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    ButtonGroup,
    Center,
    Flex,
    Heading,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
    user: string;
};

export const NavBar: React.FunctionComponent<Props> = (props: Props) => {
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
                {/*Dropdown menu. Update with proper items when ready.*/}
                <Menu>
                    <MenuButton rightIcon={<ChevronDownIcon />}>
                        Dropdown
                    </MenuButton>
                    <MenuList>
                        <MenuItem>option 1</MenuItem>
                        <MenuItem>option 2</MenuItem>
                        <MenuItem>option 3</MenuItem>
                    </MenuList>
                </Menu>
                <Center>Logged in as: {props.user}</Center>
            </ButtonGroup>
        </Flex>
    );
};
