import React, { useCallback, useMemo } from "react";
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { useRequestFormState } from "../../hooks/useRequestFormState";
import { StepModal } from "../../components/helpers/StepModal";
import { StepModalStep } from "../../components/helpers/StepModalStep";
import { notSet } from "../../constants";
import { InputWithError } from "../../components/helpers/InputWithError";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { getCurrentTerm } from "../../utils/term";
import { RequestType, useTermsQuery } from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { SessionRequestTimetableContainer } from "./SessionRequestTimetableContainer";
import { RequestFormV3 } from "../../components/requests/RequestFormV3";

type Props = {};

export const CreateRequestButton: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: termsData } = useQueryWithError(useTermsQuery);
    const formState = useRequestFormState();
    const {
        title,
        setTitle,
        description,
        setDescription,
        duration,
        setDuration,
        course,
        setCourse,
        preferences,
        updatePreferences,
        session,
        setSession,
    } = formState;

    const validateStep = useCallback(
        (step: number) => {
            if (step === 0) {
                return title.length !== 0 && course !== notSet;
            } else {
                return false;
            }
        },
        [title, course]
    );

    const currentTerm = useMemo(() => {
        return termsData ? getCurrentTerm(termsData.terms).id : notSet;
    }, [termsData]);

    return (
        <>
            <Center>
                <Button onClick={onOpen}>New Request</Button>
            </Center>
            <StepModal
                onSubmit={() => {
                    console.log({
                        title,
                        description,
                        duration,
                        course,
                        preferences,
                        session,
                    });
                }}
                validateStep={validateStep}
                stepCount={5}
                isOpen={isOpen}
                onClose={onClose}
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
                    <SessionRequestTimetableContainer
                        chosenCourse={course}
                        chosenTerm={currentTerm}
                        chooseSession={setSession}
                        chosenSession={session}
                    />
                </StepModalStep>
                <StepModalStep step={2} header="Choose preferred session(s) to switch in to">
                    Test 2
                </StepModalStep>
                <StepModalStep step={3} header="Basic information">
                    Test 3
                </StepModalStep>
                <StepModalStep step={4} header="Basic information">
                    Test 4
                </StepModalStep>
            </StepModal>
        </>
    );
};
