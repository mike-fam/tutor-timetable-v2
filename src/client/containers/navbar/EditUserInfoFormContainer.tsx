import React from "react";
import { EditUserInfoForm } from "../../components/navbar/EditUserInfoForm";

type Props = {};

export const EditUserInfoFormContainer: React.FC<Props> = (props: Props) => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    return (
        <>
            <EditUserInfoForm
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
            />
        </>
    );
};
