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
    Radio,
    RadioGroup,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React from "react";
import {
    RequestDuration,
    RequestFormState,
} from "../../hooks/useRequestFormState";

type Props = RequestFormState & {
    courseList: Array<string>;
    sessionList: Array<string>;
    editable?: boolean;
};

export const RequestForm: React.FunctionComponent<Props> = ({
    course,
    setCourse,
    title,
    setTitle,
    description,
    setDescription,
    session,
    setSession,
    preferences,
    updatePreferences,
    duration,
    setDuration,
    courseList,
    sessionList,
    editable = true,
}) => {
    return (
        <FormControl>
            <FormLabel>Request Title:</FormLabel>
            {/* FIXME: First */}
            <Input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <FormHelperText>
                e.g. Looking to switch into P01 from P02
            </FormHelperText>
            {/* FIXME: Second */}
            {/*<br></br>*/}
            <FormLabel mt={3}>Description (optional):</FormLabel>
            <Textarea
                placeholder="Describe your request in more detail here"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            {/* FIXME: Third */}
            <Select
                size="sm"
                placeholder="Select Course"
                onChange={(e) => {
                    setCourse(e.target.value);
                }}
                value={course}
            >
                {courseList.map((course, index) => (
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
                    // FIXME: Fourth
                    // !formData.get(RequestFormOptions.COURSE)
                    !course
                }
                onChange={(e) => {
                    setSession(e.target.value);
                }}
                value={session}
            >
                {sessionList.map((session, index) => (
                    <option value={session} key={index}>
                        {session}
                    </option>
                ))}
            </Select>
            <br></br>
            <Box>
                <FormLabel>Request Duration:</FormLabel>
                <RadioGroup
                    value={duration}
                    onChange={(value) => {
                        setDuration(value as RequestDuration);
                    }}
                >
                    <Stack spacing={5} direction="row">
                        <Radio value="Temporary">Temporary</Radio>
                        <Radio value="Permanent">Permanent</Radio>
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
                    {/* FIXME:  Fourth */}
                    {"   "}
                    {preferences.map((item, index) => (
                        <Box key={index} as={Button}>
                            {item}
                        </Box>
                    ))}
                    <MenuList minWidth="240px">
                        <MenuOptionGroup
                            type="checkbox"
                            onChange={(e) => {
                                updatePreferences(e);
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
