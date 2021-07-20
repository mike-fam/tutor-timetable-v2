import React, { FC } from "react";
import { useField } from "formik";
import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import range from "lodash/range";
import { MultiSelect } from "../helpers/MultiSelect";
import { SimpleNumberInput } from "../helpers/SimpleNumberInput";
import { v4 as uuid } from "uuid";

type Props = {
    name: string;
    weekNames: string[];
    numberOfWeeks: number;
};

export const FormikBaseStaffRequirement: FC<Props> = ({
    name,
    numberOfWeeks,
    weekNames,
}) => {
    const [
        ,
        { value: baseNumberOfStaff },
        { setValue: setBasedNumberOfStaff },
    ] = useField<number | undefined>(`${name}.numberOfStaff`);
    const [, { value: baseWeeks }, { setValue: setBaseWeeks }] = useField<
        number[] | undefined
    >(`${name}.weeks`);
    return (
        <FormControl id={uuid()}>
            <FormLabel>Base Week Pattern:</FormLabel>
            <Box>
                In standard weeks, i.e.{" "}
                <MultiSelect
                    elements={range(numberOfWeeks).map(
                        (week) =>
                            [
                                week.toString(),
                                weekNames[week] || `Week [${week}]`,
                            ] as [string, string]
                    )}
                    selectedElements={
                        baseWeeks?.map((week) => week.toString()) || []
                    }
                    setSelectedElements={(values) => {
                        setBaseWeeks(values.map((value) => parseInt(value)));
                    }}
                />
                , at least{" "}
                <SimpleNumberInput
                    value={baseNumberOfStaff || 0}
                    onChange={(numberOfStaff) =>
                        setBasedNumberOfStaff(numberOfStaff)
                    }
                    min={0}
                    size="xs"
                    inline
                />{" "}
                tutors are allocated to this session.
            </Box>
        </FormControl>
    );
};
