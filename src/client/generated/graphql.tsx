import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export enum AllocationStatus {
  Error = 'ERROR',
  Failed = 'FAILED',
  Generated = 'GENERATED',
  NotExist = 'NOT_EXIST',
  NotReady = 'NOT_READY',
  Requested = 'REQUESTED'
}

export type AllocatorOutput = {
  __typename?: 'AllocatorOutput';
  allocatedStreams: Array<AllocatorStream>;
  message: Scalars['String'];
  title: Scalars['String'];
  type: AllocationStatus;
};

export type AllocatorStream = {
  __typename?: 'AllocatorStream';
  baseAllocation: BaseGeneratedAllocationPattern;
  extraAllocations: Array<ExtraGeneratedAllocationPattern>;
  streamId: Scalars['String'];
};

export type BaseGeneratedAllocationPattern = {
  __typename?: 'BaseGeneratedAllocationPattern';
  allocatedUsers: Array<Scalars['String']>;
};

export type Course = {
  __typename?: 'Course';
  code: Scalars['String'];
  id: Scalars['String'];
  timetables: Array<Timetable>;
  title: Scalars['String'];
};

export type CourseInput = {
  code: Scalars['String'];
  title: Scalars['String'];
};

export type CourseStaff = {
  __typename?: 'CourseStaff';
  id: Scalars['String'];
  isNew: Scalars['Boolean'];
  preference: Preference;
  role: Role;
  timetable: Timetable;
  user: User;
};

export type CourseStaffInput = {
  courseId: Scalars['String'];
  isNew: Scalars['Boolean'];
  role: Role;
  termId: Scalars['String'];
};

export type CourseStaffUserInput = {
  courseId: Scalars['String'];
  isNew: Scalars['Boolean'];
  role: Role;
  termId: Scalars['String'];
  username: Scalars['String'];
};

export type CourseTermIdInput = {
  courseId: Scalars['String'];
  termId: Scalars['String'];
};

export type EditOfferInputType = {
  offerId: Scalars['String'];
  sessionPreferences: Array<Scalars['Int']>;
};

export type EditRequestFormInputType = {
  closeRequest: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<RequestType>;
  preferences?: InputMaybe<Array<Scalars['Int']>>;
  requestId: Scalars['String'];
  sessionId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ExtraGeneratedAllocationPattern = {
  __typename?: 'ExtraGeneratedAllocationPattern';
  allocatedUsers: Array<Scalars['String']>;
  weeks: Array<Scalars['Int']>;
};

export enum FreezeState {
  ApprovalRequired = 'APPROVAL_REQUIRED',
  Free = 'FREE',
  Lock = 'LOCK'
}

export type MergedStreamInput = {
  baseStaffRequirement: StreamStaffRequirement;
  courseId: Scalars['String'];
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  extraStaffRequirement: Array<StreamStaffRequirement>;
  location: Scalars['String'];
  name: Scalars['String'];
  startTime: Scalars['Float'];
  termId: Scalars['String'];
  type: SessionType;
};

export enum ModificationType {
  Added = 'ADDED',
  Modified = 'MODIFIED',
  Removed = 'REMOVED',
  RemovedModified = 'REMOVED_MODIFIED',
  Unchanged = 'UNCHANGED'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptOffer: Offer;
  addBasedSessionStream: SessionStream;
  addCourseStaff: CourseStaff;
  addMergedSessionStreams: Array<SessionStream>;
  addSessionStream: SessionStream;
  addStreamStaff: SessionStream;
  addUsersToCourse: Array<CourseStaff>;
  createCourse: Course;
  createOffer: Offer;
  createRequest: StaffRequest;
  createTerm: Term;
  createTimetable: Timetable;
  deleteCourse: Scalars['String'];
  deleteRequestById: Scalars['String'];
  deleteSessionStreams: Array<Scalars['String']>;
  deleteSessions: Array<Scalars['String']>;
  deleteTerm: Scalars['String'];
  deleteTimetable: Scalars['String'];
  editExistingOffer: Offer;
  editExistingRequest: StaffRequest;
  removeCourseStaff: Scalars['String'];
  removeOffer: Offer;
  requestAllocation: AllocatorOutput;
  updateAvailabilities: Array<Timeslot>;
  updateCourse: Course;
  updateDetails: User;
  updatePreference: Preference;
  updateSession: Array<Session>;
  updateSessionAllocations: Array<Session>;
  updateSessionStreams: Array<SessionStream>;
  updateTerm: Term;
  updateTimetable: Timetable;
};


export type MutationAcceptOfferArgs = {
  offerId: Scalars['String'];
  offerSessionSwapId?: InputMaybe<Scalars['String']>;
};


export type MutationAddBasedSessionStreamArgs = {
  name: Scalars['String'];
  numberOfStaff: Scalars['Int'];
  sessionStreamId: Scalars['String'];
  weeks: Array<Scalars['Int']>;
};


export type MutationAddCourseStaffArgs = {
  courseStaffUserInput: CourseStaffUserInput;
};


export type MutationAddMergedSessionStreamsArgs = {
  sessionStreams: Array<MergedStreamInput>;
};


export type MutationAddSessionStreamArgs = {
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  location: Scalars['String'];
  name: Scalars['String'];
  numberOfStaff: Scalars['Int'];
  startTime: Scalars['Float'];
  timetableId: Scalars['String'];
  type: SessionType;
  weeks: Array<Scalars['Int']>;
};


export type MutationAddStreamStaffArgs = {
  newStaffs: Array<Scalars['String']>;
  streamId: Scalars['String'];
  updateSessions: Scalars['Boolean'];
};


export type MutationAddUsersToCourseArgs = {
  courseStaffInput: CourseStaffInput;
  usernames: Array<Scalars['String']>;
};


export type MutationCreateCourseArgs = {
  courseInput: CourseInput;
};


export type MutationCreateOfferArgs = {
  offerDetails: OfferInputType;
};


export type MutationCreateRequestArgs = {
  requestDetails: RequestFormInputType;
};


export type MutationCreateTermArgs = {
  termInput: TermInput;
};


export type MutationCreateTimetableArgs = {
  timetableInput: TimetableInput;
};


export type MutationDeleteCourseArgs = {
  courseId: Scalars['String'];
};


export type MutationDeleteRequestByIdArgs = {
  requestId: Scalars['String'];
};


export type MutationDeleteSessionStreamsArgs = {
  streamIds: Array<Scalars['String']>;
};


export type MutationDeleteSessionsArgs = {
  sessionIds: Array<Scalars['String']>;
};


export type MutationDeleteTermArgs = {
  termId: Scalars['String'];
};


export type MutationDeleteTimetableArgs = {
  timetableId: Scalars['String'];
};


export type MutationEditExistingOfferArgs = {
  editDetails: EditOfferInputType;
};


export type MutationEditExistingRequestArgs = {
  requestDetails: EditRequestFormInputType;
};


export type MutationRemoveCourseStaffArgs = {
  courseStaffId: Scalars['String'];
};


export type MutationRemoveOfferArgs = {
  offerId: Scalars['String'];
};


export type MutationRequestAllocationArgs = {
  requestAllocationInput: RequestAllocationInput;
};


export type MutationUpdateAvailabilitiesArgs = {
  timeslots: Array<TimeslotInput>;
};


export type MutationUpdateCourseArgs = {
  courseInput: UpdateCourseInput;
};


export type MutationUpdateDetailsArgs = {
  details: UpdateDetailsInputType;
};


export type MutationUpdatePreferenceArgs = {
  preference: PreferenceInput;
  preferenceFind: CourseTermIdInput;
};


export type MutationUpdateSessionArgs = {
  updateSessionInput: Array<UpdateSessionInput>;
};


export type MutationUpdateSessionAllocationsArgs = {
  newAllocation: Array<UpdateSessionAllocationInput>;
};


export type MutationUpdateSessionStreamsArgs = {
  updateStreamInput: Array<UpdateStreamInput>;
};


export type MutationUpdateTermArgs = {
  termInput: UpdateTermInput;
};


export type MutationUpdateTimetableArgs = {
  timetableInput: TimetableInput;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String'];
  message: Scalars['String'];
  title: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  acceptedSession?: Maybe<Session>;
  id: Scalars['String'];
  mustSwap: Scalars['Boolean'];
  preferences: Array<Session>;
  request: StaffRequest;
  status: OfferStatus;
  user: User;
};

export type OfferInputType = {
  mustSwap: Scalars['Boolean'];
  requestId: Scalars['String'];
  sessionPreferences?: InputMaybe<Array<Scalars['String']>>;
};

export enum OfferStatus {
  Accepted = 'ACCEPTED',
  AwaitingApproval = 'AWAITING_APPROVAL',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export type Preference = {
  __typename?: 'Preference';
  courseStaff: CourseStaff;
  id: Scalars['String'];
  maxContigHours: Scalars['Float'];
  maxWeeklyHours: Scalars['Float'];
  sessionType?: Maybe<SessionType>;
};

export type PreferenceInput = {
  maxContigHours: Scalars['Float'];
  maxWeeklyHours: Scalars['Float'];
  sessionType?: InputMaybe<SessionType>;
};

export type Query = {
  __typename?: 'Query';
  activeTerm: Term;
  allMergedSessions: Array<Session>;
  checkAllocation: AllocatorOutput;
  course: Course;
  courseStaffs: Array<CourseStaff>;
  courses: Array<Course>;
  fromPublicTimetable: Array<SessionStream>;
  getOfferById: Offer;
  getOffersByRequestId: Array<Offer>;
  getRequestById: StaffRequest;
  getRequestsByTermId: Array<StaffRequest>;
  getRequestsByUserId: Array<StaffRequest>;
  hello: Scalars['String'];
  me: User;
  mergedSessions: Array<Session>;
  myAvailability: Array<Timeslot>;
  myPreference?: Maybe<Preference>;
  preferenceByUsername: Preference;
  rootSessionStreams: Array<SessionStream>;
  sessionById: Session;
  sessionStreams: Array<SessionStream>;
  sessions: Array<Session>;
  staffWithAvailabilities: Array<StaffEnteredAvailability>;
  term: Term;
  terms: Array<Term>;
  timetable: Timetable;
  timetableById: Timetable;
  timetables: Array<Timetable>;
  tutorAvailability: Array<Timeslot>;
};


export type QueryAllMergedSessionsArgs = {
  courseIds: Array<Scalars['String']>;
  mineOnly: Scalars['Boolean'];
  termId: Scalars['String'];
};


export type QueryCheckAllocationArgs = {
  timetableInput: CourseTermIdInput;
};


export type QueryCourseArgs = {
  courseId: Scalars['String'];
};


export type QueryCourseStaffsArgs = {
  courseTermInput: CourseTermIdInput;
};


export type QueryFromPublicTimetableArgs = {
  courseTerm: CourseTermIdInput;
  sessionTypes: Array<SessionType>;
};


export type QueryGetOfferByIdArgs = {
  offerId: Scalars['String'];
};


export type QueryGetOffersByRequestIdArgs = {
  requestId: Scalars['String'];
};


export type QueryGetRequestByIdArgs = {
  requestId: Scalars['String'];
};


export type QueryGetRequestsByTermIdArgs = {
  termId: Scalars['String'];
};


export type QueryMergedSessionsArgs = {
  courseIds: Array<Scalars['String']>;
  termId: Scalars['String'];
  week: Scalars['Int'];
};


export type QueryMyPreferenceArgs = {
  preferenceFindInput: CourseTermIdInput;
};


export type QueryPreferenceByUsernameArgs = {
  courseTermId: CourseTermIdInput;
  username: Scalars['String'];
};


export type QueryRootSessionStreamsArgs = {
  courseIds: Array<Scalars['String']>;
  termId: Scalars['String'];
};


export type QuerySessionByIdArgs = {
  sessionId: Scalars['String'];
};


export type QuerySessionStreamsArgs = {
  courseIds: Array<Scalars['String']>;
  termId: Scalars['String'];
};


export type QuerySessionsArgs = {
  courseIds: Array<Scalars['String']>;
  termId: Scalars['String'];
  week: Scalars['Int'];
};


export type QueryStaffWithAvailabilitiesArgs = {
  courseTermInput: CourseTermIdInput;
};


export type QueryTermArgs = {
  termId: Scalars['String'];
};


export type QueryTimetableArgs = {
  courseTermId: CourseTermIdInput;
};


export type QueryTimetableByIdArgs = {
  id: Scalars['String'];
};


export type QueryTutorAvailabilityArgs = {
  userId: Scalars['String'];
};

export type RequestAllocationInput = {
  courseId: Scalars['String'];
  staffIds: Array<Scalars['String']>;
  termId: Scalars['String'];
  timeout: Scalars['Int'];
};

export type RequestFormInputType = {
  description?: InputMaybe<Scalars['String']>;
  preferences: Array<Scalars['String']>;
  sessionId: Scalars['String'];
  title: Scalars['String'];
  type: RequestType;
};

export enum RequestStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export enum RequestType {
  Permanent = 'PERMANENT',
  Temporary = 'TEMPORARY'
}

export enum Role {
  CourseCoordinator = 'COURSE_COORDINATOR',
  Staff = 'STAFF'
}

export type Session = {
  __typename?: 'Session';
  acceptedOffers: Array<Offer>;
  allocatedUsers: Array<User>;
  date: Scalars['DateTime'];
  id: Scalars['String'];
  location: Scalars['String'];
  numberOfStaff: Scalars['Int'];
  preferredSwapOffers: Array<Offer>;
  preferredSwapRequests: Array<StaffRequest>;
  requests: Array<StaffRequest>;
  sessionStream: SessionStream;
  week: Scalars['Int'];
};

export type SessionStream = {
  __typename?: 'SessionStream';
  allocatedUsers: Array<User>;
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  id: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  numberOfStaff: Scalars['Int'];
  root?: Maybe<SessionStream>;
  secondaryStreams: Array<SessionStream>;
  sessions: Array<Session>;
  startTime: Scalars['Float'];
  timetable: Timetable;
  type: SessionType;
  weeks: Array<Scalars['Int']>;
};

export enum SessionType {
  Contact = 'CONTACT',
  Lecture = 'LECTURE',
  Practical = 'PRACTICAL',
  Seminar = 'SEMINAR',
  Studio = 'STUDIO',
  Tutorial = 'TUTORIAL',
  Workshop = 'WORKSHOP'
}

export type StaffEnteredAvailability = {
  __typename?: 'StaffEnteredAvailability';
  entered: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type StaffRequest = {
  __typename?: 'StaffRequest';
  allowNonPrefOffers: Scalars['Boolean'];
  description: Scalars['String'];
  finaliser?: Maybe<User>;
  id: Scalars['String'];
  offers: Array<Offer>;
  requester: User;
  session: Session;
  status: RequestStatus;
  swapPreference: Array<Session>;
  title: Scalars['String'];
  type: RequestType;
};

export type StreamInput = {
  baseStaffRequirement: StreamStaffRequirement;
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  extraStaffRequirement: Array<StreamStaffRequirement>;
  location: Scalars['String'];
  name: Scalars['String'];
  startTime: Scalars['Float'];
  type: SessionType;
};

export type StreamStaffRequirement = {
  allocatedUsers: Array<Scalars['String']>;
  numberOfStaff: Scalars['Int'];
  weeks: Array<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notifications: Notification;
};


export type SubscriptionNotificationsArgs = {
  key: Scalars['String'];
};

export type Term = {
  __typename?: 'Term';
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  numberOfWeeks: Scalars['Int'];
  startDate: Scalars['DateTime'];
  timetables: Array<Timetable>;
  type: TermType;
  weekNames: Array<Scalars['String']>;
  year: Scalars['Int'];
};

export type TermInput = {
  endDate: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  type: TermType;
  weekNames: Array<Scalars['String']>;
  year: Scalars['Float'];
};

export enum TermType {
  Semester_1 = 'SEMESTER_1',
  Semester_2 = 'SEMESTER_2',
  SummerSemester = 'SUMMER_SEMESTER',
  Trimester_1 = 'TRIMESTER_1',
  Trimester_2 = 'TRIMESTER_2',
  Trimester_3 = 'TRIMESTER_3'
}

export type Timeslot = {
  __typename?: 'Timeslot';
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  id: Scalars['String'];
  startTime: Scalars['Float'];
  user: User;
};

export type TimeslotInput = {
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  id: Scalars['String'];
  modificationType: ModificationType;
  startTime: Scalars['Float'];
};

export type Timetable = {
  __typename?: 'Timetable';
  course: Course;
  courseStaffs: Array<CourseStaff>;
  id: Scalars['String'];
  permanentRequestLock: FreezeState;
  sessionStreams: Array<SessionStream>;
  temporaryRequestLock: FreezeState;
  term: Term;
};

export type TimetableInput = {
  courseId: Scalars['String'];
  permanentRequestLock: Scalars['String'];
  temporaryRequestLock: Scalars['String'];
  termId: Scalars['String'];
};

export type UpdateCourseInput = {
  code: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateDetailsInputType = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateSessionAllocationInput = {
  newAllocation: Array<Scalars['String']>;
  rootSessionId: Scalars['String'];
};

export type UpdateSessionInput = {
  id: Scalars['String'];
  location: Scalars['String'];
};

export type UpdateStreamInput = {
  baseStaffRequirement: StreamStaffRequirement;
  day: Scalars['Int'];
  endTime: Scalars['Float'];
  extraStaffRequirement: Array<StreamStaffRequirement>;
  location: Scalars['String'];
  name: Scalars['String'];
  startTime: Scalars['Float'];
  streamId: Scalars['String'];
  type: SessionType;
};

export type UpdateTermInput = {
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  type: TermType;
  weekNames: Array<Scalars['String']>;
  year: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  availabilities: Array<Timeslot>;
  courseStaffs: Array<CourseStaff>;
  email: Scalars['String'];
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  notifications: Array<Notification>;
  offers: Array<Offer>;
  requests: Array<StaffRequest>;
  settings: UserSettings;
  username: Scalars['String'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  id: Scalars['String'];
  showMySessions: Scalars['Boolean'];
  user: User;
};

export type UpdateDetailsMutationVariables = Exact<{
  details: UpdateDetailsInputType;
}>;


export type UpdateDetailsMutation = { __typename?: 'Mutation', updateDetails: { __typename?: 'User', id: string, name: string, email: string } };

export type RequestAllocationMutationVariables = Exact<{
  requestAllocationInput: RequestAllocationInput;
}>;


export type RequestAllocationMutation = { __typename?: 'Mutation', requestAllocation: { __typename?: 'AllocatorOutput', type: AllocationStatus, title: string, message: string, allocatedStreams: Array<{ __typename?: 'AllocatorStream', streamId: string, baseAllocation: { __typename?: 'BaseGeneratedAllocationPattern', allocatedUsers: Array<string> }, extraAllocations: Array<{ __typename?: 'ExtraGeneratedAllocationPattern', allocatedUsers: Array<string>, weeks: Array<number> }> }> } };

export type CheckAllocationQueryVariables = Exact<{
  timetableInput: CourseTermIdInput;
}>;


export type CheckAllocationQuery = { __typename?: 'Query', checkAllocation: { __typename?: 'AllocatorOutput', type: AllocationStatus, title: string, message: string, allocatedStreams: Array<{ __typename?: 'AllocatorStream', streamId: string, baseAllocation: { __typename?: 'BaseGeneratedAllocationPattern', allocatedUsers: Array<string> }, extraAllocations: Array<{ __typename?: 'ExtraGeneratedAllocationPattern', allocatedUsers: Array<string>, weeks: Array<number> }> }> } };

export type ExportAllocationDataQueryVariables = Exact<{
  courseId: Scalars['String'];
  termId: Scalars['String'];
}>;


export type ExportAllocationDataQuery = { __typename?: 'Query', sessionStreams: Array<{ __typename?: 'SessionStream', type: SessionType, name: string, day: number, startTime: number, endTime: number, location: string, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', code: string } }, root?: { __typename?: 'SessionStream', name: string } | null, allocatedUsers: Array<{ __typename?: 'User', name: string }> }> };

export type AddAvailabilitiesMutationVariables = Exact<{
  timeslots: Array<TimeslotInput> | TimeslotInput;
}>;


export type AddAvailabilitiesMutation = { __typename?: 'Mutation', updateAvailabilities: Array<{ __typename?: 'Timeslot', id: string, day: number, startTime: number, endTime: number }> };

export type MyAvailabilityQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAvailabilityQuery = { __typename?: 'Query', myAvailability: Array<{ __typename?: 'Timeslot', id: string, startTime: number, endTime: number, day: number }> };

export type TutorAvailabilityQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type TutorAvailabilityQuery = { __typename?: 'Query', tutorAvailability: Array<{ __typename?: 'Timeslot', id: string, startTime: number, endTime: number, day: number }> };

export type AvailabilityMonitorQueryVariables = Exact<{
  courseTermInput: CourseTermIdInput;
}>;


export type AvailabilityMonitorQuery = { __typename?: 'Query', staffWithAvailabilities: Array<{ __typename?: 'StaffEnteredAvailability', id: string, name: string, entered: boolean }> };

export type UpdateAvailabilitiesMutationVariables = Exact<{
  timeslots: Array<TimeslotInput> | TimeslotInput;
}>;


export type UpdateAvailabilitiesMutation = { __typename?: 'Mutation', updateAvailabilities: Array<{ __typename?: 'Timeslot', id: string, day: number, startTime: number, endTime: number }> };

export type CourseQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', code: string, title: string } };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: string, code: string, title: string }> };

export type CreateCourseMutationVariables = Exact<{
  courseInput: CourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: string, code: string, title: string } };

export type UpdateCourseMutationVariables = Exact<{
  courseInput: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id: string, code: string, title: string } };

export type DeleteCourseMutationVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse: string };

export type CourseStaffsQueryVariables = Exact<{
  courseTermInput: CourseTermIdInput;
}>;


export type CourseStaffsQuery = { __typename?: 'Query', courseStaffs: Array<{ __typename?: 'CourseStaff', id: string, role: Role, isNew: boolean, user: { __typename?: 'User', id: string, username: string, name: string } }> };

export type AddCourseStaffMutationVariables = Exact<{
  courseStaffInput: CourseStaffInput;
  usernames: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddCourseStaffMutation = { __typename?: 'Mutation', addUsersToCourse: Array<{ __typename?: 'CourseStaff', id: string, role: Role, isNew: boolean, user: { __typename?: 'User', id: string, name: string, username: string } }> };

export type RemoveCourseStaffMutationVariables = Exact<{
  courseStaffId: Scalars['String'];
}>;


export type RemoveCourseStaffMutation = { __typename?: 'Mutation', removeCourseStaff: string };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, name: string, email: string, isAdmin: boolean, courseStaffs: Array<{ __typename?: 'CourseStaff', role: Role, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string } } }> } };

export type MyCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCoursesQuery = { __typename?: 'Query', me: { __typename?: 'User', courseStaffs: Array<{ __typename?: 'CourseStaff', role: Role, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string, title: string }, term: { __typename?: 'Term', id: string } } }> } };

export type AcceptOfferMutationVariables = Exact<{
  offerId: Scalars['String'];
  offerSessionSwapId?: InputMaybe<Scalars['String']>;
}>;


export type AcceptOfferMutation = { __typename?: 'Mutation', acceptOffer: { __typename?: 'Offer', id: string, acceptedSession?: { __typename?: 'Session', id: string } | null } };

export type CreateOfferMutationVariables = Exact<{
  offerDetails: OfferInputType;
}>;


export type CreateOfferMutation = { __typename?: 'Mutation', createOffer: { __typename?: 'Offer', id: string, user: { __typename?: 'User', id: string, username: string }, preferences: Array<{ __typename?: 'Session', sessionStream: { __typename?: 'SessionStream', id: string, name: string } }> } };

export type GetOfferByIdQueryVariables = Exact<{
  offerId: Scalars['String'];
}>;


export type GetOfferByIdQuery = { __typename?: 'Query', getOfferById: { __typename?: 'Offer', id: string, user: { __typename?: 'User', id: string, username: string }, preferences: Array<{ __typename?: 'Session', sessionStream: { __typename?: 'SessionStream', id: string, name: string } }>, request: { __typename?: 'StaffRequest', id: string, status: RequestStatus, requester: { __typename?: 'User', id: string, username: string }, swapPreference: Array<{ __typename?: 'Session', sessionStream: { __typename?: 'SessionStream', id: string, name: string } }>, session: { __typename?: 'Session', sessionStream: { __typename?: 'SessionStream', id: string, name: string } } } } };

export type GetOffersByRequestIdQueryVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type GetOffersByRequestIdQuery = { __typename?: 'Query', getOffersByRequestId: Array<{ __typename?: 'Offer', id: string, preferences: Array<{ __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number } }>, user: { __typename?: 'User', id: string, username: string, name: string } }> };

export type MyPreferenceQueryVariables = Exact<{
  preferenceFind: CourseTermIdInput;
}>;


export type MyPreferenceQuery = { __typename?: 'Query', myPreference?: { __typename?: 'Preference', maxContigHours: number, maxWeeklyHours: number, sessionType?: SessionType | null, courseStaff: { __typename?: 'CourseStaff', user: { __typename?: 'User', username: string } } } | null };

export type PreferenceByUsernameQueryVariables = Exact<{
  courseTermId: CourseTermIdInput;
  username: Scalars['String'];
}>;


export type PreferenceByUsernameQuery = { __typename?: 'Query', preferenceByUsername: { __typename?: 'Preference', maxContigHours: number, maxWeeklyHours: number, sessionType?: SessionType | null, courseStaff: { __typename?: 'CourseStaff', user: { __typename?: 'User', username: string } } } };

export type UpdatePreferenceMutationVariables = Exact<{
  preferenceFind: CourseTermIdInput;
  preference: PreferenceInput;
}>;


export type UpdatePreferenceMutation = { __typename?: 'Mutation', updatePreference: { __typename?: 'Preference', maxContigHours: number, maxWeeklyHours: number, sessionType?: SessionType | null } };

export type CreateRequestMutationVariables = Exact<{
  requestDetails: RequestFormInputType;
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', createRequest: { __typename?: 'StaffRequest', id: string, title: string, status: RequestStatus, type: RequestType, description: string, requester: { __typename?: 'User', id: string, username: string, name: string }, session: { __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } }, allocatedUsers: Array<{ __typename?: 'User', username: string, name: string }> }, swapPreference: Array<{ __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } } }> } };

export type DeleteRequestMutationVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type DeleteRequestMutation = { __typename?: 'Mutation', deleteRequestById: string };

export type EditRequestMutationVariables = Exact<{
  requestDetails: EditRequestFormInputType;
}>;


export type EditRequestMutation = { __typename?: 'Mutation', editExistingRequest: { __typename?: 'StaffRequest', id: string, title: string, description: string, status: RequestStatus, type: RequestType, session: { __typename?: 'Session', sessionStream: { __typename?: 'SessionStream', name: string } }, swapPreference: Array<{ __typename?: 'Session', sessionStream: { __typename?: 'SessionStream', name: string } }> } };

export type GetRequestByIdQueryVariables = Exact<{
  requestId: Scalars['String'];
}>;


export type GetRequestByIdQuery = { __typename?: 'Query', getRequestById: { __typename?: 'StaffRequest', id: string, title: string, status: RequestStatus, type: RequestType, description: string, requester: { __typename?: 'User', id: string, username: string, name: string }, session: { __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } }, allocatedUsers: Array<{ __typename?: 'User', username: string, name: string }> }, swapPreference: Array<{ __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } } }> } };

export type GetRequestsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRequestsByUserIdQuery = { __typename?: 'Query', getRequestsByUserId: Array<{ __typename?: 'StaffRequest', id: string, title: string, status: RequestStatus, type: RequestType, description: string, requester: { __typename?: 'User', id: string, username: string, name: string }, session: { __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } }, allocatedUsers: Array<{ __typename?: 'User', username: string, name: string }> }, swapPreference: Array<{ __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } } }> }> };

export type GetRequestsByTermIdQueryVariables = Exact<{
  termId: Scalars['String'];
}>;


export type GetRequestsByTermIdQuery = { __typename?: 'Query', getRequestsByTermId: Array<{ __typename?: 'StaffRequest', id: string, title: string, status: RequestStatus, type: RequestType, description: string, requester: { __typename?: 'User', id: string, username: string, name: string }, session: { __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } }, allocatedUsers: Array<{ __typename?: 'User', username: string, name: string }> }, swapPreference: Array<{ __typename?: 'Session', id: string, week: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, weeks: Array<number>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string>, startDate: Date } } } }> }> };

export type GetSessionStreamsQueryVariables = Exact<{
  termId: Scalars['String'];
  courseIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetSessionStreamsQuery = { __typename?: 'Query', sessionStreams: Array<{ __typename?: 'SessionStream', id: string, type: SessionType, name: string, startTime: number, endTime: number, day: number, location: string, numberOfStaff: number, allocatedUsers: Array<{ __typename?: 'User', name: string, username: string }> }> };

export type GetRootSessionStreamsQueryVariables = Exact<{
  termId: Scalars['String'];
  courseIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetRootSessionStreamsQuery = { __typename?: 'Query', rootSessionStreams: Array<{ __typename?: 'SessionStream', id: string, type: SessionType, name: string, startTime: number, endTime: number, day: number, location: string, numberOfStaff: number, weeks: Array<number>, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }>, secondaryStreams: Array<{ __typename?: 'SessionStream', weeks: Array<number>, numberOfStaff: number, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }> }>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string> } } }> };

export type StreamsFromPublicTimetableQueryVariables = Exact<{
  courseTerm: CourseTermIdInput;
  sessionTypes: Array<SessionType> | SessionType;
}>;


export type StreamsFromPublicTimetableQuery = { __typename?: 'Query', fromPublicTimetable: Array<{ __typename?: 'SessionStream', id: string, type: SessionType, name: string, startTime: number, endTime: number, day: number, location: string, numberOfStaff: number, weeks: Array<number>, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }>, secondaryStreams: Array<{ __typename?: 'SessionStream', weeks: Array<number>, numberOfStaff: number, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }> }>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string> } } }> };

export type UpdateSessionStreamsMutationVariables = Exact<{
  updateStreamInput: Array<UpdateStreamInput> | UpdateStreamInput;
}>;


export type UpdateSessionStreamsMutation = { __typename?: 'Mutation', updateSessionStreams: Array<{ __typename?: 'SessionStream', id: string, type: SessionType, name: string, startTime: number, endTime: number, day: number, location: string, numberOfStaff: number, weeks: Array<number>, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }>, secondaryStreams: Array<{ __typename?: 'SessionStream', weeks: Array<number>, numberOfStaff: number, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }> }>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string> } } }> };

export type AddMergedSessionStreamsMutationVariables = Exact<{
  sessionStreams: Array<MergedStreamInput> | MergedStreamInput;
}>;


export type AddMergedSessionStreamsMutation = { __typename?: 'Mutation', addMergedSessionStreams: Array<{ __typename?: 'SessionStream', id: string, type: SessionType, name: string, startTime: number, endTime: number, day: number, location: string, numberOfStaff: number, weeks: Array<number>, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }>, secondaryStreams: Array<{ __typename?: 'SessionStream', weeks: Array<number>, numberOfStaff: number, allocatedUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }> }>, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, weekNames: Array<string> } } }> };

export type DeleteSessionStreamsMutationVariables = Exact<{
  streamIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteSessionStreamsMutation = { __typename?: 'Mutation', deleteSessionStreams: Array<string> };

export type SessionInfoFragment = { __typename?: 'Session', id: string, location: string, week: number, numberOfStaff: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', term: { __typename?: 'Term', id: string }, course: { __typename?: 'Course', id: string, code: string } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> };

export type GetSessionsQueryVariables = Exact<{
  termId: Scalars['String'];
  week: Scalars['Int'];
  courseIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetSessionsQuery = { __typename?: 'Query', sessions: Array<{ __typename?: 'Session', id: string, location: string, week: number, numberOfStaff: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', term: { __typename?: 'Term', id: string }, course: { __typename?: 'Course', id: string, code: string } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> }> };

export type GetMergedSessionsQueryVariables = Exact<{
  termId: Scalars['String'];
  week: Scalars['Int'];
  courseIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetMergedSessionsQuery = { __typename?: 'Query', mergedSessions: Array<{ __typename?: 'Session', id: string, location: string, week: number, numberOfStaff: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', term: { __typename?: 'Term', id: string }, course: { __typename?: 'Course', id: string, code: string } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> }> };

export type GetSessionByIdQueryVariables = Exact<{
  sessionId: Scalars['String'];
}>;


export type GetSessionByIdQuery = { __typename?: 'Query', sessionById: { __typename?: 'Session', id: string, location: string, week: number, numberOfStaff: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', term: { __typename?: 'Term', id: string }, course: { __typename?: 'Course', id: string, code: string } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> } };

export type UpdateSessionAllocationMutationVariables = Exact<{
  newAllocation: Array<UpdateSessionAllocationInput> | UpdateSessionAllocationInput;
}>;


export type UpdateSessionAllocationMutation = { __typename?: 'Mutation', updateSessionAllocations: Array<{ __typename?: 'Session', id: string, location: string, week: number, numberOfStaff: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', term: { __typename?: 'Term', id: string }, course: { __typename?: 'Course', id: string, code: string } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> }> };

export type UpdateSessionMutationVariables = Exact<{
  updateSessionInput: Array<UpdateSessionInput> | UpdateSessionInput;
}>;


export type UpdateSessionMutation = { __typename?: 'Mutation', updateSession: Array<{ __typename?: 'Session', id: string, location: string, week: number, numberOfStaff: number, sessionStream: { __typename?: 'SessionStream', id: string, name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', term: { __typename?: 'Term', id: string }, course: { __typename?: 'Course', id: string, code: string } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> }> };

export type DeleteSessionsMutationVariables = Exact<{
  sessionIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteSessionsMutation = { __typename?: 'Mutation', deleteSessions: Array<string> };

export type GetAllSessionsQueryVariables = Exact<{
  courseIds: Array<Scalars['String']> | Scalars['String'];
  termId: Scalars['String'];
  mineOnly: Scalars['Boolean'];
}>;


export type GetAllSessionsQuery = { __typename?: 'Query', allMergedSessions: Array<{ __typename?: 'Session', id: string, week: number, location: string, sessionStream: { __typename?: 'SessionStream', name: string, startTime: number, endTime: number, day: number, timetable: { __typename?: 'Timetable', course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', startDate: Date } } }, allocatedUsers: Array<{ __typename?: 'User', id: string, username: string, name: string }> }> };

export type NotificationsSubscriptionVariables = Exact<{
  key: Scalars['String'];
}>;


export type NotificationsSubscription = { __typename?: 'Subscription', notifications: { __typename?: 'Notification', id: string, title: string, message: string } };

export type TermsQueryVariables = Exact<{ [key: string]: never; }>;


export type TermsQuery = { __typename?: 'Query', terms: Array<{ __typename?: 'Term', id: string, type: TermType, year: number, startDate: Date, endDate: Date, weekNames: Array<string>, isActive: boolean, numberOfWeeks: number }> };

export type TermQueryVariables = Exact<{
  termId: Scalars['String'];
}>;


export type TermQuery = { __typename?: 'Query', term: { __typename?: 'Term', id: string, type: TermType, year: number, startDate: Date, endDate: Date, weekNames: Array<string>, isActive: boolean, numberOfWeeks: number } };

export type CreateTermMutationVariables = Exact<{
  termInput: TermInput;
}>;


export type CreateTermMutation = { __typename?: 'Mutation', createTerm: { __typename?: 'Term', id: string, type: TermType, year: number, startDate: Date, endDate: Date, weekNames: Array<string>, isActive: boolean, numberOfWeeks: number } };

export type UpdateTermMutationVariables = Exact<{
  termInput: UpdateTermInput;
}>;


export type UpdateTermMutation = { __typename?: 'Mutation', updateTerm: { __typename?: 'Term', id: string, type: TermType, year: number, startDate: Date, endDate: Date, weekNames: Array<string>, isActive: boolean, numberOfWeeks: number } };

export type DeleteTermMutationVariables = Exact<{
  termId: Scalars['String'];
}>;


export type DeleteTermMutation = { __typename?: 'Mutation', deleteTerm: string };

export type TimetablesQueryVariables = Exact<{ [key: string]: never; }>;


export type TimetablesQuery = { __typename?: 'Query', timetables: Array<{ __typename?: 'Timetable', id: string, permanentRequestLock: FreezeState, temporaryRequestLock: FreezeState, course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, type: TermType, year: number } }> };

export type CreateTimetableMutationVariables = Exact<{
  timetableInput: TimetableInput;
}>;


export type CreateTimetableMutation = { __typename?: 'Mutation', createTimetable: { __typename?: 'Timetable', id: string, permanentRequestLock: FreezeState, temporaryRequestLock: FreezeState, course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, type: TermType, year: number } } };

export type UpdateTimetableMutationVariables = Exact<{
  timetableInput: TimetableInput;
}>;


export type UpdateTimetableMutation = { __typename?: 'Mutation', updateTimetable: { __typename?: 'Timetable', id: string, permanentRequestLock: FreezeState, temporaryRequestLock: FreezeState, course: { __typename?: 'Course', id: string, code: string }, term: { __typename?: 'Term', id: string, type: TermType, year: number } } };

export type DeleteTimetableMutationVariables = Exact<{
  timetableId: Scalars['String'];
}>;


export type DeleteTimetableMutation = { __typename?: 'Mutation', deleteTimetable: string };

export const SessionInfoFragmentDoc = gql`
    fragment SessionInfo on Session {
  id
  sessionStream {
    id
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
        code
      }
    }
  }
  location
  week
  numberOfStaff
  allocatedUsers {
    id
    username
    name
  }
}
    `;
export const UpdateDetailsDocument = gql`
    mutation updateDetails($details: UpdateDetailsInputType!) {
  updateDetails(details: $details) {
    id
    name
    email
  }
}
    `;
export type UpdateDetailsMutationFn = Apollo.MutationFunction<UpdateDetailsMutation, UpdateDetailsMutationVariables>;

/**
 * __useUpdateDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDetailsMutation, { data, loading, error }] = useUpdateDetailsMutation({
 *   variables: {
 *      details: // value for 'details'
 *   },
 * });
 */
export function useUpdateDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDetailsMutation, UpdateDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDetailsMutation, UpdateDetailsMutationVariables>(UpdateDetailsDocument, options);
      }
export type UpdateDetailsMutationHookResult = ReturnType<typeof useUpdateDetailsMutation>;
export type UpdateDetailsMutationResult = Apollo.MutationResult<UpdateDetailsMutation>;
export type UpdateDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateDetailsMutation, UpdateDetailsMutationVariables>;
export const RequestAllocationDocument = gql`
    mutation RequestAllocation($requestAllocationInput: RequestAllocationInput!) {
  requestAllocation(requestAllocationInput: $requestAllocationInput) {
    type
    title
    message
    allocatedStreams {
      streamId
      baseAllocation {
        allocatedUsers
      }
      extraAllocations {
        allocatedUsers
        weeks
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
 *      requestAllocationInput: // value for 'requestAllocationInput'
 *   },
 * });
 */
export function useRequestAllocationMutation(baseOptions?: Apollo.MutationHookOptions<RequestAllocationMutation, RequestAllocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestAllocationMutation, RequestAllocationMutationVariables>(RequestAllocationDocument, options);
      }
export type RequestAllocationMutationHookResult = ReturnType<typeof useRequestAllocationMutation>;
export type RequestAllocationMutationResult = Apollo.MutationResult<RequestAllocationMutation>;
export type RequestAllocationMutationOptions = Apollo.BaseMutationOptions<RequestAllocationMutation, RequestAllocationMutationVariables>;
export const CheckAllocationDocument = gql`
    query CheckAllocation($timetableInput: CourseTermIdInput!) {
  checkAllocation(timetableInput: $timetableInput) {
    type
    title
    message
    allocatedStreams {
      streamId
      baseAllocation {
        allocatedUsers
      }
      extraAllocations {
        allocatedUsers
        weeks
      }
    }
  }
}
    `;

/**
 * __useCheckAllocationQuery__
 *
 * To run a query within a React component, call `useCheckAllocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAllocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAllocationQuery({
 *   variables: {
 *      timetableInput: // value for 'timetableInput'
 *   },
 * });
 */
export function useCheckAllocationQuery(baseOptions: Apollo.QueryHookOptions<CheckAllocationQuery, CheckAllocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckAllocationQuery, CheckAllocationQueryVariables>(CheckAllocationDocument, options);
      }
export function useCheckAllocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckAllocationQuery, CheckAllocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckAllocationQuery, CheckAllocationQueryVariables>(CheckAllocationDocument, options);
        }
export type CheckAllocationQueryHookResult = ReturnType<typeof useCheckAllocationQuery>;
export type CheckAllocationLazyQueryHookResult = ReturnType<typeof useCheckAllocationLazyQuery>;
export type CheckAllocationQueryResult = Apollo.QueryResult<CheckAllocationQuery, CheckAllocationQueryVariables>;
export const ExportAllocationDataDocument = gql`
    query exportAllocationData($courseId: String!, $termId: String!) {
  sessionStreams(courseIds: [$courseId], termId: $termId) {
    timetable {
      course {
        code
      }
    }
    type
    root {
      name
    }
    name
    day
    startTime
    endTime
    location
    weeks
    allocatedUsers {
      name
    }
  }
}
    `;

/**
 * __useExportAllocationDataQuery__
 *
 * To run a query within a React component, call `useExportAllocationDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportAllocationDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportAllocationDataQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useExportAllocationDataQuery(baseOptions: Apollo.QueryHookOptions<ExportAllocationDataQuery, ExportAllocationDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportAllocationDataQuery, ExportAllocationDataQueryVariables>(ExportAllocationDataDocument, options);
      }
export function useExportAllocationDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportAllocationDataQuery, ExportAllocationDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportAllocationDataQuery, ExportAllocationDataQueryVariables>(ExportAllocationDataDocument, options);
        }
export type ExportAllocationDataQueryHookResult = ReturnType<typeof useExportAllocationDataQuery>;
export type ExportAllocationDataLazyQueryHookResult = ReturnType<typeof useExportAllocationDataLazyQuery>;
export type ExportAllocationDataQueryResult = Apollo.QueryResult<ExportAllocationDataQuery, ExportAllocationDataQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAvailabilitiesMutation, AddAvailabilitiesMutationVariables>(AddAvailabilitiesDocument, options);
      }
export type AddAvailabilitiesMutationHookResult = ReturnType<typeof useAddAvailabilitiesMutation>;
export type AddAvailabilitiesMutationResult = Apollo.MutationResult<AddAvailabilitiesMutation>;
export type AddAvailabilitiesMutationOptions = Apollo.BaseMutationOptions<AddAvailabilitiesMutation, AddAvailabilitiesMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAvailabilityQuery, MyAvailabilityQueryVariables>(MyAvailabilityDocument, options);
      }
export function useMyAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAvailabilityQuery, MyAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAvailabilityQuery, MyAvailabilityQueryVariables>(MyAvailabilityDocument, options);
        }
export type MyAvailabilityQueryHookResult = ReturnType<typeof useMyAvailabilityQuery>;
export type MyAvailabilityLazyQueryHookResult = ReturnType<typeof useMyAvailabilityLazyQuery>;
export type MyAvailabilityQueryResult = Apollo.QueryResult<MyAvailabilityQuery, MyAvailabilityQueryVariables>;
export const TutorAvailabilityDocument = gql`
    query TutorAvailability($userId: String!) {
  tutorAvailability(userId: $userId) {
    id
    startTime
    endTime
    day
  }
}
    `;

/**
 * __useTutorAvailabilityQuery__
 *
 * To run a query within a React component, call `useTutorAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useTutorAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTutorAvailabilityQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTutorAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<TutorAvailabilityQuery, TutorAvailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TutorAvailabilityQuery, TutorAvailabilityQueryVariables>(TutorAvailabilityDocument, options);
      }
export function useTutorAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TutorAvailabilityQuery, TutorAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TutorAvailabilityQuery, TutorAvailabilityQueryVariables>(TutorAvailabilityDocument, options);
        }
export type TutorAvailabilityQueryHookResult = ReturnType<typeof useTutorAvailabilityQuery>;
export type TutorAvailabilityLazyQueryHookResult = ReturnType<typeof useTutorAvailabilityLazyQuery>;
export type TutorAvailabilityQueryResult = Apollo.QueryResult<TutorAvailabilityQuery, TutorAvailabilityQueryVariables>;
export const AvailabilityMonitorDocument = gql`
    query AvailabilityMonitor($courseTermInput: CourseTermIdInput!) {
  staffWithAvailabilities(courseTermInput: $courseTermInput) {
    id
    name
    entered
  }
}
    `;

/**
 * __useAvailabilityMonitorQuery__
 *
 * To run a query within a React component, call `useAvailabilityMonitorQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailabilityMonitorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailabilityMonitorQuery({
 *   variables: {
 *      courseTermInput: // value for 'courseTermInput'
 *   },
 * });
 */
export function useAvailabilityMonitorQuery(baseOptions: Apollo.QueryHookOptions<AvailabilityMonitorQuery, AvailabilityMonitorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailabilityMonitorQuery, AvailabilityMonitorQueryVariables>(AvailabilityMonitorDocument, options);
      }
export function useAvailabilityMonitorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailabilityMonitorQuery, AvailabilityMonitorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailabilityMonitorQuery, AvailabilityMonitorQueryVariables>(AvailabilityMonitorDocument, options);
        }
export type AvailabilityMonitorQueryHookResult = ReturnType<typeof useAvailabilityMonitorQuery>;
export type AvailabilityMonitorLazyQueryHookResult = ReturnType<typeof useAvailabilityMonitorLazyQuery>;
export type AvailabilityMonitorQueryResult = Apollo.QueryResult<AvailabilityMonitorQuery, AvailabilityMonitorQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvailabilitiesMutation, UpdateAvailabilitiesMutationVariables>(UpdateAvailabilitiesDocument, options);
      }
export type UpdateAvailabilitiesMutationHookResult = ReturnType<typeof useUpdateAvailabilitiesMutation>;
export type UpdateAvailabilitiesMutationResult = Apollo.MutationResult<UpdateAvailabilitiesMutation>;
export type UpdateAvailabilitiesMutationOptions = Apollo.BaseMutationOptions<UpdateAvailabilitiesMutation, UpdateAvailabilitiesMutationVariables>;
export const CourseDocument = gql`
    query Course($courseId: String!) {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const CoursesDocument = gql`
    query Courses {
  courses {
    id
    code
    title
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($courseInput: CourseInput!) {
  createCourse(courseInput: $courseInput) {
    id
    code
    title
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      courseInput: // value for 'courseInput'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($courseInput: UpdateCourseInput!) {
  updateCourse(courseInput: $courseInput) {
    id
    code
    title
  }
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      courseInput: // value for 'courseInput'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($courseId: String!) {
  deleteCourse(courseId: $courseId)
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseStaffsQuery, CourseStaffsQueryVariables>(CourseStaffsDocument, options);
      }
export function useCourseStaffsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseStaffsQuery, CourseStaffsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseStaffsQuery, CourseStaffsQueryVariables>(CourseStaffsDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCourseStaffMutation, AddCourseStaffMutationVariables>(AddCourseStaffDocument, options);
      }
export type AddCourseStaffMutationHookResult = ReturnType<typeof useAddCourseStaffMutation>;
export type AddCourseStaffMutationResult = Apollo.MutationResult<AddCourseStaffMutation>;
export type AddCourseStaffMutationOptions = Apollo.BaseMutationOptions<AddCourseStaffMutation, AddCourseStaffMutationVariables>;
export const RemoveCourseStaffDocument = gql`
    mutation RemoveCourseStaff($courseStaffId: String!) {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCourseStaffMutation, RemoveCourseStaffMutationVariables>(RemoveCourseStaffDocument, options);
      }
export type RemoveCourseStaffMutationHookResult = ReturnType<typeof useRemoveCourseStaffMutation>;
export type RemoveCourseStaffMutationResult = Apollo.MutationResult<RemoveCourseStaffMutation>;
export type RemoveCourseStaffMutationOptions = Apollo.BaseMutationOptions<RemoveCourseStaffMutation, RemoveCourseStaffMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
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
    isAdmin
    courseStaffs {
      timetable {
        course {
          id
          code
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, options);
      }
export function useMyCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, options);
        }
export type MyCoursesQueryHookResult = ReturnType<typeof useMyCoursesQuery>;
export type MyCoursesLazyQueryHookResult = ReturnType<typeof useMyCoursesLazyQuery>;
export type MyCoursesQueryResult = Apollo.QueryResult<MyCoursesQuery, MyCoursesQueryVariables>;
export const AcceptOfferDocument = gql`
    mutation AcceptOffer($offerId: String!, $offerSessionSwapId: String) {
  acceptOffer(offerId: $offerId, offerSessionSwapId: $offerSessionSwapId) {
    id
    acceptedSession {
      id
    }
  }
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptOfferMutation, AcceptOfferMutationVariables>(AcceptOfferDocument, options);
      }
export type AcceptOfferMutationHookResult = ReturnType<typeof useAcceptOfferMutation>;
export type AcceptOfferMutationResult = Apollo.MutationResult<AcceptOfferMutation>;
export type AcceptOfferMutationOptions = Apollo.BaseMutationOptions<AcceptOfferMutation, AcceptOfferMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOfferMutation, CreateOfferMutationVariables>(CreateOfferDocument, options);
      }
export type CreateOfferMutationHookResult = ReturnType<typeof useCreateOfferMutation>;
export type CreateOfferMutationResult = Apollo.MutationResult<CreateOfferMutation>;
export type CreateOfferMutationOptions = Apollo.BaseMutationOptions<CreateOfferMutation, CreateOfferMutationVariables>;
export const GetOfferByIdDocument = gql`
    query getOfferById($offerId: String!) {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOfferByIdQuery, GetOfferByIdQueryVariables>(GetOfferByIdDocument, options);
      }
export function useGetOfferByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOfferByIdQuery, GetOfferByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOfferByIdQuery, GetOfferByIdQueryVariables>(GetOfferByIdDocument, options);
        }
export type GetOfferByIdQueryHookResult = ReturnType<typeof useGetOfferByIdQuery>;
export type GetOfferByIdLazyQueryHookResult = ReturnType<typeof useGetOfferByIdLazyQuery>;
export type GetOfferByIdQueryResult = Apollo.QueryResult<GetOfferByIdQuery, GetOfferByIdQueryVariables>;
export const GetOffersByRequestIdDocument = gql`
    query getOffersByRequestId($requestId: String!) {
  getOffersByRequestId(requestId: $requestId) {
    id
    preferences {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        day
      }
      week
    }
    user {
      id
      username
      name
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>(GetOffersByRequestIdDocument, options);
      }
export function useGetOffersByRequestIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>(GetOffersByRequestIdDocument, options);
        }
export type GetOffersByRequestIdQueryHookResult = ReturnType<typeof useGetOffersByRequestIdQuery>;
export type GetOffersByRequestIdLazyQueryHookResult = ReturnType<typeof useGetOffersByRequestIdLazyQuery>;
export type GetOffersByRequestIdQueryResult = Apollo.QueryResult<GetOffersByRequestIdQuery, GetOffersByRequestIdQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPreferenceQuery, MyPreferenceQueryVariables>(MyPreferenceDocument, options);
      }
export function useMyPreferenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPreferenceQuery, MyPreferenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPreferenceQuery, MyPreferenceQueryVariables>(MyPreferenceDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>(PreferenceByUsernameDocument, options);
      }
export function usePreferenceByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>(PreferenceByUsernameDocument, options);
        }
export type PreferenceByUsernameQueryHookResult = ReturnType<typeof usePreferenceByUsernameQuery>;
export type PreferenceByUsernameLazyQueryHookResult = ReturnType<typeof usePreferenceByUsernameLazyQuery>;
export type PreferenceByUsernameQueryResult = Apollo.QueryResult<PreferenceByUsernameQuery, PreferenceByUsernameQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>(UpdatePreferenceDocument, options);
      }
export type UpdatePreferenceMutationHookResult = ReturnType<typeof useUpdatePreferenceMutation>;
export type UpdatePreferenceMutationResult = Apollo.MutationResult<UpdatePreferenceMutation>;
export type UpdatePreferenceMutationOptions = Apollo.BaseMutationOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;
export const CreateRequestDocument = gql`
    mutation CreateRequest($requestDetails: RequestFormInputType!) {
  createRequest(requestDetails: $requestDetails) {
    id
    title
    status
    type
    description
    requester {
      id
      username
      name
    }
    session {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
      allocatedUsers {
        username
        name
      }
    }
    swapPreference {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument, options);
      }
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<CreateRequestMutation, CreateRequestMutationVariables>;
export const DeleteRequestDocument = gql`
    mutation DeleteRequest($requestId: String!) {
  deleteRequestById(requestId: $requestId)
}
    `;
export type DeleteRequestMutationFn = Apollo.MutationFunction<DeleteRequestMutation, DeleteRequestMutationVariables>;

/**
 * __useDeleteRequestMutation__
 *
 * To run a mutation, you first call `useDeleteRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRequestMutation, { data, loading, error }] = useDeleteRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useDeleteRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRequestMutation, DeleteRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRequestMutation, DeleteRequestMutationVariables>(DeleteRequestDocument, options);
      }
export type DeleteRequestMutationHookResult = ReturnType<typeof useDeleteRequestMutation>;
export type DeleteRequestMutationResult = Apollo.MutationResult<DeleteRequestMutation>;
export type DeleteRequestMutationOptions = Apollo.BaseMutationOptions<DeleteRequestMutation, DeleteRequestMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditRequestMutation, EditRequestMutationVariables>(EditRequestDocument, options);
      }
export type EditRequestMutationHookResult = ReturnType<typeof useEditRequestMutation>;
export type EditRequestMutationResult = Apollo.MutationResult<EditRequestMutation>;
export type EditRequestMutationOptions = Apollo.BaseMutationOptions<EditRequestMutation, EditRequestMutationVariables>;
export const GetRequestByIdDocument = gql`
    query getRequestById($requestId: String!) {
  getRequestById(requestId: $requestId) {
    id
    title
    status
    type
    description
    requester {
      id
      username
      name
    }
    session {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
      allocatedUsers {
        username
        name
      }
    }
    swapPreference {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestByIdQuery, GetRequestByIdQueryVariables>(GetRequestByIdDocument, options);
      }
export function useGetRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestByIdQuery, GetRequestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestByIdQuery, GetRequestByIdQueryVariables>(GetRequestByIdDocument, options);
        }
export type GetRequestByIdQueryHookResult = ReturnType<typeof useGetRequestByIdQuery>;
export type GetRequestByIdLazyQueryHookResult = ReturnType<typeof useGetRequestByIdLazyQuery>;
export type GetRequestByIdQueryResult = Apollo.QueryResult<GetRequestByIdQuery, GetRequestByIdQueryVariables>;
export const GetRequestsByUserIdDocument = gql`
    query getRequestsByUserId {
  getRequestsByUserId {
    id
    title
    status
    type
    description
    requester {
      id
      username
      name
    }
    session {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
      allocatedUsers {
        username
        name
      }
    }
    swapPreference {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
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
 *   },
 * });
 */
export function useGetRequestsByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>(GetRequestsByUserIdDocument, options);
      }
export function useGetRequestsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>(GetRequestsByUserIdDocument, options);
        }
export type GetRequestsByUserIdQueryHookResult = ReturnType<typeof useGetRequestsByUserIdQuery>;
export type GetRequestsByUserIdLazyQueryHookResult = ReturnType<typeof useGetRequestsByUserIdLazyQuery>;
export type GetRequestsByUserIdQueryResult = Apollo.QueryResult<GetRequestsByUserIdQuery, GetRequestsByUserIdQueryVariables>;
export const GetRequestsByTermIdDocument = gql`
    query getRequestsByTermId($termId: String!) {
  getRequestsByTermId(termId: $termId) {
    id
    title
    status
    type
    description
    requester {
      id
      username
      name
    }
    session {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
      allocatedUsers {
        username
        name
      }
    }
    swapPreference {
      id
      sessionStream {
        id
        name
        startTime
        endTime
        weeks
        timetable {
          course {
            id
            code
          }
          term {
            id
            weekNames
            startDate
          }
        }
      }
      week
    }
  }
}
    `;

/**
 * __useGetRequestsByTermIdQuery__
 *
 * To run a query within a React component, call `useGetRequestsByTermIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsByTermIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsByTermIdQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useGetRequestsByTermIdQuery(baseOptions: Apollo.QueryHookOptions<GetRequestsByTermIdQuery, GetRequestsByTermIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestsByTermIdQuery, GetRequestsByTermIdQueryVariables>(GetRequestsByTermIdDocument, options);
      }
export function useGetRequestsByTermIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsByTermIdQuery, GetRequestsByTermIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestsByTermIdQuery, GetRequestsByTermIdQueryVariables>(GetRequestsByTermIdDocument, options);
        }
export type GetRequestsByTermIdQueryHookResult = ReturnType<typeof useGetRequestsByTermIdQuery>;
export type GetRequestsByTermIdLazyQueryHookResult = ReturnType<typeof useGetRequestsByTermIdLazyQuery>;
export type GetRequestsByTermIdQueryResult = Apollo.QueryResult<GetRequestsByTermIdQuery, GetRequestsByTermIdQueryVariables>;
export const GetSessionStreamsDocument = gql`
    query GetSessionStreams($termId: String!, $courseIds: [String!]!) {
  sessionStreams(courseIds: $courseIds, termId: $termId) {
    id
    type
    name
    startTime
    endTime
    day
    location
    numberOfStaff
    allocatedUsers {
      name
      username
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>(GetSessionStreamsDocument, options);
      }
export function useGetSessionStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>(GetSessionStreamsDocument, options);
        }
export type GetSessionStreamsQueryHookResult = ReturnType<typeof useGetSessionStreamsQuery>;
export type GetSessionStreamsLazyQueryHookResult = ReturnType<typeof useGetSessionStreamsLazyQuery>;
export type GetSessionStreamsQueryResult = Apollo.QueryResult<GetSessionStreamsQuery, GetSessionStreamsQueryVariables>;
export const GetRootSessionStreamsDocument = gql`
    query GetRootSessionStreams($termId: String!, $courseIds: [String!]!) {
  rootSessionStreams(courseIds: $courseIds, termId: $termId) {
    id
    type
    name
    startTime
    endTime
    day
    location
    numberOfStaff
    weeks
    allocatedUsers {
      id
      name
      username
    }
    secondaryStreams {
      weeks
      numberOfStaff
      allocatedUsers {
        id
        name
        username
      }
    }
    timetable {
      course {
        id
        code
      }
      term {
        id
        weekNames
      }
    }
  }
}
    `;

/**
 * __useGetRootSessionStreamsQuery__
 *
 * To run a query within a React component, call `useGetRootSessionStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRootSessionStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRootSessionStreamsQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *      courseIds: // value for 'courseIds'
 *   },
 * });
 */
export function useGetRootSessionStreamsQuery(baseOptions: Apollo.QueryHookOptions<GetRootSessionStreamsQuery, GetRootSessionStreamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRootSessionStreamsQuery, GetRootSessionStreamsQueryVariables>(GetRootSessionStreamsDocument, options);
      }
export function useGetRootSessionStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRootSessionStreamsQuery, GetRootSessionStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRootSessionStreamsQuery, GetRootSessionStreamsQueryVariables>(GetRootSessionStreamsDocument, options);
        }
export type GetRootSessionStreamsQueryHookResult = ReturnType<typeof useGetRootSessionStreamsQuery>;
export type GetRootSessionStreamsLazyQueryHookResult = ReturnType<typeof useGetRootSessionStreamsLazyQuery>;
export type GetRootSessionStreamsQueryResult = Apollo.QueryResult<GetRootSessionStreamsQuery, GetRootSessionStreamsQueryVariables>;
export const StreamsFromPublicTimetableDocument = gql`
    query StreamsFromPublicTimetable($courseTerm: CourseTermIdInput!, $sessionTypes: [SessionType!]!) {
  fromPublicTimetable(courseTerm: $courseTerm, sessionTypes: $sessionTypes) {
    id
    type
    name
    startTime
    endTime
    day
    location
    numberOfStaff
    weeks
    allocatedUsers {
      id
      name
      username
    }
    secondaryStreams {
      weeks
      numberOfStaff
      allocatedUsers {
        id
        name
        username
      }
    }
    timetable {
      course {
        id
        code
      }
      term {
        id
        weekNames
      }
    }
  }
}
    `;

/**
 * __useStreamsFromPublicTimetableQuery__
 *
 * To run a query within a React component, call `useStreamsFromPublicTimetableQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamsFromPublicTimetableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamsFromPublicTimetableQuery({
 *   variables: {
 *      courseTerm: // value for 'courseTerm'
 *      sessionTypes: // value for 'sessionTypes'
 *   },
 * });
 */
export function useStreamsFromPublicTimetableQuery(baseOptions: Apollo.QueryHookOptions<StreamsFromPublicTimetableQuery, StreamsFromPublicTimetableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamsFromPublicTimetableQuery, StreamsFromPublicTimetableQueryVariables>(StreamsFromPublicTimetableDocument, options);
      }
export function useStreamsFromPublicTimetableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamsFromPublicTimetableQuery, StreamsFromPublicTimetableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamsFromPublicTimetableQuery, StreamsFromPublicTimetableQueryVariables>(StreamsFromPublicTimetableDocument, options);
        }
export type StreamsFromPublicTimetableQueryHookResult = ReturnType<typeof useStreamsFromPublicTimetableQuery>;
export type StreamsFromPublicTimetableLazyQueryHookResult = ReturnType<typeof useStreamsFromPublicTimetableLazyQuery>;
export type StreamsFromPublicTimetableQueryResult = Apollo.QueryResult<StreamsFromPublicTimetableQuery, StreamsFromPublicTimetableQueryVariables>;
export const UpdateSessionStreamsDocument = gql`
    mutation UpdateSessionStreams($updateStreamInput: [UpdateStreamInput!]!) {
  updateSessionStreams(updateStreamInput: $updateStreamInput) {
    id
    type
    name
    startTime
    endTime
    day
    location
    numberOfStaff
    weeks
    allocatedUsers {
      id
      name
      username
    }
    secondaryStreams {
      weeks
      numberOfStaff
      allocatedUsers {
        id
        name
        username
      }
    }
    timetable {
      course {
        id
        code
      }
      term {
        id
        weekNames
      }
    }
  }
}
    `;
export type UpdateSessionStreamsMutationFn = Apollo.MutationFunction<UpdateSessionStreamsMutation, UpdateSessionStreamsMutationVariables>;

/**
 * __useUpdateSessionStreamsMutation__
 *
 * To run a mutation, you first call `useUpdateSessionStreamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionStreamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionStreamsMutation, { data, loading, error }] = useUpdateSessionStreamsMutation({
 *   variables: {
 *      updateStreamInput: // value for 'updateStreamInput'
 *   },
 * });
 */
export function useUpdateSessionStreamsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSessionStreamsMutation, UpdateSessionStreamsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSessionStreamsMutation, UpdateSessionStreamsMutationVariables>(UpdateSessionStreamsDocument, options);
      }
export type UpdateSessionStreamsMutationHookResult = ReturnType<typeof useUpdateSessionStreamsMutation>;
export type UpdateSessionStreamsMutationResult = Apollo.MutationResult<UpdateSessionStreamsMutation>;
export type UpdateSessionStreamsMutationOptions = Apollo.BaseMutationOptions<UpdateSessionStreamsMutation, UpdateSessionStreamsMutationVariables>;
export const AddMergedSessionStreamsDocument = gql`
    mutation AddMergedSessionStreams($sessionStreams: [MergedStreamInput!]!) {
  addMergedSessionStreams(sessionStreams: $sessionStreams) {
    id
    type
    name
    startTime
    endTime
    day
    location
    numberOfStaff
    weeks
    allocatedUsers {
      id
      name
      username
    }
    secondaryStreams {
      weeks
      numberOfStaff
      allocatedUsers {
        id
        name
        username
      }
    }
    timetable {
      course {
        id
        code
      }
      term {
        id
        weekNames
      }
    }
  }
}
    `;
export type AddMergedSessionStreamsMutationFn = Apollo.MutationFunction<AddMergedSessionStreamsMutation, AddMergedSessionStreamsMutationVariables>;

/**
 * __useAddMergedSessionStreamsMutation__
 *
 * To run a mutation, you first call `useAddMergedSessionStreamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMergedSessionStreamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMergedSessionStreamsMutation, { data, loading, error }] = useAddMergedSessionStreamsMutation({
 *   variables: {
 *      sessionStreams: // value for 'sessionStreams'
 *   },
 * });
 */
export function useAddMergedSessionStreamsMutation(baseOptions?: Apollo.MutationHookOptions<AddMergedSessionStreamsMutation, AddMergedSessionStreamsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMergedSessionStreamsMutation, AddMergedSessionStreamsMutationVariables>(AddMergedSessionStreamsDocument, options);
      }
export type AddMergedSessionStreamsMutationHookResult = ReturnType<typeof useAddMergedSessionStreamsMutation>;
export type AddMergedSessionStreamsMutationResult = Apollo.MutationResult<AddMergedSessionStreamsMutation>;
export type AddMergedSessionStreamsMutationOptions = Apollo.BaseMutationOptions<AddMergedSessionStreamsMutation, AddMergedSessionStreamsMutationVariables>;
export const DeleteSessionStreamsDocument = gql`
    mutation DeleteSessionStreams($streamIds: [String!]!) {
  deleteSessionStreams(streamIds: $streamIds)
}
    `;
export type DeleteSessionStreamsMutationFn = Apollo.MutationFunction<DeleteSessionStreamsMutation, DeleteSessionStreamsMutationVariables>;

/**
 * __useDeleteSessionStreamsMutation__
 *
 * To run a mutation, you first call `useDeleteSessionStreamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionStreamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionStreamsMutation, { data, loading, error }] = useDeleteSessionStreamsMutation({
 *   variables: {
 *      streamIds: // value for 'streamIds'
 *   },
 * });
 */
export function useDeleteSessionStreamsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSessionStreamsMutation, DeleteSessionStreamsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSessionStreamsMutation, DeleteSessionStreamsMutationVariables>(DeleteSessionStreamsDocument, options);
      }
export type DeleteSessionStreamsMutationHookResult = ReturnType<typeof useDeleteSessionStreamsMutation>;
export type DeleteSessionStreamsMutationResult = Apollo.MutationResult<DeleteSessionStreamsMutation>;
export type DeleteSessionStreamsMutationOptions = Apollo.BaseMutationOptions<DeleteSessionStreamsMutation, DeleteSessionStreamsMutationVariables>;
export const GetSessionsDocument = gql`
    query GetSessions($termId: String!, $week: Int!, $courseIds: [String!]!) {
  sessions(termId: $termId, courseIds: $courseIds, week: $week) {
    id
    sessionStream {
      id
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
          code
        }
      }
    }
    location
    week
    numberOfStaff
    allocatedUsers {
      id
      username
      name
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionsQuery, GetSessionsQueryVariables>(GetSessionsDocument, options);
      }
export function useGetSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionsQuery, GetSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionsQuery, GetSessionsQueryVariables>(GetSessionsDocument, options);
        }
export type GetSessionsQueryHookResult = ReturnType<typeof useGetSessionsQuery>;
export type GetSessionsLazyQueryHookResult = ReturnType<typeof useGetSessionsLazyQuery>;
export type GetSessionsQueryResult = Apollo.QueryResult<GetSessionsQuery, GetSessionsQueryVariables>;
export const GetMergedSessionsDocument = gql`
    query GetMergedSessions($termId: String!, $week: Int!, $courseIds: [String!]!) {
  mergedSessions(termId: $termId, courseIds: $courseIds, week: $week) {
    id
    sessionStream {
      id
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
          code
        }
      }
    }
    location
    week
    numberOfStaff
    allocatedUsers {
      id
      username
      name
    }
  }
}
    `;

/**
 * __useGetMergedSessionsQuery__
 *
 * To run a query within a React component, call `useGetMergedSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMergedSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMergedSessionsQuery({
 *   variables: {
 *      termId: // value for 'termId'
 *      week: // value for 'week'
 *      courseIds: // value for 'courseIds'
 *   },
 * });
 */
export function useGetMergedSessionsQuery(baseOptions: Apollo.QueryHookOptions<GetMergedSessionsQuery, GetMergedSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMergedSessionsQuery, GetMergedSessionsQueryVariables>(GetMergedSessionsDocument, options);
      }
export function useGetMergedSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMergedSessionsQuery, GetMergedSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMergedSessionsQuery, GetMergedSessionsQueryVariables>(GetMergedSessionsDocument, options);
        }
export type GetMergedSessionsQueryHookResult = ReturnType<typeof useGetMergedSessionsQuery>;
export type GetMergedSessionsLazyQueryHookResult = ReturnType<typeof useGetMergedSessionsLazyQuery>;
export type GetMergedSessionsQueryResult = Apollo.QueryResult<GetMergedSessionsQuery, GetMergedSessionsQueryVariables>;
export const GetSessionByIdDocument = gql`
    query GetSessionById($sessionId: String!) {
  sessionById(sessionId: $sessionId) {
    id
    sessionStream {
      id
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
          code
        }
      }
    }
    location
    week
    numberOfStaff
    allocatedUsers {
      id
      username
      name
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionByIdQuery, GetSessionByIdQueryVariables>(GetSessionByIdDocument, options);
      }
export function useGetSessionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionByIdQuery, GetSessionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionByIdQuery, GetSessionByIdQueryVariables>(GetSessionByIdDocument, options);
        }
export type GetSessionByIdQueryHookResult = ReturnType<typeof useGetSessionByIdQuery>;
export type GetSessionByIdLazyQueryHookResult = ReturnType<typeof useGetSessionByIdLazyQuery>;
export type GetSessionByIdQueryResult = Apollo.QueryResult<GetSessionByIdQuery, GetSessionByIdQueryVariables>;
export const UpdateSessionAllocationDocument = gql`
    mutation UpdateSessionAllocation($newAllocation: [UpdateSessionAllocationInput!]!) {
  updateSessionAllocations(newAllocation: $newAllocation) {
    id
    sessionStream {
      id
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
          code
        }
      }
    }
    location
    week
    numberOfStaff
    allocatedUsers {
      id
      username
      name
    }
  }
}
    `;
export type UpdateSessionAllocationMutationFn = Apollo.MutationFunction<UpdateSessionAllocationMutation, UpdateSessionAllocationMutationVariables>;

/**
 * __useUpdateSessionAllocationMutation__
 *
 * To run a mutation, you first call `useUpdateSessionAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionAllocationMutation, { data, loading, error }] = useUpdateSessionAllocationMutation({
 *   variables: {
 *      newAllocation: // value for 'newAllocation'
 *   },
 * });
 */
export function useUpdateSessionAllocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSessionAllocationMutation, UpdateSessionAllocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSessionAllocationMutation, UpdateSessionAllocationMutationVariables>(UpdateSessionAllocationDocument, options);
      }
export type UpdateSessionAllocationMutationHookResult = ReturnType<typeof useUpdateSessionAllocationMutation>;
export type UpdateSessionAllocationMutationResult = Apollo.MutationResult<UpdateSessionAllocationMutation>;
export type UpdateSessionAllocationMutationOptions = Apollo.BaseMutationOptions<UpdateSessionAllocationMutation, UpdateSessionAllocationMutationVariables>;
export const UpdateSessionDocument = gql`
    mutation UpdateSession($updateSessionInput: [UpdateSessionInput!]!) {
  updateSession(updateSessionInput: $updateSessionInput) {
    id
    sessionStream {
      id
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
          code
        }
      }
    }
    location
    week
    numberOfStaff
    allocatedUsers {
      id
      username
      name
    }
  }
}
    `;
export type UpdateSessionMutationFn = Apollo.MutationFunction<UpdateSessionMutation, UpdateSessionMutationVariables>;

/**
 * __useUpdateSessionMutation__
 *
 * To run a mutation, you first call `useUpdateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionMutation, { data, loading, error }] = useUpdateSessionMutation({
 *   variables: {
 *      updateSessionInput: // value for 'updateSessionInput'
 *   },
 * });
 */
export function useUpdateSessionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSessionMutation, UpdateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSessionMutation, UpdateSessionMutationVariables>(UpdateSessionDocument, options);
      }
export type UpdateSessionMutationHookResult = ReturnType<typeof useUpdateSessionMutation>;
export type UpdateSessionMutationResult = Apollo.MutationResult<UpdateSessionMutation>;
export type UpdateSessionMutationOptions = Apollo.BaseMutationOptions<UpdateSessionMutation, UpdateSessionMutationVariables>;
export const DeleteSessionsDocument = gql`
    mutation DeleteSessions($sessionIds: [String!]!) {
  deleteSessions(sessionIds: $sessionIds)
}
    `;
export type DeleteSessionsMutationFn = Apollo.MutationFunction<DeleteSessionsMutation, DeleteSessionsMutationVariables>;

/**
 * __useDeleteSessionsMutation__
 *
 * To run a mutation, you first call `useDeleteSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionsMutation, { data, loading, error }] = useDeleteSessionsMutation({
 *   variables: {
 *      sessionIds: // value for 'sessionIds'
 *   },
 * });
 */
export function useDeleteSessionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSessionsMutation, DeleteSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSessionsMutation, DeleteSessionsMutationVariables>(DeleteSessionsDocument, options);
      }
export type DeleteSessionsMutationHookResult = ReturnType<typeof useDeleteSessionsMutation>;
export type DeleteSessionsMutationResult = Apollo.MutationResult<DeleteSessionsMutation>;
export type DeleteSessionsMutationOptions = Apollo.BaseMutationOptions<DeleteSessionsMutation, DeleteSessionsMutationVariables>;
export const GetAllSessionsDocument = gql`
    query GetAllSessions($courseIds: [String!]!, $termId: String!, $mineOnly: Boolean!) {
  allMergedSessions(courseIds: $courseIds, termId: $termId, mineOnly: $mineOnly) {
    id
    sessionStream {
      name
      startTime
      endTime
      day
      timetable {
        course {
          id
          code
        }
        term {
          startDate
        }
      }
    }
    week
    location
    allocatedUsers {
      id
      username
      name
    }
  }
}
    `;

/**
 * __useGetAllSessionsQuery__
 *
 * To run a query within a React component, call `useGetAllSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSessionsQuery({
 *   variables: {
 *      courseIds: // value for 'courseIds'
 *      termId: // value for 'termId'
 *      mineOnly: // value for 'mineOnly'
 *   },
 * });
 */
export function useGetAllSessionsQuery(baseOptions: Apollo.QueryHookOptions<GetAllSessionsQuery, GetAllSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSessionsQuery, GetAllSessionsQueryVariables>(GetAllSessionsDocument, options);
      }
export function useGetAllSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSessionsQuery, GetAllSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSessionsQuery, GetAllSessionsQueryVariables>(GetAllSessionsDocument, options);
        }
export type GetAllSessionsQueryHookResult = ReturnType<typeof useGetAllSessionsQuery>;
export type GetAllSessionsLazyQueryHookResult = ReturnType<typeof useGetAllSessionsLazyQuery>;
export type GetAllSessionsQueryResult = Apollo.QueryResult<GetAllSessionsQuery, GetAllSessionsQueryVariables>;
export const NotificationsDocument = gql`
    subscription Notifications($key: String!) {
  notifications(key: $key) {
    id
    title
    message
  }
}
    `;

/**
 * __useNotificationsSubscription__
 *
 * To run a query within a React component, call `useNotificationsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsSubscription({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useNotificationsSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationsSubscription, NotificationsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationsSubscription, NotificationsSubscriptionVariables>(NotificationsDocument, options);
      }
export type NotificationsSubscriptionHookResult = ReturnType<typeof useNotificationsSubscription>;
export type NotificationsSubscriptionResult = Apollo.SubscriptionResult<NotificationsSubscription>;
export const TermsDocument = gql`
    query Terms {
  terms {
    id
    type
    year
    startDate
    endDate
    weekNames
    isActive
    numberOfWeeks
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermsQuery, TermsQueryVariables>(TermsDocument, options);
      }
export function useTermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermsQuery, TermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermsQuery, TermsQueryVariables>(TermsDocument, options);
        }
export type TermsQueryHookResult = ReturnType<typeof useTermsQuery>;
export type TermsLazyQueryHookResult = ReturnType<typeof useTermsLazyQuery>;
export type TermsQueryResult = Apollo.QueryResult<TermsQuery, TermsQueryVariables>;
export const TermDocument = gql`
    query Term($termId: String!) {
  term(termId: $termId) {
    id
    type
    year
    startDate
    endDate
    weekNames
    isActive
    numberOfWeeks
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TermQuery, TermQueryVariables>(TermDocument, options);
      }
export function useTermLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TermQuery, TermQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TermQuery, TermQueryVariables>(TermDocument, options);
        }
export type TermQueryHookResult = ReturnType<typeof useTermQuery>;
export type TermLazyQueryHookResult = ReturnType<typeof useTermLazyQuery>;
export type TermQueryResult = Apollo.QueryResult<TermQuery, TermQueryVariables>;
export const CreateTermDocument = gql`
    mutation CreateTerm($termInput: TermInput!) {
  createTerm(termInput: $termInput) {
    id
    type
    year
    startDate
    endDate
    weekNames
    isActive
    numberOfWeeks
  }
}
    `;
export type CreateTermMutationFn = Apollo.MutationFunction<CreateTermMutation, CreateTermMutationVariables>;

/**
 * __useCreateTermMutation__
 *
 * To run a mutation, you first call `useCreateTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTermMutation, { data, loading, error }] = useCreateTermMutation({
 *   variables: {
 *      termInput: // value for 'termInput'
 *   },
 * });
 */
export function useCreateTermMutation(baseOptions?: Apollo.MutationHookOptions<CreateTermMutation, CreateTermMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTermMutation, CreateTermMutationVariables>(CreateTermDocument, options);
      }
export type CreateTermMutationHookResult = ReturnType<typeof useCreateTermMutation>;
export type CreateTermMutationResult = Apollo.MutationResult<CreateTermMutation>;
export type CreateTermMutationOptions = Apollo.BaseMutationOptions<CreateTermMutation, CreateTermMutationVariables>;
export const UpdateTermDocument = gql`
    mutation UpdateTerm($termInput: UpdateTermInput!) {
  updateTerm(termInput: $termInput) {
    id
    type
    year
    startDate
    endDate
    weekNames
    isActive
    numberOfWeeks
  }
}
    `;
export type UpdateTermMutationFn = Apollo.MutationFunction<UpdateTermMutation, UpdateTermMutationVariables>;

/**
 * __useUpdateTermMutation__
 *
 * To run a mutation, you first call `useUpdateTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTermMutation, { data, loading, error }] = useUpdateTermMutation({
 *   variables: {
 *      termInput: // value for 'termInput'
 *   },
 * });
 */
export function useUpdateTermMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTermMutation, UpdateTermMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTermMutation, UpdateTermMutationVariables>(UpdateTermDocument, options);
      }
export type UpdateTermMutationHookResult = ReturnType<typeof useUpdateTermMutation>;
export type UpdateTermMutationResult = Apollo.MutationResult<UpdateTermMutation>;
export type UpdateTermMutationOptions = Apollo.BaseMutationOptions<UpdateTermMutation, UpdateTermMutationVariables>;
export const DeleteTermDocument = gql`
    mutation DeleteTerm($termId: String!) {
  deleteTerm(termId: $termId)
}
    `;
export type DeleteTermMutationFn = Apollo.MutationFunction<DeleteTermMutation, DeleteTermMutationVariables>;

/**
 * __useDeleteTermMutation__
 *
 * To run a mutation, you first call `useDeleteTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTermMutation, { data, loading, error }] = useDeleteTermMutation({
 *   variables: {
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useDeleteTermMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTermMutation, DeleteTermMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTermMutation, DeleteTermMutationVariables>(DeleteTermDocument, options);
      }
export type DeleteTermMutationHookResult = ReturnType<typeof useDeleteTermMutation>;
export type DeleteTermMutationResult = Apollo.MutationResult<DeleteTermMutation>;
export type DeleteTermMutationOptions = Apollo.BaseMutationOptions<DeleteTermMutation, DeleteTermMutationVariables>;
export const TimetablesDocument = gql`
    query Timetables {
  timetables {
    id
    course {
      id
      code
    }
    term {
      id
      type
      year
    }
    permanentRequestLock
    temporaryRequestLock
  }
}
    `;

/**
 * __useTimetablesQuery__
 *
 * To run a query within a React component, call `useTimetablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimetablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimetablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimetablesQuery(baseOptions?: Apollo.QueryHookOptions<TimetablesQuery, TimetablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimetablesQuery, TimetablesQueryVariables>(TimetablesDocument, options);
      }
export function useTimetablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimetablesQuery, TimetablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimetablesQuery, TimetablesQueryVariables>(TimetablesDocument, options);
        }
export type TimetablesQueryHookResult = ReturnType<typeof useTimetablesQuery>;
export type TimetablesLazyQueryHookResult = ReturnType<typeof useTimetablesLazyQuery>;
export type TimetablesQueryResult = Apollo.QueryResult<TimetablesQuery, TimetablesQueryVariables>;
export const CreateTimetableDocument = gql`
    mutation CreateTimetable($timetableInput: TimetableInput!) {
  createTimetable(timetableInput: $timetableInput) {
    id
    course {
      id
      code
    }
    term {
      id
      type
      year
    }
    permanentRequestLock
    temporaryRequestLock
  }
}
    `;
export type CreateTimetableMutationFn = Apollo.MutationFunction<CreateTimetableMutation, CreateTimetableMutationVariables>;

/**
 * __useCreateTimetableMutation__
 *
 * To run a mutation, you first call `useCreateTimetableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimetableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimetableMutation, { data, loading, error }] = useCreateTimetableMutation({
 *   variables: {
 *      timetableInput: // value for 'timetableInput'
 *   },
 * });
 */
export function useCreateTimetableMutation(baseOptions?: Apollo.MutationHookOptions<CreateTimetableMutation, CreateTimetableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTimetableMutation, CreateTimetableMutationVariables>(CreateTimetableDocument, options);
      }
export type CreateTimetableMutationHookResult = ReturnType<typeof useCreateTimetableMutation>;
export type CreateTimetableMutationResult = Apollo.MutationResult<CreateTimetableMutation>;
export type CreateTimetableMutationOptions = Apollo.BaseMutationOptions<CreateTimetableMutation, CreateTimetableMutationVariables>;
export const UpdateTimetableDocument = gql`
    mutation UpdateTimetable($timetableInput: TimetableInput!) {
  updateTimetable(timetableInput: $timetableInput) {
    id
    course {
      id
      code
    }
    term {
      id
      type
      year
    }
    permanentRequestLock
    temporaryRequestLock
  }
}
    `;
export type UpdateTimetableMutationFn = Apollo.MutationFunction<UpdateTimetableMutation, UpdateTimetableMutationVariables>;

/**
 * __useUpdateTimetableMutation__
 *
 * To run a mutation, you first call `useUpdateTimetableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimetableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimetableMutation, { data, loading, error }] = useUpdateTimetableMutation({
 *   variables: {
 *      timetableInput: // value for 'timetableInput'
 *   },
 * });
 */
export function useUpdateTimetableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimetableMutation, UpdateTimetableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTimetableMutation, UpdateTimetableMutationVariables>(UpdateTimetableDocument, options);
      }
export type UpdateTimetableMutationHookResult = ReturnType<typeof useUpdateTimetableMutation>;
export type UpdateTimetableMutationResult = Apollo.MutationResult<UpdateTimetableMutation>;
export type UpdateTimetableMutationOptions = Apollo.BaseMutationOptions<UpdateTimetableMutation, UpdateTimetableMutationVariables>;
export const DeleteTimetableDocument = gql`
    mutation DeleteTimetable($timetableId: String!) {
  deleteTimetable(timetableId: $timetableId)
}
    `;
export type DeleteTimetableMutationFn = Apollo.MutationFunction<DeleteTimetableMutation, DeleteTimetableMutationVariables>;

/**
 * __useDeleteTimetableMutation__
 *
 * To run a mutation, you first call `useDeleteTimetableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimetableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimetableMutation, { data, loading, error }] = useDeleteTimetableMutation({
 *   variables: {
 *      timetableId: // value for 'timetableId'
 *   },
 * });
 */
export function useDeleteTimetableMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTimetableMutation, DeleteTimetableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTimetableMutation, DeleteTimetableMutationVariables>(DeleteTimetableDocument, options);
      }
export type DeleteTimetableMutationHookResult = ReturnType<typeof useDeleteTimetableMutation>;
export type DeleteTimetableMutationResult = Apollo.MutationResult<DeleteTimetableMutation>;
export type DeleteTimetableMutationOptions = Apollo.BaseMutationOptions<DeleteTimetableMutation, DeleteTimetableMutationVariables>;