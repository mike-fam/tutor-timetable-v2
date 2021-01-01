import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type Query = {
    __typename?: "Query";
    hello: Scalars["String"];
    me?: Maybe<User>;
};

export type User = {
    __typename?: "User";
    username: Scalars["String"];
    name: Scalars["String"];
    email: Scalars["String"];
    courseStaffs: Array<CourseStaff>;
    streamAllocations: Array<StreamAllocation>;
    sessionAllocations: Array<SessionAllocation>;
    requests: Array<StaffRequest>;
    acceptedRequests: Array<StaffRequest>;
};

export type CourseStaff = {
    __typename?: "CourseStaff";
    id: Scalars["Int"];
    timetable: Timetable;
    role: Role;
    user: User;
    preference: Preference;
};

export type Timetable = {
    __typename?: "Timetable";
    id: Scalars["Int"];
    course: Course;
    term: Term;
    courseStaffs: Array<CourseStaff>;
    sessionStreams: Array<SessionStream>;
};

export type Course = {
    __typename?: "Course";
    id: Scalars["Int"];
    code: Scalars["String"];
    title: Scalars["String"];
    timetables: Array<Timetable>;
};

export type Term = {
    __typename?: "Term";
    id: Scalars["Int"];
    type: Scalars["String"];
    year: Scalars["Int"];
    startDate: Scalars["DateTime"];
    endDate: Scalars["DateTime"];
    breakWeeks: Array<Scalars["Int"]>;
    timetables: Array<Timetable>;
};

export type SessionStream = {
    __typename?: "SessionStream";
    id: Scalars["Int"];
    timetable: Timetable;
    name: Scalars["String"];
    type: SessionType;
    day: IsoDay;
    startTime: Scalars["Float"];
    endTime: Scalars["Float"];
    weeks: Array<Scalars["Int"]>;
    location: Scalars["String"];
    sessions: Session;
    streamAllocations: Array<StreamAllocation>;
};

export enum SessionType {
    Practical = "Practical",
    Tutorial = "Tutorial",
    Seminar = "Seminar",
    Lecture = "Lecture",
    Studio = "Studio",
}

export enum IsoDay {
    Mon = "Mon",
    Tue = "Tue",
    Wed = "Wed",
    Thu = "Thu",
    Fri = "Fri",
    Sat = "Sat",
    Sun = "Sun",
}

export type Session = {
    __typename?: "Session";
    id: Scalars["Int"];
    sessionStream: SessionStream;
    location: Scalars["String"];
    week: Scalars["Int"];
    sessionAllocations: Array<SessionAllocation>;
    requests: Array<StaffRequest>;
};

export type SessionAllocation = {
    __typename?: "SessionAllocation";
    id: Scalars["Int"];
    session: Session;
    user: User;
};

export type StaffRequest = {
    __typename?: "StaffRequest";
    id: Scalars["Int"];
    type: RequestType;
    status: RequestStatus;
    requester: User;
    acceptor: User;
    finaliser: User;
    session: Session;
};

export enum RequestType {
    Permanent = "Permanent",
    Temporary = "Temporary",
}

export enum RequestStatus {
    Open = "Open",
    Closed = "Closed",
}

export type StreamAllocation = {
    __typename?: "StreamAllocation";
    id: Scalars["Int"];
    sessionStream: SessionStream;
    user: User;
};

export enum Role {
    CourseCoordinator = "CourseCoordinator",
    Staff = "Staff",
}

export type Preference = {
    __typename?: "Preference";
    id: Scalars["Int"];
    sessionType: SessionType;
    maxContigHours: Scalars["Int"];
    maxWeeklyHours: Scalars["Int"];
    courseStaff: CourseStaff;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
    me?: Maybe<{ __typename?: "User" } & Pick<User, "username" | "name">>;
};

export const HelloDocument = gql`
    query Hello {
        hello
    }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
    baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
    return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
        HelloDocument,
        baseOptions
    );
}
export function useHelloLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
    return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
        HelloDocument,
        baseOptions
    );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<
    HelloQuery,
    HelloQueryVariables
>;
export const MeDocument = gql`
    query Me {
        me {
            username
            name
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
        MeDocument,
        baseOptions
    );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
