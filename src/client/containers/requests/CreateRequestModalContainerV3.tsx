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
import { CreateRequestTimetableContainer } from "./CreateRequestTimetableContainer";

type Props = {};

export const CreateRequestButton: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: termsData } = useQueryWithError(useTermsQuery);

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
    } = useRequestFormState();

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
                <StepModalStep
                    step={0}
                    header="Basic information"
                    height="800px"
                >
                    {/* TODO: Move this to another component */}
                    <InputWithError
                        label="Request Title"
                        validate={(value) =>
                            value.length === 0 ? "Title must not be empty" : ""
                        }
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <InputWithError
                        label="Description"
                        validate={() => ""}
                        as={Textarea}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <FormControl mt={4}>
                        <FormLabel>Course:</FormLabel>
                        <CourseSelectContainer
                            chooseCourse={setCourse}
                            chosenCourse={course}
                            chosenTerm={currentTerm}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Request Duration:</FormLabel>
                        <RadioGroup
                            value={duration}
                            onChange={(value) => {
                                setDuration(value as RequestType);
                            }}
                        >
                            <Stack spacing={5} direction="row">
                                <Radio value={RequestType.Temporary}>
                                    Temporary
                                </Radio>
                                <Radio value={RequestType.Permanent}>
                                    Permanent
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </StepModalStep>
                <StepModalStep
                    step={1}
                    header="Choose session to switch out of"
                >
                    <CreateRequestTimetableContainer
                        chosenCourse={course}
                        chosenTerm={currentTerm}
                        chooseSession={setSession}
                        chosenSession={session}
                    />
                </StepModalStep>
                <StepModalStep step={2} header="Basic information">
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
