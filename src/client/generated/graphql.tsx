import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  terms: Array<Term>;
  term: Term;
  courseStaffs: Array<CourseStaff>;
  sessionStreams: Array<SessionStream>;
  timetables: Array<Timetable>;
  timetable?: Maybe<Timetable>;
  timetableById?: Maybe<Timetable>;
  sessions: Array<Session>;
  sessionById: Session;
  myAvailability: Array<Timeslot>;
  myPreference?: Maybe<Preference>;
  preferenceByUsername: Preference;
  getRequestById: StaffRequest;
  getRequestsByUserId: Array<StaffRequest>;
  getRequestsByCourseIds: Array<StaffRequest>;
  courses: Array<Course>;
  course: Course;
  getOfferById: Offer;
  getOffersByRequestId: Array<Offer>;
};


export type QueryTermArgs = {
  termId: Scalars['Int'];
};


export type QueryCourseStaffsArgs = {
  courseTermInput: CourseTermIdInput;
};


export type QuerySessionStreamsArgs = {
  courseIds: Array<Scalars['Int']>;
  termId: Scalars['Int'];
};


export type QueryTimetableArgs = {
  termId: Scalars['Float'];
  courseId: Scalars['Float'];
};


export type QueryTimetableByIdArgs = {
  id: Scalars['Float'];
};


export type QuerySessionsArgs = {
  week: Scalars['Int'];
  courseIds: Array<Scalars['Int']>;
  termId: Scalars['Int'];
};


export type QuerySessionByIdArgs = {
  sessionId: Scalars['Int'];
};


export type QueryMyPreferenceArgs = {
  preferenceFindInput: CourseTermIdInput;
};


export type QueryPreferenceByUsernameArgs = {
  courseTermId: CourseTermIdInput;
  username: Scalars['String'];
};


export type QueryGetRequestByIdArgs = {
  requestId: Scalars['Int'];
};


export type QueryGetRequestsByUserIdArgs = {
  termId: Scalars['Int'];
};


export type QueryGetRequestsByCourseIdsArgs = {
  termId: Scalars['Int'];
  courseIds: Array<Scalars['Int']>;
};


export type QueryCourseArgs = {
  courseId: Scalars['Int'];
};


export type QueryGetOfferByIdArgs = {
  offerId: Scalars['Int'];
};


export type QueryGetOffersByRequestIdArgs = {
  requestId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  courseStaffs: Array<CourseStaff>;
  streamAllocations: Array<StreamAllocation>;
  sessionAllocations: Array<SessionAllocation>;
  requests: Array<StaffRequest>;
  acceptedRequests: Array<StaffRequest>;
  availabilities: Array<Timeslot>;
  offers: Array<Offer>;
};

export type CourseStaff = {
  __typename?: 'CourseStaff';
  id: Scalars['Int'];
  isNew: Scalars['Boolean'];
  userId: Scalars['Int'];
  timetable: Timetable;
  role: Role;
  user: User;
  preference?: Maybe<Preference>;
};

export type Timetable = {
  __typename?: 'Timetable';
  id: Scalars['Int'];
  courseId: Scalars['Int'];
  termId: Scalars['Int'];
  course: Course;
  term: Term;
  courseStaffs: Array<CourseStaff>;
  sessionStreams: Array<SessionStream>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Int'];
  code: Scalars['String'];
  title: Scalars['String'];
  timetables: Array<Timetable>;
};

export type Term = {
  __typename?: 'Term';
  id: Scalars['Int'];
  type: TermType;
  year: Scalars['Int'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  weekNames: Array<Scalars['String']>;
  timetables: Array<Timetable>;
};

export enum TermType {
  Semester_1 = 'SEMESTER_1',
  Semester_2 = 'SEMESTER_2',
  SummerSemester = 'SUMMER_SEMESTER',
  Trimester_1 = 'TRIMESTER_1',
  Trimester_2 = 'TRIMESTER_2',
  Trimester_3 = 'TRIMESTER_3'
}


export type SessionStream = {
  __typename?: 'SessionStream';
  id: Scalars['Int'];
  timetableId: Scalars['Int'];
  timetable: Timetable;
  name: Scalars['String'];
  type: SessionType;
  day: Scalars['Int'];
  startTime: Scalars['Float'];
  endTime: Scalars['Float'];
  weeks: Array<Scalars['Int']>;
  location: Scalars['String'];
  numberOfStaff: Scalars['Int'];
  sessions: Array<Session>;
  streamAllocations: Array<StreamAllocation>;
};

export enum SessionType {
  Practical = 'PRACTICAL',
  Tutorial = 'TUTORIAL',
  Seminar = 'SEMINAR',
  Lecture = 'LECTURE',
  Studio = 'STUDIO'
}

export type Session = {
  __typename?: 'Session';
  id: Scalars['Int'];
  sessionStream: SessionStream;
  location: Scalars['String'];
  week: Scalars['Int'];
  sessionAllocations: Array<SessionAllocation>;
  requests: Array<StaffRequest>;
  preferredSwaps: Array<StaffRequest>;
  offerPreferences: Array<Offer>;
};

export type SessionAllocation = {
  __typename?: 'SessionAllocation';
  id: Scalars['Int'];
  session: Session;
  user: User;
};

export type StaffRequest = {
  __typename?: 'StaffRequest';
  id: Scalars['Int'];
  type: RequestType;
  title: Scalars['String'];
  description: Scalars['String'];
  status: RequestStatus;
  requester: User;
  acceptor: User;
  finaliser: User;
  session: Session;
  swapPreference: Array<Session>;
  offers: Array<Offer>;
};

export enum RequestType {
  Permanent = 'PERMANENT',
  Temporary = 'TEMPORARY'
}

export enum RequestStatus {
  Open = 'OPEN',
  Closed = 'CLOSED'
}

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['Int'];
  request: StaffRequest;
  user: User;
  preferences: Array<Session>;
};

export type StreamAllocation = {
  __typename?: 'StreamAllocation';
  id: Scalars['Int'];
  sessionStream: SessionStream;
  user: User;
};

export enum Role {
  CourseCoordinator = 'COURSE_COORDINATOR',
  Staff = 'STAFF'
}

export type Preference = {
  __typename?: 'Preference';
  id: Scalars['Int'];
  sessionType?: Maybe<SessionType>;
  maxContigHours: Scalars['Float'];
  maxWeeklyHours: Scalars['Float'];
  courseStaff: CourseStaff;
};

export type Timeslot = {
  __typename?: 'Timeslot';
  id: Scalars['Int'];
  startTime: Scalars['Float'];
  endTime: Scalars['Float'];
  day: Scalars['Float'];
  user: User;
};

export type CourseTermIdInput = {
  courseId: Scalars['Int'];
  termId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  requestAllocation: AllocatorOutput;
  applyAllocation: Scalars['Boolean'];
  addTerm: Term;
  deleteTerms: Array<Term>;
  addCourseStaff: CourseStaff;
  addUsersToCourse: Array<CourseStaff>;
  removeCourseStaff: Scalars['Int'];
  addBasedSessionStream: SessionStream;
  addSessionStream: SessionStream;
  addStreamStaff: SessionStream;
  generateSessions: Array<Session>;
  updateAvailabilities: Array<Timeslot>;
  updatePreference: Preference;
  createRequest: StaffRequest;
  editExistingRequest: StaffRequest;
  deleteRequestById: StaffRequest;
  createOffer: Offer;
  editExistingOffer: Offer;
  removeOffer: Offer;
  acceptOffer: Scalars['Boolean'];
};


export type MutationRequestAllocationArgs = {
  newThreshold?: Maybe<Scalars['Float']>;
  staffIds: Array<Scalars['Int']>;
  courseTermInput: CourseTermIdInput;
};


export type MutationApplyAllocationArgs = {
  override: Scalars['Boolean'];
  allocationToken: Scalars['String'];
};


export type MutationAddTermArgs = {
  type: TermType;
  year: Scalars['Float'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  weekNames: Array<Scalars['String']>;
};


export type MutationDeleteTermsArgs = {
  id: Array<Scalars['Int']>;
};


export type MutationAddCourseStaffArgs = {
  courseStaffUserInput: CourseStaffUserInput;
};


export type MutationAddUsersToCourseArgs = {
  usernames: Array<Scalars['String']>;
  courseStaffInput: CourseStaffInput;
};


export type MutationRemoveCourseStaffArgs = {
  courseStaffId: Scalars['Int'];
};


export type MutationAddBasedSessionStreamArgs = {
  numberOfStaff: Scalars['Int'];
  weeks: Array<Scalars['Int']>;
  name: Scalars['String'];
  sessionStreamId: Scalars['Int'];
};


export type MutationAddSessionStreamArgs = {
  numberOfStaff: Scalars['Int'];
  location: Scalars['String'];
  weeks: Array<Scalars['Int']>;
  endTime: Scalars['Float'];
  startTime: Scalars['Float'];
  day: Scalars['Int'];
  type: SessionType;
  name: Scalars['String'];
  timetableId: Scalars['Int'];
};


export type MutationAddStreamStaffArgs = {
  newStaffs: Array<Scalars['Int']>;
  streamId: Scalars['Float'];
};


export type MutationGenerateSessionsArgs = {
  sessionStreamId: Scalars['Int'];
};


export type MutationUpdateAvailabilitiesArgs = {
  timeslots: Array<TimeslotInput>;
};


export type MutationUpdatePreferenceArgs = {
  preference: PreferenceInput;
  preferenceFind: CourseTermIdInput;
};


export type MutationCreateRequestArgs = {
  requestDetails: RequestFormInputType;
};


export type MutationEditExistingRequestArgs = {
  requestDetails: EditRequestFormInputType;
};


export type MutationDeleteRequestByIdArgs = {
  requestId: Scalars['Int'];
};


export type MutationCreateOfferArgs = {
  offerDetails: OfferInputType;
};


export type MutationEditExistingOfferArgs = {
  editDetails: EditOfferInputType;
};


export type MutationRemoveOfferArgs = {
  offerId: Scalars['Int'];
};


export type MutationAcceptOfferArgs = {
  offerSessionSwapId?: Maybe<Scalars['Int']>;
  offerId: Scalars['Int'];
};

export type AllocatorOutput = {
  __typename?: 'AllocatorOutput';
  status: AllocationStatus;
  type: AllocationType;
  token: Scalars['String'];
  detail: Scalars['String'];
  runtime: Scalars['Float'];
  allocations: Array<Allocation>;
};

export enum AllocationStatus {
  Optimal = 'Optimal',
  Infeasible = 'Infeasible'
}

export enum AllocationType {
  Success = 'Success',
  Failed = 'Failed'
}

export type Allocation = {
  __typename?: 'Allocation';
  sessionStream: SessionStream;
  staff: Array<User>;
};

export type CourseStaffUserInput = {
  courseId: Scalars['Int'];
  termId: Scalars['Int'];
  role: Role;
  isNew: Scalars['Boolean'];
  username: Scalars['String'];
};

export type CourseStaffInput = {
  courseId: Scalars['Int'];
  termId: Scalars['Int'];
  role: Role;
  isNew: Scalars['Boolean'];
};

export type TimeslotInput = {
  id: Scalars['Int'];
  startTime: Scalars['Float'];
  endTime: Scalars['Float'];
  day: Scalars['Int'];
  modificationType: AvailabilityModificationType;
};

export enum AvailabilityModificationType {
  Unchanged = 'UNCHANGED',
  Added = 'ADDED',
  Modified = 'MODIFIED',
  Removed = 'REMOVED',
  RemovedModified = 'REMOVED_MODIFIED'
}

export type PreferenceInput = {
  sessionType?: Maybe<SessionType>;
  maxContigHours: Scalars['Float'];
  maxWeeklyHours: Scalars['Float'];
};

export type RequestFormInputType = {
  title: Scalars['String'];
  preferences: Array<Scalars['Int']>;
  duration: RequestType;
  description?: Maybe<Scalars['String']>;
  termId: Scalars['Int'];
  sessionId: Scalars['Int'];
};

export type EditRequestFormInputType = {
  requestId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  preferences?: Maybe<Array<Scalars['Int']>>;
  duration?: Maybe<RequestType>;
  description?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['Int']>;
  closeRequest: Scalars['Boolean'];
};

export type OfferInputType = {
  requestId: Scalars['Int'];
  sessionPreferences?: Maybe<Array<Scalars['Int']>>;
};

export type EditOfferInputType = {
  offerId: Scalars['Int'];
  sessionPreferences: Array<Scalars['Int']>;
};

export type AcceptOfferMutationVariables = Exact<{
  offerId: Scalars['Int'];
  offerSessionSwapId?: Maybe<Scalars['Int']>;
}>;


export type AcceptOfferMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptOffer'>
);

export type AddAvailabilitiesMutationVariables = Exact<{
  timeslots: Array<TimeslotInput>;
}>;


export type AddAvailabilitiesMutation = (
  { __typename?: 'Mutation' }
  & { updateAvailabilities: Array<(
    { __typename?: 'Timeslot' }
    & Pick<Timeslot, 'id' | 'day' | 'startTime' | 'endTime'>
  )> }
);

export type RequestAllocationMutationVariables = Exact<{
  courseTerm: CourseTermIdInput;
  staffIds: Array<Scalars['Int']>;
  newThreshold?: Maybe<Scalars['Float']>;
}>;


export type RequestAllocationMutation = (
  { __typename?: 'Mutation' }
  & { requestAllocation: (
    { __typename?: 'AllocatorOutput' }
    & Pick<AllocatorOutput, 'status' | 'detail' | 'type' | 'token'>
    & { allocations: Array<(
      { __typename?: 'Allocation' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'id' | 'name' | 'startTime' | 'endTime' | 'day' | 'location' | 'weeks'>
      ), staff: Array<(
        { __typename?: 'User' }
        & Pick<User, 'username' | 'name'>
      )> }
    )> }
  ) }
);

export type ApplyAllocationMutationVariables = Exact<{
  token: Scalars['String'];
  override: Scalars['Boolean'];
}>;


export type ApplyAllocationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'applyAllocation'>
);

export type CourseQueryVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course: (
    { __typename?: 'Course' }
    & Pick<Course, 'code' | 'title'>
  ) }
);

export type CourseStaffsQueryVariables = Exact<{
  courseTermInput: CourseTermIdInput;
}>;


export type CourseStaffsQuery = (
  { __typename?: 'Query' }
  & { courseStaffs: Array<(
    { __typename?: 'CourseStaff' }
    & Pick<CourseStaff, 'id' | 'role' | 'isNew'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'name'>
    ) }
  )> }
);

export type AddCourseStaffMutationVariables = Exact<{
  courseStaffInput: CourseStaffInput;
  usernames: Array<Scalars['String']>;
}>;


export type AddCourseStaffMutation = (
  { __typename?: 'Mutation' }
  & { addUsersToCourse: Array<(
    { __typename?: 'CourseStaff' }
    & Pick<CourseStaff, 'id' | 'role' | 'isNew'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username'>
    ) }
  )> }
);

export type RemoveCourseStaffMutationVariables = Exact<{
  courseStaffId: Scalars['Int'];
}>;


export type RemoveCourseStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCourseStaff'>
);

export type CreateOfferMutationVariables = Exact<{
  offerDetails: OfferInputType;
}>;


export type CreateOfferMutation = (
  { __typename?: 'Mutation' }
  & { createOffer: (
    { __typename?: 'Offer' }
    & Pick<Offer, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), preferences: Array<(
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type CreateRequestMutationVariables = Exact<{
  requestDetails: RequestFormInputType;
}>;


export type CreateRequestMutation = (
  { __typename?: 'Mutation' }
  & { createRequest: (
    { __typename?: 'StaffRequest' }
    & Pick<StaffRequest, 'id' | 'title' | 'description' | 'type' | 'status'>
    & { requester: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'email'>
    ), session: (
      { __typename?: 'Session' }
      & Pick<Session, 'id'>
    ), swapPreference: Array<(
      { __typename?: 'Session' }
      & Pick<Session, 'id'>
    )> }
  ) }
);

export type GetOfferByIdQueryVariables = Exact<{
  offerId: Scalars['Int'];
}>;


export type GetOfferByIdQuery = (
  { __typename?: 'Query' }
  & { getOfferById: (
    { __typename?: 'Offer' }
    & Pick<Offer, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), preferences: Array<(
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'id' | 'name'>
      ) }
    )>, request: (
      { __typename?: 'StaffRequest' }
      & Pick<StaffRequest, 'id' | 'status'>
      & { requester: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ), swapPreference: Array<(
        { __typename?: 'Session' }
        & { sessionStream: (
          { __typename?: 'SessionStream' }
          & Pick<SessionStream, 'id' | 'name'>
        ) }
      )>, session: (
        { __typename?: 'Session' }
        & { sessionStream: (
          { __typename?: 'SessionStream' }
          & Pick<SessionStream, 'id' | 'name'>
        ) }
      ) }
    ) }
  ) }
);

export type GetOffersByRequestIdQueryVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type GetOffersByRequestIdQuery = (
  { __typename?: 'Query' }
  & { getOffersByRequestId: Array<(
    { __typename?: 'Offer' }
    & Pick<Offer, 'id'>
    & { preferences: Array<(
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'id' | 'name'>
      ) }
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type GetRequestByIdQueryVariables = Exact<{
  requestId: Scalars['Int'];
}>;


export type GetRequestByIdQuery = (
  { __typename?: 'Query' }
  & { getRequestById: (
    { __typename?: 'StaffRequest' }
    & Pick<StaffRequest, 'id' | 'type' | 'title' | 'description' | 'status'>
    & { requester: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), acceptor: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), finaliser: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), session: (
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'id' | 'name'>
      ) }
    ), swapPreference: Array<(
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type GetRequestsByUserIdQueryVariables = Exact<{
  termId: Scalars['Int'];
}>;


export type GetRequestsByUserIdQuery = (
  { __typename?: 'Query' }
  & { getRequestsByUserId: Array<(
    { __typename?: 'StaffRequest' }
    & Pick<StaffRequest, 'id' | 'title' | 'status'>
    & { requester: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ), session: (
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'name'>
      ) }
    ), swapPreference: Array<(
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'name'>
      ) }
    )> }
  )> }
);

export type GetRequestsByCourseIdsQueryVariables = Exact<{
  courseIds: Array<Scalars['Int']>;
  termId: Scalars['Int'];
}>;


export type GetRequestsByCourseIdsQuery = (
  { __typename?: 'Query' }
  & { getRequestsByCourseIds: Array<(
    { __typename?: 'StaffRequest' }
    & Pick<StaffRequest, 'id' | 'title' | 'status' | 'type'>
    & { requester: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), session: (
      { __typename?: 'Session' }
      & Pick<Session, 'week'>
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'name'>
        & { timetable: (
          { __typename?: 'Timetable' }
          & Pick<Timetable, 'termId'>
          & { course: (
            { __typename?: 'Course' }
            & Pick<Course, 'code'>
          ) }
        ) }
      ) }
    ), swapPreference: Array<(
      { __typename?: 'Session' }
      & Pick<Session, 'week'>
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'name'>
      ) }
    )> }
  )> }
);

export type GetSessionStreamsQueryVariables = Exact<{
  termId: Scalars['Int'];
  courseIds: Array<Scalars['Int']>;
}>;


export type GetSessionStreamsQuery = (
  { __typename?: 'Query' }
  & { sessionStreams: Array<(
    { __typename?: 'SessionStream' }
    & Pick<SessionStream, 'id' | 'type' | 'name' | 'startTime' | 'endTime' | 'day' | 'location'>
    & { streamAllocations: Array<(
      { __typename?: 'StreamAllocation' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'username'>
      ) }
    )> }
  )> }
);

export type GetSessionsQueryVariables = Exact<{
  termId: Scalars['Int'];
  week: Scalars['Int'];
  courseIds: Array<Scalars['Int']>;
}>;


export type GetSessionsQuery = (
  { __typename?: 'Query' }
  & { sessions: Array<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'location' | 'week'>
    & { sessionStream: (
      { __typename?: 'SessionStream' }
      & Pick<SessionStream, 'name' | 'startTime' | 'endTime' | 'day'>
      & { timetable: (
        { __typename?: 'Timetable' }
        & { term: (
          { __typename?: 'Term' }
          & Pick<Term, 'id'>
        ), course: (
          { __typename?: 'Course' }
          & Pick<Course, 'id'>
        ) }
      ) }
    ), sessionAllocations: Array<(
      { __typename?: 'SessionAllocation' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'name'>
      ) }
    )> }
  )> }
);

export type GetSessionByIdQueryVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type GetSessionByIdQuery = (
  { __typename?: 'Query' }
  & { sessionById: (
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'location' | 'week'>
    & { sessionStream: (
      { __typename?: 'SessionStream' }
      & Pick<SessionStream, 'name' | 'startTime' | 'endTime' | 'day'>
      & { timetable: (
        { __typename?: 'Timetable' }
        & { term: (
          { __typename?: 'Term' }
          & Pick<Term, 'id'>
        ), course: (
          { __typename?: 'Course' }
          & Pick<Course, 'id'>
        ) }
      ) }
    ), sessionAllocations: Array<(
      { __typename?: 'SessionAllocation' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'name'>
      ) }
    )> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'name' | 'email'>
  )> }
);

export type MyAvailabilityQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAvailabilityQuery = (
  { __typename?: 'Query' }
  & { myAvailability: Array<(
    { __typename?: 'Timeslot' }
    & Pick<Timeslot, 'id' | 'startTime' | 'endTime' | 'day'>
  )> }
);

export type MyCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCoursesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { courseStaffs: Array<(
      { __typename?: 'CourseStaff' }
      & Pick<CourseStaff, 'role'>
      & { timetable: (
        { __typename?: 'Timetable' }
        & { course: (
          { __typename?: 'Course' }
          & Pick<Course, 'id' | 'code' | 'title'>
        ), term: (
          { __typename?: 'Term' }
          & Pick<Term, 'id'>
        ) }
      ) }
    )> }
  )> }
);

export type MyPreferenceQueryVariables = Exact<{
  preferenceFind: CourseTermIdInput;
}>;


export type MyPreferenceQuery = (
  { __typename?: 'Query' }
  & { myPreference?: Maybe<(
    { __typename?: 'Preference' }
    & Pick<Preference, 'maxContigHours' | 'maxWeeklyHours' | 'sessionType'>
    & { courseStaff: (
      { __typename?: 'CourseStaff' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    ) }
  )> }
);

export type PreferenceByUsernameQueryVariables = Exact<{
  courseTermId: CourseTermIdInput;
  username: Scalars['String'];
}>;


export type PreferenceByUsernameQuery = (
  { __typename?: 'Query' }
  & { preferenceByUsername: (
    { __typename?: 'Preference' }
    & Pick<Preference, 'maxContigHours' | 'maxWeeklyHours' | 'sessionType'>
    & { courseStaff: (
      { __typename?: 'CourseStaff' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    ) }
  ) }
);

export type TermsQueryVariables = Exact<{ [key: string]: never; }>;


export type TermsQuery = (
  { __typename?: 'Query' }
  & { terms: Array<(
    { __typename?: 'Term' }
    & Pick<Term, 'id' | 'type' | 'year' | 'startDate' | 'endDate' | 'weekNames'>
  )> }
);

export type TermQueryVariables = Exact<{
  termId: Scalars['Int'];
}>;


export type TermQuery = (
  { __typename?: 'Query' }
  & { term: (
    { __typename?: 'Term' }
    & Pick<Term, 'id' | 'type' | 'year' | 'startDate' | 'endDate' | 'weekNames'>
  ) }
);

export type UpdateAvailabilitiesMutationVariables = Exact<{
  timeslots: Array<TimeslotInput>;
}>;


export type UpdateAvailabilitiesMutation = (
  { __typename?: 'Mutation' }
  & { updateAvailabilities: Array<(
    { __typename?: 'Timeslot' }
    & Pick<Timeslot, 'id' | 'day' | 'startTime' | 'endTime'>
  )> }
);

export type UpdatePreferenceMutationVariables = Exact<{
  preferenceFind: CourseTermIdInput;
  preference: PreferenceInput;
}>;


export type UpdatePreferenceMutation = (
  { __typename?: 'Mutation' }
  & { updatePreference: (
    { __typename?: 'Preference' }
    & Pick<Preference, 'maxContigHours' | 'maxWeeklyHours' | 'sessionType'>
  ) }
);

export type EditRequestMutationVariables = Exact<{
  requestDetails: EditRequestFormInputType;
}>;


export type EditRequestMutation = (
  { __typename?: 'Mutation' }
  & { editExistingRequest: (
    { __typename?: 'StaffRequest' }
    & Pick<StaffRequest, 'id' | 'title' | 'description' | 'status' | 'type'>
    & { session: (
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'name'>
      ) }
    ), swapPreference: Array<(
      { __typename?: 'Session' }
      & { sessionStream: (
        { __typename?: 'SessionStream' }
        & Pick<SessionStream, 'name'>
      ) }
    )> }
  ) }
);


export const AcceptOfferDocument = gql`
    mutation AcceptOffer($offerId: Int!, $offerSessionSwapId: Int) {
  acceptOffer(offerId: $offerId, offerSessionSwapId: $offerSessionSwapId)
}
    `;
export type AcceptOfferMutationFn = Apollo.MutationFunction<AcceptOfferMutation, AcceptOfferMutationVariables>;

/**
 * __useAcceptOfferMutation__
 *
 * To run a mutation, you first call `useAcceptOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptOfferMutation, { data, loading, error }] = useAcceptOfferMutation({
 *   variables: {
 *      offerId: // value for 'offerId'
 *      offerSessionSwapId: // value for 'offerSessionSwapId'
 *   },
 * });
 */
export function useAcceptOfferMutation(baseOptions?: Apollo.MutationHookOptions<AcceptOfferMutation, AcceptOfferMutationVariables>) {
        return Apollo.useMutation<AcceptOfferMutation, AcceptOfferMutationVariables>(AcceptOfferDocument, baseOptions);
      }
export type AcceptOfferMutationHookResult = ReturnType<typeof useAcceptOfferMutation>;
export type AcceptOfferMutationResult = Apollo.MutationResult<AcceptOfferMutation>;
export type AcceptOfferMutationOptions = Apollo.BaseMutationOptions<AcceptOfferMutation, AcceptOfferMutationVariables>;
export const AddAvailabilitiesDocument = gql`
    mutation addAvailabilities($timeslots: [TimeslotInput!]!) {
  updateAvailabilities(timeslots: $timeslots) {
    id
    day
    startTime
    endTime
  }
}
    `;
export type AddAvailabilitiesMutationFn = Apollo.MutationFunction<AddAvailabilitiesMutation, AddAvailabilitiesMutationVariables>;

/**
 * __useAddAvailabilitiesMutation__
 *
 * To run a mutation, you first call `useAddAvailabilitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAvailabilitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAvailabilitiesMutation, { data, loading, error }] = useAddAvailabilitiesMutation({
 *   variables: {
 *      timeslots: // value for 'timeslots'
 *   },
 * });
 */
export function useAddAvailabilitiesMutation(baseOptions?: Apollo.MutationHookOptions<AddAvailabilitiesMutation, AddAvailabilitiesMutationVariables>) {
        return Apollo.useMutation<AddAvailabilitiesMutation, AddAvailabilitiesMutationVariables>(AddAvailabilitiesDocument, baseOptions);
      }
export type AddAvailabilitiesMutationHookResult = ReturnType<typeof useAddAvailabilitiesMutation>;
export type AddAvailabilitiesMutationResult = Apollo.MutationResult<AddAvailabilitiesMutation>;
export type AddAvailabilitiesMutationOptions = Apollo.BaseMutationOptions<AddAvailabilitiesMutation, AddAvailabilitiesMutationVariables>;
export const RequestAllocationDocument = gql`
    mutation RequestAllocation($courseTerm: CourseTermIdInput!, $staffIds: [Int!]!, $newThreshold: Float) {
  requestAllocation(
    courseTermInput: $courseTerm
    staffIds: $staffIds
    newThreshold: $newThreshold
  ) {
    status
    detail
    type
    token
    allocations {
      sessionStream {
        id
        name
        startTime
        endTime
        day
        location
        weeks
      }
      staff {
        username
        name
      }
    }
  }
}
    `;
export type RequestAllocationMutationFn = Apollo.MutationFunction<RequestAllocationMutation, RequestAllocationMutationVariables>;

/**
 * __useRequestAllocationMutation__
 *
 * To run a mutation, you first call `useRequestAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestAllocationMutation, { data, loading, error }] = useRequestAllocationMutation({
 *   variables: {
 *      courseTerm: // value for 'courseTerm'
 *      staffIds: // value for 'staffIds'
 *      newThreshold: // value for 'newThreshold'
 *   },
 * });
 */
export function useRequestAllocationMutation(baseOptions?: Apollo.MutationHookOptions<RequestAllocationMutation, RequestAllocationMutationVariables>) {
        return Apollo.useMutation<RequestAllocationMutation, RequestAllocationMutationVariables>(RequestAllocationDocument, baseOptions);
      }
export type RequestAllocationMutationHookResult = ReturnType<typeof useRequestAllocationMutation>;
export type RequestAllocationMutationResult = Apollo.MutationResult<RequestAllocationMutation>;
export type RequestAllocationMutationOptions = Apollo.BaseMutationOptions<RequestAllocationMutation, RequestAllocationMutationVariables>;
export const ApplyAllocationDocument = gql`
    mutation ApplyAllocation($token: String!, $override: Boolean!) {
  applyAllocation(allocationToken: $token, override: $override)
}
    `;
export type ApplyAllocationMutationFn = Apollo.MutationFunction<ApplyAllocationMutation, ApplyAllocationMutationVariables>;

/**
 * __useApplyAllocationMutation__
 *
 * To run a mutation, you first call `useApplyAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyAllocationMutation, { data, loading, error }] = useApplyAllocationMutation({
 *   variables: {
 *      token: // value for 'token'
 *      override: // value for 'override'
 *   },
 * });
 */
export function useApplyAllocationMutation(baseOptions?: Apollo.MutationHookOptions<ApplyAllocationMutation, ApplyAllocationMutationVariables>) {
        return Apollo.useMutation<ApplyAllocationMutation, ApplyAllocationMutationVariables>(ApplyAllocationDocument, baseOptions);
      }
export type ApplyAllocationMutationHookResult = ReturnType<typeof useApplyAllocationMutation>;
export type ApplyAllocationMutationResult = Apollo.MutationResult<ApplyAllocationMutation>;
export type ApplyAllocationMutationOptions = Apollo.BaseMutationOptions<ApplyAllocationMutation, ApplyAllocationMutationVariables>;
export const CourseDocument = gql`
    query Course($courseId: Int!) {
  course(courseId: $courseId) {
    code
    title
  }
}
    `;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, baseOptions);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, baseOptions);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const CourseStaffsDocument = gql`
    query CourseStaffs($courseTermInput: CourseTermIdInput!) {
  courseStaffs(courseTermInput: $courseTermInput) {
    id
    role
    user {
      id
      username
      name
    }
    isNew
  }
}
    `;

/**
 * __useCourseStaffsQuery__
 *
 * To run a query within a React component, call `useCourseStaffsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseStaffsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseStaffsQuery({
 *   variables: {
 *      courseTermInput: // value for 'courseTermInput'
 *   },
 * });
 */
export function useCourseStaffsQuery(baseOptions: Apollo.QueryHookOptions<CourseStaffsQuery, CourseStaffsQueryVariables>) {
        return Apollo.useQuery<CourseStaffsQuery, CourseStaffsQueryVariables>(CourseStaffsDocument, baseOptions);
      }
export function useCourseStaffsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseStaffsQuery, CourseStaffsQueryVariables>) {
          return Apollo.useLazyQuery<CourseStaffsQuery, CourseStaffsQueryVariables>(CourseStaffsDocument, baseOptions);
        }
export type CourseStaffsQueryHookResult = ReturnType<typeof useCourseStaffsQuery>;
export type CourseStaffsLazyQueryHookResult = ReturnType<typeof useCourseStaffsLazyQuery>;
export type CourseStaffsQueryResult = Apollo.QueryResult<CourseStaffsQuery, CourseStaffsQueryVariables>;
export const AddCourseStaffDocument = gql`
    mutation AddCourseStaff($courseStaffInput: CourseStaffInput!, $usernames: [String!]!) {
  addUsersToCourse(courseStaffInput: $courseStaffInput, usernames: $usernames) {
    id
    user {
      id
      name
      username
    }
    role
    isNew
  }
}
    `;
export type AddCourseStaffMutationFn = Apollo.MutationFunction<AddCourseStaffMutation, AddCourseStaffMutationVariables>;

/**
 * __useAddCourseStaffMutation__
 *
 * To run a mutation, you first call `useAddCourseStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCourseStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCourseStaffMutation, { data, loading, error }] = useAddCourseStaffMutation({
 *   variables: {
 *      courseStaffInput: // value for 'courseStaffInput'
 *      usernames: // value for 'usernames'
 *   },
 * });
 */
export function useAddCourseStaffMutation(baseOptions?: Apollo.MutationHookOptions<AddCourseStaffMutation, AddCourseStaffMutationVariables>) {
        return Apollo.useMutation<AddCourseStaffMutation, AddCourseStaffMutationVariables>(AddCourseStaffDocument, baseOptions);
      }
export type AddCourseStaffMutationHookResult = ReturnType<typeof useAddCourseStaffMutation>;
export type AddCourseStaffMutationResult = Apollo.MutationResult<AddCourseStaffMutation>;
export type AddCourseStaffMutationOptions = Apollo.BaseMutationOptions<AddCourseStaffMutation, AddCourseStaffMutationVariables>;
export const RemoveCourseStaffDocument = gql`
    mutation RemoveCourseStaff($courseStaffId: Int!) {
  removeCourseStaff(courseStaffId: $courseStaffId)
}
    `;
export type RemoveCourseStaffMutationFn = Apollo.MutationFunction<RemoveCourseStaffMutation, RemoveCourseStaffMutationVariables>;

/**
 * __useRemoveCourseStaffMutation__
 *
 * To run a mutation, you first call `useRemoveCourseStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseStaffMutation, { data, loading, error }] = useRemoveCourseStaffMutation({
 *   variables: {
 *      courseStaffId: // value for 'courseStaffId'
 *   },
 * });
 */
export function useRemoveCourseStaffMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCourseStaffMutation, RemoveCourseStaffMutationVariables>) {
        return Apollo.useMutation<RemoveCourseStaffMutation, RemoveCourseStaffMutationVariables>(RemoveCourseStaffDocument, baseOptions);
      }
export type RemoveCourseStaffMutationHookResult = ReturnType<typeof useRemoveCourseStaffMutation>;
export type RemoveCourseStaffMutationResult = Apollo.MutationResult<RemoveCourseStaffMutation>;
export type RemoveCourseStaffMutationOptions = Apollo.BaseMutationOptions<RemoveCourseStaffMutation, RemoveCourseStaffMutationVariables>;
export const CreateOfferDocument = gql`
    mutation CreateOffer($offerDetails: OfferInputType!) {
  createOffer(offerDetails: $offerDetails) {
    id
    user {
      id
      username
    }
    preferences {
      sessionStream {
        id
        name
      }
    }
  }
}
    `;
export type CreateOfferMutationFn = Apollo.MutationFunction<CreateOfferMutation, CreateOfferMutationVariables>;

/**
 * __useCreateOfferMutation__
 *
 * To run a mutation, you first call `useCreateOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfferMutation, { data, loading, error }] = useCreateOfferMutation({
 *   variables: {
 *      offerDetails: // value for 'offerDetails'
 *   },
 * });
 */
export function useCreateOfferMutation(baseOptions?: Apollo.MutationHookOptions<CreateOfferMutation, CreateOfferMutationVariables>) {
        return Apollo.useMutation<CreateOfferMutation, CreateOfferMutationVariables>(CreateOfferDocument, baseOptions);
      }
export type CreateOfferMutationHookResult = ReturnType<typeof useCreateOfferMutation>;
export type CreateOfferMutationResult = Apollo.MutationResult<CreateOfferMutation>;
export type CreateOfferMutationOptions = Apollo.BaseMutationOptions<CreateOfferMutation, CreateOfferMutationVariables>;
export const CreateRequestDocument = gql`
    mutation CreateRequest($requestDetails: RequestFormInputType!) {
  createRequest(requestDetails: $requestDetails) {
    id
    title
    description
    type
    requester {
      name
      email
    }
    status
    session {
      id
    }
    swapPreference {
      id
    }
  }
}
    `;
export type CreateRequestMutationFn = Apollo.MutationFunction<CreateRequestMutation, CreateRequestMutationVariables>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      requestDetails: // value for 'requestDetails'
 *   },
 * });
 */
export function useCreateRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>) {
        return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument, baseOptions);
      }
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<CreateRequestMutation, CreateRequestMutationVariables>;
export const GetOfferByIdDocument = gql`
    query getOfferById($offerId: Int!) {
  getOfferById(offerId: $offerId) {
    id
    user {
      id
      username
    }
    preferences {
      sessionStream {
        id
        name
      }
    }
    request {
      id
      requester {
        id
        username
      }
      swapPreference {
        sessionStream {
          id
          name
        }
      }
      status
      session {
        sessionStream {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetOfferByIdQuery__
 *
 * To run a query within a React component, call `useGetOfferByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOfferByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOfferByIdQuery({
 *   variables: {
 *      offerId: // value for 'offerId'
 *   },
 * });
 */
export function useGetOfferByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOfferByIdQuery, GetOfferByIdQueryVariables>) {
        return Apollo.useQuery<GetOfferByIdQuery, GetOfferByIdQueryVariables>(GetOfferByIdDocument, baseOptions);
      }
export function useGetOfferByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOfferByIdQuery, GetOfferByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetOfferByIdQuery, GetOfferByIdQueryVariables>(GetOfferByIdDocument, baseOptions);
        }
export type GetOfferByIdQueryHookResult = ReturnType<typeof useGetOfferByIdQuery>;
export type GetOfferByIdLazyQueryHookResult = ReturnType<typeof useGetOfferByIdLazyQuery>;
export type GetOfferByIdQueryResult = Apollo.QueryResult<GetOfferByIdQuery, GetOfferByIdQueryVariables>;
export const GetOffersByRequestIdDocument = gql`
    query getOffersByRequestId($requestId: Int!) {
  getOffersByRequestId(requestId: $requestId) {
    id
    preferences {
      sessionStream {
        id
        name
      }
    }
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useGetOffersByRequestIdQuery__
 *
 * To run a query within a React component, call `useGetOffersByRequestIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersByRequestIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersByRequestIdQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useGetOffersByRequestIdQuery(baseOptions: Apollo.QueryHookOptions<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>) {
        return Apollo.useQuery<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>(GetOffersByRequestIdDocument, baseOptions);
      }
export function useGetOffersByRequestIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>) {
          return Apollo.useLazyQuery<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>(GetOffersByRequestIdDocument, baseOptions);
        }
export type GetOffersByRequestIdQueryHookResult = ReturnType<typeof useGetOffersByRequestIdQuery>;
export type GetOffersByRequestIdLazyQueryHookResult = ReturnType<typeof useGetOffersByRequestIdLazyQuery>;
export type GetOffersByRequestIdQueryResult = Apollo.QueryResult<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>;
export const GetRequestByIdDocument = gql`
    query getRequestById($requestId: Int!) {
  getRequestById(requestId: $requestId) {
    id
    type
    title
    description
    status
    requester {
      username
    }
    acceptor {
      username
    }
    finaliser {
      username
    }
    session {
      sessionStream {
        id
        name
      }
    }
    swapPreference {
      sessionStream {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetRequestByIdQuery__
 *
 * To run a query within a React component, call `useGetRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestByIdQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useGetRequestByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRequestByIdQuery, GetRequestByIdQueryVariables>) {
        return Apollo.useQuery<GetRequestByIdQuery, GetRequestByIdQueryVariables>(GetRequestByIdDocument, baseOptions);
      }
export function useGetRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestByIdQuery, GetRequestByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetRequestByIdQuery, GetRequestByIdQueryVariables>(GetRequestByIdDocument, baseOptions);
        }
export type GetRequestByIdQueryHookResult = ReturnType<typeof useGetRequestByIdQuery>;
export type GetRequestByIdLazyQueryHookResult = ReturnType<typeof useGetRequestByIdLazyQuery>;
export type GetRequestByIdQueryResult = Apollo.QueryResult<GetRequestByIdQuery, GetRequestByIdQueryVariables>;
export const GetRequestsByUserIdDocument = gql`
    query getRequestsByUserId($termId: Int!) {
  getRequestsByUserId(termId: $termId) {
    id
    title
    status
    requester {
      name
    }
    session {
      sessionStream {
        name
      }
    }
    swapPreference {
      sessionStream {
        name
      }
    }
  }
}
    `;

/**
 * __useGetRequestsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetRequestsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsByUserIdQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useGetRequestsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>) {
        return Apollo.useQuery<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>(GetRequestsByUserIdDocument, baseOptions);
      }
export function useGetRequestsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>) {
          return Apollo.useLazyQuery<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>(GetRequestsByUserIdDocument, baseOptions);
        }
export type GetRequestsByUserIdQueryHookResult = ReturnType<typeof useGetRequestsByUserIdQuery>;
export type GetRequestsByUserIdLazyQueryHookResult = ReturnType<typeof useGetRequestsByUserIdLazyQuery>;
export type GetRequestsByUserIdQueryResult = Apollo.QueryResult<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>;
export const GetRequestsByCourseIdsDocument = gql`
    query getRequestsByCourseIds($courseIds: [Int!]!, $termId: Int!) {
  getRequestsByCourseIds(courseIds: $courseIds, termId: $termId) {
    id
    title
    status
    requester {
      id
      username
    }
    session {
      sessionStream {
        name
        timetable {
          termId
          course {
            code
          }
        }
      }
      week
    }
    session {
      week
    }
    swapPreference {
      sessionStream {
        name
      }
      week
    }
    swapPreference {
      week
    }
    type
  }
}
    `;

/**
 * __useGetRequestsByCourseIdsQuery__
 *
 * To run a query within a React component, call `useGetRequestsByCourseIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsByCourseIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsByCourseIdsQuery({
 *   variables: {
 *      courseIds: // value for 'courseIds'
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useGetRequestsByCourseIdsQuery(baseOptions: Apollo.QueryHookOptions<GetRequestsByCourseIdsQuery, GetRequestsByCourseIdsQueryVariables>) {
        return Apollo.useQuery<GetRequestsByCourseIdsQuery, GetRequestsByCourseIdsQueryVariables>(GetRequestsByCourseIdsDocument, baseOptions);
      }
export function useGetRequestsByCourseIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsByCourseIdsQuery, GetRequestsByCourseIdsQueryVariables>) {
          return Apollo.useLazyQuery<GetRequestsByCourseIdsQuery, GetRequestsByCourseIdsQueryVariables>(GetRequestsByCourseIdsDocument, baseOptions);
        }
export type GetRequestsByCourseIdsQueryHookResult = ReturnType<typeof useGetRequestsByCourseIdsQuery>;
export type GetRequestsByCourseIdsLazyQueryHookResult = ReturnType<typeof useGetRequestsByCourseIdsLazyQuery>;
export type GetRequestsByCourseIdsQueryResult = Apollo.QueryResult<GetRequestsByCourseIdsQuery, GetRequestsByCourseIdsQueryVariables>;
export const GetSessionStreamsDocument = gql`
    query GetSessionStreams($termId: Int!, $courseIds: [Int!]!) {
  sessionStreams(courseIds: $courseIds, termId: $termId) {
    id
    type
    name
    startTime
    endTime
    day
    location
    streamAllocations {
      user {
        name
        username
      }
    }
  }
}
    `;

/**
 * __useGetSessionStreamsQuery__
 *
 * To run a query within a React component, call `useGetSessionStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionStreamsQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *      courseIds: // value for 'courseIds'
 *   },
 * });
 */
export function useGetSessionStreamsQuery(baseOptions: Apollo.QueryHookOptions<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>) {
        return Apollo.useQuery<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>(GetSessionStreamsDocument, baseOptions);
      }
export function useGetSessionStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>) {
          return Apollo.useLazyQuery<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>(GetSessionStreamsDocument, baseOptions);
        }
export type GetSessionStreamsQueryHookResult = ReturnType<typeof useGetSessionStreamsQuery>;
export type GetSessionStreamsLazyQueryHookResult = ReturnType<typeof useGetSessionStreamsLazyQuery>;
export type GetSessionStreamsQueryResult = Apollo.QueryResult<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>;
export const GetSessionsDocument = gql`
    query GetSessions($termId: Int!, $week: Int!, $courseIds: [Int!]!) {
  sessions(termId: $termId, courseIds: $courseIds, week: $week) {
    id
    sessionStream {
      name
      startTime
      endTime
      day
      timetable {
        term {
          id
        }
        course {
          id
        }
      }
    }
    location
    week
    sessionAllocations {
      user {
        username
        name
      }
    }
  }
}
    `;

/**
 * __useGetSessionsQuery__
 *
 * To run a query within a React component, call `useGetSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionsQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *      week: // value for 'week'
 *      courseIds: // value for 'courseIds'
 *   },
 * });
 */
export function useGetSessionsQuery(baseOptions: Apollo.QueryHookOptions<GetSessionsQuery, GetSessionsQueryVariables>) {
        return Apollo.useQuery<GetSessionsQuery, GetSessionsQueryVariables>(GetSessionsDocument, baseOptions);
      }
export function useGetSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionsQuery, GetSessionsQueryVariables>) {
          return Apollo.useLazyQuery<GetSessionsQuery, GetSessionsQueryVariables>(GetSessionsDocument, baseOptions);
        }
export type GetSessionsQueryHookResult = ReturnType<typeof useGetSessionsQuery>;
export type GetSessionsLazyQueryHookResult = ReturnType<typeof useGetSessionsLazyQuery>;
export type GetSessionsQueryResult = Apollo.QueryResult<GetSessionsQuery, GetSessionsQueryVariables>;
export const GetSessionByIdDocument = gql`
    query GetSessionById($sessionId: Int!) {
  sessionById(sessionId: $sessionId) {
    id
    sessionStream {
      name
      startTime
      endTime
      day
      timetable {
        term {
          id
        }
        course {
          id
        }
      }
    }
    location
    week
    sessionAllocations {
      user {
        username
        name
      }
    }
  }
}
    `;

/**
 * __useGetSessionByIdQuery__
 *
 * To run a query within a React component, call `useGetSessionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionByIdQuery({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useGetSessionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSessionByIdQuery, GetSessionByIdQueryVariables>) {
        return Apollo.useQuery<GetSessionByIdQuery, GetSessionByIdQueryVariables>(GetSessionByIdDocument, baseOptions);
      }
export function useGetSessionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionByIdQuery, GetSessionByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetSessionByIdQuery, GetSessionByIdQueryVariables>(GetSessionByIdDocument, baseOptions);
        }
export type GetSessionByIdQueryHookResult = ReturnType<typeof useGetSessionByIdQuery>;
export type GetSessionByIdLazyQueryHookResult = ReturnType<typeof useGetSessionByIdLazyQuery>;
export type GetSessionByIdQueryResult = Apollo.QueryResult<GetSessionByIdQuery, GetSessionByIdQueryVariables>;
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
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyAvailabilityDocument = gql`
    query MyAvailability {
  myAvailability {
    id
    startTime
    endTime
    day
  }
}
    `;

/**
 * __useMyAvailabilityQuery__
 *
 * To run a query within a React component, call `useMyAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAvailabilityQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAvailabilityQuery(baseOptions?: Apollo.QueryHookOptions<MyAvailabilityQuery, MyAvailabilityQueryVariables>) {
        return Apollo.useQuery<MyAvailabilityQuery, MyAvailabilityQueryVariables>(MyAvailabilityDocument, baseOptions);
      }
export function useMyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAvailabilityQuery, MyAvailabilityQueryVariables>) {
          return Apollo.useLazyQuery<MyAvailabilityQuery, MyAvailabilityQueryVariables>(MyAvailabilityDocument, baseOptions);
        }
export type MyAvailabilityQueryHookResult = ReturnType<typeof useMyAvailabilityQuery>;
export type MyAvailabilityLazyQueryHookResult = ReturnType<typeof useMyAvailabilityLazyQuery>;
export type MyAvailabilityQueryResult = Apollo.QueryResult<MyAvailabilityQuery, MyAvailabilityQueryVariables>;
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
        term {
          id
        }
      }
      role
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
export function useMyCoursesQuery(baseOptions?: Apollo.QueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>) {
        return Apollo.useQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, baseOptions);
      }
export function useMyCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>) {
          return Apollo.useLazyQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, baseOptions);
        }
export type MyCoursesQueryHookResult = ReturnType<typeof useMyCoursesQuery>;
export type MyCoursesLazyQueryHookResult = ReturnType<typeof useMyCoursesLazyQuery>;
export type MyCoursesQueryResult = Apollo.QueryResult<MyCoursesQuery, MyCoursesQueryVariables>;
export const MyPreferenceDocument = gql`
    query MyPreference($preferenceFind: CourseTermIdInput!) {
  myPreference(preferenceFindInput: $preferenceFind) {
    maxContigHours
    maxWeeklyHours
    sessionType
    courseStaff {
      user {
        username
      }
    }
  }
}
    `;

/**
 * __useMyPreferenceQuery__
 *
 * To run a query within a React component, call `useMyPreferenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPreferenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPreferenceQuery({
 *   variables: {
 *      preferenceFind: // value for 'preferenceFind'
 *   },
 * });
 */
export function useMyPreferenceQuery(baseOptions: Apollo.QueryHookOptions<MyPreferenceQuery, MyPreferenceQueryVariables>) {
        return Apollo.useQuery<MyPreferenceQuery, MyPreferenceQueryVariables>(MyPreferenceDocument, baseOptions);
      }
export function useMyPreferenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPreferenceQuery, MyPreferenceQueryVariables>) {
          return Apollo.useLazyQuery<MyPreferenceQuery, MyPreferenceQueryVariables>(MyPreferenceDocument, baseOptions);
        }
export type MyPreferenceQueryHookResult = ReturnType<typeof useMyPreferenceQuery>;
export type MyPreferenceLazyQueryHookResult = ReturnType<typeof useMyPreferenceLazyQuery>;
export type MyPreferenceQueryResult = Apollo.QueryResult<MyPreferenceQuery, MyPreferenceQueryVariables>;
export const PreferenceByUsernameDocument = gql`
    query PreferenceByUsername($courseTermId: CourseTermIdInput!, $username: String!) {
  preferenceByUsername(courseTermId: $courseTermId, username: $username) {
    maxContigHours
    maxWeeklyHours
    sessionType
    courseStaff {
      user {
        username
      }
    }
  }
}
    `;

/**
 * __usePreferenceByUsernameQuery__
 *
 * To run a query within a React component, call `usePreferenceByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreferenceByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreferenceByUsernameQuery({
 *   variables: {
 *      courseTermId: // value for 'courseTermId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePreferenceByUsernameQuery(baseOptions: Apollo.QueryHookOptions<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>) {
        return Apollo.useQuery<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>(PreferenceByUsernameDocument, baseOptions);
      }
export function usePreferenceByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>) {
          return Apollo.useLazyQuery<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>(PreferenceByUsernameDocument, baseOptions);
        }
export type PreferenceByUsernameQueryHookResult = ReturnType<typeof usePreferenceByUsernameQuery>;
export type PreferenceByUsernameLazyQueryHookResult = ReturnType<typeof usePreferenceByUsernameLazyQuery>;
export type PreferenceByUsernameQueryResult = Apollo.QueryResult<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>;
export const TermsDocument = gql`
    query Terms {
  terms {
    id
    type
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
export function useTermsQuery(baseOptions?: Apollo.QueryHookOptions<TermsQuery, TermsQueryVariables>) {
        return Apollo.useQuery<TermsQuery, TermsQueryVariables>(TermsDocument, baseOptions);
      }
export function useTermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermsQuery, TermsQueryVariables>) {
          return Apollo.useLazyQuery<TermsQuery, TermsQueryVariables>(TermsDocument, baseOptions);
        }
export type TermsQueryHookResult = ReturnType<typeof useTermsQuery>;
export type TermsLazyQueryHookResult = ReturnType<typeof useTermsLazyQuery>;
export type TermsQueryResult = Apollo.QueryResult<TermsQuery, TermsQueryVariables>;
export const TermDocument = gql`
    query Term($termId: Int!) {
  term(termId: $termId) {
    id
    type
    year
    startDate
    endDate
    weekNames
  }
}
    `;

/**
 * __useTermQuery__
 *
 * To run a query within a React component, call `useTermQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useTermQuery(baseOptions: Apollo.QueryHookOptions<TermQuery, TermQueryVariables>) {
        return Apollo.useQuery<TermQuery, TermQueryVariables>(TermDocument, baseOptions);
      }
export function useTermLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermQuery, TermQueryVariables>) {
          return Apollo.useLazyQuery<TermQuery, TermQueryVariables>(TermDocument, baseOptions);
        }
export type TermQueryHookResult = ReturnType<typeof useTermQuery>;
export type TermLazyQueryHookResult = ReturnType<typeof useTermLazyQuery>;
export type TermQueryResult = Apollo.QueryResult<TermQuery, TermQueryVariables>;
export const UpdateAvailabilitiesDocument = gql`
    mutation UpdateAvailabilities($timeslots: [TimeslotInput!]!) {
  updateAvailabilities(timeslots: $timeslots) {
    id
    day
    startTime
    endTime
  }
}
    `;
export type UpdateAvailabilitiesMutationFn = Apollo.MutationFunction<UpdateAvailabilitiesMutation, UpdateAvailabilitiesMutationVariables>;

/**
 * __useUpdateAvailabilitiesMutation__
 *
 * To run a mutation, you first call `useUpdateAvailabilitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvailabilitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvailabilitiesMutation, { data, loading, error }] = useUpdateAvailabilitiesMutation({
 *   variables: {
 *      timeslots: // value for 'timeslots'
 *   },
 * });
 */
export function useUpdateAvailabilitiesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvailabilitiesMutation, UpdateAvailabilitiesMutationVariables>) {
        return Apollo.useMutation<UpdateAvailabilitiesMutation, UpdateAvailabilitiesMutationVariables>(UpdateAvailabilitiesDocument, baseOptions);
      }
export type UpdateAvailabilitiesMutationHookResult = ReturnType<typeof useUpdateAvailabilitiesMutation>;
export type UpdateAvailabilitiesMutationResult = Apollo.MutationResult<UpdateAvailabilitiesMutation>;
export type UpdateAvailabilitiesMutationOptions = Apollo.BaseMutationOptions<UpdateAvailabilitiesMutation, UpdateAvailabilitiesMutationVariables>;
export const UpdatePreferenceDocument = gql`
    mutation UpdatePreference($preferenceFind: CourseTermIdInput!, $preference: PreferenceInput!) {
  updatePreference(preferenceFind: $preferenceFind, preference: $preference) {
    maxContigHours
    maxWeeklyHours
    sessionType
  }
}
    `;
export type UpdatePreferenceMutationFn = Apollo.MutationFunction<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;

/**
 * __useUpdatePreferenceMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceMutation, { data, loading, error }] = useUpdatePreferenceMutation({
 *   variables: {
 *      preferenceFind: // value for 'preferenceFind'
 *      preference: // value for 'preference'
 *   },
 * });
 */
export function useUpdatePreferenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>) {
        return Apollo.useMutation<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>(UpdatePreferenceDocument, baseOptions);
      }
export type UpdatePreferenceMutationHookResult = ReturnType<typeof useUpdatePreferenceMutation>;
export type UpdatePreferenceMutationResult = Apollo.MutationResult<UpdatePreferenceMutation>;
export type UpdatePreferenceMutationOptions = Apollo.BaseMutationOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;
export const EditRequestDocument = gql`
    mutation EditRequest($requestDetails: EditRequestFormInputType!) {
  editExistingRequest(requestDetails: $requestDetails) {
    id
    title
    description
    status
    type
    session {
      sessionStream {
        name
      }
    }
    swapPreference {
      sessionStream {
        name
      }
    }
  }
}
    `;
export type EditRequestMutationFn = Apollo.MutationFunction<EditRequestMutation, EditRequestMutationVariables>;

/**
 * __useEditRequestMutation__
 *
 * To run a mutation, you first call `useEditRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRequestMutation, { data, loading, error }] = useEditRequestMutation({
 *   variables: {
 *      requestDetails: // value for 'requestDetails'
 *   },
 * });
 */
export function useEditRequestMutation(baseOptions?: Apollo.MutationHookOptions<EditRequestMutation, EditRequestMutationVariables>) {
        return Apollo.useMutation<EditRequestMutation, EditRequestMutationVariables>(EditRequestDocument, baseOptions);
      }
export type EditRequestMutationHookResult = ReturnType<typeof useEditRequestMutation>;
export type EditRequestMutationResult = Apollo.MutationResult<EditRequestMutation>;
export type EditRequestMutationOptions = Apollo.BaseMutationOptions<EditRequestMutation, EditRequestMutationVariables>;