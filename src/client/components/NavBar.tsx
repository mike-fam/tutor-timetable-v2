import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
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
        <Flex>
            <Box>
                <Heading size="lg">Tutor TimeTable</Heading>
            </Box>
            <Spacer />
            <ButtonGroup spacing="6">
                <Link as={RouterLink} to="/">
                    <Button>Home</Button>
                </Link>
                <Link as={RouterLink} to="/test">
                    <Button>Requests</Button>
                </Link>
                {/*Dropdown menu. Update with proper items when ready.*/}
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
