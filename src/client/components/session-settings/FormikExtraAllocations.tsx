import React, { Fragment } from "react";
import { UserMap } from "../../hooks/useUsersOfCourse";
import { v4 as uuid } from "uuid";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { FieldArray, useField } from "formik";
import { StreamStaffRequirement } from "../../generated/graphql";
import { weeksPatternRepr } from "../../utils/session-stream";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FormikSelect } from "../helpers/FormikSelect";

type Props = {
    name: string;
    weekNames: string[];
    users: UserMap;
};

export const FormikExtraAllocations: React.FC<Props> = ({
    name,
    weekNames,
    users,
}) => {
    const [, { value: extraStaffRequirements }] = useField<
        StreamStaffRequirement[] | undefined
    >(name);
    return (
        <FormControl id={uuid()}>
            <FormLabel>Extra Allocations:</FormLabel>
            <Stack spacing={5}>
                {(extraStaffRequirements || []).map(
                    (requirement, requirementIndex) => (
                        <FieldArray
                            name={`${name}.${requirementIndex}.allocatedUsers`}
                            key={requirementIndex}
                            render={({ push, remove }) => (
                                <Box>
                                    <Flex mb={2}>
                                        <Box>
                                            {weeksPatternRepr(
                                                weekNames,
                                                requirement.weeks
                                            )}
                                        </Box>
                                        <Spacer />
                                        <IconButton
                                            colorScheme="green"
                                            aria-label="Add extra allocated user"
                                            icon={<AddIcon />}
                                            size="xs"
                                            onClick={() => push("")}
                                        />
                                    </Flex>
                                    <Grid
                                        templateColumns="1fr 4fr auto"
                                        columnGap={5}
                                        rowGap={2}
                                        alignItems="center"
                                    >
                                        {requirement.allocatedUsers.map(
                                            (user, userIndex) => (
                                                <Fragment key={userIndex}>
                                                    <Text>#{userIndex}</Text>
                                                    <FormikSelect
                                                        name={`${name}.${requirementIndex}.allocatedUsers.${userIndex}`}
                                                        options={users
                                                            .keySeq()
                                                            .toArray()}
                                                        optionToText={(
                                                            userId
                                                        ) =>
                                                            users.get(
                                                                userId as string
                                                            )!.name
                                                        }
                                                        size="sm"
                                                        renderLabel={false}
                                                        sorted
                                                    />
                                                    <IconButton
                                                        colorScheme="red"
                                                        aria-label={`Remove extra requirement entry ${userIndex}`}
                                                        icon={<MinusIcon />}
                                                        size="xs"
                                                        onClick={() =>
                                                            remove(userIndex)
                                                        }
                                                    />
                                                </Fragment>
                                            )
                                        )}
                                    </Grid>
                                </Box>
                            )}
                        />
                    )
                )}
            </Stack>{" "}
        </FormControl>
    );
};
