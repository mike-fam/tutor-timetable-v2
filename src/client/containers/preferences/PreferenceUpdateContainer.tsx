import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { defaultStr } from "../../constants";
import {
    Preference,
    useGetSessionStreamsLazyQuery,
    useMyPreferenceLazyQuery,
    useUpdatePreferenceMutation,
} from "../../generated/graphql";
import {
    useLazyQueryWithError,
    useMutationWithError,
} from "../../hooks/useApolloHooksWithError";
import { Loadable } from "../../components/helpers/Loadable";
import { FormikInput } from "../../components/helpers/formik/FormikInput";
import { FormikSelect } from "../../components/helpers/formik/FormikSelect";
import uniq from "lodash/uniq";
import { capitalCase } from "change-case";
import { Button, Divider, Stack } from "@chakra-ui/react";

const NO_PREFERENCE = "No Preference";

type Props = {
    courseId: string;
    termId: string;
};

export const PreferenceUpdateContainer: FC<Props> = ({ courseId, termId }) => {
    const [preference, setPreference] = useState<
        Pick<Preference, "maxContigHours" | "maxWeeklyHours"> & {
            sessionType: "No Preference" | Preference["sessionType"];
        }
    >({
        maxContigHours: 20,
        maxWeeklyHours: 100,
        sessionType: NO_PREFERENCE,
    });
    const [getStreams, { data: sessionStreamData }] = useLazyQueryWithError(
        useGetSessionStreamsLazyQuery,
        {}
    );
    const [
        fetchMyPreference,
        {
            data: preferenceData,
            called: preferenceQueryCalled,
            refetch: refetchMyPreference,
        },
    ] = useLazyQueryWithError(useMyPreferenceLazyQuery, {});
    const [
        updatePreference,
        { loading: updatePreferenceLoading, data: updatePreferenceData },
    ] = useMutationWithError(useUpdatePreferenceMutation, {});
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
        if (courseId === defaultStr || termId === defaultStr) {
            return;
        }
        getStreams({ variables: { termId, courseIds: [courseId] } });
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
        getStreams,
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
    if (courseId === defaultStr || termId === defaultStr) {
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
                    <Stack spacing={3}>
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
                                            (sessionStream) =>
                                                sessionStream.type
                                        )
                                    ),
                                    NO_PREFERENCE,
                                ] || [NO_PREFERENCE]
                            }
                            optionToText={(val) => capitalCase(val as string)}
                        />
                        <Divider />
                        <Button
                            colorScheme="green"
                            type="submit"
                            isLoading={updatePreferenceLoading}
                        >
                            Submit Changes
                        </Button>
                    </Stack>
                </Form>
            </Formik>
        </Loadable>
    );
};
