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
import { SessionType, StreamInput } from "../../generated/graphql";
import { FormikSelect } from "../helpers/FormikSelect";
import { sentenceCase } from "change-case";
import { FormikTimeInput } from "../helpers/FormikTimeInput";
import { IsoDay } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";
import { FormikBaseStaffRequirement } from "./FormikBaseStaffRequirement";
import { FormikExtraStaffRequirement } from "./FormikExtraStaffRequirement";

type Props = {
    isOpen: boolean;
    close: () => void;
    stream: Partial<StreamInput>;
    weekNames: string[];
    numberOfWeeks: number;
    onSave: (newState: Partial<StreamInput>) => any;
};

export const StreamSettingsDrawer: FC<Props> = ({
    isOpen,
    close,
    stream,
    weekNames,
    numberOfWeeks,
    onSave,
}) => {
    return (
        <Drawer isOpen={isOpen} onClose={close} size="md">
            <DrawerOverlay />
            <DrawerContent>
                <Formik<Partial<StreamInput>>
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
                    onSubmit={(value) => {
                        onSave(value);
                        close();
                    }}
                >
                    <Form>
                        <DrawerCloseButton />
                        <DrawerHeader>Edit Session Stream</DrawerHeader>

                        <DrawerBody maxH="85vh" overflow="auto">
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
                                <FormikBaseStaffRequirement
                                    name="baseStaffRequirement"
                                    weekNames={weekNames}
                                    numberOfWeeks={numberOfWeeks}
                                />
                                <FormikExtraStaffRequirement
                                    name="extraStaffRequirement"
                                    weekNames={weekNames}
                                    numberOfWeeks={numberOfWeeks}
                                />
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={close}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Save
                            </Button>
                        </DrawerFooter>
                    </Form>
                </Formik>
            </DrawerContent>
        </Drawer>
    );
};
