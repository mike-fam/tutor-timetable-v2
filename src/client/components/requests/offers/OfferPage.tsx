import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { OfferResponse } from "../../../types/requests";
import { Wrapper } from "../../helpers/Wrapper";
import { OfferItem } from "./OfferItem";

type Props = {
    offers: Array<OfferResponse>;
};

export const OfferPage: React.FC<Props> = (props: Props) => {
    return (
        <Wrapper>
            <Grid mt={10} templateColumns="repeat(9, 1fr)" rowGap={5}>
                <GridItem colStart={1} colSpan={2} rowStart={1}>
                    <Heading>Your Offers</Heading>
                </GridItem>
                <GridItem rowStart={2} colStart={1} colSpan={7} bg="tomato">
                    term selector placeholder
                </GridItem>
                <GridItem rowStart={3} colStart={9}>
                    <Link to="/requests">
                        <Button>View Requests</Button>
                    </Link>
                </GridItem>
                <GridItem
                    colStart={1}
                    colSpan={2}
                    rowStart={4}
                    rowSpan={5}
                    bg="tomato"
                >
                    <Center h="100%">offer filter placeholer</Center>
                </GridItem>
                {props.offers.length > 0 &&
                    props.offers.map((offer, index) => (
                        <>
                            <GridItem
                                colStart={3}
                                colSpan={3}
                                rowStart={index + 4}
                            >
                                <Center h="100%">
                                    <OfferItem key={index} offer={offer} />
                                </Center>
                            </GridItem>
                            <GridItem
                                colStart={6}
                                colSpan={1}
                                rowStart={index + 4}
                            >
                                <Center h="100%">
                                    <ArrowRightIcon />
                                    <ArrowRightIcon />
                                    <ArrowRightIcon />
                                </Center>
                            </GridItem>

                            <GridItem
                                bg="tomato"
                                colStart={7}
                                colSpan={3}
                                rowStart={index + 4}
                            >
                                <Center h="100%">
                                    request item placeholder
                                </Center>
                            </GridItem>
                        </>
                    ))}
            </Grid>
        </Wrapper>
    );
};
