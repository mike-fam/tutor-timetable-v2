import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    useLazyQueryWithError,
    useMutationWithError,
    useQueryWithError,
} from "../../hooks/useQueryWithError";
import {
    useAcceptOfferMutation,
    useGetOffersByRequestIdLazyQuery,
    useTermsQuery,
} from "../../generated/graphql";
import { notSet } from "../../constants";
import { isoNumberToDay } from "../../../utils/date";
import { IsoDay } from "../../../types/date";
import { RequestContext } from "../../hooks/useRequestUtils";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import { getCurrentTerm } from "../../utils/term";

type Props = {
    requestId: number;
};

const hourToTime = (hour: number) => {
    const minutes = Math.round((hour % 1) * 60);
    return `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
};

export const OfferListContainer: React.FC<Props> = ({ requestId }) => {
    const [getOffers, { data: offerData }] = useLazyQueryWithError(
        useGetOffersByRequestIdLazyQuery
    );
    const [
        acceptOffer,
        { data: acceptOfferData, loading: acceptOfferLoading },
    ] = useMutationWithError(useAcceptOfferMutation);
    const { requests, fetchRequestById } = useContext(RequestContext);
    useEffect(() => {
        if (requestId === notSet) {
            return;
        }
        getOffers({
            variables: {
                requestId,
            },
        });
    }, [requestId, getOffers]);
    const request = useMemo(() => requests.get(requestId), [
        requests,
        requestId,
    ]);
    useEffect(() => {
        if (!request) {
            fetchRequestById(requestId);
        }
    }, [request, fetchRequestById, requestId]);
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const [termId, setTermId] = useState(notSet);
    useEffect(() => {
        if (!termsData) {
            return;
        }
        setTermId(getCurrentTerm(termsData.terms).id);
    }, [termsData]);
    const { chosenTerm } = useTermMetadata(termId);
    return (
        <Accordion>
            {offerData?.getOffersByRequestId.map((offer, key) => (
                <AccordionItem key={key}>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                {offer.user.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Table variant="striped" colorScheme="blue">
                            <Thead>
                                <Tr>
                                    <Th>Sessions</Th>
                                    <Th>Time</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {offer.preferences.map((session, key) => (
                                    <Tr key={key}>
                                        <Td>{session.sessionStream.name}</Td>
                                        <Td>
                                            {hourToTime(
                                                session.sessionStream.startTime
                                            )}{" "}
                                            to{" "}
                                            {hourToTime(
                                                session.sessionStream.endTime
                                            )}{" "}
                                            on{" "}
                                            {isoNumberToDay(
                                                session.sessionStream
                                                    .day as IsoDay
                                            )}
                                            ,{" "}
                                            {chosenTerm &&
                                                chosenTerm.weekNames[
                                                    session.week
                                                ]}
                                        </Td>
                                        <Td isNumeric>
                                            <Button colorScheme="pink">
                                                Accept
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
