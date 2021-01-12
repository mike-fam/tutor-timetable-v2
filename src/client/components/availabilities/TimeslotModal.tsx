import React, { useCallback, useMemo } from "react";
import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from "@chakra-ui/react";
import {
    AvailabilityTimeslotType,
    ModifyTimeslotParams,
} from "../../types/availability";
import { Field, FieldProps, Form, Formik } from "formik";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { IsoDay } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";

type Props = {
    isOpen: boolean;
    close: () => void;
    timeslot?: AvailabilityTimeslotType;
    updateTimeslot: (
        timeslotId: number,
        newTimeslotProps: ModifyTimeslotParams
    ) => void;
};

export const TimeslotModal: React.FC<Props> = ({
    isOpen,
    close,
    timeslot,
    updateTimeslot,
}) => {
    const timeToString = useCallback((time: number) => {
        const mins = Math.round((time % 1) * 60);
        const hours = Math.floor(time);
        return format(new Date(0, 0, 0, hours, mins), "HH:mm");
    }, []);

    const stringToTime = useCallback((formatString: string) => {
        const startDate = parse(formatString, "HH:mm", new Date());
        return startDate.getHours() + startDate.getMinutes() / 60;
    }, []);

    const formState = useMemo(() => {
        if (!timeslot) {
            return {
                id: 0,
                startTime: "0",
                endTime: "24",
                day: IsoDay.MON,
            };
        }
        const startTime = timeToString(timeslot.startTime);
        const endTime = timeToString(timeslot.endTime);
        return {
            id: timeslot.id,
            startTime,
            endTime,
            day: timeslot.day,
        };
    }, [timeslot, timeToString]);
    return (
        <Modal isOpen={isOpen} onClose={close} isCentered>
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={formState}
                    onSubmit={(values) => {
                        const startTime = stringToTime(values.startTime);
                        const endTime = stringToTime(values.endTime);
                        console.log(typeof values.day);
                        updateTimeslot(values.id, {
                            startTime,
                            endTime,
                            day: parseInt((values.day as unknown) as string),
                        });
                        close();
                    }}
                >
                    <Form>
                        <ModalHeader>Update Availability</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Field name="startTime">
                                {({ field }: FieldProps) => (
                                    <FormControl id="startTimeAvailModal">
                                        <FormLabel>Start time</FormLabel>
                                        <Input {...field} type="time" />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="endTime">
                                {({ field }: FieldProps) => (
                                    <FormControl id="endTimeAvailModal" pt={3}>
                                        <FormLabel>End time</FormLabel>
                                        <Input {...field} type="time" />
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="day">
                                {({ field }: FieldProps) => (
                                    <FormControl id="dayAvailModal" pt={3}>
                                        <FormLabel>Day</FormLabel>
                                        <Select {...field} type="number">
                                            {[
                                                IsoDay.MON,
                                                IsoDay.TUE,
                                                IsoDay.WED,
                                                IsoDay.THU,
                                                IsoDay.FRI,
                                                IsoDay.SAT,
                                                IsoDay.SUN,
                                            ].map((day) => (
                                                <option value={day} key={day}>
                                                    {isoNumberToDay(day)}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
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
