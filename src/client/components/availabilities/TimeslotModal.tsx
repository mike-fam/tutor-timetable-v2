import React, { useMemo } from "react";
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import { ModifyTimeslotParams } from "../../types/availability";
import { Form, Formik, FormikErrors } from "formik";
import { IsoDay } from "../../../types/date";
import { TimeslotInput } from "../../generated/graphql";
import { FormikSelect } from "../helpers/FormikSelect";
import { isoNumberToDay } from "../../../utils/date";
import { FormikTimeInput } from "../helpers/FormikTimeInput";

type Props = {
    isOpen: boolean;
    close: () => void;
    timeslot?: TimeslotInput;
    updateTimeslot: (
        timeslotId: string,
        newTimeslotProps: ModifyTimeslotParams
    ) => void;
};

export const TimeslotModal: React.FC<Props> = ({
    isOpen,
    close,
    timeslot,
    updateTimeslot,
}) => {
    const formState = useMemo(() => {
        if (!timeslot) {
            return {
                id: "",
                startTime: 0,
                endTime: 24,
                day: IsoDay.MON,
            };
        }
        return {
            id: timeslot.id,
            startTime: timeslot.startTime,
            endTime: timeslot.endTime,
            day: timeslot.day,
        };
    }, [timeslot]);
    return (
        <Modal isOpen={isOpen} onClose={close} isCentered>
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={formState}
                    onSubmit={(values) => {
                        updateTimeslot(values.id, {
                            startTime: values.startTime,
                            endTime: values.endTime,
                            day: Number(values.day),
                        });
                        close();
                    }}
                    validate={(values) => {
                        const errors: FormikErrors<typeof values> = {};
                        const { startTime, endTime } = values;
                        if (endTime <= startTime) {
                            const message =
                                "Start time must be before end time";
                            errors.startTime = message;
                            errors.endTime = message;
                        } else if (endTime - startTime < 0.25) {
                            const message =
                                "Start time and end time must be at least 15 minutes apart";
                            errors.startTime = message;
                            errors.endTime = message;
                        }
                        return errors;
                    }}
                >
                    <Form>
                        <ModalHeader>Update Availability</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={3}>
                                <FormikTimeInput
                                    name="startTime"
                                    id="startTimeAvailModal"
                                />
                                <FormikTimeInput
                                    name="endTime"
                                    id="endTimeAvailModal"
                                />
                                <FormikSelect
                                    name="day"
                                    options={[
                                        IsoDay.MON,
                                        IsoDay.TUE,
                                        IsoDay.WED,
                                        IsoDay.THU,
                                        IsoDay.FRI,
                                        IsoDay.SAT,
                                        IsoDay.SUN,
                                    ]}
                                    optionToText={(val) =>
                                        isoNumberToDay(val as IsoDay)
                                    }
                                    id="dayAvailModal"
                                />
                            </Stack>
                        </ModalBody>
                        <Divider py={3} />
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Save
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    close();
                                }}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};
