import { Button, Divider, FormControl, FormHelperText } from "@chakra-ui/react";
import React from "react";
import { formType } from "../../containers/navbar/EditUserDetailsModalContainer";
import { InputWithError } from "../helpers/InputWithError";
import { Loadable } from "../helpers/Loadable";

type Props = {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    submit: (type: formType) => void;
    nameLoading: boolean;
    emailLoading: boolean;
};

export const EditUserForm: React.FC<Props> = (props: Props) => {
    return (
        <FormControl>
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
            <Loadable isLoading={props.nameLoading}>
                <Button
                    mt={3}
                    onClick={() => props.submit(formType.NAME)}
                    disabled={
                        props.name.length === 0 || props.name.trim() === ""
                    }
                >
                    Update Name
                </Button>
            </Loadable>
            <Divider mt={3} mb={3}></Divider>
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
                If input is not an email, you will get an error.
            </FormHelperText>
            <Loadable isLoading={props.emailLoading}>
                <Button
                    mt={3}
                    onClick={() => props.submit(formType.EMAIL)}
                    disabled={
                        props.email.length === 0 || props.email.trim() === ""
                    }
                >
                    Update Email
                </Button>
            </Loadable>
        </FormControl>
    );
};
