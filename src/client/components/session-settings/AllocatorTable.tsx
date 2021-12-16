import {
    Button,
    Grid,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { usePreferenceByUsernameLazyQuery } from "../../generated/graphql";
import { Map } from "immutable";
import { useLazyQueryWithError } from "../../hooks/useApolloHooksWithError";
import { Loadable } from "../helpers/Loadable";
import { capitalCase } from "change-case";
import { PreferenceResponseType } from "../../types/preference";

export type AllocatedStaffData = {
    [key: string]: {
        name: string;
        totalHours: number;
        sessionsAssigned: string[];
    };
};

type Props = {
    staffMetadata: AllocatedStaffData;
    courseId: string;
    termId: string;
};

export const AllocatorTable: FC<Props> = ({
    staffMetadata,
    courseId,
    termId,
}) => {
    const staffDataSorted = useMemo(
        () =>
            Object.entries(staffMetadata).sort(
                (
                    [, { totalHours: totalHours1 }],
                    [, { totalHours: totalHours2 }]
                ) => totalHours2 - totalHours1
            ),
        [staffMetadata]
    );
    const [getStaffPreference, { data: staffPreferenceData }] =
        useLazyQueryWithError(usePreferenceByUsernameLazyQuery, {});
    const [staffPreferencesMap, setStaffPreferenceMap] = useState<
        Map<string, PreferenceResponseType>
    >(Map<string, PreferenceResponseType>());
    useEffect(() => {
        if (!staffPreferenceData) {
            return;
        }
        setStaffPreferenceMap((prev) =>
            prev.set(
                staffPreferenceData.preferenceByUsername.courseStaff.user
                    .username,
                staffPreferenceData.preferenceByUsername
            )
        );
    }, [staffPreferenceData]);

    return (
        <Table w="80%" alignSelf="center" variant="striped">
            <Thead>
                <Tr>
                    <Th>Staff</Th>
                    <Th isNumeric>Total Hours</Th>
                    <Th>Assigned to</Th>
                    <Th isNumeric>Rank</Th>
                </Tr>
            </Thead>
            <Tbody>
                {staffDataSorted.map(
                    (
                        [username, { totalHours, sessionsAssigned, name }],
                        index
                    ) => (
                        <Tr size="lg">
                            <Td>{name}</Td>
                            <Td isNumeric>{totalHours}</Td>
                            <Td>{sessionsAssigned.join(", ")}</Td>
                            <Td isNumeric>{index + 1}</Td>
                            <Td>
                                <Popover key={index}>
                                    <PopoverTrigger>
                                        <Button
                                            onClick={() => {
                                                getStaffPreference({
                                                    variables: {
                                                        courseTermId: {
                                                            courseId,
                                                            termId,
                                                        },
                                                        username,
                                                    },
                                                });
                                            }}
                                        >
                                            View Preferences
                                        </Button>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent>
                                            <PopoverHeader>
                                                Staff preferences
                                            </PopoverHeader>
                                            <PopoverBody>
                                                <Loadable
                                                    isLoading={
                                                        !staffPreferencesMap.get(
                                                            username
                                                        )
                                                    }
                                                >
                                                    <Grid templateColumns="1fr 1fr">
                                                        <Text>
                                                            Max Contiguous
                                                            Hours:
                                                        </Text>
                                                        <Text>
                                                            {
                                                                staffPreferencesMap.get(
                                                                    username
                                                                )
                                                                    ?.maxContigHours
                                                            }
                                                        </Text>
                                                        <Text>
                                                            Max Weekly Hours:
                                                        </Text>
                                                        <Text>
                                                            {
                                                                staffPreferencesMap.get(
                                                                    username
                                                                )
                                                                    ?.maxWeeklyHours
                                                            }
                                                        </Text>
                                                        <Text>
                                                            Session Type:
                                                        </Text>
                                                        <Text>
                                                            {capitalCase(
                                                                staffPreferencesMap.get(
                                                                    username
                                                                )
                                                                    ?.sessionType ||
                                                                    "No Preferences"
                                                            )}
                                                        </Text>
                                                    </Grid>
                                                </Loadable>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                            </Td>
                        </Tr>
                    )
                )}
            </Tbody>
        </Table>
    );
};
