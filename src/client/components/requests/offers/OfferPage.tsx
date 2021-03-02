import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import { OfferResponse } from "../../../types/requests";
import { OfferItem } from "./OfferItem";

type Props = {
    offers: Array<OfferResponse>;
};

export const OfferPage: React.FC<Props> = (props: Props) => {
    return (
        <Box>
            <Grid mt={10} templateColumns="repeat(7, 1fr)" rowGap={5}>
                <GridItem colStart={2} rowStart={1}>
                    <Heading>Your Offers</Heading>
                </GridItem>
                <GridItem rowStart={2} colStart={2} colSpan={4} bg="tomato">
                    term selector placeholder
                </GridItem>
                <GridItem
                    colStart={1}
                    colSpan={2}
                    rowStart={3}
                    rowSpan={4}
                    bg="tomato"
                >
                    <Center h="100%">offer filter placeholer</Center>
                </GridItem>
                {props.offers.length > 0 &&
                    props.offers.map((offer, index) => (
                        <>
                            <GridItem
                                colStart={3}
                                colSpan={2}
                                rowStart={index + 3}
                            >
                                <Center h="100%">
                                    <OfferItem key={index} offer={offer} />
                                </Center>
                            </GridItem>
                            <GridItem
                                colStart={5}
                                colSpan={1}
                                rowStart={index + 3}
                            >
                                <Center h="100%">
                                    <ArrowRightIcon />
                                    <ArrowRightIcon />
                                    <ArrowRightIcon />
                                </Center>
                            </GridItem>

                            <GridItem
                                bg="tomato"
                                colStart={6}
                                colSpan={2}
                                rowStart={index + 3}
                            >
                                <Center h="100%">
                                    request item placeholder
                                </Center>
                            </GridItem>
                        </>
                    ))}
            </Grid>
        </Box>
    );
};
