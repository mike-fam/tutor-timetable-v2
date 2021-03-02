import { ArrowRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Divider,
    Grid,
    GridItem,
    HStack,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { OfferResponse } from "../../../types/requests";
import { OfferItem } from "./OfferItem";

type Props = {
    offers: Array<OfferResponse>;
};

export const OfferPage: React.FC<Props> = (props: Props) => {
    return (
        <Box>
            <Grid templateColumns="repeat(5, 1fr)" mt={5} mb={15}>
                <GridItem colSpan={2}>
                    <Center>Your Offer</Center>
                </GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem colSpan={2}>
                    <Center>Request</Center>
                </GridItem>
            </Grid>
            <Divider></Divider>

            <Grid mt={5} templateColumns="repeat(5, 1fr)" rowGap="10">
                {props.offers.length > 0 &&
                    props.offers.map((offer, index) => (
                        <>
                            <GridItem colSpan={2}>
                                <Center h="100%">
                                    <OfferItem key={index} offer={offer} />
                                </Center>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Center h="100%">
                                    <ArrowRightIcon />
                                    <ArrowRightIcon />
                                    <ArrowRightIcon />
                                </Center>
                            </GridItem>

                            <GridItem colSpan={2} bg="tomato">
                                <Center h="100%">test</Center>
                            </GridItem>
                        </>
                    ))}
            </Grid>
        </Box>
    );
};
