import { FC, Fragment } from "react";
import {
    Box,
    Flex,
    FormLabel,
    Grid,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import { StreamStaffRequirement } from "../../generated/graphql";
import { MultiSelect } from "../helpers/MultiSelect";
import range from "lodash/range";
import { removeAtIndex, updateElementAtIndex } from "../../../utils/array";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { SimpleNumberInput } from "../helpers/SimpleNumberInput";

type Props = {
    name: string;
    weekNames: string[];
    numberOfWeeks: number;
    id?: string;
};

export const FormikExtraStaffRequirement: FC<Props> = ({
    name,
    weekNames,
    numberOfWeeks,
}) => {
    const [
        ,
        { value: extraStaffRequirements },
        { setValue: setExtraStaffRequirements },
    ] = useField<StreamStaffRequirement[] | undefined>(name);
    return (
        <Box>
            <Flex>
                <FormLabel>Extra Week Patterns:</FormLabel>
                <Spacer />
                <IconButton
                    colorScheme="green"
                    aria-label="Add Extra Requirement entry"
                    icon={<AddIcon />}
                    size="xs"
                    onClick={() => {
                        setExtraStaffRequirements([
                            ...(extraStaffRequirements || []),
                            { weeks: [], numberOfStaff: 1, allocatedUsers: [] },
                        ]);
                    }}
                />
            </Flex>
            {extraStaffRequirements && extraStaffRequirements?.length > 0 ? (
                <Grid templateColumns="1fr auto" gap={2}>
                    {extraStaffRequirements.map((requirement, index) => (
                        <Fragment key={index}>
                            <Box>
                                In weeks{" "}
                                <MultiSelect
                                    elements={range(numberOfWeeks).map(
                                        (week) =>
                                            [
                                                week.toString(),
                                                weekNames[week] ||
                                                    `Week [${week}]`,
                                            ] as [string, string]
                                    )}
                                    selectedElements={requirement.weeks.map(
                                        (week) => week.toString()
                                    )}
                                    setSelectedElements={(values) => {
                                        setExtraStaffRequirements(
                                            updateElementAtIndex(
                                                extraStaffRequirements,
                                                index,
                                                {
                                                    numberOfStaff:
                                                        requirement.numberOfStaff,
                                                    weeks: values.map((value) =>
                                                        parseInt(value)
                                                    ),
                                                    allocatedUsers:
                                                        requirement.allocatedUsers,
                                                }
                                            )
                                        );
                                    }}
                                />
                                ,{" "}
                                <SimpleNumberInput
                                    value={requirement.numberOfStaff}
                                    onChange={(numberOfStaff) =>
                                        setExtraStaffRequirements(
                                            updateElementAtIndex(
                                                extraStaffRequirements,
                                                index,
                                                {
                                                    numberOfStaff,
                                                    weeks: requirement.weeks,
                                                    allocatedUsers:
                                                        requirement.allocatedUsers,
                                                }
                                            )
                                        )
                                    }
                                    min={0}
                                    size="xs"
                                    inline
                                />{" "}
                                extra tutors are allocated to this session.
                            </Box>
                            <IconButton
                                colorScheme="red"
                                aria-label={`Remove extra requirement entry ${index}`}
                                icon={<MinusIcon />}
                                size="xs"
                                onClick={() => {
                                    setExtraStaffRequirements(
                                        removeAtIndex(
                                            extraStaffRequirements,
                                            index
                                        )
                                    );
                                }}
                            />
                        </Fragment>
                    ))}
                </Grid>
            ) : (
                <Text>None</Text>
            )}
        </Box>
    );
};
