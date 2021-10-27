import React from "react";
import { CourseInput } from "../../generated/graphql";
import { AdminEditMode } from "../../types/admin";

type Props = {
    initialValues?: CourseInput;
    submit: (values: CourseInput) => void;
    editMode: AdminEditMode;
    loading?: boolean;
};

export const TermForm: React.FC<Props> = ({
    initialValues,
    submit,
    editMode,
    loading = false,
}) => {
    return (
        // <Formik<TermInput>
        //     initialValues={
        //         initialValues || {
        //             type: TermType.Semester_1,
        //             year: today.getFullYear(),
        //         }
        //     }
        //     onSubmit={submit}
        //     enableReinitialize
        // >
        //     <Form>
        //         <VStack spacing={4}>
        //             <FormikInput name="code" label="Course code" />
        //             <FormikInput name="title" label="Course title" />
        //             <Button
        //                 type="submit"
        //                 isLoading={loading}
        //                 colorScheme="blue"
        //                 alignSelf="flex-start"
        //             >
        //                 {editMode === "add" ? "Add" : "Save"} Course
        //             </Button>
        //         </VStack>
        //     </Form>
        // </Formik>
        <div></div>
    );
};
