import { Form, Formik } from "formik";
import React from "react";
import { Role } from "../../generated/graphql";
import { FormikInput } from "../../components/helpers/FormikInput";
import { FormikSelect } from "../../components/helpers/FormikSelect";
import { FormikRadioGroup } from "../../components/helpers/FormikRadioGroup";

type Props = {
    username?: string;
    role?: Role;
    isNew?: boolean;
    onSubmit: () => void;
};

export const CourseStaffForm: React.FC<Props> = ({
    username = "",
    role = Role.Staff,
    isNew = false,
    onSubmit,
}) => {
    return (
        <Formik
            initialValues={{
                username,
                role,
                isNew,
            }}
            onSubmit={(values) => {
                console.log(values);
                onSubmit();
            }}
        >
            <Form>
                <FormikInput name="username" />
                <FormikSelect
                    name="role"
                    options={[Role.CourseCoordinator, Role.Staff]}
                />
                <FormikRadioGroup
                    name="isNew"
                    values={["Experienced", "New"]}
                />
            </Form>
        </Formik>
    );
};
