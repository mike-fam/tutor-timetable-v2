import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React from "react";
import { RequestType } from "../../generated/graphql";
import { RequestFormState } from "../../hooks/useRequestFormState";

type Props = RequestFormState & {
    courseList: Array<number>;
    sessionList: Array<number>;
    editable?: boolean;
};

export const RequestForm: React.FunctionComponent<Props> = ({
    course,
    setCourse,
    title,
    setTitle,
    description,
    setDescription,
    session,
    setSession,
    preferences,
    updatePreferences,
    duration,
    setDuration,
    courseList,
    sessionList,
    editable = true,
}) => {
    return (
        <FormControl>
            <FormLabel>Request Title:</FormLabel>
            <Input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                isRequired
            />
            <FormHelperText>
                e.g. Looking to switch into P01 from P02
            </FormHelperText>
            <FormLabel mt={3}>Description (optional):</FormLabel>
            <Textarea
                placeholder="Describe your request in more detail here"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <Select
                size="sm"
                placeholder="Select Course"
                onChange={(e) => {
                    // TODO: It doesnt like numbers, not a good fix, take a look when you can
                    setCourse(parseInt(e.target.value));
                }}
                value={course}
            >
                {courseList.map((course, index) => (
                    <option value={course} key={index}>
                        {course}
                    </option>
                ))}
            </Select>
            <br></br>
            <Box>
                <FormLabel>Request Duration:</FormLabel>
                <RadioGroup
                    value={duration}
                    onChange={(value) => {
                        setDuration(value as RequestType);
                    }}
                >
                    <Stack spacing={5} direction="row">
                        <Radio value={RequestType.Temporary}>Temporary</Radio>
                        <Radio value={RequestType.Permanent}>Permanent</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <FormHelperText>
                Note: Temporary requests last for one week.
            </FormHelperText>
            <br></br>
            <Box>
                <FormLabel>Swap Preferences:</FormLabel>
            </Box>
        </FormControl>
    );
};
