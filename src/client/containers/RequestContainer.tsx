import React from "react";
import { RequestModal } from "../components/requests/RequestModal";
import { Requests } from "../components/requests/Requests";

// Enforce typing later. Also not currently used as login backend is needed.
type Props = {
    userType: string;
};

export const RequestContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    const [modalToggle, setModalToggle] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<string>("");

    const openRequestModal = (type: string) => {
        setModalType(type);
        console.log(modalType);
        setModalToggle(true);
    };
    return (
        <>
            <Requests toggleModal={openRequestModal} />
            <RequestModal
                isOpen={modalToggle}
                toggle={setModalToggle}
                userType={"student"}
                type={modalType}
            />
        </>
    );
};
