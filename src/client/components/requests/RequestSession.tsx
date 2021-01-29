import React, { Dispatch, SetStateAction } from "react";
import { Props as SessionProps, Session } from "../timetable/Session";
import { Set } from "immutable";
import { SessionTheme } from "../../types/timetable";

type Props = SessionProps & {
    chooseSessions: Dispatch<SetStateAction<Set<number>>>;
    chosenSessions: Set<number>;
    theme: SessionTheme;
};

export const RequestSession: React.FC<Props> = ({ ...props }) => {
    return <Session {...props}></Session>;
};
