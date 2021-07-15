import React, { FC, useMemo } from "react";
import { ClickableSession, Props as ClickableSessionProps } from "../timetable/ClickableSession";
import { SessionTheme } from "../../types/session";
import { PopoverSession } from "../timetable/PopoverSession";
import { TimetableStreamPopover } from "../timetable/TimetableStreamPopover";

type StreamSettingsCustomSessionProps = {
    courseCode: string;
    baseAllocation: [number[], string[]];
    customAllocation: Array<[number[], string[]]>;
    weekNames: string[];
    location: string;
    theme?: SessionTheme;
};

type Props = ClickableSessionProps<StreamSettingsCustomSessionProps>;

export const SessionSettingsTimetableStream: FC<Props> = (props) => {
    const { custom, id, name } = props;
    const {
        customAllocation,
        location,
        courseCode,
        weekNames,
        baseAllocation,
    } = useMemo(() => custom(id), [custom, id]);
    return (
        <PopoverSession
            sessionComponent={
                <ClickableSession {...props} p={1}>
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
