import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { TermSelectContainer } from "../TermSelectContainer";
import { notSet } from "../../constants";
import { CourseSelectContainer } from "../CourseSelectContainer";
import { AllocatorStaffCheckboxList } from "./AllocatorStaffCheckboxList";
import { AllocatorTimetableContainer } from "./AllocatorTimetableContainer";
import { useTermCourse } from "../../hooks/useTermCourse";
import {
    AllocationStatus,
    useGetSessionStreamsLazyQuery,
    useRequestAllocationMutation,
} from "../../generated/graphql";
import { TimetableSessionType } from "../../types/timetable";
import { Set } from "immutable";

type Props = {};

export const AllocatorPageContainer: React.FC<Props> = ({}) => {
    const { termId, changeTerm, courseId, changeCourse } = useTermCourse();
    const [showing, setShowing] = useState<"default" | "generated">("default");
    const [sessions, setSessions] = useState<TimetableSessionType[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<Set<number>>(Set());
    const [
        getSessionStream,
        { data: defaultSessionData, loading: defaultSessionLoading },
    ] = useGetSessionStreamsLazyQuery();
    const [
        requestAllocation,
        { data: requestAllocationData, loading: requestAllocationLoading },
    ] = useRequestAllocationMutation();
    useEffect(() => {
        if (termId === notSet || courseId === notSet) {
            return;
        }
        getSessionStream({
            variables: {
                termId,
                courseIds: [courseId],
            },
        });
    }, [termId, courseId, getSessionStream]);
    useEffect(() => {
        if (
            requestAllocationData?.requestAllocation.status ===
            AllocationStatus.Optimal
        ) {
            setSessions(
                requestAllocationData.requestAllocation.allocations.map(
                    ({ sessionStream, staff }) => {
                        const {
                            id,
                            name,
                            startTime,
                            endTime,
                            day,
                            location,
                        } = sessionStream;
                        return {
                            id,
                            name,
                            startTime,
                            endTime,
                            day,
                            location,
                            allocation: staff.map((staff) => staff.name),
                        };
                    }
                )
            );
            setShowing("generated");
        }
    }, [requestAllocationData]);
    useEffect(() => {
        if (defaultSessionData?.sessionStreams) {
            setSessions(
                defaultSessionData.sessionStreams.map((sessionStream) => {
                    const {
                        id,
                        name,
                        startTime,
                        endTime,
                        day,
                        location,
                    } = sessionStream;
                    return {
                        id,
                        name,
                        startTime,
                        endTime,
                        day,
                        location,
                        allocation: sessionStream.streamAllocations.map(
                            (allocation) => allocation.user.name
                        ),
                    };
                })
            );
            setShowing("default");
        }
    }, [defaultSessionData]);
    return (
        <Wrapper>
            <Stack spacing={4}>
                <Heading as="h1">Allocator</Heading>
                <Text fontSize="2xl" fontWeight="light" as="h2" pt={6}>
                    Choose a timetable to generate allocation for:
                </Text>
                <HStack spacing={6}>
                    <TermSelectContainer
                        chooseTerm={changeTerm}
                        chosenTerm={termId}
                        maxW="33%"
                    />
                    <CourseSelectContainer
                        chosenTerm={termId}
                        chosenCourse={courseId}
                        chooseCourse={changeCourse}
                        maxW="33%"
                        coordinatorOnly={true}
                    />
                </HStack>
                {courseId !== notSet && termId !== notSet ? (
                    <>
                        <Text fontSize="2xl" fontWeight="light" as="h2" pt={8}>
                            Choose staff members to be included in the generated
                            allocation:
                        </Text>
                        <AllocatorStaffCheckboxList
                            courseId={courseId}
                            termId={termId}
                            selectedStaff={selectedStaff}
                            setSelectedStaff={setSelectedStaff}
                        />
                        <Button
                            onClick={() => {
                                requestAllocation({
                                    variables: {
                                        courseTerm: { courseId, termId },
                                        staffIds: selectedStaff.toArray(),
                                        newThreshold: 0.5,
                                    },
                                });
                            }}
                            isLoading={requestAllocationLoading}
                            isFullWidth={false}
                            ml="auto"
                        >
                            Generate Allocation
                        </Button>
                        <Text fontSize="2xl" fontWeight="light" as="h2" pt={8}>
                            Timetable preview{" "}
                            {showing === "default"
                                ? "(No allocation yet generated)"
                                : "(Allocation generated)"}
                            :
                        </Text>
                        <AllocatorTimetableContainer
                            sessions={sessions}
                            loading={
                                defaultSessionLoading ||
                                requestAllocationLoading
                            }
                        />
                    </>
                ) : null}
            </Stack>
        </Wrapper>
    );
};
