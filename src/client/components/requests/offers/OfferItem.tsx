import {
    Box,
    Button,
    Center,
    Container,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { OfferResponse } from "../../../types/requests";

type Props = {
    offer: OfferResponse;
    deleteOffer: (offerId: number) => void;
};

export const OfferItem: React.FC<Props> = (props: Props) => {
    console.log(props.offer);
    return (
        <Box
            maxW="md"
            borderWidth="5px"
            borderRadius="lg"
            overflow="hidden"
            width="100%"
            height="100%"
            bg="#5c8a8a"
        >
            <Text mb={2} mt={2}>
                <Center>Offer Details</Center>
            </Text>
            <Stack
                direction={["column", "row"]}
                divider={<StackDivider />}
                my={3}
            >
                <Box w="100%">
                    <Container>
                        <Text>Time Created: "placeholder"</Text>
                        <Text>description: "placeholder"</Text>
                        <Text>Offer Status: "placeholder"</Text>
                        {props.offer.preferences.length === 0 ? (
                            <Text>No sessions were provided</Text>
                        ) : (
                            props.offer.preferences.map((session, index) => (
                                <Box key={index}>
                                    Offered sessions:{" "}
                                    {session.sessionStream.name}
                                </Box>
                            ))
                        )}
                    </Container>
                </Box>
                <Box>
                    <Container>
                        <Center h="50%">
                            <Button w="100%">Edit Offer</Button>
                        </Center>
                        <Center h="50%">
                            <Button mt={3} w="100%">
                                Delete Offer
                            </Button>
                        </Center>
                    </Container>
                </Box>
            </Stack>
        </Box>
    );
};
