import React from "react";
import { EditUserDetailsModal } from "../../components/navbar/EditUserDetailsModal";
import { EditUserForm } from "../../components/navbar/EditUserForm";
import {
    useUpdateEmailMutation,
    useUpdateNameMutation,
} from "../../generated/graphql";
import { useMutationWithError } from "../../hooks/useQueryWithError";
import { UserState } from "../../types/user";

type Props = {
    user: UserState;
    openModal: () => void;
    closeModal: () => void;
    isOpen: boolean;
};

export enum formType {
    NAME = "Name",
    EMAIL = "Email",
}

export const EditUserDetailsModalContainer: React.FC<Props> = (
    props: Props
) => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    const [
        submitName,
        { loading: nameLoading },
    ] = useMutationWithError(useUpdateNameMutation, { newName: name });
    const [
        submitEmail,
        { loading: emailLoading },
    ] = useMutationWithError(useUpdateEmailMutation, { newEmail: email });

    const handleSubmit = async (type: formType) => {
        if (type === formType.NAME) {
            await submitName();
        } else if (type === formType.EMAIL) {
            await submitEmail();
        }
    };

    return (
        <EditUserDetailsModal
            {...props}
            modalBody={() => (
                <EditUserForm
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    submit={handleSubmit}
                    nameLoading={nameLoading}
                    emailLoading={emailLoading}
                />
            )}
        />
    );
};
