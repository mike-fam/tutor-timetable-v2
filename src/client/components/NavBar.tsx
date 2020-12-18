import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
} from "@chakra-ui/react";
import React from "react";

export const NavBar: React.FunctionComponent = () => {
    return (
        <Flex>
            <Box>
                <Heading size="lg">Tutor TimeTable</Heading>
            </Box>
            <Spacer />
            <ButtonGroup spacing="6">
                <Button>Home</Button>
                <Button>Requests</Button>
                <Menu>
                    <MenuButton as={Button}>Dropdown</MenuButton>
                    <MenuList>
                        <MenuItem>option 1</MenuItem>
                        <MenuItem>option 2</MenuItem>
                        <MenuItem>option 3</MenuItem>
                    </MenuList>
                </Menu>
            </ButtonGroup>
        </Flex>
    );
};
