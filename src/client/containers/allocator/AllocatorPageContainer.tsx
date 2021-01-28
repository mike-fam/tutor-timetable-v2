import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Spacer,
    Stack,
    Switch,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
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
    useApplyAllocationMutation,
    useGetSessionStreamsLazyQuery,
    useRequestAllocationMutation,
} from "../../generated/graphql";
import { TimetableSessionType } from "../../types/timetable";
import { Set } from "immutable";
import { useMutationWithError } from "../../hooks/useQueryWithError";
import { AllocatorConfirmDialog } from "../../components/AllocatorConfirmDialog";

type Props = {};

export const AllocatorPageContainer: React.FC<Props> = () => {
    const { termId, changeTerm, courseId, changeCourse } = useTermCourse();
    const [showing, setShowing] = useState<"default" | "generated">("default");
    const [sessions, setSessions] = useState<TimetableSessionType[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<Set<number>>(Set());
    const [override, setOverride] = useState(false);
    const toast = useToast();
    const {
        isOpen: isConfirmOpen,
        onOpen: openConfirm,
        onClose: closeConfirm,
    } = useDisclosure();
    const [
        getSessionStream,
        { data: defaultSessionData },
    ] = useGetSessionStreamsLazyQuery();
    const [
        requestAllocation,
        { data: requestAllocationData, loading: requestAllocationLoading },
    ] = useMutationWithError(useRequestAllocationMutation);
    const [
        applyAllocation,
        { data: applyAllocationData, loading: applyAllocationLoading },
    ] = useMutationWithError(useApplyAllocationMutation);

    // Show popup when allocation successfully applied
    useEffect(() => {
        if (applyAllocationData?.applyAllocation) {
            toast({
                title: "Allocation Applied",
                description:
                    "The generated allocations have successfully been applied.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
        setShowing("default");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applyAllocationData]);

    // Get timetable data on term and course changing
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

    // Allocation successfully generated
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
            console.log("Setting to generated");
            setShowing("generated");
            toast({
                title: "Allocation generated",
                description:
                    "Allocation successfully generated. " +
                    "Hover on a session to see the allocation for that session. " +
                    "Click on the 'Apply Allocation' button to apply this allocation " +
                    "to the timetable.",
                status: "success",
                duration: 15000,
                isClosable: true,
            });
        } else if (
            requestAllocationData?.requestAllocation.status ===
            AllocationStatus.Infeasible
        ) {
            toast({
                title: "Model Infeasible",
                description:
                    "Cannot generate allocation because there is no possible solution",
                status: "error",
                isClosable: true,
            });
            setShowing("default");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        requestAllocationData?.requestAllocation.status,
        requestAllocationData?.requestAllocation.allocations,
    ]);
    useEffect(() => {
        if (defaultSessionData?.sessionStreams) {
            setSessions(
                defaultSessionData?.sessionStreams.map((sessionStream) => {
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
                }) || []
            );
            setShowing("default");
        }
    }, [defaultSessionData]);
    return (
        <>
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
                            <Text
                                fontSize="2xl"
                                fontWeight="light"
                                as="h2"
                                pt={8}
                            >
                                Choose staff members to be included in the
                                generated allocation:
                            </Text>
                            <AllocatorStaffCheckboxList
                                courseId={courseId}
                                termId={termId}
                                selectedStaff={selectedStaff}
                                setSelectedStaff={setSelectedStaff}
                            />
                            <Flex align="flex-end">
                                <Text
                                    fontSize="2xl"
                                    fontWeight="light"
                                    as="h2"
                                    pt={8}
                                >
                                    Timetable preview{" "}
                                    {showing === "default"
                                        ? "(No allocation yet generated)"
                                        : "(Allocation generated)"}
                                    :
                                </Text>
                                <Spacer />
                                <Button
                                    colorScheme="blue"
                                    onClick={() => {
                                        openConfirm();
                                    }}
                                    disabled={showing === "default"}
                                >
                                    Apply Allocation
                                </Button>
                                <Button
                                    colorScheme="green"
                                    onClick={() => {
                                        requestAllocation({
                                            variables: {
                                                courseTerm: {
                                                    courseId,
                                                    termId,
                                                },
                                                staffIds: selectedStaff.toArray(),
                                                newThreshold: 0.5,
                                            },
                                        });
                                    }}
                                    isLoading={requestAllocationLoading}
                                    ml={2}
                                >
                                    Generate Allocation
                                </Button>
                            </Flex>
                            <FormControl
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <FormLabel htmlFor="email-alerts" mb="0">
                                    Override existing allocation?
                                </FormLabel>
                                <Switch
                                    id="email-alerts"
                                    checked={override}
                                    onChange={(e) => {
                                        setOverride(e.target.checked);
                                    }}
                                    isDisabled={showing === "default"}
                                />
                            </FormControl>
                            <AllocatorTimetableContainer
                                sessions={sessions}
                                loading={
                                    defaultSessionData === undefined ||
                                    requestAllocationLoading
                                }
                            />
                        </>
                    ) : null}
                </Stack>
            </Wrapper>
            <AllocatorConfirmDialog
                isOpen={isConfirmOpen}
                close={closeConfirm}
                apply={async () => {
                    await applyAllocation({
                        variables: {
                            token:
                                requestAllocationData?.requestAllocation
                                    .token || "",
                            override,
                        },
                    });
                }}
                isLoading={applyAllocationLoading}
            />
        </>
    );
};
