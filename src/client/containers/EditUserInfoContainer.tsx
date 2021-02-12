import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { EditUserInfo } from "../components/navbar/EditUserInfo";
import { UserState } from "../types/user";

type Props = {
    user: UserState;
};

export const EditUserInfoContainer: React.FC<Props> = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    return (
        <EditUserInfo
            user={props.user}
            openModal={onOpen}
            closeModal={onClose}
            isOpen={isOpen}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
        />
    );
};
