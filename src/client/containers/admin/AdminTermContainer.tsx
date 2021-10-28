import React, { useEffect, useMemo, useState } from "react";
import { AddOrSelect } from "../../components/admin/AddOrSelect";
import { formatTerm } from "../../utils/term";
import { Button, Divider } from "@chakra-ui/react";
import {
    useMutationWithStatus,
    useQueryWithError,
} from "../../hooks/useApolloHooksWithError";
import {
    CreateTermMutation,
    TermInput,
    TermType,
    useCreateTermMutation,
    useDeleteTermMutation,
    useTermsQuery,
    useUpdateTermMutation,
} from "../../generated/graphql";
import { useMap } from "../../hooks/useMap";
import { today } from "../../constants/date";
import { CalendarInputSingleRange } from "../../components/helpers/calendar/CalendarInputSingleRange";

type Props = {};

export const AdminTermContainer: React.FC<Props> = ({}) => {
    const [chosenTermId, setChosenTermId] = useState<string>();
    const [updated, setUpdated] = useState(false);
    const [createTerm, { data: createdTerm, loading: isCreatingTerm }] =
        useMutationWithStatus(useCreateTermMutation, {
            errorPolicy: "all",
        });
    const [updateTerm, { data: updatedTerm, loading: isUpdatingTerm }] =
        useMutationWithStatus(useUpdateTermMutation, {
            errorPolicy: "all",
        });
    const [deleteTerm, { data: deletedTerm, loading: isDeletingTerm }] =
        useMutationWithStatus(useDeleteTermMutation, {
            errorPolicy: "all",
        });
    const { data: fetchedTerms } = useQueryWithError(useTermsQuery, {
        errorPolicy: "all",
        pollInterval: 10000,
        fetchPolicy: "cache-and-network",
    });
    const {
        state: terms,
        replaceAll: replaceAllTerms,
        set: setTerm,
        remove: removeTerm,
    } = useMap<CreateTermMutation["createTerm"]>();
    useEffect(() => {
        if (!fetchedTerms) {
            return;
        }
        replaceAllTerms(fetchedTerms.terms.map((term) => [term.id, term]));
    }, [fetchedTerms, replaceAllTerms]);
    useEffect(() => {
        if (!createdTerm) {
            return;
        }
        setTerm(createdTerm.createTerm.id, createdTerm.createTerm);
    }, [createdTerm, setTerm]);
    useEffect(() => {
        if (!updatedTerm) {
            return;
        }
        setTerm(updatedTerm.updateTerm.id, updatedTerm.updateTerm);
    }, [updatedTerm, setTerm]);
    useEffect(() => {
        if (!deletedTerm) {
            return;
        }
        removeTerm(deletedTerm.deleteTerm);
        setChosenTermId(undefined);
        setUpdated(false);
    }, [deletedTerm, removeTerm]);
    const initialValues = useMemo<TermInput>(() => {
        if (!chosenTermId) {
            return {
                type: TermType.Semester_1,
                year: today.getFullYear(),
                startDate: today,
                endDate: today,
                weekNames: [],
                isActive: false,
            };
        }
        return terms.get(chosenTermId)!;
    }, [terms, chosenTermId]);
    return (
        <>
            <AddOrSelect
                elementType="Term"
                elements={terms
                    .map(
                        (term) =>
                            [term.id, formatTerm(term)] as [string, string]
                    )
                    .valueSeq()
                    .toArray()}
                onAdd={() => {
                    setChosenTermId(void 0);
                    setUpdated(true);
                }}
                onSelect={(termId) => {
                    setChosenTermId(termId);
                    setUpdated(true);
                }}
                selectedValue={chosenTermId}
            />
            <Divider my={4} />
            <CalendarInputSingleRange
                value={[undefined, undefined]}
                onChange={() => {}}
            />
            {updated && (
                <>
                    {/*<TermFormContainer*/}
                    {/*    loading={isUpdatingTerm || isCreatingTerm}*/}
                    {/*    submit={async (values) => {*/}
                    {/*        if (!chosenTermId) {*/}
                    {/*            await createTerm({*/}
                    {/*                variables: {*/}
                    {/*                    termInput: values,*/}
                    {/*                },*/}
                    {/*            });*/}
                    {/*            setUpdated(false);*/}
                    {/*        } else {*/}
                    {/*            await updateTerm({*/}
                    {/*                variables: {*/}
                    {/*                    termInput: {*/}
                    {/*                        id: chosenTermId,*/}
                    {/*                        ...values,*/}
                    {/*                    },*/}
                    {/*                },*/}
                    {/*            });*/}
                    {/*            setUpdated(false);*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    editMode={chosenTermId ? "edit" : "add"}*/}
                    {/*    initialValues={initialValues}*/}
                    {/*/>*/}
                    {chosenTermId && (
                        <Button
                            mt={1}
                            onClick={() => {
                                deleteTerm({
                                    variables: {
                                        termId: chosenTermId,
                                    },
                                });
                            }}
                            isLoading={isDeletingTerm}
                            colorScheme="red"
                        >
                            Delete Term
                        </Button>
                    )}
                </>
            )}
        </>
    );
};
