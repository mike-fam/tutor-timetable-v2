import { StaffRequest, Timetable } from "../entities";
import { RequestType } from "../types/request";
import { FreezeState } from "../types/timetable";

const checkFreezeState = (
    request: StaffRequest,
    timetable: Timetable,
    freeState: FreezeState,
    reversed = false
): boolean => {
    if (request.type === RequestType.PERMANENT) {
        return timetable.permanentRequestLock === freeState && !reversed;
    } else if (request.type === RequestType.TEMPORARY) {
        return timetable.temporaryRequestLock === freeState && !reversed;
    }
    return false; // Needed for compiler
};

export const canAcceptOffer = (
    request: StaffRequest,
    timetable: Timetable
): boolean => {
    return checkFreezeState(request, timetable, FreezeState.FREE);
};

export const canMarkOfferAwaitingForApproval = (
    request: StaffRequest,
    timetable: Timetable
): boolean => {
    return checkFreezeState(request, timetable, FreezeState.APPROVAL_REQUIRED);
};

export const canMakeNewOffer = (
    request: StaffRequest,
    timetable: Timetable
): boolean => {
    return checkFreezeState(request, timetable, FreezeState.LOCK, true);
};

export const canRequestForApproval = (
    request: StaffRequest,
    timetable: Timetable
): boolean => {
    return checkFreezeState(request, timetable, FreezeState.LOCK, true);
};
