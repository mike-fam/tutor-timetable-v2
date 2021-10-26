import { Form, Formik } from "formik";
import React from "react";
import { CourseInput } from "../../generated/graphql";
import { FormikInput } from "../helpers/formik/FormikInput";
import { AdminEditMode } from "../../types/admin";
import { Button, VStack } from "@chakra-ui/react";

type Props = {
    initialValues?: CourseInput;
    submit: (values: CourseInput) => void;
    editMode: AdminEditMode;
    loading?: boolean;
};

export const CourseForm: React.FC<Props> = ({
    initialValues,
    submit,
    editMode,
    loading = false,
}) => {
    return (
        <Formik<CourseInput>
            initialValues={initialValues || { code: "", title: "" }}
            onSubmit={submit}
            enableReinitialize
        >
            <Form>
                <VStack spacing={4}>
                    <FormikInput name="code" label="Course code" />
                    <FormikInput name="title" label="Course title" />
                    <Button
                        type="submit"
                        isLoading={loading}
                        colorScheme="blue"
                        alignSelf="flex-start"
                    >
                        {editMode === "add" ? "Add" : "Save"} Course
                    </Button>
                </VStack>
            </Form>
        </Formik>
    );
};
