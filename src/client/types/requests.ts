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

export type RequestMap = Map<string, RequestResponse>;

export type RequestInfo = {
    title: string;
    description: string;
    course: string;
    session: string;
    preferences: Set<string>;
    type: RequestType;
};

export type RequestFormState = RequestInfo & {
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setCourse: Dispatch<SetStateAction<string>>;
    setSession: Dispatch<SetStateAction<string>>;
    setPreferences: Dispatch<SetStateAction<Set<string>>>;
    addPreference: (sessionId: string) => void;
    removePreference: (sessionId: string) => void;
    setDuration: Dispatch<SetStateAction<RequestType>>;
    resetFormState: () => void;
};

export type RequestUtil = {
    requests: RequestMap;
    setRequests: Dispatch<SetStateAction<RequestMap>>;
    createNewRequest: (request: RequestFormInputType) => void;
    fetchRequests: (termId: string) => void;
    fetchRequestById: (requestId: string) => void;
    loading: boolean;
};
