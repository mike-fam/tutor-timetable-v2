import React, { FC } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Stack,
} from "@chakra-ui/react";
import { Form, Formik, FormikErrors } from "formik";
import { FormikInput } from "../helpers/FormikInput";
import { SessionType, UpdateStreamInput } from "../../generated/graphql";
import { FormikSelect } from "../helpers/FormikSelect";
import { sentenceCase } from "change-case";
import { FormikTimeInput } from "../helpers/FormikTimeInput";
import { IsoDay } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";

type UpdateStreamInputNoId = Omit<UpdateStreamInput, "streamId">;

type Props = {
    isOpen: boolean;
    close: () => void;
    stream: Partial<UpdateStreamInputNoId>;
};

export const StreamDrawer: FC<Props> = ({ isOpen, close, stream }) => {
    console.log(stream);
    return (
        <Drawer isOpen={isOpen} onClose={close} size="sm">
            <DrawerOverlay />
            <DrawerContent>
                <Formik<Partial<UpdateStreamInputNoId>>
                    initialValues={stream}
                    validate={(values) => {
                        const errors: FormikErrors<typeof values> = {};
                        const { startTime, endTime } = values;
                        if (startTime && endTime) {
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
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <Form>
                        <DrawerCloseButton />
                        <DrawerHeader>Edit Session Stream</DrawerHeader>

                        <DrawerBody>
                            <Stack spacing={4}>
                                <FormikInput
                                    name="name"
                                    placeholder={
                                        stream.name || "Multiple Selected"
                                    }
                                    isDisabled={!stream.name}
                                />
                                <FormikSelect
                                    name="type"
                                    options={[
                                        SessionType.Practical,
                                        SessionType.Tutorial,
                                        SessionType.Lecture,
                                        SessionType.Seminar,
                                        SessionType.Studio,
                                        SessionType.Workshop,
                                        SessionType.Contact,
                                    ]}
                                    optionToText={(val) =>
                                        sentenceCase(val as string)
                                    }
                                    isDisabled={!stream.type}
                                    placeholder={
                                        stream.type || "Multiple Selected"
                                    }
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
                                    isDisabled={!stream.day}
                                    placeholder={
                                        stream.day === undefined
                                            ? "Multiple Selected"
                                            : ""
                                    }
                                />
                                <FormikTimeInput
                                    name="startTime"
                                    placeholder={
                                        stream.startTime === undefined
                                            ? "Multiple Selected"
                                            : ""
                                    }
                                    isDisabled={!stream.startTime}
                                />
                                <FormikTimeInput
                                    name="endTime"
                                    placeholder={
                                        stream.endTime === undefined
                                            ? "Multiple Selected"
                                            : ""
                                    }
                                    isDisabled={!stream.endTime}
                                />
                                <FormikInput
                                    name="location"
                                    placeholder={
                                        stream.endTime === undefined
                                            ? "Multiple Selected"
                                            : ""
                                    }
                                />
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={close}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue">Save</Button>
                        </DrawerFooter>
                    </Form>
                </Formik>
            </DrawerContent>
        </Drawer>
    );
};
