import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    ModalFooter,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React from "react";
import { RequestFormOptions } from "../../../types/request";
import { Map as ImmutableMap } from "immutable";

type Props = {
    updateForm: (key: RequestFormOptions, value: string) => void;
    updateSessions: (item: Array<string> | string) => void;
    formData: ImmutableMap<RequestFormOptions, string>;
    sessionPrefs: Array<string>;
    courseList: Array<string>;
    sessionList: Array<string>;
};

export const CreateRequestForm: React.FunctionComponent<Props> = (
    props: Props
) => {
    return (
        <FormControl>
            <FormLabel>Request Title:</FormLabel>
            <Input />
            <FormHelperText>
                e.g. Looking to switch into P01 from P02
            </FormHelperText>
            <br></br>
            <FormLabel>Description (optional):</FormLabel>
            <Textarea placeholder="Describe your request in more detail here" />
            <br></br>
            <br></br>
            <Select
                size="sm"
                placeholder="Select Course"
                onChange={(e) => {
                    props.updateForm(RequestFormOptions.COURSE, e.target.value);
                }}
                value={props.formData.get(RequestFormOptions.COURSE)}
            >
                {props.courseList.map((course, index) => (
                    <option value={course} key={index}>
                        {course}
                    </option>
                ))}
            </Select>
            <br></br>
            <Select
                size="sm"
                placeholder="Select session to switch out of"
                isDisabled={
                    props.formData.get(RequestFormOptions.COURSE) ? false : true
                }
                onChange={(e) => {
                    props.updateForm(
                        RequestFormOptions.SESSION,
                        e.target.value
                    );
                }}
            >
                {props.sessionList.map((session, index) => (
                    <option value={session} key={index}>
                        {session}
                    </option>
                ))}
            </Select>
            <br></br>
            <Box>
                <FormLabel>Request Duration:</FormLabel>
                <RadioGroup defaultValue="1">
                    <Stack spacing={5} direction="row">
                        <Radio value="1">Temporary</Radio>
                        <Radio value="2">Permanent</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <FormHelperText>
                Note: Temporary requests last for one week.
            </FormHelperText>
            <br></br>
            <Box>
                <FormLabel>Swap Preferences:</FormLabel>

                <Menu closeOnSelect={false}>
                    <MenuButton as={Button}>
                        <AddIcon />
                    </MenuButton>
                    {"   "}
                    {props.sessionPrefs.map((item, index) => (
                        <Box key={index} as={Button}>
                            {item}
                        </Box>
                    ))}
                    <MenuList minWidth="240px">
                        <MenuOptionGroup
                            type="checkbox"
                            onChange={(e) => {
                                props.updateSessions(e);
                            }}
                        >
                            <MenuItemOption value="session 1">
                                session 1
                            </MenuItemOption>
                            <MenuItemOption value="session 2">
                                session 2
                            </MenuItemOption>
                            <MenuItemOption value="session 3">
                                session 3
                            </MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
                <FormHelperText>
                    You can select 0, 1 or many preferences.
                </FormHelperText>
            </Box>
        </FormControl>
    );
};
