import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { TimetableSettingsContext } from "../utils/timetable";
import { Form, Formik, FormikErrors } from "formik";
import { FormikNumberInput } from "../components/helpers/FormikNumberInput";
import { IsoDay } from "../../types/date";
import { FormikCheckboxGroup } from "../components/helpers/FormikCheckboxGroup";
import { isoNumberToDay } from "../../utils/date";
import { FormikRadioGroup } from "../components/helpers/FormikRadioGroup";
import { TimetableDisplayMode } from "../types/timetable";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TimetableSettingsModal: React.FC<Props> = ({
    isOpen,
    onClose,
}) => {
    const {
        displayedDays,
        setDisplayedDays,
        dayStartTime,
        setDayStartTime,
        dayEndTime,
        setDayEndTime,
        displayMySessionsOnly,
        setDisplayMySessionsOnly,
    } = useContext(TimetableSettingsContext);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={{
                        displayedDays,
                        dayStartTime,
                        dayEndTime,
                        sessionView: displayMySessionsOnly
                            ? TimetableDisplayMode.ME
                            : TimetableDisplayMode.ALL,
                    }}
                    validate={(values) => {
                        const errors: FormikErrors<typeof values> = {};
                        const { dayStartTime, dayEndTime } = values;
                        if (dayEndTime <= dayStartTime) {
                            errors.dayStartTime =
                                "Start time must be less than end time";
                            errors.dayEndTime =
                                "End time must be greater than start time";
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        setDisplayedDays(
                            values.displayedDays
                                .map(
                                    (value) =>
                                        parseInt(
                                            value as unknown as string
                                        ) as IsoDay
                                )
                                .sort((a, b) => a - b)
                        );
                        setDayStartTime(values.dayStartTime);
                        setDayEndTime(values.dayEndTime);
                        setDisplayMySessionsOnly(
                            values.sessionView === TimetableDisplayMode.ME
                        );
                    }}
                >
                    <Form>
                        <ModalHeader>Change Timetable Settings</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormikNumberInput
                                name="dayStartTime"
                                max={24}
                                min={0}
                            />
                            <FormikNumberInput
                                name="dayEndTime"
                                max={24}
                                min={0}
                            />
                            <FormikCheckboxGroup
                                values={[
                                    IsoDay.MON,
                                    IsoDay.TUE,
                                    IsoDay.WED,
                                    IsoDay.THU,
                                    IsoDay.FRI,
                                    IsoDay.SAT,
                                    IsoDay.SUN,
                                ]}
                                name="displayedDays"
                                transformValue={(value) =>
                                    isoNumberToDay(value)
                                }
                            />
                            <FormikRadioGroup
                                name="sessionView"
                                values={[
                                    TimetableDisplayMode.ME,
                                    TimetableDisplayMode.ALL,
                                ]}
                                transformValue={(value) =>
                                    value === TimetableDisplayMode.ME
                                        ? "View sessions allocated to me only"
                                        : "View all sessions"
                                }
                                stackDirection="column"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                                type="submit"
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};
