import React, { useCallback, useEffect, useState } from "react";
import { StepModal } from "../../components/helpers/StepModal";
import { StepModalStep } from "../../components/helpers/StepModalStep";
import { ViewRequestContainer } from "./ViewRequestContainer";
import { useMutationWithError } from "../../hooks/useQueryWithError";
import { useCreateOfferMutation } from "../../generated/graphql";
import { OfferPreferenceTimetableContainer } from "./OfferPreferenceTimetableContainer";
import { useToast } from "@chakra-ui/react";

type Props = {
    requestId: string;
    isOpen: boolean;
    onClose: () => void;
};
export const OfferRequestModalContainer: React.FunctionComponent<Props> = ({
    isOpen,
    onClose,
    requestId,
}) => {
    const [createOffer, { data, loading }] = useMutationWithError(
        useCreateOfferMutation
    );
    const toast = useToast();
    const [chosenSessions, setChosenSessions] = useState<Array<string>>([]);
    const chooseSession = useCallback(
        (sessionId) => {
            if (chosenSessions.includes(sessionId)) {
                setChosenSessions((prev) =>
                    prev.filter((id) => id !== sessionId)
                );
            } else {
                setChosenSessions((prev) => [...prev, sessionId]);
            }
        },
        [chosenSessions]
    );
    useEffect(() => {
        if (data?.createOffer) {
            toast({
                title: "Offer created",
                status: "success",
                description: "Offer successfully created",
                isClosable: true,
                duration: 5000,
            });
        }
    }, [toast, data?.createOffer]);

    return (
        <StepModal
            stepCount={2}
            onSubmit={async () => {
                await createOffer({
                    variables: {
                        offerDetails: {
                            requestId,
                            sessionPreferences: chosenSessions,
                        },
                    },
                });
            }}
            isSubmitting={loading}
            validateStep={() => true}
            isOpen={isOpen}
            onClose={onClose}
            size="6xl"
        >
            <StepModalStep step={0} header="Request Information">
                <ViewRequestContainer requestId={requestId} />
            </StepModalStep>
            <StepModalStep step={1} header="Make an offer">
                <OfferPreferenceTimetableContainer
                    requestId={requestId}
                    chosenSessions={chosenSessions}
                    chooseSession={chooseSession}
                />
            </StepModalStep>
        </StepModal>
    );
};
