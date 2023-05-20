import { FC, PropsWithChildren } from "react";
import {
    Box,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
} from "@chakra-ui/react";
import { BsFillQuestionCircleFill } from "react-icons/bs";

type Props = {};

export const HelpIcon: FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <Popover placement="right-start" trigger="hover">
            <PopoverTrigger>
                <Box display="inline-block" ml={2}>
                    <Icon as={BsFillQuestionCircleFill} />
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody>{children}</PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
