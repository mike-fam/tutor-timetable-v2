import React from "react";
import { StepModal } from "../../components/helpers/StepModal";
import { StepModalStep } from "../../components/helpers/StepModalStep";
import { ViewRequestContainer } from "./ViewRequestContainer";

type Props = {
    requestId: number;
    isOpen: boolean;
    onClose: () => void;
};
export const OfferRequestModalContainer: React.FunctionComponent<Props> = ({
    isOpen,
    onClose,
}) => {
    // TODO: Replace this with actual data from server
    // const formState = useRequestFormState({
    //     title: "Test",
    //     description: "Test",
    //     course: 1,
    //     session: 1,
    //     preferences: Set([1, 2, 3]),
    //     duration: RequestType.Temporary,
    // });
    return (
        <StepModal
            stepCount={2}
            onSubmit={() => {}}
            isSubmitting={false}
            validateStep={() => true}
            isOpen={isOpen}
            onClose={onClose}
            size="6xl"
        >
            <StepModalStep step={0} header="Request Information">
                <ViewRequestContainer requestId={53} />
            </StepModalStep>
            <StepModalStep step={1} header="Make an offer">
                Test
            </StepModalStep>
        </StepModal>
    );
};
