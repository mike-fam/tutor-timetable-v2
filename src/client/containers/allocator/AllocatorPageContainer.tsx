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
import React, { useEffect, useMemo, useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { TermSelectContainer } from "../TermSelectContainer";
import { defaultStr } from "../../constants";
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
import { TimetableCustomSessionProps } from "../../components/timetable/TimetableSession";
import { Map, Set } from "immutable";
import { useMutationWithError } from "../../hooks/useApolloHooksWithError";
import { AllocatorConfirmDialog } from "../../components/AllocatorConfirmDialog";
import {
    AllocatedStaffData,
    AllocatorTable,
} from "../../components/allocator/AllocatorTable";
import { SessionTheme } from "../../types/session";

type Props = {};

export const AllocatorPageContainer: React.FC<Props> = () => {
    const { termId, changeTerm, courseId, changeCourse } = useTermCourse();
    const [showing, setShowing] = useState<"default" | "generated">("default");
    const [sessions, setSessions] = useState<TimetableSessionType[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<Set<string>>(Set());
    const [override, setOverride] = useState(false);
    const toast = useToast();
    const {
        isOpen: isConfirmOpen,
        onOpen: openConfirm,
        onClose: closeConfirm,
    } = useDisclosure();
    const [getSessionStream, { data: defaultSessionData }] =
        useGetSessionStreamsLazyQuery();
    const [
        requestAllocation,
        { data: requestAllocationData, loading: requestAllocationLoading },
    ] = useMutationWithError(useRequestAllocationMutation, {});

    // TODO: Maybe course code as well.
    const [sessionsInfo, setSessionsInfo] = useState<
        Map<string, TimetableCustomSessionProps>
    >(Map<string, TimetableCustomSessionProps>());

    const [
        applyAllocation,
        { data: applyAllocationData, loading: applyAllocationLoading },
    ] = useMutationWithError(useApplyAllocationMutation, {});

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
            setShowing("default");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applyAllocationData]);

    const allocatorUserData = useMemo<AllocatedStaffData>(() => {
        if (!requestAllocationData) {
            return {};
        }
        const staffData: AllocatedStaffData = {};

        requestAllocationData.requestAllocation.allocations.forEach(
            (allocation) => {
                allocation.staff.forEach((staff) => {
                    staffData[staff.username] = {
                        totalHours:
                            (staffData[staff.username]?.totalHours || 0) +
                            (allocation.sessionStream.endTime -
                                allocation.sessionStream.startTime) *
                                allocation.sessionStream.weeks.length,
                        sessionsAssigned: [
                            ...(staffData[staff.username]?.sessionsAssigned ||
                                []),
                            allocation.sessionStream.name,
                        ],
                        name: staff.name,
                    };
                });
            }
        );
        return staffData;
    }, [requestAllocationData]);
    // Get timetable data on term and course changing
    useEffect(() => {
        if (termId === defaultStr || courseId === defaultStr) {
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
                    ({ sessionStream }) => {
                        const { id, name, startTime, endTime, day } =
                            sessionStream;
                        return {
                            id,
                            name,
                            startTime,
                            endTime,
                            day,
                        };
                    }
                )
            );
            requestAllocationData.requestAllocation.allocations.forEach(
                ({ sessionStream, staff }) => {
                    setSessionsInfo((prev) =>
                        prev.set(sessionStream.id, {
                            location: sessionStream.location,
                            allocation: staff.map((staff) => staff.name),
                            theme:
                                staff.length < sessionStream.numberOfStaff
                                    ? SessionTheme.ERROR
                                    : SessionTheme.PRIMARY,
                        })
                    );
                }
            );
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
                    const { id, name, startTime, endTime, day } = sessionStream;
                    return {
                        id,
                        name,
                        startTime,
                        endTime,
                        day,
                    };
                }) || []
            );
            defaultSessionData.sessionStreams.forEach((sessionStream) => {
                setSessionsInfo((prev) =>
                    prev.set(sessionStream.id, {
                        location: sessionStream.location,
                        allocation: sessionStream.allocatedUsers.map(
                            (user) => user.name
                        ),
                    })
                );
            });
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
                    {courseId !== defaultStr && termId !== defaultStr && (
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
                                                staffIds:
                                                    selectedStaff.toArray(),
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
                                sessionsData={sessionsInfo}
                            />
                            {showing === "generated" && allocatorUserData && (
                                <>
                                    <Text
                                        fontSize="2xl"
                                        fontWeight="light"
                                        as="h2"
                                        pt={6}
                                    >
                                        Allocation stats
                                    </Text>
                                    <AllocatorTable
                                        staffMetadata={allocatorUserData}
                                        courseId={courseId}
                                        termId={termId}
                                    />
                                </>
                            )}
                        </>
                    )}
                </Stack>
                {showing === "generated" && requestAllocationData && (
                    <pre>
                        {JSON.stringify(
                            requestAllocationData.requestAllocation,
                            null,
                            4
                        )}
                    </pre>
                )}
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
