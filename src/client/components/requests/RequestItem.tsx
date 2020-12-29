import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { RequestModal } from "./RequestModal";

export const RequestItem: React.FunctionComponent = () => {
    const [toggleModal, setToggleModal] = React.useState<boolean>(false);

    return (
        <Box>
            <Heading size="md" onClick={() => setToggleModal(!toggleModal)}>
                Request Title
            </Heading>
            <Text>Requestor name, status, session</Text>
            <RequestModal
                isOpen={toggleModal}
                toggle={setToggleModal}
                type={"open"}
                userType={"staff"}
            />
        </Box>
    );
};
