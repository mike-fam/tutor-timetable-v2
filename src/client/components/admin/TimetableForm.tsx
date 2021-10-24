import { Form, Formik } from "formik";
import React from "react";
import { FreezeState, TimetableInput } from "../../generated/graphql";
import { FormikInput } from "../helpers/formik/FormikInput";
import { AdminEditMode } from "../../types/admin";
import { Button } from "@chakra-ui/react";

type Props = {
    initialValues?: TimetableInput;
    submit: (values: TimetableInput) => void;
    editMode: AdminEditMode;
    loading?: boolean;
};

export const TimetableForm: React.FC<Props> = ({
    initialValues,
    submit,
    editMode,
    loading = false,
}) => {
    return (
        <Formik<TimetableInput>
            initialValues={
                initialValues || {
                    courseId: "",
                    termId: "",
                    permanentRequestLock: FreezeState.Free,
                    temporaryRequestLock: FreezeState.Free,
                    allocationToken: "",
                }
            }
            onSubmit={submit}
            enableReinitialize
        >
            <Form>
                <FormikInput name="courseId" label="Course" />
                <FormikInput name="termId" label="Term" />
                <Button
                    mt={3}
                    type="submit"
                    isLoading={loading}
                    colorScheme="blue"
                >
                    {editMode === "add" ? "Add" : "Save"} Course
                </Button>
            </Form>
        </Formik>
    );
};
