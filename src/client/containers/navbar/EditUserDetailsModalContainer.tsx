import React from "react";
import { EditUserDetailsModal } from "../../components/navbar/EditUserDetailsModal";
import { EditUserForm } from "../../components/navbar/EditUserForm";
import { useUpdateDetailsMutation } from "../../generated/graphql";
import { useMutationWithError } from "../../hooks/useQueryWithError";
import { UserState } from "../../types/user";

type Props = {
    user: UserState;
    openModal: () => void;
    closeModal: () => void;
    isOpen: boolean;
};

export const EditUserDetailsModalContainer: React.FC<Props> = (
    props: Props
) => {
    const [name, setName] = React.useState<string>(props.user.name);
    const [email, setEmail] = React.useState<string>(props.user.email);

    const [submit, { loading }] = useMutationWithError(
        useUpdateDetailsMutation,
        { details: { name: name, email: email } }
    );

    const handleOnClose = () => {
        setName(props.user.name);
        setEmail(props.user.email);
        props.closeModal();
    };

    return (
        <EditUserDetailsModal
            {...props}
            closeModal={handleOnClose}
            modalBody={() => (
                <EditUserForm
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    submit={submit}
                    loading={loading}
                    user={props.user}
                />
            )}
        />
    );
};
