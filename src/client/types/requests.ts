import { ArrayElement } from "./helpers";
import {
    GetRequestsByTermIdQuery,
    RequestFormInputType,
    RequestType,
} from "../generated/graphql";
import { Map, Set } from "immutable";
import { Dispatch, SetStateAction } from "react";

export type RequestResponse = ArrayElement<
    GetRequestsByTermIdQuery["getRequestsByTermId"]
>;

export type RequestFilterFunction<T> = (
    request: RequestResponse,
    arg: T
) => boolean;

export enum WhoseRequest {
    ME = "Me",
    EVERYONE_ELSE = "Everyone else",
}

export type RequestMap = Map<number, RequestResponse>;

export type RequestInfo = {
    title: string;
    description: string;
    course: number;
    session: number;
    preferences: Set<number>;
    duration: RequestType;
};

export type RequestFormState = RequestInfo & {
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setCourse: Dispatch<SetStateAction<number>>;
    setSession: Dispatch<SetStateAction<number>>;
    setPreferences: Dispatch<SetStateAction<Set<number>>>;
    addPreference: (sessionId: number) => void;
    removePreference: (sessionId: number) => void;
    setDuration: Dispatch<SetStateAction<RequestType>>;
    resetFormState: () => void;
};

export type RequestUtil = {
    requests: RequestMap;
    setRequests: Dispatch<SetStateAction<RequestMap>>;
    createNewRequest: (request: RequestFormInputType) => void;
    fetchRequests: (termId: number) => void;
    fetchRequestById: (requestId: number) => void;
    loading: boolean;
};
