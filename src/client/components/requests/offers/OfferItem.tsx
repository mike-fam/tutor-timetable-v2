import {
    Box,
    Button,
    Center,
    Container,
    Heading,
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
            <Center>
                <Heading mb={2} mt={2} size="md">
                    Offer Title
                </Heading>
            </Center>
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
                        <Text>
                            Offered Sessions:{" "}
                            {props.offer.preferences.length === 0 ? (
                                <>no sessions were provided</>
                            ) : (
                                props.offer.preferences.map(
                                    (session, index) => (
                                        <React.Fragment key={index}>
                                            {session.sessionStream.name}
                                            {index >
                                                props.offer.preferences
                                                    .length && ", "}
                                        </React.Fragment>
                                    )
                                )
                            )}
                        </Text>
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
