import React from "react";
import { InputWithError } from "../helpers/InputWithError";
import {
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import { CourseSelectContainer } from "../../containers/CourseSelectContainer";
import { RequestType } from "../../generated/graphql";
import { RequestFormState } from "../../hooks/useRequestFormState";

type Props = Pick<
    RequestFormState,
    "title" | "description" | "course" | "duration"
> &
    Partial<
        Pick<
            RequestFormState,
            "setTitle" | "setDescription" | "setDuration" | "setCourse"
        >
    > & {
        currentTerm: number;
        editable?: boolean;
    };

export const RequestFormV3: React.FC<Props> = ({
    title,
    description,
    course,
    duration,
    setTitle,
    setDescription,
    setCourse,
    setDuration,
    currentTerm,
    editable = true,
}) => {
    const chooseCourse = setCourse || function () {};
    return (
        <>
            <InputWithError
                label="Request Title"
                validate={(value) =>
                    value.length === 0 ? "Title must not be empty" : ""
                }
                value={title}
                onChange={(e) => {
                    setTitle?.(e.target.value);
                }}
                isDisabled={!editable}
            />
            <InputWithError
                label="Description"
                validate={() => ""}
                as={Textarea}
                value={description}
                onChange={(e) => {
                    setDescription?.(e.target.value);
                }}
                isDisabled={!editable}
            />
            <FormControl mt={4} isDisabled={!editable}>
                <FormLabel>Course:</FormLabel>
                <CourseSelectContainer
                    chooseCourse={chooseCourse}
                    chosenCourse={course}
                    chosenTerm={currentTerm}
                    editable={editable}
                />
            </FormControl>
            <FormControl mt={4} isDisabled={!editable}>
                <FormLabel>Request Duration:</FormLabel>
                <RadioGroup
                    value={duration}
                    onChange={(value) => {
                        setDuration?.(value as RequestType);
                    }}
                >
                    <Stack spacing={5} direction="row">
                        <Radio value={RequestType.Temporary}>Temporary</Radio>
                        <Radio value={RequestType.Permanent}>Permanent</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </>
    );
};
