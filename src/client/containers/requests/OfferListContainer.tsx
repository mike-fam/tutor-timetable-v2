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
    useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    useLazyQueryWithError,
    useMutationWithError,
    useQueryWithError,
} from "../../hooks/useQueryWithError";
import {
    RequestStatus,
    useAcceptOfferMutation,
    useGetOffersByRequestIdLazyQuery,
    useTermsQuery,
} from "../../generated/graphql";
import { notSet } from "../../constants";
import { RequestContext } from "../../hooks/useRequestUtils";
import { useTermMetadata } from "../../hooks/useTermMetadata";
import { getCurrentTerm } from "../../utils/term";
import { isoNumberToDay } from "../../../utils/date";
import { IsoDay } from "../../../types/date";

type Props = {
    requestId: number;
    closeModal: () => void;
};

const hourToTime = (hour: number) => {
    const minutes = Math.round((hour % 1) * 60);
    return `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
};

export const OfferListContainer: React.FC<Props> = ({
    requestId,
    closeModal,
}) => {
    const [getOffers, { data: offerData }] = useLazyQueryWithError(
        useGetOffersByRequestIdLazyQuery
    );
    const toast = useToast();
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
    useEffect(() => {
        if (acceptOfferData?.acceptOffer) {
            toast({
                title: "Offer Accepted",
                description:
                    "You've accepted the offer and the timetable has been updated",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            if (request) {
                requests.set(requestId, {
                    ...request,
                    status: RequestStatus.Closed,
                });
            }
        }
    }, [acceptOfferData?.acceptOffer, toast, request, requestId, requests]);
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
                                {offer.preferences.length > 0 ? (
                                    offer.preferences.map((session, key) => (
                                        <Tr key={key}>
                                            <Td>
                                                {session.sessionStream.name}
                                            </Td>
                                            <Td>
                                                {hourToTime(
                                                    session.sessionStream
                                                        .startTime
                                                )}{" "}
                                                to{" "}
                                                {hourToTime(
                                                    session.sessionStream
                                                        .endTime
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
                                                <Button
                                                    colorScheme="pink"
                                                    isLoading={
                                                        acceptOfferLoading
                                                    }
                                                    isDisabled={
                                                        request?.status ===
                                                        RequestStatus.Closed
                                                    }
                                                    onClick={async () => {
                                                        await acceptOffer({
                                                            variables: {
                                                                offerId:
                                                                    offer.id,
                                                                offerSessionSwapId:
                                                                    session.id,
                                                            },
                                                        });
                                                        closeModal();
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td>No sessions</Td>
                                        <Td>
                                            {offer.user.name} wants to cover{" "}
                                            this session.
                                        </Td>
                                        <Td isNumeric>
                                            <Button
                                                colorScheme="pink"
                                                isLoading={acceptOfferLoading}
                                                isDisabled={
                                                    request?.status ===
                                                    RequestStatus.Closed
                                                }
                                                onClick={async () => {
                                                    await acceptOffer({
                                                        variables: {
                                                            offerId: offer.id,
                                                            offerSessionSwapId: undefined,
                                                        },
                                                    });
                                                    closeModal();
                                                }}
                                            >
                                                Accept
                                            </Button>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
