import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import React from "react";

export const CreateRequestForm: React.FunctionComponent = () => {
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
            <FormLabel>Select Sessions:</FormLabel>
            <HStack>
                <Select size="sm" placeholder="Session to switch out of">
                    <option>session 01</option>
                    <option>session 02</option>
                    <option>session 03</option>
                </Select>
                <ArrowForwardIcon />
                <Select size="sm" placeholder="Session to switch into">
                    <option>session 01</option>
                    <option>session 02</option>
                    <option>session 03</option>
                </Select>
            </HStack>
            <br></br>
            <HStack>
                <Box>
                    <FormLabel>Request Duration:</FormLabel>
                    <RadioGroup defaultValue="1">
                        <Stack spacing={5} direction="row">
                            <Radio value="1">Temporary</Radio>
                            <Radio value="2">Permanent</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Center height="50px">
                    <Divider orientation="vertical" color={"red"} />
                </Center>
                <Box>
                    <FormLabel>Request Type:</FormLabel>
                    <RadioGroup defaultValue="1">
                        <Stack spacing={5} direction="row">
                            <Radio value="1">Cover</Radio>
                            <Radio value="2">Swap</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </HStack>
        </FormControl>
    );
};
