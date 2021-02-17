import { createStandaloneToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { EditUserDetailsModal } from "../../components/navbar/EditUserDetailsModal";
import { EditUserForm } from "../../components/navbar/EditUserForm";
import { useUpdateDetailsMutation } from "../../generated/graphql";
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
    const toast = createStandaloneToast();

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    const [submit, { loading }] = useUpdateDetailsMutation({
        variables: { details: { name: name, email: email } },
        errorPolicy: "all",
    });

    useEffect(() => {
        setName(props.user.name);
        setEmail(props.user.email);
    }, [props.user.email, props.user.name]);

    const handleOnClose = () => {
        setName(props.user.name);
        setEmail(props.user.email);
        props.closeModal();
    };

    const handleSubmit = async () => {
        const result = await submit();
        if (!result.errors) {
            toast({
                title: "User Details",
                description: "Your details have been successfully updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else if (result.errors) {
            if (result.errors[0].message === "Argument Validation Error") {
                toast({
                    title: "An error occurred",
                    description: "Email is invalid",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
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
                    submit={handleSubmit}
                    loading={loading}
                    user={props.user}
                />
            )}
        />
    );
};
