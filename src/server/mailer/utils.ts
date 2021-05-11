import { StaffRequest, User } from "../entities";
import { asyncMap } from "../../utils/array";
import format from "string-format";
import { newRequestTemplate } from "./template";
import { capitalCase } from "change-case";
import { isoNumberToDay } from "../../utils/date";

export const newRequestMail: (
    requester: User,
    request: StaffRequest
) => Promise<[string, string[], string]> = async (requester, request) => {
    const swapPreferences = await request.swapPreference;
    const session = await request.session;
    const stream = await session.sessionStream;
    const timetable = await stream.timetable;
    const preferences = await request.swapPreference;
    const term = await timetable.term;
    const subject =
        `[Tutor Timetable] New ${request.type} ${request.swapPreference}` +
        ` ${swapPreferences.length === 0 ? "cover" : "swap"} request from` +
        `${requester.name}`;
    const recipients = await timetable.courseStaffs;
    const recipientEmails = await asyncMap(recipients, async (recipient) => {
        const user = await recipient.user;
        return user.email;
    });
    const content = format(
        newRequestTemplate,
        requester.name,
        swapPreferences.length === 0 ? "cover" : "swap",
        request.title,
        request.description,
        capitalCase(request.type),
        stream.name,
        term.weekNames[session.week],
        `${Math.round(stream.startTime)}:${Math.round(
            (stream.startTime % 1) * 60
        )}`,
        isoNumberToDay(stream.day)
    );
    return [subject, recipientEmails, content];
};
