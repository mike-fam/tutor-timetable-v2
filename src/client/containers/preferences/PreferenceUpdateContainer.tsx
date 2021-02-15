import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { notSet } from "../../constants";
import {
    Preference,
    useGetSessionStreamsQuery,
    useMyPreferenceLazyQuery,
    useUpdatePreferenceMutation,
} from "../../generated/graphql";
import {
    useLazyQueryWithError,
    useMutationWithError,
    useQueryWithError,
} from "../../hooks/useQueryWithError";
import { Loadable } from "../../components/helpers/Loadable";
import { FormikInput } from "../../components/helpers/FormikInput";
import { FormikSelect } from "../../components/helpers/FormikSelect";
import uniq from "lodash/uniq";
import { capitalCase } from "change-case";
import { Button, Divider } from "@chakra-ui/react";

const NO_PREFERENCE = "No Preference";

type Props = {
    courseId: number;
    termId: number;
};

export const PreferenceUpdateContainer: React.FC<Props> = ({
    courseId,
    termId,
}) => {
    const [preference, setPreference] = useState<
        Pick<Preference, "maxContigHours" | "maxWeeklyHours"> & {
            sessionType: "No Preference" | Preference["sessionType"];
        }
    >({
        maxContigHours: 20,
        maxWeeklyHours: 100,
        sessionType: NO_PREFERENCE,
    });
    const { data: sessionStreamData } = useQueryWithError(
        useGetSessionStreamsQuery,
        {
            courseIds: [courseId],
            termId,
        }
    );
    const [
        fetchMyPreference,
        {
            data: preferenceData,
            called: preferenceQueryCalled,
            refetch: refetchMyPreference,
        },
    ] = useLazyQueryWithError(useMyPreferenceLazyQuery);
    const [
        updatePreference,
        { loading: updatePreferenceLoading, data: updatePreferenceData },
    ] = useMutationWithError(useUpdatePreferenceMutation);
    useEffect(() => {
        if (!updatePreferenceData) {
            return;
        }
        setPreference({
            maxContigHours:
                updatePreferenceData.updatePreference.maxContigHours,
            maxWeeklyHours:
                updatePreferenceData.updatePreference.maxWeeklyHours,
            sessionType:
                updatePreferenceData.updatePreference.sessionType ||
                NO_PREFERENCE,
        });
    }, [updatePreferenceData]);
    useEffect(() => {
        if (courseId === notSet || termId === notSet) {
            return;
        }
        const variables = {
            preferenceFind: { termId, courseId },
        };
        if (preferenceQueryCalled) {
            refetchMyPreference!(variables);
        } else {
            fetchMyPreference({ variables });
        }
    }, [
        courseId,
        termId,
        fetchMyPreference,
        preferenceQueryCalled,
        refetchMyPreference,
    ]);
    useEffect(() => {
        if (!preferenceData?.myPreference) {
            return;
        }
        setPreference({
            maxContigHours: preferenceData.myPreference.maxContigHours,
            maxWeeklyHours: preferenceData.myPreference.maxWeeklyHours,
            sessionType:
                preferenceData.myPreference.sessionType || NO_PREFERENCE,
        });
    }, [preferenceData, courseId, termId]);
    if (courseId === notSet || termId === notSet) {
        return null;
    }
    return (
        <Loadable
            isLoading={
                preferenceData === undefined || sessionStreamData === undefined
            }
        >
            <Formik
                enableReinitialize={true}
                initialValues={preference}
                onSubmit={async (values) => {
                    await updatePreference({
                        variables: {
                            preference: {
                                ...values,
                                sessionType:
                                    values.sessionType === NO_PREFERENCE
                                        ? null
                                        : values.sessionType,
                            },
                            preferenceFind: {
                                courseId,
                                termId,
                            },
                        },
                    });
                }}
            >
                <Form>
                    <FormikInput
                        name="maxContigHours"
                        type="number"
                        label="Maximum Contiguous Hours"
                    />
                    <FormikInput
                        name="maxWeeklyHours"
                        type="number"
                        label="Maximum Weekly Hours"
                    />
                    <FormikSelect
                        name="sessionType"
                        options={
                            [
                                ...uniq(
                                    sessionStreamData?.sessionStreams.map(
                                        (sessionStream) => sessionStream.type
                                    )
                                ),
                                NO_PREFERENCE,
                            ] || [NO_PREFERENCE]
                        }
                        optionToText={capitalCase}
                    />
                    <Divider my={2} />
                    <Button
                        colorScheme="green"
                        type="submit"
                        isLoading={updatePreferenceLoading}
                    >
                        Submit Changes
                    </Button>
                </Form>
            </Formik>
        </Loadable>
    );
};
