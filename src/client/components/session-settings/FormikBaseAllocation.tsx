import { FC, Fragment, useEffect, useState } from "react";
import { useField } from "formik";
import {
    Box,
    Flex,
    FormLabel,
    Grid,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { UserMap } from "../../hooks/useUsersOfCourse";
import { weeksPatternRepr } from "../../utils/session-stream";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { List } from "immutable";
import { defaultStr } from "../../constants";
import { Dropdown } from "../helpers/Dropdown";

type Props = {
    name: string;
    weekNames: string[];
    users: UserMap;
};

export const FormikBaseAllocation: FC<Props> = ({ name, weekNames, users }) => {
    const [
        ,
        { value: baseAllocatedUsers },
        { setValue: setBaseAllocatedUsers },
    ] = useField<string[] | undefined>(`${name}.allocatedUsers`);
    const [, { value: baseWeeks }] = useField<number[] | undefined>(
        `${name}.weeks`
    );
    const [allocatedUsersWithEmpty, setAllocatedUsersWithEmpty] = useState(
        List<string>(baseAllocatedUsers || [])
    );
    useEffect(() => {
        setBaseAllocatedUsers(
            allocatedUsersWithEmpty
                .filter((elem) => elem !== defaultStr)
                .toArray()
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allocatedUsersWithEmpty]);
    return (
        <Box>
            <Flex>
                <FormLabel>
                    Base Weeks ({weeksPatternRepr(weekNames, baseWeeks || [])}
                    ):
                </FormLabel>
                <Spacer />
                <IconButton
                    colorScheme="green"
                    aria-label="Add allocated user"
                    icon={<AddIcon />}
                    size="xs"
                    onClick={() => {
                        setAllocatedUsersWithEmpty((prev) =>
                            prev.push(defaultStr)
                        );
                    }}
                />
            </Flex>
            <Grid
                templateColumns="1fr 4fr auto"
                columnGap={5}
                rowGap={2}
                alignItems="center"
            >
                {allocatedUsersWithEmpty.map((userId, index) => (
                    <Fragment key={index}>
                        <Text>#{index}</Text>
                        <Dropdown
                            onChange={(e) =>
                                setAllocatedUsersWithEmpty((prev) =>
                                    prev.set(index, e.target.value)
                                )
                            }
                            value={allocatedUsersWithEmpty.get(index)}
                            options={users.map((value) => value.name)}
                            size="sm"
                        />
                        <IconButton
                            colorScheme="red"
                            aria-label={`Remove extra requirement entry ${index}`}
                            icon={<MinusIcon />}
                            size="xs"
                            onClick={() => {
                                setAllocatedUsersWithEmpty((prev) =>
                                    prev.remove(index)
                                );
                            }}
                        />
                    </Fragment>
                ))}
            </Grid>
        </Box>
    );
};
