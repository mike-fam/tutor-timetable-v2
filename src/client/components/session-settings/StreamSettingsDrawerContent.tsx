import React from "react";
import { Stack } from "@chakra-ui/react";
import { FormikInput } from "../helpers/formik/FormikInput";
import { FormikSelect } from "../helpers/formik/FormikSelect";
import { SessionType, StreamInput } from "../../generated/graphql";
import { sentenceCase } from "change-case";
import { IsoDay } from "../../../types/date";
import { isoNumberToDay } from "../../../utils/date";
import { FormikTimeInput } from "../helpers/formik/FormikTimeInput";
import { FormikBaseStaffRequirement } from "./FormikBaseStaffRequirement";
import { FormikExtraStaffRequirement } from "./FormikExtraStaffRequirement";

type Props = {
    stream: Partial<StreamInput>;
    weekNames: string[];
    numberOfWeeks: number;
};

export const StreamSettingsDrawerContent: React.FC<Props> = ({
    stream,
    weekNames,
    numberOfWeeks,
}) => {
    return (
        <Stack spacing={4}>
            <FormikInput
                name="name"
                placeholder={stream.name || "Multiple Selected"}
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
                optionToText={(val) => sentenceCase(val as string)}
                isDisabled={!stream.type}
                placeholder={stream.type || "Multiple Selected"}
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
                optionToText={(val) => isoNumberToDay(val as IsoDay)}
                isDisabled={!stream.day}
                placeholder={
                    stream.day === undefined ? "Multiple Selected" : ""
                }
            />
            <FormikTimeInput
                name="startTime"
                placeholder={
                    stream.startTime === undefined ? "Multiple Selected" : ""
                }
                isDisabled={!stream.startTime}
            />
            <FormikTimeInput
                name="endTime"
                placeholder={
                    stream.endTime === undefined ? "Multiple Selected" : ""
                }
                isDisabled={!stream.endTime}
            />
            <FormikInput name="location" placeholder="Set Session Location" />
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
    );
};
