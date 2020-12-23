import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

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
    DateTime: string;
};

export type Query = {
    __typename?: "Query";
    hello: Scalars["String"];
    me?: Maybe<User>;
    terms: Array<Term>;
    term?: Maybe<Term>;
};

export type QueryTermArgs = {
    id: Scalars["String"];
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
    role: Role;
    timetable: Timetable;
    user: User;
    preference?: Maybe<Preference>;
};

export enum Role {
    CourseCoordinator = "CourseCoordinator",
    Staff = "Staff",
}

export type Timetable = {
    __typename?: "Timetable";
    id: Scalars["Int"];
    course: Course;
    courseId: Scalars["Int"];
    term: Term;
    termId: Scalars["Int"];
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
    index: Scalars["Int"];
    type: TermType;
    year: Scalars["Int"];
    startDate: Scalars["DateTime"];
    endDate: Scalars["DateTime"];
    weekNames: Array<Scalars["String"]>;
    timetables: Array<Timetable>;
};

export enum TermType {
    Semester = "Semester",
    Trimester = "Trimester",
}

export type SessionStream = {
    __typename?: "SessionStream";
    id: Scalars["Int"];
    timetable: Timetable;
    name: Scalars["String"];
    type: SessionType;
    day: IsoDay;
    startTime: Scalars["Float"];
    endTime: Scalars["Float"];
    weeks: Scalars["Int"];
    location: Scalars["String"];
    sessions: Array<Session>;
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
    requester: User;
    acceptor: User;
    finaliser: User;
    session: Session;
};

export type StreamAllocation = {
    __typename?: "StreamAllocation";
    id: Scalars["Int"];
    sessionStream: SessionStream;
    user: User;
};

export type Preference = {
    __typename?: "Preference";
    id: Scalars["Int"];
    sessionType: SessionType;
    maxContigHours: Scalars["Float"];
    maxWeeklyHours: Scalars["Float"];
    courseStaff: CourseStaff;
};

export type Mutation = {
    __typename?: "Mutation";
    addTerm: Term;
    deleteTerms: Array<Term>;
};

export type MutationAddTermArgs = {
    index: Scalars["Float"];
    type: TermType;
    year: Scalars["Float"];
    startDate: Scalars["DateTime"];
    endDate: Scalars["DateTime"];
    weekNames: Array<Scalars["String"]>;
};

export type MutationDeleteTermsArgs = {
    id: Array<Scalars["Int"]>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
    me?: Maybe<
        { __typename?: "User" } & Pick<User, "username" | "name" | "email">
    >;
};

export type MyCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type MyCoursesQuery = { __typename?: "Query" } & {
    me?: Maybe<
        { __typename?: "User" } & {
            courseStaffs: Array<
                { __typename?: "CourseStaff" } & {
                    timetable: { __typename?: "Timetable" } & {
                        course: { __typename?: "Course" } & Pick<
                            Course,
                            "id" | "code" | "title"
                        >;
                    };
                }
            >;
        }
    >;
};

export type TermsQueryVariables = Exact<{ [key: string]: never }>;

export type TermsQuery = { __typename?: "Query" } & {
    terms: Array<
        { __typename?: "Term" } & Pick<
            Term,
            | "id"
            | "type"
            | "index"
            | "year"
            | "startDate"
            | "endDate"
            | "weekNames"
        >
    >;
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
            email
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
export const MyCoursesDocument = gql`
    query MyCourses {
        me {
            courseStaffs {
                timetable {
                    course {
                        id
                        code
                        title
                    }
                }
            }
        }
    }
`;

/**
 * __useMyCoursesQuery__
 *
 * To run a query within a React component, call `useMyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCoursesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        MyCoursesQuery,
        MyCoursesQueryVariables
    >
) {
    return Apollo.useQuery<MyCoursesQuery, MyCoursesQueryVariables>(
        MyCoursesDocument,
        baseOptions
    );
}

export function useMyCoursesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        MyCoursesQuery,
        MyCoursesQueryVariables
    >
) {
    return Apollo.useLazyQuery<MyCoursesQuery, MyCoursesQueryVariables>(
        MyCoursesDocument,
        baseOptions
    );
}

export type MyCoursesQueryHookResult = ReturnType<typeof useMyCoursesQuery>;
export type MyCoursesLazyQueryHookResult = ReturnType<
    typeof useMyCoursesLazyQuery
>;
export type MyCoursesQueryResult = Apollo.QueryResult<
    MyCoursesQuery,
    MyCoursesQueryVariables
>;
export const TermsDocument = gql`
    query Terms {
        terms {
            id
            type
            index
            year
            startDate
            endDate
            weekNames
        }
    }
`;

/**
 * __useTermsQuery__
 *
 * To run a query within a React component, call `useTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTermsQuery(
    baseOptions?: Apollo.QueryHookOptions<TermsQuery, TermsQueryVariables>
) {
    return Apollo.useQuery<TermsQuery, TermsQueryVariables>(
        TermsDocument,
        baseOptions
    );
}

export function useTermsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TermsQuery, TermsQueryVariables>
) {
    return Apollo.useLazyQuery<TermsQuery, TermsQueryVariables>(
        TermsDocument,
        baseOptions
    );
}

export type TermsQueryHookResult = ReturnType<typeof useTermsQuery>;
export type TermsLazyQueryHookResult = ReturnType<typeof useTermsLazyQuery>;
export type TermsQueryResult = Apollo.QueryResult<
    TermsQuery,
    TermsQueryVariables
>;
