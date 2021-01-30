import React, { useCallback, useMemo } from "react";
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useRequestFormState } from "../../hooks/useRequestFormState";
import { StepModal } from "../../components/helpers/StepModal";
import { StepModalStep } from "../../components/helpers/StepModalStep";
import { notSet } from "../../constants";
import { InputWithError } from "../../components/helpers/InputWithError";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { getCurrentTerm } from "../../utils/term";
import { useTermsQuery } from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { RequestTimetableContainer } from "./RequestTimetableContainer";
import { SessionTheme } from "../../types/timetable";
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
                console.log(title.length !== 0 && course !== notSet);
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
                    <FormControl>
                        <FormLabel>Course:</FormLabel>
                        <CourseSelectContainer
                            chooseCourse={setCourse}
                            chosenCourse={course}
                            chosenTerm={currentTerm}
                        />
                    </FormControl>
                </StepModalStep>
                <StepModalStep step={1} header="Basic information">
                    <CreateRequestTimetableContainer
                        chosenCourse={course}
                        chosenTerm={currentTerm}
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
