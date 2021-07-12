import React, { useContext, useEffect, useMemo } from "react";
import { RequestContext } from "../../hooks/useRequestUtils";
import { useRequestFormState } from "../../hooks/useRequestFormState";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { defaultStr } from "../../constants";
import { RequestFormV3 } from "../../components/requests/RequestFormV3";
import { getCurrentTerm } from "../../utils/term";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { useTermsQuery } from "../../generated/graphql";
import { Set } from "immutable";
import { ViewRequestTimetableContainer } from "./ViewRequestTimetableContainer";
import { OfferListContainer } from "./OfferListContainer";

type Props = {
    requestId: string;
    isOpen: boolean;
    onClose: () => void;
};

export const ViewMyRequestModalContainer: React.FC<Props> = ({
    requestId,
    isOpen,
    onClose,
}) => {
    const { requests, fetchRequestById } = useContext(RequestContext);
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const request = useMemo(
        () => requests.get(requestId),
        [requests, requestId]
    );
    useEffect(() => {
        if (!request && requestId !== defaultStr) {
            fetchRequestById(requestId);
        }
    }, [requestId, request, fetchRequestById]);
    const currentTerm = useMemo(() => {
        return termsData ? getCurrentTerm(termsData.terms).id : defaultStr;
    }, [termsData]);
    const formState = useRequestFormState();
    const {
        setTitle,
        setCourse,
        setDescription,
        setDuration,
        setSession,
        setPreferences,
    } = formState;
    useEffect(() => {
        if (!request) {
            return;
        }
        setTitle(request.title);
        setCourse(request.session.sessionStream.timetable.course.id);
        setDescription(request.description);
        setDuration(request.type);
        setSession(request.session.id);
        setPreferences(
            Set(request.swapPreference.map((session) => session.id))
        );
    }, [
        request,
        setCourse,
        setTitle,
        setDescription,
        setDuration,
        setSession,
        setPreferences,
    ]);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>View Your Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs isFitted variant="enclosed">
                        <TabList mb="1em">
                            <Tab>Basic Info</Tab>
                            <Tab>Sessions & Preferences</Tab>
                            <Tab>Offers</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <RequestFormV3
                                    {...formState}
                                    currentTerm={currentTerm}
                                    editable={false} // TODO: change
                                />
                            </TabPanel>
                            <TabPanel>
                                <ViewRequestTimetableContainer
                                    requestId={requestId}
                                />
                            </TabPanel>
                            <TabPanel>
                                <OfferListContainer
                                    requestId={requestId}
                                    closeModal={onClose}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
