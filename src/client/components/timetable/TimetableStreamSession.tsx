import { FC, useMemo } from "react";
import { Props as SessionProps, Session } from "./Session";
import { PopoverSession } from "./PopoverSession";
import { SessionTheme } from "../../types/session";
import { TimetableStreamPopover } from "./TimetableStreamPopover";

// weeks[], allocatedTutors[]
export type StreamCustomSessionProps = {
    courseCode: string;
    baseAllocation: [number[], string[], number];
    customAllocation: Array<[number[], string[], number]>;
    weekNames: string[];
    location: string;
    theme?: SessionTheme;
};

type Props = SessionProps<StreamCustomSessionProps>;

export const TimetableStreamSession: FC<Props> = ({ ...props }) => {
    const { custom, sessionId, name } = props;
    const {
        customAllocation,
        location,
        courseCode,
        weekNames,
        baseAllocation,
    } = useMemo(() => custom(sessionId), [custom, sessionId]);
    return (
        <PopoverSession
            sessionComponent={
                <Session {...props} p={1}>
                    {name}
                </Session>
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
