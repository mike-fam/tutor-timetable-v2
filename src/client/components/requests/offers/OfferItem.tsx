import {
    Box,
    Button,
    Container,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { OfferResponse } from "../../../types/requests";

type Props = {
    offer: OfferResponse;
};

export const OfferItem: React.FC<Props> = (props: Props) => {
    console.log(props.offer);
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            width="100%"
        >
            <Stack direction={["column", "row"]}>
                <Box bg="tomato">
                    <Text>Offer Details:</Text>
                    <Container>
                        Time Created: "placeholder" description: "placeholder"
                        {props.offer.preferences.map((session, index) => (
                            <Box key={index}>{session.sessionStream.name}</Box>
                        ))}
                        {props.offer.preferences.length === 0 && (
                            <Text>No sessions were provided</Text>
                        )}
                    </Container>
                </Box>
                <Box bg="tomato">
                    <Button>Edit Offer</Button>
                    <Button mt={2}>Delete Offer</Button>
                </Box>
            </Stack>
        </Box>
    );
};
