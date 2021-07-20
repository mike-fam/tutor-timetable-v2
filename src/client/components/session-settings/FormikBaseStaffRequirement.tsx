import React, { FC } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { camelCase } from "change-case";
import range from "lodash/range";
import { StreamStaffRequirement } from "../../generated/graphql";
import { MultiSelect } from "../helpers/MultiSelect";
import { SimpleNumberInput } from "../helpers/SimpleNumberInput";

type Props = {
    name: string;
    weekNames: string[];
    numberOfWeeks: number;
    id?: string;
};

export const FormikBaseStaffRequirement: FC<Props> = ({
    name,
    id,
    numberOfWeeks,
    weekNames,
}) => {
    const [
        ,
        { value: baseStaffRequirement },
        { setValue: setBaseStaffRequirement },
    ] = useField<StreamStaffRequirement>(name);
    return (
        <FormControl id={id || camelCase(name)} mt={3}>
            <FormLabel>Base Week Pattern:</FormLabel>
            <Text>
                In standard weeks, i.e.{" "}
                <MultiSelect
                    elements={range(numberOfWeeks).map(
                        (week) =>
                            [
                                week.toString(),
                                weekNames[week] || `Week [${week}]`,
                            ] as [string, string]
                    )}
                    selectedElements={baseStaffRequirement.weeks.map((week) =>
                        week.toString()
                    )}
                    setSelectedElements={(values) => {
                        setBaseStaffRequirement({
                            numberOfStaff: baseStaffRequirement.numberOfStaff,
                            weeks: values.map((value) => parseInt(value)),
                            allocatedUsers: baseStaffRequirement.allocatedUsers,
                        });
                    }}
                />
                , at least{" "}
                <SimpleNumberInput
                    value={baseStaffRequirement.numberOfStaff}
                    onChange={(numberOfStaff) =>
                        setBaseStaffRequirement({
                            numberOfStaff,
                            weeks: baseStaffRequirement.weeks,
                            allocatedUsers: baseStaffRequirement.allocatedUsers,
                        })
                    }
                    min={0}
                    size="xs"
                    inline
                />{" "}
                tutors are allocated to this session.
            </Text>
        </FormControl>
    );
};
