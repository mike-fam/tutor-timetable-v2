import React, { useCallback, useState } from "react";
import { StepModal } from "../../components/helpers/StepModal";
import { StepModalStep } from "../../components/helpers/StepModalStep";
import { ViewRequestContainer } from "./ViewRequestContainer";
import { useMutationWithError } from "../../hooks/useQueryWithError";
import { useCreateOfferMutation } from "../../generated/graphql";
import { OfferPreferenceTimetableContainer } from "./OfferPreferenceTimetableContainer";

type Props = {
    requestId: number;
    isOpen: boolean;
    onClose: () => void;
};
export const OfferRequestModalContainer: React.FunctionComponent<Props> = ({
    isOpen,
    onClose,
    requestId,
}) => {
    const [createOffer, { data }] = useMutationWithError(
        useCreateOfferMutation
    );
    const [chosenSessions, setChosenSessions] = useState<Array<number>>([]);
    const chooseSession = useCallback(
        (sessionId) => {
            console.log("Choosing", sessionId);
            console.log("Current chosen:", chosenSessions);
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

    return (
        <StepModal
            stepCount={2}
            onSubmit={() => {}}
            isSubmitting={false}
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
