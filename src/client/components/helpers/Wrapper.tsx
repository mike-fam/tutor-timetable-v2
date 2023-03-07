import { FC } from "react";
import { Box } from "@chakra-ui/react";

type Props = {};

export const Wrapper: FC<Props> = ({ children }) => {
    return (
        <Box maxW="90%" mx="auto" mt={10}>
            {children}
        </Box>
    );
};
