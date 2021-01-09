import React from "react";
import { Box, Center, Icon, VStack } from "@chakra-ui/react";
import { MdDragHandle } from "react-icons/md";
import { Props as SessionProps, Session } from "../timetable/Session";
import Draggable from "react-draggable";

type Props = SessionProps & {
    key?: number;
};

export const AvailabilitySession: React.FC<Props> = (props) => {
    const { startTime, endTime } = props;
    return (
        <Session {...props}>
            <VStack
                spacing={0}
                h="100%"
                align="stretch"
                justify="space-between"
            >
                <Draggable axis="y">
                    <Center
                        h={2}
                        _hover={{
                            cursor: "ns-resize",
                        }}
                    >
                        <Icon as={MdDragHandle} />
                    </Center>
                </Draggable>
                <Box p={1} h="100%">
                    {`${startTime}:00-${endTime}:00`}
                </Box>
                <Draggable axis="y">
                    <Center
                        h={2}
                        _hover={{
                            cursor: "ns-resize",
                        }}
                    >
                        <Icon as={MdDragHandle} />
                    </Center>
                </Draggable>
            </VStack>
        </Session>
    );
};
