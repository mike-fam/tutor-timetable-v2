import { Button, createStandaloneToast } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { EditUserDetailsModal } from "../../components/navbar/EditUserDetailsModal";
import { EditUserForm } from "../../components/navbar/EditUserForm";
import { useUpdateDetailsMutation } from "../../generated/graphql";
import { UserContext } from "../../utils/user";

type Props = {
    openModal: () => void;
    closeModal: () => void;
    isOpen: boolean;
};

export const EditUserDetailsModalContainer: React.FC<Props> = (
    props: Props
) => {
    const toast = createStandaloneToast();
    const { user } = useContext(UserContext);

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    const [submit, { loading, data }] = useUpdateDetailsMutation({
        variables: { details: { name: name, email: email } },
        errorPolicy: "all",
    });

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
    }, [user.email, user.name]);

    const handleOnClose = () => {
        if (data) {
            setName(data.updateDetails.name);
            setEmail(data.updateDetails.email);
        } else {
            setName(user.name);
            setEmail(user.email);
        }

        props.closeModal();
    };

    const handleSubmit = async () => {
        const result = await submit();
        if (!result.errors && result.data) {
            toast({
                title: "User Details",
                description: "Your details have been successfully updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setName(result.data.updateDetails.name);
            setEmail(result.data.updateDetails.email);
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
                />
            )}
            submitButton={() => (
                <Button
                    onClick={() => handleSubmit()}
                    disabled={
                        email.length === 0 ||
                        email.trim() === "" ||
                        name.length === 0 ||
                        name.trim() === ""
                    }
                    isLoading={loading}
                    loadingText="Submitting..."
                    colorScheme="blue"
                >
                    Submit
                </Button>
            )}
        />
    );
};
