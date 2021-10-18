import { Form, Formik } from "formik";
import React from "react";
import { CourseInput } from "../../generated/graphql";
import { FormikInput } from "../helpers/formik/FormikInput";
import { AdminEditMode } from "../../types/admin";
import { Button } from "@chakra-ui/react";

type Props = {
    initialValues?: CourseInput;
    submit: (values: CourseInput) => void;
    editMode: AdminEditMode;
};

export const CourseForm: React.FC<Props> = ({
    initialValues,
    submit,
    editMode,
}) => {
    return (
        <Formik<CourseInput>
            initialValues={initialValues || { code: "", title: "" }}
            onSubmit={submit}
        >
            <Form>
                <FormikInput name="code" label="Course code" />
                <FormikInput name="title" label="Course title" />
                <Button type="submit">
                    {editMode === "add" ? "Add" : "Save"} Course
                </Button>
            </Form>
        </Formik>
    );
};
