import React, { useEffect, useMemo, useState } from "react";
import {
    useMutationWithStatus,
    useQueryWithError,
} from "../../hooks/useApolloHooksWithError";
import {
    CreateTimetableMutation,
    FreezeState,
    TimetableInput,
    useCreateTimetableMutation,
    useDeleteTimetableMutation,
    useTimetablesQuery,
    useUpdateTimetableMutation,
} from "../../generated/graphql";
import { useMap } from "../../hooks/useMap";
import { defaultStr } from "../../constants";
import { AddOrSelect } from "../../components/admin/AddOrSelect";
import { Button, Divider } from "@chakra-ui/react";
import { formatTerm } from "../../utils/term";
import { TimetableFormContainer } from "./TimetableFormContainer";

type Props = {};

type TimetableResponseType = CreateTimetableMutation["createTimetable"];

export const AdminTimetableContainer: React.FC<Props> = () => {
    const [chosenTimetableId, setChosenTimetableId] = useState<string>();
    const [updated, setUpdated] = useState(false);
    const [
        createTimetable,
        { data: createdTimetable, loading: isCreatingTimetable },
    ] = useMutationWithStatus(useCreateTimetableMutation, {
        errorPolicy: "all",
    });
    const [
        updateTimetable,
        { data: updatedTimetable, loading: isUpdatingTimetable },
    ] = useMutationWithStatus(useUpdateTimetableMutation, {
        errorPolicy: "all",
    });
    const [
        deleteTimetable,
        { data: deletedTimetable, loading: isDeletingTimetable },
    ] = useMutationWithStatus(useDeleteTimetableMutation, {
        errorPolicy: "all",
    });
    const { data: fetchedTimetables } = useQueryWithError(useTimetablesQuery, {
        errorPolicy: "all",
        pollInterval: 10000,
        fetchPolicy: "cache-and-network",
    });
    const {
        state: timetables,
        replaceAll: replaceAllTimetables,
        set: setTimetable,
        remove: removeTimetable,
    } = useMap<TimetableResponseType>();
    useEffect(() => {
        if (!fetchedTimetables) {
            return;
        }
        replaceAllTimetables(
            fetchedTimetables.timetables.map((timetable) => [
                timetable.id,
                timetable,
            ])
        );
    }, [fetchedTimetables, replaceAllTimetables]);
    useEffect(() => {
        if (!createdTimetable) {
            return;
        }
        setTimetable(
            createdTimetable.createTimetable.id,
            createdTimetable.createTimetable
        );
    }, [createdTimetable, setTimetable]);
    useEffect(() => {
        if (!updatedTimetable) {
            return;
        }
        setTimetable(
            updatedTimetable.updateTimetable.id,
            updatedTimetable.updateTimetable
        );
    }, [updatedTimetable, setTimetable]);
    useEffect(() => {
        if (!deletedTimetable) {
            return;
        }
        removeTimetable(deletedTimetable.deleteTimetable);
        setChosenTimetableId(undefined);
        setUpdated(false);
    }, [deletedTimetable, removeTimetable]);
    const initialValues = useMemo<TimetableInput>(() => {
        if (!chosenTimetableId) {
            return {
                courseId: defaultStr,
                termId: defaultStr,
                permanentRequestLock: FreezeState.Free,
                temporaryRequestLock: FreezeState.Free,
                allocationToken: defaultStr,
            };
        }
        const { course, term, permanentRequestLock, temporaryRequestLock } =
            timetables.get(chosenTimetableId)!;
        return {
            courseId: course.id,
            termId: term.id,
            permanentRequestLock,
            temporaryRequestLock,
        };
    }, [timetables, chosenTimetableId]);
    return (
        <>
            <AddOrSelect
                elementType="Timetable"
                elements={timetables
                    .map(
                        (timetable) =>
                            [
                                timetable.id,
                                `${timetable.course.code} in ${formatTerm(
                                    timetable.term
                                )}`,
                            ] as [string, string]
                    )
                    .valueSeq()
                    .toArray()}
                onAdd={() => {
                    setChosenTimetableId(void 0);
                    setUpdated(true);
                }}
                onSelect={(timetableId) => {
                    setChosenTimetableId(timetableId);
                    setUpdated(true);
                }}
                selectedValue={chosenTimetableId}
            />
            <Divider my={4} />
            {updated && (
                <>
                    <TimetableFormContainer
                        loading={isUpdatingTimetable || isCreatingTimetable}
                        submit={async (values) => {
                            if (!chosenTimetableId) {
                                await createTimetable({
                                    variables: {
                                        timetableInput: values,
                                    },
                                });
                                setUpdated(false);
                            } else {
                                await updateTimetable({
                                    variables: {
                                        timetableInput: values,
                                    },
                                });
                                setUpdated(false);
                            }
                        }}
                        editMode={chosenTimetableId ? "edit" : "add"}
                        initialValues={initialValues}
                    />
                    {chosenTimetableId && (
                        <Button
                            mt={1}
                            onClick={() => {
                                deleteTimetable({
                                    variables: {
                                        timetableId: chosenTimetableId,
                                    },
                                });
                            }}
                            isLoading={isDeletingTimetable}
                            colorScheme="red"
                        >
                            Delete Timetable
                        </Button>
                    )}
                </>
            )}
        </>
    );
};
