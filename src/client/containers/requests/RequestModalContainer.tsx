import React from "react";
import { FormType } from "../../../types/request";
import { Role } from "../../../types/user";
import {
    RequestModal,
    RequestModalType,
} from "../../components/requests/RequestModal";

type Props = {
    isOpen: boolean;
    toggle: (toggle: boolean) => void;
    type: RequestModalType;
    userType: Role;
};

export const RequestModalContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    const [createRequestFormData, setCreateRequestFormData] = React.useState<
        Map<string, string | Array<string>>
    >();

    const updateFormData = (key: string, value: string, type: FormType) => {
        if (type === FormType.CREATE) {
            const temp = createRequestFormData;
        }
    };

    // Handles creating new requests
    const submitRequestForm = () => {};

    //Handles applying for requests
    const submitApplyForm = () => {};

    return <RequestModal {...props} />;
};
