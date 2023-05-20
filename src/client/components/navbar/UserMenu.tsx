import { FC } from "react";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { BsPersonFill } from "react-icons/bs";
import { NavBarMenuButton } from "./NavBarMenuButton";
import { ChevronDownIcon, Icon } from "@chakra-ui/icons";

type Props = {
    username: string;
    onEditPersonalDetails: () => void;
};

export const UserMenu: FC<Props> = ({ username, onEditPersonalDetails }) => {
    return (
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
                <MenuItem onClick={onEditPersonalDetails}>
                    Edit Personal Details
                </MenuItem>
                <MenuDivider />
                <MenuItem as="a" href="https://api.uqcloud.net/logout/">
                    Log out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
