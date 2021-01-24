import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { DisplayRequestType } from "../../containers/requests/RequestContainer";

type Props = {
    // Determines personal or open requests.
    type: DisplayRequestType;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    const openList = [0, 1, 2, 3, 4, 5];
    const personalList = [0, 1, 2];

    return (
        <Box>
            {props.type === DisplayRequestType.All ? (
                <Box>
                    {openList.map((item, index) => (
                        <Box key={index}>
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box>
                    {personalList.map((item, index) => (
                        <Box key={index}>
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};
