import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { RouterLink } from "../helpers/RouterLink";
import { NavBarMenuButton } from "./NavBarMenuButton";

type Props = {
    showAdmin: boolean;
};

export const AdminMenu: FC<Props> = ({ showAdmin }) => {
    return (
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
                    <RouterLink to="/course-staff" fullHeight fullWidth>
                        Course Staff
                    </RouterLink>
                </MenuItem>
                <MenuItem>
                    <RouterLink to="/session-settings" fullHeight fullWidth>
                        Session Settings
                    </RouterLink>
                </MenuItem>
                <MenuItem>
                    <RouterLink to="/availability-monitor" fullHeight fullWidth>
                        Availability Monitor
                    </RouterLink>
                </MenuItem>
                {showAdmin && (
                    <MenuItem>
                        <RouterLink to="/admin" fullHeight fullWidth>
                            Top-level Admin
                        </RouterLink>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};
