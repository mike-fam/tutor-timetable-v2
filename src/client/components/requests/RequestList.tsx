import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { DisplayRequestType } from "../../containers/requests/RequestContainer";
import { RequestModalType } from "./RequestModal";
import { EditRequestModalContainer } from "../../containers/requests/EditRequestModalContainer";

type Props = {
    // Determines personal or open requests.
    type: DisplayRequestType;
    // modal stuff.
    toggle: (type: RequestModalType) => void;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    // FIXME: These should probably be passed in as props
    const openList = [0, 1, 2, 3, 4, 5];
    const personalList = [0, 1, 2];

    return (
        <Box>
            {props.type === DisplayRequestType.All ? (
                <Box>
                    {openList.map((item, index) => (
                        <Box
                            onClick={() => props.toggle(RequestModalType.View)}
                            key={index}
                        >
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box>
                    {personalList.map((item, index) => (
                        <Box
                            onClick={() => props.toggle(RequestModalType.View)}
                            key={index}
                        >
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </Box>
                    ))}
                </Box>
            )}
            <EditRequestModalContainer />
        </Box>
    );
};
