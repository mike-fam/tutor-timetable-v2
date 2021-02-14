import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import React from "react";
import { UserState } from "../../types/user";
import { InputWithError } from "../helpers/InputWithError";
import { Loadable } from "../helpers/Loadable";

type Props = {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    submit: () => void;
    loading: boolean;
    user: UserState;
};

export const EditUserForm: React.FC<Props> = (props: Props) => {
    return (
        <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input disabled={true} defaultValue={props.user.username} />
            <InputWithError
                label="Edit Your name"
                validate={(value) =>
                    value.length === 0 ? "Name cannot be empty" : ""
                }
                value={props.name}
                onChange={(e) => {
                    props.setName(e.target.value);
                }}
            />
            <InputWithError
                label="Edit Your email"
                validate={(value) =>
                    value.length === 0 ? "Email cannot be empty" : ""
                }
                value={props.email}
                onChange={(e) => {
                    props.setEmail(e.target.value);
                }}
            />
            <FormHelperText>
                If input is not in email format, you will get an error.
            </FormHelperText>
            <Loadable isLoading={props.loading}>
                <Button
                    mt={3}
                    onClick={() => props.submit()}
                    disabled={
                        (props.email.length === 0 ||
                            props.email.trim() === "") &&
                        (props.name.length === 0 || props.name.trim() === "")
                    }
                >
                    Submit
                </Button>
            </Loadable>
        </FormControl>
    );
};
