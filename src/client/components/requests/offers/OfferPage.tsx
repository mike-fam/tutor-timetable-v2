import { ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { OfferItemContainer } from "../../../containers/requests/offers/OfferItemContainer";
import { TermSelectContainer } from "../../../containers/TermSelectContainer";
import { OfferResponse } from "../../../types/requests";
import { Wrapper } from "../../helpers/Wrapper";
import { RequestItem } from "./RequestItem";

type Props = {
    offers: Array<OfferResponse>;
    term: number;
    setTerm: (term: number) => void;
};

export const OfferPage: React.FC<Props> = (props: Props) => {
    return (
        <Wrapper>
            <Grid mt={10} templateColumns="repeat(9, 1fr)" rowGap={5}>
                <GridItem colStart={3} colSpan={2} rowStart={1}>
                    <Heading>Your Offers</Heading>
                </GridItem>
                <GridItem rowStart={2} colStart={3} colSpan={7}>
                    <TermSelectContainer
                        chosenTerm={props.term}
                        chooseTerm={props.setTerm}
                    />
                </GridItem>
                <GridItem rowStart={3} colStart={9}>
                    <Center>
                        <Link to="/requests">
                            <Button>View Requests</Button>
                        </Link>
                    </Center>
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
                {props.offers.length === 0 ? (
                    <GridItem colStart={6} rowStart={4}>
                        No offers found
                    </GridItem>
                ) : (
                    props.offers.map((offer, index) => (
                        <React.Fragment key={index}>
                            <GridItem
                                colStart={3}
                                colSpan={3}
                                rowStart={index + 4}
                            >
                                <Center h="100%">
                                    <OfferItemContainer offer={offer} />
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
                                    <RequestItem />
                                </Center>
                            </GridItem>
                        </React.Fragment>
                    ))
                )}
            </Grid>
        </Wrapper>
    );
};
