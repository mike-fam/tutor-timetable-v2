import { Role } from "../../generated/graphql";
import { StaffSeniority } from "../../types/courseStaff";
import { FormikInput } from "../helpers/formik/FormikInput";
import { Stack, Textarea } from "@chakra-ui/react";
import { FormikSelect } from "../helpers/formik/FormikSelect";
import { FormikRadioGroup } from "../helpers/formik/FormikRadioGroup";
import { FC } from "react";

type Props = {
    multipleStaff: boolean;
    editable?: boolean;
};

export const CourseStaffForm: FC<Props> = ({
    multipleStaff,
    editable = false,
}) => {
    return (
        <Stack spacing={3}>
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
        </Stack>
    );
};
