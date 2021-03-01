import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const OfferPage: React.FC<Props> = (props: Props) => {
    return (
        <Grid h="200px" templateColumns="repeat(5, 1fr)">
            <GridItem colSpan={2}>Your Offer</GridItem>
            <GridItem colSpan={1}>For</GridItem>
            <GridItem colSpan={2}>Request</GridItem>
        </Grid>
    );
};
