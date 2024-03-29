import { FC, useCallback, useContext, useMemo } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRequestFormState } from "../../hooks/useRequestFormState";
import { StepModal } from "../../components/helpers/StepModal";
import { StepModalStep } from "../../components/helpers/StepModalStep";
import { defaultStr } from "../../constants";
import { getCurrentTerm } from "../../utils/term";
import { useTermsQuery } from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useApolloHooksWithError";
import { CreateRequestSessionTimetableContainer } from "./CreateRequestSessionTimetableContainer";
import { RequestFormV3 } from "../../components/requests/RequestFormV3";
import { CreateRequestPreferenceTimetableContainer } from "./CreateRequestPreferenceTimetableContainer";
import { RequestReviewContainer } from "./RequestReviewContainer";
import { RequestContext } from "../../hooks/useRequestUtils";

type Props = {};

export const CreateRequestButtonContainer: FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: termsData } = useQueryWithError(useTermsQuery, {});
    const formState = useRequestFormState();
    const {
        title,
        description,
        type,
        course,
        preferences,
        addPreference,
        removePreference,
        session,
        setSession,
        resetFormState,
    } = formState;

    const validateStep = useCallback(
        (step: number) => {
            switch (step) {
                case 0:
                    return title.length !== 0 && course !== defaultStr;
                case 1:
                    return session !== defaultStr;
                case 2:
                case 3:
                    return true;
                default:
                    return false;
            }
        },
        [title, course, session]
    );

    const currentTerm = useMemo(() => {
        return termsData ? getCurrentTerm(termsData.terms).id : defaultStr;
    }, [termsData]);
    const { createNewRequest, loading } = useContext(RequestContext);

    return (
        <>
            <Button onClick={onOpen} colorScheme="green">
                New Request
            </Button>
            <StepModal
                onSubmit={async () => {
                    await createNewRequest({
                        title,
                        description,
                        type,
                        preferences: preferences.toArray(),
                        // termId: currentTerm,
                        sessionId: session,
                    });
                }}
                isSubmitting={loading}
                validateStep={validateStep}
                stepCount={4}
                isOpen={isOpen}
                onClose={() => {
                    resetFormState();
                    onClose();
                }}
                size="6xl"
                isCentered
            >
                <StepModalStep step={0} header="Basic information">
                    <RequestFormV3 {...formState} currentTerm={currentTerm} />
                </StepModalStep>
                <StepModalStep
                    step={1}
                    header="Choose session to switch out of:"
                >
                    <CreateRequestSessionTimetableContainer
                        chosenCourseId={course}
                        chosenTermId={currentTerm}
                        chooseSession={setSession}
                        chosenSession={session}
                    />
                </StepModalStep>
                <StepModalStep
                    step={2}
                    header="Choose preferred session(s) to switch in to:"
                >
                    <CreateRequestPreferenceTimetableContainer
                        chosenCourseId={course}
                        chosenTermId={currentTerm}
                        chosenSession={session}
                        preferences={preferences}
                        addPreference={addPreference}
                        removePreference={removePreference}
                    />
                </StepModalStep>
                <StepModalStep step={3} header="Review Request Information">
                    <RequestReviewContainer
                        termId={currentTerm}
                        {...formState}
                    />
                </StepModalStep>
            </StepModal>
        </>
    );
};
