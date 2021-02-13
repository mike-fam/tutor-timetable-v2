import { RequestFilterFunction, RequestResponse } from "../types/requests";
import { RequestStatus, RequestType } from "../generated/graphql";
import { Set } from "immutable";

export const requestCourseFilter: RequestFilterFunction<Set<number>> = (
    request: RequestResponse,
    courseIds: Set<number>
) => {
    return courseIds.includes(
        request.session.sessionStream.timetable.course.id
    );
};

export const requestTypeFilter: RequestFilterFunction<Set<RequestType>> = (
    request: RequestResponse,
    types: Set<RequestType>
) => {
    return types.includes(request.type);
};

export const requestStatusFilter: RequestFilterFunction<Set<RequestStatus>> = (
    request: RequestResponse,
    statuses: Set<RequestStatus>
) => {
    return statuses.includes(request.status);
};
