import React, { FC, useMemo } from "react";
import {
    ClickableSession,
    Props as ClickableSessionProps,
} from "../timetable/ClickableSession";
import { PopoverSession } from "../timetable/PopoverSession";
import { TimetableStreamPopover } from "../timetable/TimetableStreamPopover";
import { BoxProps } from "@chakra-ui/react";

export type SessionSettingsStyleProps = Omit<BoxProps, "onClick" | "_hover" | "id">;

export type StreamSettingsCustomSessionProps = {
    courseCode: string;
    baseAllocation: [number[], string[]];
    customAllocation: Array<[number[], string[]]>;
    weekNames: string[];
    location: string;
    styles: SessionSettingsStyleProps
};

type Props = ClickableSessionProps<StreamSettingsCustomSessionProps>;

export const SessionSettingsTimetableStream: FC<Props> = (props) => {
    const { custom, sessionId, name } = props;
    const {
        customAllocation,
        location,
        courseCode,
        weekNames,
        baseAllocation,
        styles,
    } = useMemo(() => custom(sessionId), [custom, sessionId]);
    return (
        <PopoverSession
            sessionComponent={
                <ClickableSession {...props} {...styles} p={1}>
                    {name}
                </ClickableSession>
            }
            popoverContent={
                <TimetableStreamPopover
                    name={name}
                    courseCode={courseCode}
                    baseAllocation={baseAllocation}
                    customAllocation={customAllocation}
                    weekNames={weekNames}
                    location={location}
                />
            }
        />
    );
};
