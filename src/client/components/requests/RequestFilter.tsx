import { Box, Divider, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { RequestStatus, RequestType } from "../../generated/graphql";
import { SimpleCheckboxList } from "../helpers/SimpleCheckboxList";
import { CourseCheckboxListContainer } from "../../containers/timetable/CourseCheckboxListContainer";
import { Set } from "immutable";
import { capitalCase } from "change-case";

type Props = {
    chosenTerm: number;
    chosenCourses: Set<number>;
    setChosenCourses: Dispatch<SetStateAction<Set<number>>>;
    selectType: (type: RequestType, selected: boolean) => void;
    selectStatus: (status: RequestStatus, selected: boolean) => void;
};

export const RequestFilter: React.FunctionComponent<Props> = ({
    chosenTerm,
    chosenCourses,
    setChosenCourses,
    selectStatus,
    selectType,
}) => {
    const filterBorder = useColorModeValue("gray.300", "gray.600");
    const filterHeadingBg = useColorModeValue("gray.200", "gray.700");
    return (
        <Box border="1px" borderColor={filterBorder} borderRadius={5}>
            <Text fontSize="lg" fontWeight="bold" p={2} bg={filterHeadingBg}>
                Filters
            </Text>
            <Stack p={2}>
                <SimpleCheckboxList
                    elements={[RequestType.Permanent, RequestType.Temporary]}
                    selectFunc={selectType}
                    helpTexts={[
                        "Display permanent requests",
                        "Display temporary requests",
                    ]}
                    defaultSelectedAll={true}
                    selectAllLabel="Request Type"
                    textDisplayed={capitalCase}
                />
                <Divider />
                <SimpleCheckboxList
                    elements={[RequestStatus.Open, RequestStatus.Closed]}
                    selectFunc={selectStatus}
                    helpTexts={[
                        "Display open requests",
                        "Display closed requests",
                    ]}
                    defaultSelectedAll={true}
                    selectAllLabel="Request Status"
                    textDisplayed={capitalCase}
                />
                <Divider />
                <CourseCheckboxListContainer
                    chosenCourses={chosenCourses}
                    setChosenCourses={setChosenCourses}
                    chosenTermId={chosenTerm}
                />
            </Stack>
        </Box>
    );
};
