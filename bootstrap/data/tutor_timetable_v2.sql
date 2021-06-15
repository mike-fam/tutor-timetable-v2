--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "tutor-timetable-v2";
--
-- Name: tutor-timetable-v2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "tutor-timetable-v2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE "tutor-timetable-v2" OWNER TO postgres;

\connect -reuse-previous=on "dbname='tutor-timetable-v2'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    code character varying(20) NOT NULL,
    title character varying(100) NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Name: course_staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_staff (
    role character varying NOT NULL,
    "isNew" boolean NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    "timetableId" uuid NOT NULL,
    "preferenceId" uuid,
    CONSTRAINT "CHK_7134fed2fd5c843787e17ccd39" CHECK ((((role)::text = 'Course Coordinator'::text) OR ((role)::text = 'Staff'::text)))
);


ALTER TABLE public.course_staff OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: offer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "requestId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    status character varying DEFAULT 'OPEN'::character varying NOT NULL,
    "acceptedSessionId" uuid,
    "mustSwap" boolean DEFAULT false NOT NULL,
    "acceptedDate" timestamp with time zone,
    CONSTRAINT "CHK_3898cca51d95c3dff6602780bf" CHECK ((((status)::text = 'OPEN'::text) OR ((status)::text = 'ACCEPTED'::text) OR ((status)::text = 'REJECTED'::text) OR ((status)::text = 'AWAITING_APPROVAL'::text)))
);


ALTER TABLE public.offer OWNER TO postgres;

--
-- Name: offer_preferences_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offer_preferences_session (
    "offerId" uuid NOT NULL,
    "sessionId" uuid NOT NULL
);


ALTER TABLE public.offer_preferences_session OWNER TO postgres;

--
-- Name: preference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.preference (
    "sessionType" character varying(15),
    "maxContigHours" integer NOT NULL,
    "maxWeeklyHours" integer NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "courseStaffId" character varying NOT NULL,
    CONSTRAINT "CHK_048b5ceb22fa1888c5c49d0139" CHECK (((("sessionType")::text = 'Practical'::text) OR (("sessionType")::text = 'Tutorial'::text) OR (("sessionType")::text = 'Seminar'::text) OR (("sessionType")::text = 'Lecture'::text) OR (("sessionType")::text = 'Studio'::text)))
);


ALTER TABLE public.preference OWNER TO postgres;

--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    location character varying(15) NOT NULL,
    week integer NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "sessionStreamId" uuid NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: session_allocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_allocation (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "sessionId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.session_allocation OWNER TO postgres;

--
-- Name: session_stream; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_stream (
    name character varying(32) NOT NULL,
    type character varying(15) NOT NULL,
    day integer NOT NULL,
    "startTime" double precision NOT NULL,
    "endTime" double precision NOT NULL,
    weeks integer[] NOT NULL,
    location character varying(15) NOT NULL,
    "numberOfStaff" integer NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "timetableId" uuid NOT NULL,
    "basedId" uuid,
    CONSTRAINT "CHK_41bbf7adf43d7d31af71faabf7" CHECK (((day = 1) OR (day = 2) OR (day = 3) OR (day = 4) OR (day = 5) OR (day = 6) OR (day = 7))),
    CONSTRAINT "CHK_547b21ea1dbf8d0c351c1177c4" CHECK ((((type)::text = 'Practical'::text) OR ((type)::text = 'Tutorial'::text) OR ((type)::text = 'Seminar'::text) OR ((type)::text = 'Lecture'::text) OR ((type)::text = 'Studio'::text)))
);


ALTER TABLE public.session_stream OWNER TO postgres;

--
-- Name: session_stream_allocated_users_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_stream_allocated_users_user (
    "sessionStreamId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.session_stream_allocated_users_user OWNER TO postgres;

--
-- Name: staff_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_request (
    type character varying NOT NULL,
    status character varying NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "requesterId" uuid NOT NULL,
    "sessionId" uuid NOT NULL,
    "finaliserId" uuid,
    "allowNonPrefOffers" boolean DEFAULT false NOT NULL,
    CONSTRAINT "CHK_290305054f404d50c3f1435a24" CHECK ((((type)::text = 'Permanent'::text) OR ((type)::text = 'Temporary'::text))),
    CONSTRAINT "CHK_a99348feda038552ca057e8cec" CHECK ((((status)::text = 'Open'::text) OR ((status)::text = 'Closed'::text)))
);


ALTER TABLE public.staff_request OWNER TO postgres;

--
-- Name: staff_request_swap_preference_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_request_swap_preference_session (
    "staffRequestId" uuid NOT NULL,
    "sessionId" uuid NOT NULL
);


ALTER TABLE public.staff_request_swap_preference_session OWNER TO postgres;

--
-- Name: stream_allocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stream_allocation (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "sessionStreamId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.stream_allocation OWNER TO postgres;

--
-- Name: term; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.term (
    type character varying(20) NOT NULL,
    year integer NOT NULL,
    "weekNames" character varying[] DEFAULT ARRAY[]::character varying[] NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    CONSTRAINT "CHK_b064a25bca4e26fd9ca3f69a13" CHECK ((((type)::text = 'Semester 1'::text) OR ((type)::text = 'Semester 2'::text) OR ((type)::text = 'Summer Semester'::text) OR ((type)::text = 'Trimester 1'::text) OR ((type)::text = 'Trimester 2'::text) OR ((type)::text = 'Trimester 3'::text)))
);


ALTER TABLE public.term OWNER TO postgres;

--
-- Name: timeslot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timeslot (
    day integer NOT NULL,
    "startTime" double precision NOT NULL,
    "endTime" double precision NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    CONSTRAINT "CHK_95c0b9a2c1c9e29b999b3fc9ab" CHECK (((day = 1) OR (day = 2) OR (day = 3) OR (day = 4) OR (day = 5) OR (day = 6) OR (day = 7)))
);


ALTER TABLE public.timeslot OWNER TO postgres;

--
-- Name: timetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timetable (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "courseId" uuid NOT NULL,
    "termId" uuid NOT NULL,
    "permanentRequestLock" character varying DEFAULT 'FREE'::character varying NOT NULL,
    "temporaryRequestLock" character varying DEFAULT 'FREE'::character varying NOT NULL,
    "allocationToken" uuid,
    CONSTRAINT "CHK_46d36f57d28eb598ab672c72cd" CHECK (((("permanentRequestLock")::text = 'FREE'::text) OR (("permanentRequestLock")::text = 'LOCK'::text) OR (("permanentRequestLock")::text = 'APPROVAL_REQUIRED'::text))),
    CONSTRAINT "CHK_60e32c35047968ba6f310887bf" CHECK (((("temporaryRequestLock")::text = 'FREE'::text) OR (("temporaryRequestLock")::text = 'LOCK'::text) OR (("temporaryRequestLock")::text = 'APPROVAL_REQUIRED'::text)))
);


ALTER TABLE public.timetable OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    username character varying(9) NOT NULL,
    name character varying(64) NOT NULL,
    email character varying(256) NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "settingsId" uuid
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_allocated_sessions_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_allocated_sessions_session (
    "userId" uuid NOT NULL,
    "sessionId" uuid NOT NULL
);


ALTER TABLE public.user_allocated_sessions_session OWNER TO postgres;

--
-- Name: user_allocated_streams_session_stream; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_allocated_streams_session_stream (
    "userId" uuid NOT NULL,
    "sessionStreamId" uuid NOT NULL
);


ALTER TABLE public.user_allocated_streams_session_stream OWNER TO postgres;

--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_settings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "showMySessions" boolean NOT NULL
);


ALTER TABLE public.user_settings OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.course VALUES ('CSSE1001', 'Introduction to Software Engineering', '0a2e6669-f8aa-45e9-8aeb-7a92ed495871');
INSERT INTO public.course VALUES ('CSSE2002', 'Programming in the Large', '4de5ca8e-0698-4a7d-9241-2cb9fc37b376');


--
-- Data for Name: course_staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.course_staff VALUES ('Course Coordinator', false, 'a19c9c07-ee46-459b-b9bb-208821052882', '52cbc02c-c5ac-401f-80ab-25eb8ff15f45', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff VALUES ('Course Coordinator', false, '607a6b63-fcab-4440-83b8-9608fb99868f', '548c11f0-731d-4b94-bb1a-da788bb4d968', '86b6d4b0-a8c5-4c42-8278-e649144f92b3', NULL);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.migrations VALUES (1, 1607706093168, 'Migration1607706093168');
INSERT INTO public.migrations VALUES (2, 1608127897194, 'Migration1608127897194');
INSERT INTO public.migrations VALUES (3, 1608357575728, 'Migration1608357575728');
INSERT INTO public.migrations VALUES (4, 1608389153900, 'Migration1608389153900');
INSERT INTO public.migrations VALUES (5, 1608507278381, 'Migration1608507278381');
INSERT INTO public.migrations VALUES (6, 1608515129064, 'Migration1608515129064');
INSERT INTO public.migrations VALUES (7, 1608599633048, 'Migration1608599633048');
INSERT INTO public.migrations VALUES (8, 1608600357360, 'Migration1608600357360');
INSERT INTO public.migrations VALUES (9, 1608600591223, 'Migration1608600591223');
INSERT INTO public.migrations VALUES (10, 1608629318688, 'Migration1608629318688');
INSERT INTO public.migrations VALUES (11, 1608629865707, 'Migration1608629865707');
INSERT INTO public.migrations VALUES (12, 1608630196646, 'Migration1608630196646');
INSERT INTO public.migrations VALUES (13, 1608727537693, 'Migration1608727537693');
INSERT INTO public.migrations VALUES (14, 1609484892238, 'Migration1609484892238');
INSERT INTO public.migrations VALUES (15, 1609505756451, 'Migration1609505756451');
INSERT INTO public.migrations VALUES (16, 1609763677449, 'Migration1609763677449');
INSERT INTO public.migrations VALUES (17, 1610435742105, 'Migration1610435742105');
INSERT INTO public.migrations VALUES (18, 1610544047125, 'Migration1610544047125');
INSERT INTO public.migrations VALUES (19, 1611010071679, 'Migration1611010071679');
INSERT INTO public.migrations VALUES (20, 1611213867277, 'Migration1611213867277');
INSERT INTO public.migrations VALUES (21, 1611341902656, 'Migration1611341902656');
INSERT INTO public.migrations VALUES (22, 1611735562524, 'Migration1611735562524');
INSERT INTO public.migrations VALUES (23, 1611889335238, 'Migration1611889335238');
INSERT INTO public.migrations VALUES (24, 1612775365234, 'Migration1612775365234');
INSERT INTO public.migrations VALUES (25, 1612870895263, 'Migration1612870895263');
INSERT INTO public.migrations VALUES (26, 1613187973186, 'Migration1613187973186');
INSERT INTO public.migrations VALUES (27, 1621667603333, 'Migration1621667603333');
INSERT INTO public.migrations VALUES (28, 1621820482405, 'Migration1621820482405');
INSERT INTO public.migrations VALUES (29, 1621976018497, 'Migration1621976018497');
INSERT INTO public.migrations VALUES (30, 1622010648800, 'Migration1622010648800');
INSERT INTO public.migrations VALUES (31, 1622104291460, 'Migration1622104291460');
INSERT INTO public.migrations VALUES (32, 1622105311658, 'Migration1622105311658');
INSERT INTO public.migrations VALUES (33, 1622105602942, 'Migration1622105602942');
INSERT INTO public.migrations VALUES (34, 1622325662597, 'Migration1622325662597');
INSERT INTO public.migrations VALUES (35, 1622329357373, 'Migration1622329357373');
INSERT INTO public.migrations VALUES (36, 1622372733295, 'Migration1622372733295');
INSERT INTO public.migrations VALUES (37, 1622420860482, 'Migration1622420860482');
INSERT INTO public.migrations VALUES (38, 1622518561874, 'Migration1622518561874');
INSERT INTO public.migrations VALUES (39, 1622563751814, 'Migration1622563751814');
INSERT INTO public.migrations VALUES (40, 1622612929057, 'Migration1622612929057');
INSERT INTO public.migrations VALUES (41, 1622619001323, 'Migration1622619001323');
INSERT INTO public.migrations VALUES (42, 1622620873881, 'Migration1622620873881');
INSERT INTO public.migrations VALUES (43, 1622621014786, 'Migration1622621014786');
INSERT INTO public.migrations VALUES (44, 1622864231164, 'Migration1622864231164');
INSERT INTO public.migrations VALUES (45, 1622893691814, 'Migration1622893691814');
INSERT INTO public.migrations VALUES (46, 1623023474369, 'Migration1623023474369');
INSERT INTO public.migrations VALUES (47, 1623032138551, 'Migration1623032138551');
INSERT INTO public.migrations VALUES (48, 1623062273294, 'Migration1623062273294');
INSERT INTO public.migrations VALUES (49, 1623063118210, 'Migration1623063118210');
INSERT INTO public.migrations VALUES (50, 1623066711344, 'Migration1623066711344');


--
-- Data for Name: offer; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: offer_preferences_session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: preference; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.session VALUES ('78-122', 1, '2352152e-c1af-417e-9c89-c988ea70cb8a', '1b95435c-6b74-48d6-b1cb-738a8644fd5a');
INSERT INTO public.session VALUES ('50-S203', 2, 'af53f0d2-2f09-4be2-886c-b32d42acc7fc', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 3, '00415f49-8a65-4d14-8eec-4be25cdf63cb', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 4, '5346192f-4f39-4395-8ee6-6f07b57d3320', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 5, '5e82440a-9119-4f99-97a8-eeee8bb71d7b', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 6, '0f582e0a-f9cf-42fb-b812-75443c4a26ba', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 7, '684a4b8b-ef9d-43e3-85b7-a814ea583aa7', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 8, 'fea2e02f-5676-44a2-ac4f-a1df9ce42614', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 9, '702d2b44-7767-4bd5-b1c0-7d69470c0ad1', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 10, 'afcbe088-8bc8-43b8-b67a-964823520db5', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 11, 'bd86a81e-3955-444d-91e7-81adf4678a40', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 12, '6c253111-bdcf-476b-a521-f869d05f6b2a', '8f27330b-83a0-41bd-8a61-14b4549215c8');
INSERT INTO public.session VALUES ('50-S203', 2, '5f61a97d-7728-4626-a6de-d6f7cbec02b7', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 3, '224fdd8f-a24e-4cea-a2df-5d04d7f6a0ff', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 4, '7b841088-593c-4556-b798-e97c91be7475', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 5, 'f70a41c3-386d-43ca-bf48-477cb1b9cb9f', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 6, 'c852e994-cc3b-480d-b9b8-4236654ea8bc', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 7, '468d4514-f7bb-4b6c-a188-1145ffec2908', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 8, 'c188f284-1202-4903-8092-f23869973dba', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 9, 'd3494dca-9091-47a2-8edb-7078b44cc213', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 10, '728e77fb-a2fe-4af7-9242-2c38f5a16f02', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 11, '5f48652e-cbc5-4a98-88a5-004486ad41f8', 'd807f6c7-938e-4091-9f63-ac297fb8304b');
INSERT INTO public.session VALUES ('50-S203', 12, '084dc67f-e313-45a8-9974-67a8db5a537e', 'd807f6c7-938e-4091-9f63-ac297fb8304b');


--
-- Data for Name: session_allocation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: session_stream; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.session_stream VALUES ('P01', 'Practical', 1, 8, 10, '{1,2,3,4,5}', '78-122', 2, '1b95435c-6b74-48d6-b1cb-738a8644fd5a', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream VALUES ('P01 Flexible', 'Practical', 2, 8, 10, '{2,3,4,5,6,7,8,9,10,11,12}', '50-S203', 2, '8f27330b-83a0-41bd-8a61-14b4549215c8', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream VALUES ('P02 Flexible', 'Practical', 2, 8, 10, '{2,3,4,5,6,7,8,9,10,11,12}', '50-S203', 3, 'd807f6c7-938e-4091-9f63-ac297fb8304b', '86b6d4b0-a8c5-4c42-8278-e649144f92b3', NULL);
INSERT INTO public.session_stream VALUES ('P04 Flexible', 'Practical', 2, 8, 10, '{2,3,4,5,6,7,8,9,10,11,12}', '50-S203', 3, '5b829197-d199-4e3e-9947-e5cb2cf213b9', '86b6d4b0-a8c5-4c42-8278-e649144f92b3', NULL);


--
-- Data for Name: session_stream_allocated_users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: staff_request; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: staff_request_swap_preference_session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: stream_allocation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: term; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.term VALUES ('Semester 2', 2020, '{O-Week,"Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8",Break,"Week 9","Week 10","Week 11","Week 12",Examination,Examination,Examination}', '2020-07-29 10:00:00', '2020-11-21 10:00:00', 'dbb58294-376f-49de-8cd7-459ef58df359', false);
INSERT INTO public.term VALUES ('Semester 1', 2021, '{O-Week,"Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8",Break,"Week 9","Week 10","Week 11","Week 12",Examination,Examination,Examination}', '2021-02-21 10:00:00', '2021-06-21 10:00:00', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', true);


--
-- Data for Name: timeslot; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: timetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.timetable VALUES ('8046ee18-243f-4b89-93f2-ad56a63f133f', '0a2e6669-f8aa-45e9-8aeb-7a92ed495871', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', 'FREE', 'FREE', NULL);
INSERT INTO public.timetable VALUES ('86b6d4b0-a8c5-4c42-8278-e649144f92b3', '4de5ca8e-0698-4a7d-9241-2cb9fc37b376', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', 'FREE', 'FREE', NULL);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES ('uqmnguy', 'Marvin Nguyen', 'marvin.nguyen@example.com', '52cbc02c-c5ac-401f-80ab-25eb8ff15f45', false, NULL);
INSERT INTO public."user" VALUES ('uqjcrai', 'Jerry Craig', 'jerry.craig@example.com', '548c11f0-731d-4b94-bb1a-da788bb4d968', false, NULL);
INSERT INTO public."user" VALUES ('uqjcrai1', 'Joe Craig', 'joe.craig@example.com', '2c695967-3ea7-4c0b-bfb7-59620c8cc889', false, NULL);
INSERT INTO public."user" VALUES ('uqdcarl', 'Don Carlson', 'don.carlson@example.com', '7cf88095-d09a-4be3-8ec3-5be454f4f477', false, NULL);
INSERT INTO public."user" VALUES ('uqspalm', 'Sue Palmer', 'sue.palmer@example.com', '03886e63-79bd-41ad-a142-685e538dacb4', false, NULL);
INSERT INTO public."user" VALUES ('uqcvasq', 'Cathy Vasquez', 'cathy.vasquez@example.com', '6e4cbf72-d67e-4259-bf65-630a6eb1d477', false, NULL);
INSERT INTO public."user" VALUES ('uqvhort', 'Vera Horton', 'vera.horton@example.com', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d', false, NULL);
INSERT INTO public."user" VALUES ('uqmstan', 'Michael Stanley', 'michael.stanley@example.com', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd', false, NULL);
INSERT INTO public."user" VALUES ('uqbkenn', 'Bernice Kennedy', 'bernice.kennedy@example.com', '242cbad3-d5b6-4f43-9b99-4b799c980ebd', false, NULL);
INSERT INTO public."user" VALUES ('uqmpham6', 'Nelson Brown', 'nelson.brown@example.com', '6cb0f404-349b-4f3c-b54e-0e16ba0f2c43', false, NULL);
INSERT INTO public."user" VALUES ('uqmhowe', 'Mark Howell', 'mark.howell@example.com', 'fd506f28-69f7-4132-94f3-266e9870df33', false, NULL);
INSERT INTO public."user" VALUES ('uqdvarg', 'Danielle Vargas', 'danielle.vargas@example.com', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e', false, NULL);
INSERT INTO public."user" VALUES ('uqafiel', 'Alfredo Fields', 'alfredo.fields@example.com', 'adcfba2f-b728-47d9-b7f3-a33dae7ca6e9', false, NULL);
INSERT INTO public."user" VALUES ('uqphaye', 'Paul Hayes', 'paul.hayes@example.com', '53ac4ab7-7c72-4129-a558-2e9d702a25cb', false, NULL);
INSERT INTO public."user" VALUES ('uqjbowm', 'Jo Bowman', 'jo.bowman@example.com', 'b97e746c-6cce-42d8-b851-33c71ca8e563', false, NULL);
INSERT INTO public."user" VALUES ('uqsdixo', 'Sophia Dixon', 'sophia.dixon@example.com', 'abbf094f-758c-4d84-b685-6b3ddab80cf1', false, NULL);
INSERT INTO public."user" VALUES ('uqtolso', 'Terrance Olson', 'terrance.olson@example.com', '9be82e08-7a5a-4f67-9264-d96d6338f984', false, NULL);
INSERT INTO public."user" VALUES ('uqlrobi', 'Lawrence Robinson', 'lawrence.robinson@example.com', 'db75c78e-bdd7-40fe-8bbc-a05f810a7f47', false, NULL);
INSERT INTO public."user" VALUES ('uqswill', 'Sue Williams', 'sue.williams@example.com', 'c0869562-3864-459a-8465-ac0eac89003c', false, NULL);
INSERT INTO public."user" VALUES ('uqmmyer', 'Marian Myers', 'marian.myers@example.com', '4a8a9c39-24f7-4fab-9da6-8ce9fd745d62', false, NULL);
INSERT INTO public."user" VALUES ('uqaowen', 'Amelia Owens', 'amelia.owens@example.com', 'c631f530-80aa-4684-ba5a-ce461d71084d', false, NULL);
INSERT INTO public."user" VALUES ('uqjkell', 'Jamie Kelly', 'jamie.kelly@example.com', '54f7915a-607d-497d-8801-01b7b961270a', false, NULL);
INSERT INTO public."user" VALUES ('uqnpete', 'Nathaniel Peterson', 'nathaniel.peterson@example.com', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350', false, NULL);
INSERT INTO public."user" VALUES ('uqabeck', 'Alberto Beck', 'alberto.beck@example.com', '8a303a17-a00e-406b-81fe-fc1ffe8521be', false, NULL);
INSERT INTO public."user" VALUES ('uqagard', 'Ashley Gardner', 'ashley.gardner@example.com', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe', false, NULL);
INSERT INTO public."user" VALUES ('uqjsutt', 'Judith Sutton', 'judith.sutton@example.com', '82ebad48-e354-459f-8031-d6d482d5fa86', false, NULL);
INSERT INTO public."user" VALUES ('uqzmill', 'Zachary Mills', 'zachary.mills@example.com', '441364b8-ab97-4b65-97e6-cbd60a9780b2', false, NULL);
INSERT INTO public."user" VALUES ('uqabail', 'Arnold Bailey', 'arnold.bailey@example.com', '321c7d45-48c8-4e34-a316-be93e2c51bee', false, NULL);
INSERT INTO public."user" VALUES ('uqjlewi', 'Jeremy Lewis', 'jeremy.lewis@example.com', '07cbaafa-07d0-4701-bedd-7f29e3948452', false, NULL);
INSERT INTO public."user" VALUES ('uqmreyn', 'Marlene Reynolds', 'marlene.reynolds@example.com', '46ecafda-4475-4052-b2d7-97be0e51b3b3', false, NULL);
INSERT INTO public."user" VALUES ('uqsfran', 'Stacy Franklin', 'stacy.franklin@example.com', '0b7c95da-0e0d-41cf-a1f3-8a0c7dd6e247', false, NULL);
INSERT INTO public."user" VALUES ('uqllane', 'Letitia Lane', 'letitia.lane@example.com', '4ed01478-5d16-41c0-b7db-dabb49f953b4', false, NULL);
INSERT INTO public."user" VALUES ('uqcphil', 'Carlos Phillips', 'carlos.phillips@example.com', '7395d7bd-74cb-477d-8319-7f9a5368203b', false, NULL);
INSERT INTO public."user" VALUES ('uqjcrai12', 'Jeff Craig', 'jeff.craig@example.com', 'ba6d73af-1bcc-40a0-a3a3-40965487590b', false, NULL);
INSERT INTO public."user" VALUES ('uqjharv', 'Jean Harvey', 'jean.harvey@example.com', '7de38723-3200-4bef-bca0-77149c327b33', false, NULL);
INSERT INTO public."user" VALUES ('uqmturn', 'Marsha Turner', 'marsha.turner@example.com', '4973ac67-0124-4fac-b051-5cbe42aac24f', false, NULL);
INSERT INTO public."user" VALUES ('uqwhall', 'Walter Hall', 'walter.hall@example.com', '20af1544-1678-4ee3-a282-4c73d292a91d', false, NULL);
INSERT INTO public."user" VALUES ('uqjalva', 'Juan Alvarez', 'juan.alvarez@example.com', '54dce136-3aca-4060-b993-ad95b69c067a', false, NULL);
INSERT INTO public."user" VALUES ('uqamay', 'Ashley May', 'ashley.may@example.com', 'a6e69c50-fcd7-48d9-a156-87eef8b77e50', false, NULL);
INSERT INTO public."user" VALUES ('uqahawk', 'Alfredo Hawkins', 'alfredo.hawkins@example.com', 'cd113b45-96a0-4f59-bf6a-44ca822e7135', false, NULL);
INSERT INTO public."user" VALUES ('uqmbarn', 'Maureen Barnes', 'maureen.barnes@example.com', 'c94707de-b44f-4b1d-9215-c4a57d11c157', false, NULL);
INSERT INTO public."user" VALUES ('uqjholl', 'Jimmy Holland', 'jimmy.holland@example.com', 'c1ec1775-1fb9-405a-9f31-47844884e843', false, NULL);
INSERT INTO public."user" VALUES ('uqjmcco', 'Jeremiah Mccoy', 'jeremiah.mccoy@example.com', '2beb55cb-a9be-4e20-abe4-69532a4e4a85', false, NULL);
INSERT INTO public."user" VALUES ('uqnnels', 'Nora Nelson', 'nora.nelson@example.com', '828dadcd-1717-4227-a9ad-4c074870d1ba', false, NULL);
INSERT INTO public."user" VALUES ('uqjbrew', 'Justin Brewer', 'justin.brewer@example.com', 'f80a0add-42ce-421b-b2e8-d1e3770c9ac9', false, NULL);
INSERT INTO public."user" VALUES ('uqnshaw', 'Nelson Shaw', 'nelson.shaw@example.com', 'd23ce428-a745-4e7c-8f59-69462556fd42', false, NULL);
INSERT INTO public."user" VALUES ('uqasoto', 'Alfred Soto', 'alfred.soto@example.com', 'f2a45246-bb15-4ded-b41d-0df34359e8dc', false, NULL);
INSERT INTO public."user" VALUES ('uqgfraz', 'Gene Frazier', 'gene.frazier@example.com', '7cd50eaf-1c95-482a-970d-832f2184225b', false, NULL);
INSERT INTO public."user" VALUES ('uqkford', 'Kent Ford', 'kent.ford@example.com', '55a7224e-124e-4933-a712-bba6d69593e9', false, NULL);
INSERT INTO public."user" VALUES ('uqjpalm', 'Jenny Palmer', 'jenny.palmer@example.com', 'd6877cf8-2685-4f85-9816-af2f0618bd08', false, NULL);
INSERT INTO public."user" VALUES ('uqnbrow', 'Nelson Brown', 'nelson.brown@example.com', '4515930e-be87-4505-9ba4-8d5e73ff9841', false, NULL);


--
-- Data for Name: user_allocated_sessions_session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_allocated_streams_session_stream; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 50, true);


--
-- Name: user_settings PK_00f004f5922a0744d174530d639; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY (id);


--
-- Name: timetable PK_06001d91b3fe346fb1387ad1a15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT "PK_06001d91b3fe346fb1387ad1a15" PRIMARY KEY (id);


--
-- Name: offer_preferences_session PK_192129d1763740f5519d150d033; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_preferences_session
    ADD CONSTRAINT "PK_192129d1763740f5519d150d033" PRIMARY KEY ("offerId", "sessionId");


--
-- Name: staff_request PK_41bbafca9644c0f2bc09534df6d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request
    ADD CONSTRAINT "PK_41bbafca9644c0f2bc09534df6d" PRIMARY KEY (id);


--
-- Name: session_stream_allocated_users_user PK_4ac2d5c51b2a40fab3d090c5d4d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream_allocated_users_user
    ADD CONSTRAINT "PK_4ac2d5c51b2a40fab3d090c5d4d" PRIMARY KEY ("sessionStreamId", "userId");


--
-- Name: session_stream PK_4c05a74aa4bcb6232e597f6be83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream
    ADD CONSTRAINT "PK_4c05a74aa4bcb6232e597f6be83" PRIMARY KEY (id);


--
-- Name: session_allocation PK_52c1e1b8d5dfae4448fb5c0d122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_allocation
    ADD CONSTRAINT "PK_52c1e1b8d5dfae4448fb5c0d122" PRIMARY KEY (id);


--
-- Name: term PK_55b0479f0743f2e5d5ec414821e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.term
    ADD CONSTRAINT "PK_55b0479f0743f2e5d5ec414821e" PRIMARY KEY (id);


--
-- Name: offer PK_57c6ae1abe49201919ef68de900; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY (id);


--
-- Name: preference PK_5c4cbf49a1e97dcbc695bf462a6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.preference
    ADD CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6" PRIMARY KEY (id);


--
-- Name: course_staff PK_6bc9388e2bf79cf6de4678dc81b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_staff
    ADD CONSTRAINT "PK_6bc9388e2bf79cf6de4678dc81b" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: staff_request_swap_preference_session PK_8d7af521a17327e34412a71a699; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request_swap_preference_session
    ADD CONSTRAINT "PK_8d7af521a17327e34412a71a699" PRIMARY KEY ("staffRequestId", "sessionId");


--
-- Name: stream_allocation PK_8ec85fd9f1f15f195b27a532dd9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stream_allocation
    ADD CONSTRAINT "PK_8ec85fd9f1f15f195b27a532dd9" PRIMARY KEY (id);


--
-- Name: user_allocated_streams_session_stream PK_acffe4d5864c18820399bde4116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allocated_streams_session_stream
    ADD CONSTRAINT "PK_acffe4d5864c18820399bde4116" PRIMARY KEY ("userId", "sessionStreamId");


--
-- Name: user_allocated_sessions_session PK_b4c4846f1e9b406a1097621fec1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allocated_sessions_session
    ADD CONSTRAINT "PK_b4c4846f1e9b406a1097621fec1" PRIMARY KEY ("userId", "sessionId");


--
-- Name: course PK_bf95180dd756fd204fb01ce4916; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: timeslot PK_cd8bca557ee1eb5b090b9e63009; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timeslot
    ADD CONSTRAINT "PK_cd8bca557ee1eb5b090b9e63009" PRIMARY KEY (id);


--
-- Name: session PK_f55da76ac1c3ac420f444d2ff11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY (id);


--
-- Name: timetable UQ_091ca503e51c3de094972d48cb2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT "UQ_091ca503e51c3de094972d48cb2" UNIQUE ("courseId", "termId");


--
-- Name: user UQ_390395c3d8592e3e8d8422ce853; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853" UNIQUE ("settingsId");


--
-- Name: staff_request UQ_3aa706a41308e3fd7107bf5d078; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request
    ADD CONSTRAINT "UQ_3aa706a41308e3fd7107bf5d078" UNIQUE ("requesterId", "sessionId");


--
-- Name: session UQ_3d57e44540eb64af0e24d4a02ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "UQ_3d57e44540eb64af0e24d4a02ab" UNIQUE ("sessionStreamId", week);


--
-- Name: session_allocation UQ_48fa99dd8231087c41a285f606f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_allocation
    ADD CONSTRAINT "UQ_48fa99dd8231087c41a285f606f" UNIQUE ("sessionId", "userId");


--
-- Name: course UQ_5cf4963ae12285cda6432d5a3a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE (code);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: stream_allocation UQ_8b449413d5d44c30ffff74aa0f0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stream_allocation
    ADD CONSTRAINT "UQ_8b449413d5d44c30ffff74aa0f0" UNIQUE ("sessionStreamId", "userId");


--
-- Name: term UQ_97a51c8bbbe5d3db497ccffe035; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.term
    ADD CONSTRAINT "UQ_97a51c8bbbe5d3db497ccffe035" UNIQUE (type, year);


--
-- Name: course_staff UQ_d3dfdd3bab57eedfcf1e45bc72d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_staff
    ADD CONSTRAINT "UQ_d3dfdd3bab57eedfcf1e45bc72d" UNIQUE ("preferenceId");


--
-- Name: course_staff UQ_f33c09ecdf4a0ee5a8a27ac971d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_staff
    ADD CONSTRAINT "UQ_f33c09ecdf4a0ee5a8a27ac971d" UNIQUE ("timetableId", "userId");


--
-- Name: IDX_0285bd5e90495ffd4540a213be; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0285bd5e90495ffd4540a213be" ON public.user_allocated_sessions_session USING btree ("sessionId");


--
-- Name: IDX_0c7b4b679e253d31c11e6d9934; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0c7b4b679e253d31c11e6d9934" ON public.user_allocated_streams_session_stream USING btree ("sessionStreamId");


--
-- Name: IDX_37f7a2c9293d636e7b3c1b0482; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_37f7a2c9293d636e7b3c1b0482" ON public.user_allocated_sessions_session USING btree ("userId");


--
-- Name: IDX_3a098cb4f1707a4d217954cfab; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3a098cb4f1707a4d217954cfab" ON public.offer_preferences_session USING btree ("sessionId");


--
-- Name: IDX_3e1a73101620f738bc61dffa19; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3e1a73101620f738bc61dffa19" ON public.user_allocated_streams_session_stream USING btree ("userId");


--
-- Name: IDX_76fe690bd48a4cd9aa58bfcb45; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_76fe690bd48a4cd9aa58bfcb45" ON public.session_stream_allocated_users_user USING btree ("userId");


--
-- Name: IDX_9159aa0df8131c1cd0f242c84d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_9159aa0df8131c1cd0f242c84d" ON public.staff_request_swap_preference_session USING btree ("staffRequestId");


--
-- Name: IDX_971f3356e937e94d7c26d27d15; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_971f3356e937e94d7c26d27d15" ON public.offer_preferences_session USING btree ("offerId");


--
-- Name: IDX_c13a3a9d35ffb7497f0a93cb57; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_c13a3a9d35ffb7497f0a93cb57" ON public.staff_request_swap_preference_session USING btree ("sessionId");


--
-- Name: IDX_e62630c379f91fe30d920b3462; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e62630c379f91fe30d920b3462" ON public.session_stream_allocated_users_user USING btree ("sessionStreamId");


--
-- Name: user_allocated_sessions_session FK_0285bd5e90495ffd4540a213be3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allocated_sessions_session
    ADD CONSTRAINT "FK_0285bd5e90495ffd4540a213be3" FOREIGN KEY ("sessionId") REFERENCES public.session(id) ON DELETE CASCADE;


--
-- Name: offer FK_0a9f568475b4a5401669c61333f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "FK_0a9f568475b4a5401669c61333f" FOREIGN KEY ("requestId") REFERENCES public.staff_request(id) ON DELETE CASCADE;


--
-- Name: user_allocated_streams_session_stream FK_0c7b4b679e253d31c11e6d99341; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allocated_streams_session_stream
    ADD CONSTRAINT "FK_0c7b4b679e253d31c11e6d99341" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id) ON DELETE CASCADE;


--
-- Name: staff_request FK_0f5d437fc98264cfb98dafdf080; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request
    ADD CONSTRAINT "FK_0f5d437fc98264cfb98dafdf080" FOREIGN KEY ("sessionId") REFERENCES public.session(id);


--
-- Name: course_staff FK_2e099fcbb0ffe5108a4df4b31c8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_staff
    ADD CONSTRAINT "FK_2e099fcbb0ffe5108a4df4b31c8" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: course_staff FK_2f8044368c327e2ad804dc1fe56; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_staff
    ADD CONSTRAINT "FK_2f8044368c327e2ad804dc1fe56" FOREIGN KEY ("timetableId") REFERENCES public.timetable(id);


--
-- Name: user_allocated_sessions_session FK_37f7a2c9293d636e7b3c1b0482e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allocated_sessions_session
    ADD CONSTRAINT "FK_37f7a2c9293d636e7b3c1b0482e" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user FK_390395c3d8592e3e8d8422ce853; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_390395c3d8592e3e8d8422ce853" FOREIGN KEY ("settingsId") REFERENCES public.user_settings(id);


--
-- Name: offer_preferences_session FK_3a098cb4f1707a4d217954cfab9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_preferences_session
    ADD CONSTRAINT "FK_3a098cb4f1707a4d217954cfab9" FOREIGN KEY ("sessionId") REFERENCES public.session(id) ON DELETE CASCADE;


--
-- Name: user_allocated_streams_session_stream FK_3e1a73101620f738bc61dffa195; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allocated_streams_session_stream
    ADD CONSTRAINT "FK_3e1a73101620f738bc61dffa195" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: session_allocation FK_4229fc0a3545c3afd0bfb0bb7e4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_allocation
    ADD CONSTRAINT "FK_4229fc0a3545c3afd0bfb0bb7e4" FOREIGN KEY ("sessionId") REFERENCES public.session(id);


--
-- Name: timeslot FK_47d06adf246fcfea1d318423ee3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timeslot
    ADD CONSTRAINT "FK_47d06adf246fcfea1d318423ee3" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: session_allocation FK_4ad45c42f963d66b7d38b6e9fe8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_allocation
    ADD CONSTRAINT "FK_4ad45c42f963d66b7d38b6e9fe8" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: timetable FK_531f53d06003b9e25ed9f2f0cd3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT "FK_531f53d06003b9e25ed9f2f0cd3" FOREIGN KEY ("termId") REFERENCES public.term(id);


--
-- Name: session_stream FK_66028ae4744099f055d7763a503; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream
    ADD CONSTRAINT "FK_66028ae4744099f055d7763a503" FOREIGN KEY ("timetableId") REFERENCES public.timetable(id);


--
-- Name: staff_request FK_726c425ec6ac8e07a84332e6fbb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request
    ADD CONSTRAINT "FK_726c425ec6ac8e07a84332e6fbb" FOREIGN KEY ("finaliserId") REFERENCES public."user"(id);


--
-- Name: session_stream_allocated_users_user FK_76fe690bd48a4cd9aa58bfcb455; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream_allocated_users_user
    ADD CONSTRAINT "FK_76fe690bd48a4cd9aa58bfcb455" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: staff_request_swap_preference_session FK_9159aa0df8131c1cd0f242c84dc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request_swap_preference_session
    ADD CONSTRAINT "FK_9159aa0df8131c1cd0f242c84dc" FOREIGN KEY ("staffRequestId") REFERENCES public.staff_request(id) ON DELETE CASCADE;


--
-- Name: offer_preferences_session FK_971f3356e937e94d7c26d27d15a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer_preferences_session
    ADD CONSTRAINT "FK_971f3356e937e94d7c26d27d15a" FOREIGN KEY ("offerId") REFERENCES public.offer(id) ON DELETE CASCADE;


--
-- Name: timetable FK_9cc6b2c53c23571cad8390666f4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetable
    ADD CONSTRAINT "FK_9cc6b2c53c23571cad8390666f4" FOREIGN KEY ("courseId") REFERENCES public.course(id);


--
-- Name: stream_allocation FK_b3d5528826d766b691e1132107f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stream_allocation
    ADD CONSTRAINT "FK_b3d5528826d766b691e1132107f" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id);


--
-- Name: offer FK_b5bd4b6466627203e4bc13b5fe0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "FK_b5bd4b6466627203e4bc13b5fe0" FOREIGN KEY ("acceptedSessionId") REFERENCES public.session(id);


--
-- Name: stream_allocation FK_bc7afec02062c5cedc6d14bd6af; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stream_allocation
    ADD CONSTRAINT "FK_bc7afec02062c5cedc6d14bd6af" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: staff_request_swap_preference_session FK_c13a3a9d35ffb7497f0a93cb570; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request_swap_preference_session
    ADD CONSTRAINT "FK_c13a3a9d35ffb7497f0a93cb570" FOREIGN KEY ("sessionId") REFERENCES public.session(id) ON DELETE CASCADE;


--
-- Name: course_staff FK_d3dfdd3bab57eedfcf1e45bc72d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_staff
    ADD CONSTRAINT "FK_d3dfdd3bab57eedfcf1e45bc72d" FOREIGN KEY ("preferenceId") REFERENCES public.preference(id);


--
-- Name: session FK_e18308596f3076e9de1d80c6f51; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id);


--
-- Name: session_stream FK_e5d1bede2546c0a492f77ae71ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream
    ADD CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec" FOREIGN KEY ("basedId") REFERENCES public.session_stream(id);


--
-- Name: session_stream_allocated_users_user FK_e62630c379f91fe30d920b34626; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream_allocated_users_user
    ADD CONSTRAINT "FK_e62630c379f91fe30d920b34626" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id) ON DELETE CASCADE;


--
-- Name: offer FK_e8100751be1076656606ae045e3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "FK_e8100751be1076656606ae045e3" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: staff_request FK_f8d9da2b83b977dcc23b6c2fc60; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_request
    ADD CONSTRAINT "FK_f8d9da2b83b977dcc23b6c2fc60" FOREIGN KEY ("requesterId") REFERENCES public."user"(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

