import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { UserContext } from "../../utils/user";
import { InputWithError } from "../helpers/InputWithError";

type Props = {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
};

export const EditUserForm: FC<Props> = (props: Props) => {
    const { user } = useContext(UserContext);

    return (
        <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input disabled={true} defaultValue={user.username} />
            <FormHelperText>You cannot change your UQ username.</FormHelperText>
            <InputWithError
                label="Name"
                validate={(value) =>
                    value.length === 0 ? "Name cannot be empty" : ""
                }
                value={props.name}
                onChange={(e) => {
                    props.setName(e.target.value);
                }}
            />
            <InputWithError
                label="Email"
                validate={(value) =>
                    value.length === 0 ? "Email cannot be empty" : ""
                }
                value={props.email}
                onChange={(e) => {
                    props.setEmail(e.target.value);
                }}
            />
            <FormHelperText>
                You may need to refresh the page to see changes.
            </FormHelperText>
        </FormControl>
    );
};
