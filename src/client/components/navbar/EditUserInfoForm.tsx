import { FormControl, Input } from "@chakra-ui/react";
import React from "react";

type Props = {
    name: string;
    email: string;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
};

export const EditUserInfoForm: React.FC<Props> = (props: Props) => {
    return (
        <>
            <FormControl>
                <Input />
            </FormControl>
        </>
    );
};
