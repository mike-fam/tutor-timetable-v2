import React from "react";
import { Role } from "../../generated/graphql";
import { StaffSeniority } from "../../types/courseStaff";
import { FormikInput } from "../helpers/FormikInput";
import { Textarea } from "@chakra-ui/react";
import { FormikSelect } from "../helpers/FormikSelect";
import { FormikRadioGroup } from "../helpers/FormikRadioGroup";

type Props = {
    username?: string;
    role?: Role;
    isNew?: StaffSeniority;
    multipleStaff: boolean;
    onSubmit: (values: {
        usernames: string[];
        role: Role;
        isNew: StaffSeniority;
    }) => void;
    editable?: boolean;
};

export const CourseStaffForm: React.FC<Props> = ({
    username = "",
    role = Role.Staff,
    isNew = StaffSeniority.EXPERIENCED,
    multipleStaff,
    onSubmit,
    editable = false,
}) => {
    return (
        <>
            {multipleStaff ? (
                <FormikInput
                    name="username"
                    as={Textarea}
                    placeholder="Enter usernames as comma-separated values"
                    isDisabled={!editable}
                />
            ) : (
                <FormikInput name="username" isDisabled={!editable} />
            )}
            <FormikSelect
                name="role"
                options={[Role.CourseCoordinator, Role.Staff]}
            />
            <FormikRadioGroup
                name="isNew"
                values={[StaffSeniority.EXPERIENCED, StaffSeniority.NEW]}
            />
        </>
    );
};
