--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.3 (Ubuntu 13.3-1.pgdg20.04+1)

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

ALTER TABLE IF EXISTS ONLY public.staff_request DROP CONSTRAINT IF EXISTS "FK_f8d9da2b83b977dcc23b6c2fc60";
ALTER TABLE IF EXISTS ONLY public.offer DROP CONSTRAINT IF EXISTS "FK_e8100751be1076656606ae045e3";
ALTER TABLE IF EXISTS ONLY public.session_stream_allocated_users_user DROP CONSTRAINT IF EXISTS "FK_e62630c379f91fe30d920b34626";
ALTER TABLE IF EXISTS ONLY public.session_stream DROP CONSTRAINT IF EXISTS "FK_e5d1bede2546c0a492f77ae71ec";
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS "FK_e18308596f3076e9de1d80c6f51";
ALTER TABLE IF EXISTS ONLY public.course_staff DROP CONSTRAINT IF EXISTS "FK_d3dfdd3bab57eedfcf1e45bc72d";
ALTER TABLE IF EXISTS ONLY public.staff_request_swap_preference_session DROP CONSTRAINT IF EXISTS "FK_c13a3a9d35ffb7497f0a93cb570";
ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "FK_bc7afec02062c5cedc6d14bd6af";
ALTER TABLE IF EXISTS ONLY public.offer DROP CONSTRAINT IF EXISTS "FK_b5bd4b6466627203e4bc13b5fe0";
ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "FK_b3d5528826d766b691e1132107f";
ALTER TABLE IF EXISTS ONLY public.timetable DROP CONSTRAINT IF EXISTS "FK_9cc6b2c53c23571cad8390666f4";
ALTER TABLE IF EXISTS ONLY public.offer_preferences_session DROP CONSTRAINT IF EXISTS "FK_971f3356e937e94d7c26d27d15a";
ALTER TABLE IF EXISTS ONLY public.staff_request_swap_preference_session DROP CONSTRAINT IF EXISTS "FK_9159aa0df8131c1cd0f242c84dc";
ALTER TABLE IF EXISTS ONLY public.session_stream_allocated_users_user DROP CONSTRAINT IF EXISTS "FK_76fe690bd48a4cd9aa58bfcb455";
ALTER TABLE IF EXISTS ONLY public.staff_request DROP CONSTRAINT IF EXISTS "FK_726c425ec6ac8e07a84332e6fbb";
ALTER TABLE IF EXISTS ONLY public.session_stream DROP CONSTRAINT IF EXISTS "FK_66028ae4744099f055d7763a503";
ALTER TABLE IF EXISTS ONLY public.timetable DROP CONSTRAINT IF EXISTS "FK_531f53d06003b9e25ed9f2f0cd3";
ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "FK_4ad45c42f963d66b7d38b6e9fe8";
ALTER TABLE IF EXISTS ONLY public.timeslot DROP CONSTRAINT IF EXISTS "FK_47d06adf246fcfea1d318423ee3";
ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "FK_4229fc0a3545c3afd0bfb0bb7e4";
ALTER TABLE IF EXISTS ONLY public.user_allocated_streams_session_stream DROP CONSTRAINT IF EXISTS "FK_3e1a73101620f738bc61dffa195";
ALTER TABLE IF EXISTS ONLY public.offer_preferences_session DROP CONSTRAINT IF EXISTS "FK_3a098cb4f1707a4d217954cfab9";
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS "FK_390395c3d8592e3e8d8422ce853";
ALTER TABLE IF EXISTS ONLY public.user_allocated_sessions_session DROP CONSTRAINT IF EXISTS "FK_37f7a2c9293d636e7b3c1b0482e";
ALTER TABLE IF EXISTS ONLY public.course_staff DROP CONSTRAINT IF EXISTS "FK_2f8044368c327e2ad804dc1fe56";
ALTER TABLE IF EXISTS ONLY public.course_staff DROP CONSTRAINT IF EXISTS "FK_2e099fcbb0ffe5108a4df4b31c8";
ALTER TABLE IF EXISTS ONLY public.staff_request DROP CONSTRAINT IF EXISTS "FK_0f5d437fc98264cfb98dafdf080";
ALTER TABLE IF EXISTS ONLY public.user_allocated_streams_session_stream DROP CONSTRAINT IF EXISTS "FK_0c7b4b679e253d31c11e6d99341";
ALTER TABLE IF EXISTS ONLY public.offer DROP CONSTRAINT IF EXISTS "FK_0a9f568475b4a5401669c61333f";
ALTER TABLE IF EXISTS ONLY public.user_allocated_sessions_session DROP CONSTRAINT IF EXISTS "FK_0285bd5e90495ffd4540a213be3";
DROP INDEX IF EXISTS public."IDX_e62630c379f91fe30d920b3462";
DROP INDEX IF EXISTS public."IDX_c13a3a9d35ffb7497f0a93cb57";
DROP INDEX IF EXISTS public."IDX_971f3356e937e94d7c26d27d15";
DROP INDEX IF EXISTS public."IDX_9159aa0df8131c1cd0f242c84d";
DROP INDEX IF EXISTS public."IDX_76fe690bd48a4cd9aa58bfcb45";
DROP INDEX IF EXISTS public."IDX_3e1a73101620f738bc61dffa19";
DROP INDEX IF EXISTS public."IDX_3a098cb4f1707a4d217954cfab";
DROP INDEX IF EXISTS public."IDX_37f7a2c9293d636e7b3c1b0482";
DROP INDEX IF EXISTS public."IDX_0c7b4b679e253d31c11e6d9934";
DROP INDEX IF EXISTS public."IDX_0285bd5e90495ffd4540a213be";
ALTER TABLE IF EXISTS ONLY public.course_staff DROP CONSTRAINT IF EXISTS "UQ_f33c09ecdf4a0ee5a8a27ac971d";
ALTER TABLE IF EXISTS ONLY public.course_staff DROP CONSTRAINT IF EXISTS "UQ_d3dfdd3bab57eedfcf1e45bc72d";
ALTER TABLE IF EXISTS ONLY public.term DROP CONSTRAINT IF EXISTS "UQ_97a51c8bbbe5d3db497ccffe035";
ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "UQ_8b449413d5d44c30ffff74aa0f0";
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS "UQ_78a916df40e02a9deb1c4b75edb";
ALTER TABLE IF EXISTS ONLY public.course DROP CONSTRAINT IF EXISTS "UQ_5cf4963ae12285cda6432d5a3a4";
ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "UQ_48fa99dd8231087c41a285f606f";
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS "UQ_3d57e44540eb64af0e24d4a02ab";
ALTER TABLE IF EXISTS ONLY public.staff_request DROP CONSTRAINT IF EXISTS "UQ_3aa706a41308e3fd7107bf5d078";
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS "UQ_390395c3d8592e3e8d8422ce853";
ALTER TABLE IF EXISTS ONLY public.timetable DROP CONSTRAINT IF EXISTS "UQ_091ca503e51c3de094972d48cb2";
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS "PK_f55da76ac1c3ac420f444d2ff11";
ALTER TABLE IF EXISTS ONLY public.timeslot DROP CONSTRAINT IF EXISTS "PK_cd8bca557ee1eb5b090b9e63009";
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS "PK_cace4a159ff9f2512dd42373760";
ALTER TABLE IF EXISTS ONLY public.course DROP CONSTRAINT IF EXISTS "PK_bf95180dd756fd204fb01ce4916";
ALTER TABLE IF EXISTS ONLY public.user_allocated_sessions_session DROP CONSTRAINT IF EXISTS "PK_b4c4846f1e9b406a1097621fec1";
ALTER TABLE IF EXISTS ONLY public.user_allocated_streams_session_stream DROP CONSTRAINT IF EXISTS "PK_acffe4d5864c18820399bde4116";
ALTER TABLE IF EXISTS ONLY public.stream_allocation DROP CONSTRAINT IF EXISTS "PK_8ec85fd9f1f15f195b27a532dd9";
ALTER TABLE IF EXISTS ONLY public.staff_request_swap_preference_session DROP CONSTRAINT IF EXISTS "PK_8d7af521a17327e34412a71a699";
ALTER TABLE IF EXISTS ONLY public.migrations DROP CONSTRAINT IF EXISTS "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE IF EXISTS ONLY public.course_staff DROP CONSTRAINT IF EXISTS "PK_6bc9388e2bf79cf6de4678dc81b";
ALTER TABLE IF EXISTS ONLY public.preference DROP CONSTRAINT IF EXISTS "PK_5c4cbf49a1e97dcbc695bf462a6";
ALTER TABLE IF EXISTS ONLY public.offer DROP CONSTRAINT IF EXISTS "PK_57c6ae1abe49201919ef68de900";
ALTER TABLE IF EXISTS ONLY public.term DROP CONSTRAINT IF EXISTS "PK_55b0479f0743f2e5d5ec414821e";
ALTER TABLE IF EXISTS ONLY public.session_allocation DROP CONSTRAINT IF EXISTS "PK_52c1e1b8d5dfae4448fb5c0d122";
ALTER TABLE IF EXISTS ONLY public.session_stream DROP CONSTRAINT IF EXISTS "PK_4c05a74aa4bcb6232e597f6be83";
ALTER TABLE IF EXISTS ONLY public.session_stream_allocated_users_user DROP CONSTRAINT IF EXISTS "PK_4ac2d5c51b2a40fab3d090c5d4d";
ALTER TABLE IF EXISTS ONLY public.staff_request DROP CONSTRAINT IF EXISTS "PK_41bbafca9644c0f2bc09534df6d";
ALTER TABLE IF EXISTS ONLY public.offer_preferences_session DROP CONSTRAINT IF EXISTS "PK_192129d1763740f5519d150d033";
ALTER TABLE IF EXISTS ONLY public.timetable DROP CONSTRAINT IF EXISTS "PK_06001d91b3fe346fb1387ad1a15";
ALTER TABLE IF EXISTS ONLY public.user_settings DROP CONSTRAINT IF EXISTS "PK_00f004f5922a0744d174530d639";
ALTER TABLE IF EXISTS public.migrations ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.user_settings;
DROP TABLE IF EXISTS public.user_allocated_streams_session_stream;
DROP TABLE IF EXISTS public.user_allocated_sessions_session;
DROP TABLE IF EXISTS public."user";
DROP TABLE IF EXISTS public.timetable;
DROP TABLE IF EXISTS public.timeslot;
DROP TABLE IF EXISTS public.term;
DROP TABLE IF EXISTS public.stream_allocation;
DROP TABLE IF EXISTS public.staff_request_swap_preference_session;
DROP TABLE IF EXISTS public.staff_request;
DROP TABLE IF EXISTS public.session_stream_allocated_users_user;
DROP TABLE IF EXISTS public.session_stream;
DROP TABLE IF EXISTS public.session_allocation;
DROP TABLE IF EXISTS public.session;
DROP TABLE IF EXISTS public.preference;
DROP TABLE IF EXISTS public.offer_preferences_session;
DROP TABLE IF EXISTS public.offer;
DROP SEQUENCE IF EXISTS public.migrations_id_seq;
DROP TABLE IF EXISTS public.migrations;
DROP TABLE IF EXISTS public.course_staff;
DROP TABLE IF EXISTS public.course;
DROP EXTENSION IF EXISTS "uuid-ossp";
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

INSERT INTO public.course (code, title, id) VALUES ('CSSE1001', 'Introduction to Software Engineering', '0a2e6669-f8aa-45e9-8aeb-7a92ed495871');
INSERT INTO public.course (code, title, id) VALUES ('CSSE2002', 'Programming in the Large', '4de5ca8e-0698-4a7d-9241-2cb9fc37b376');


--
-- Data for Name: course_staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Course Coordinator', false, 'a19c9c07-ee46-459b-b9bb-208821052882', '52cbc02c-c5ac-401f-80ab-25eb8ff15f45', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Course Coordinator', false, '607a6b63-fcab-4440-83b8-9608fb99868f', '548c11f0-731d-4b94-bb1a-da788bb4d968', '86b6d4b0-a8c5-4c42-8278-e649144f92b3', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'cc163400-f20d-4ef0-87ca-5f4f4f68f243', '2c695967-3ea7-4c0b-bfb7-59620c8cc889', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '6dc22fde-ff34-4b6e-b4e2-da170f5cbc9c', '7cf88095-d09a-4be3-8ec3-5be454f4f477', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '0865628d-7746-498a-bc6c-1fdad938fe2a', '03886e63-79bd-41ad-a142-685e538dacb4', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'b16ef5c5-0a78-40b8-b96a-c74325351653', '6e4cbf72-d67e-4259-bf65-630a6eb1d477', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'b683e924-7c41-4c65-8ab7-8d42f5ec257a', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '17073eb9-4580-4abc-9307-0cfd3c34fa2e', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '101e4077-afc0-4f1a-9b83-3d72fd687e8c', '242cbad3-d5b6-4f43-9b99-4b799c980ebd', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '01f5305e-770d-487e-a86e-7909e1205f91', '6cb0f404-349b-4f3c-b54e-0e16ba0f2c43', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'a84962e3-1c60-4dc2-bff2-2a9c9f383218', 'fd506f28-69f7-4132-94f3-266e9870df33', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'a920549f-f05b-4099-a548-39705b845589', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '795c91cc-eaec-42d9-a228-52f66a7653bb', 'adcfba2f-b728-47d9-b7f3-a33dae7ca6e9', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'ab1b8203-26b1-49ae-8b89-de401f66b99f', '53ac4ab7-7c72-4129-a558-2e9d702a25cb', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '45bdea1a-8b53-4076-8d49-d24f95b3aeb3', 'b97e746c-6cce-42d8-b851-33c71ca8e563', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '8a101a1d-b85b-4105-ae26-54668ab1b840', 'abbf094f-758c-4d84-b685-6b3ddab80cf1', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '797e93c2-fdf4-4a13-94ec-9ab4f2568451', '9be82e08-7a5a-4f67-9264-d96d6338f984', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'decf5375-9c6c-4e38-8eba-395c487678c1', 'db75c78e-bdd7-40fe-8bbc-a05f810a7f47', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '550e8e08-1a03-478b-ac56-b526cdb7651e', 'c0869562-3864-459a-8465-ac0eac89003c', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '29f86f57-e1b1-4ebd-bfb6-316e05482a90', '4a8a9c39-24f7-4fab-9da6-8ce9fd745d62', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'f832d241-fe41-4ada-a557-71306ad47ec3', 'c631f530-80aa-4684-ba5a-ce461d71084d', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '6599aedf-073d-4aaf-91b1-d2cd3c38f7f8', '54f7915a-607d-497d-8801-01b7b961270a', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '18f5ae3a-2a88-44f1-beea-7f2193f31b5c', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'c4c1c6d8-e7f5-4184-8910-36fe41ba222e', '8a303a17-a00e-406b-81fe-fc1ffe8521be', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, '2d9238eb-a1d1-4f01-be57-8d671409da03', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'a573ea16-5f40-4c6e-91ab-7a91c3840952', '82ebad48-e354-459f-8031-d6d482d5fa86', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'd879892d-7baa-419e-b250-7025f3d2915c', '441364b8-ab97-4b65-97e6-cbd60a9780b2', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.course_staff (role, "isNew", id, "userId", "timetableId", "preferenceId") VALUES ('Staff', false, 'c48c2cd2-73dd-4f56-9027-d0d86e3a2c9f', '321c7d45-48c8-4e34-a316-be93e2c51bee', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.migrations (id, "timestamp", name) VALUES (1, 1607706093168, 'Migration1607706093168');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (2, 1608127897194, 'Migration1608127897194');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (3, 1608357575728, 'Migration1608357575728');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (4, 1608389153900, 'Migration1608389153900');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (5, 1608507278381, 'Migration1608507278381');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (6, 1608515129064, 'Migration1608515129064');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (7, 1608599633048, 'Migration1608599633048');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (8, 1608600357360, 'Migration1608600357360');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (9, 1608600591223, 'Migration1608600591223');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (10, 1608629318688, 'Migration1608629318688');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (11, 1608629865707, 'Migration1608629865707');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (12, 1608630196646, 'Migration1608630196646');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (13, 1608727537693, 'Migration1608727537693');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (14, 1609484892238, 'Migration1609484892238');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (15, 1609505756451, 'Migration1609505756451');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (16, 1609763677449, 'Migration1609763677449');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (17, 1610435742105, 'Migration1610435742105');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (18, 1610544047125, 'Migration1610544047125');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (19, 1611010071679, 'Migration1611010071679');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (20, 1611213867277, 'Migration1611213867277');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (21, 1611341902656, 'Migration1611341902656');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (22, 1611735562524, 'Migration1611735562524');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (23, 1611889335238, 'Migration1611889335238');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (24, 1612775365234, 'Migration1612775365234');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (25, 1612870895263, 'Migration1612870895263');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (26, 1613187973186, 'Migration1613187973186');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (27, 1621667603333, 'Migration1621667603333');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (28, 1621820482405, 'Migration1621820482405');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (29, 1621976018497, 'Migration1621976018497');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (30, 1622010648800, 'Migration1622010648800');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (31, 1622104291460, 'Migration1622104291460');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (32, 1622105311658, 'Migration1622105311658');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (33, 1622105602942, 'Migration1622105602942');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (34, 1622325662597, 'Migration1622325662597');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (35, 1622329357373, 'Migration1622329357373');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (36, 1622372733295, 'Migration1622372733295');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (37, 1622420860482, 'Migration1622420860482');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (38, 1622518561874, 'Migration1622518561874');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (39, 1622563751814, 'Migration1622563751814');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (40, 1622612929057, 'Migration1622612929057');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (41, 1622619001323, 'Migration1622619001323');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (42, 1622620873881, 'Migration1622620873881');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (43, 1622621014786, 'Migration1622621014786');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (44, 1622864231164, 'Migration1622864231164');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (45, 1622893691814, 'Migration1622893691814');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (46, 1623023474369, 'Migration1623023474369');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (47, 1623032138551, 'Migration1623032138551');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (48, 1623062273294, 'Migration1623062273294');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (49, 1623063118210, 'Migration1623063118210');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (50, 1623066711344, 'Migration1623066711344');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (51, 1623806080691, 'Migration1623806080691');
INSERT INTO public.migrations (id, "timestamp", name) VALUES (52, 1623806888791, 'Migration1623806888791');


--
-- Data for Name: offer; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: offer_preferences_session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: preference; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 100, 1005, 'bf1419d8-100c-433a-8d05-4f5a35efdc70', 'cc163400-f20d-4ef0-87ca-5f4f4f68f243');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 20, 100, '35e2e35d-c086-4f40-aab9-6e9fa1fdc3bf', '6dc22fde-ff34-4b6e-b4e2-da170f5cbc9c');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES (NULL, 4, 16, '017f6c35-0104-4ca1-bc89-50839c492813', '0865628d-7746-498a-bc6c-1fdad938fe2a');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES (NULL, 8, 12, '3c7eec7e-135e-485f-b5f3-b41cc6fa817a', 'b16ef5c5-0a78-40b8-b96a-c74325351653');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 2, 6, '40010b25-f0e4-4fb2-867e-c0bd43642551', 'b683e924-7c41-4c65-8ab7-8d42f5ec257a');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 6, 16, 'b25a0f0a-cab2-4602-8528-b03a12519b03', '17073eb9-4580-4abc-9307-0cfd3c34fa2e');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES (NULL, 20, 100, 'dab7fcc3-5ed9-45e8-b87f-d89cb496e80a', '101e4077-afc0-4f1a-9b83-3d72fd687e8c');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 4, 6, '3036271c-fa42-47c9-afaf-da91ab92aa13', 'a84962e3-1c60-4dc2-bff2-2a9c9f383218');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Tutorial', 3, 8, 'f0e3f0af-9436-4edd-9b9d-e98a11d78e3c', 'a920549f-f05b-4099-a548-39705b845589');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Tutorial', 6, 10, '7c8f794e-2a3d-462a-95a4-7dc69399d540', '795c91cc-eaec-42d9-a228-52f66a7653bb');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 6, 14, '09165d80-2878-4885-9e6b-45c58ec33341', 'ab1b8203-26b1-49ae-8b89-de401f66b99f');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 5, 8, 'ea9e4ea6-1089-4978-84d5-a76e23f68443', '45bdea1a-8b53-4076-8d49-d24f95b3aeb3');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 2, 3, 'd2a67e30-1f7f-40dc-b3b2-f292bf871195', '8a101a1d-b85b-4105-ae26-54668ab1b840');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES (NULL, 4, 14, 'c42aa1d7-8605-4ce2-837a-00459939f1df', '797e93c2-fdf4-4a13-94ec-9ab4f2568451');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 8, 16, '4c9db04e-8eec-4072-bc31-e20b813a05e3', 'decf5375-9c6c-4e38-8eba-395c487678c1');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 6, 8, 'ff1f84b9-efff-4a1e-9750-4997b37e6d10', '550e8e08-1a03-478b-ac56-b526cdb7651e');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES (NULL, 4, 10, 'f42f9798-ceb4-46bc-8df0-ed6d3f0050de', '29f86f57-e1b1-4ebd-bfb6-316e05482a90');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Practical', 4, 20, '24ccbc46-9532-49f1-af4e-95d8ec7dd910', 'f832d241-fe41-4ada-a557-71306ad47ec3');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Tutorial', 3, 100, '9e78fa37-f31d-4807-abbe-7389c957174a', '6599aedf-073d-4aaf-91b1-d2cd3c38f7f8');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES (NULL, 4, 12, '2baa462c-24a0-4682-b5c8-4eab9ff14d9f', '18f5ae3a-2a88-44f1-beea-7f2193f31b5c');
INSERT INTO public.preference ("sessionType", "maxContigHours", "maxWeeklyHours", id, "courseStaffId") VALUES ('Tutorial', 3, 5, '695b5d54-af60-478c-a3fb-b89ba49a2d31', 'c4c1c6d8-e7f5-4184-8910-36fe41ba222e');


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '350453c2-2469-4e00-af08-5323f36bf699', 'ae7942ce-ed30-40cf-b8f0-1192f5e3fe09');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '6e69429e-c3f9-405a-bfb5-19ca79803321', 'ae7942ce-ed30-40cf-b8f0-1192f5e3fe09');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'a67f4079-9e9e-489d-99b2-2e131487707d', 'ae7942ce-ed30-40cf-b8f0-1192f5e3fe09');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'a40e2da1-8aed-496d-9b4c-4324c3301e69', '264d9e1d-470d-4aaf-9307-e641da63324c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'b6ef2684-e385-4e76-b804-dabc4dbb8dd2', '264d9e1d-470d-4aaf-9307-e641da63324c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '41d7f3bf-962b-4320-984d-4b571ed3d520', '264d9e1d-470d-4aaf-9307-e641da63324c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, 'fb7bb88f-60ea-4bbf-be51-e885c91d6f3e', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '2075c1b4-af45-4c15-a754-7d82f2cd6fc3', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '4907fa63-54d2-427e-b8d9-7b86afde17e3', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '9cdabd48-ff72-4ab8-aa19-7ed8d7362da4', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '56665fa0-0dae-4c3c-b439-c7d2697f8d68', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'a9db4042-96b0-41b1-a6d9-0be5a49c4ab6', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '50bfa876-b581-4239-afbb-351adf535895', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '18351a2e-a4e3-4312-a30e-cc19bc7fdc8c', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '027f02ef-c1ae-4906-b08b-941ae0e68f3c', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '25d2af48-95dd-40b3-85d9-7f7ef9abfbad', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '66cc10f7-36e6-4d59-97c7-4e571f731a1f', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '222af1b8-511d-4d63-a42c-241dd5b2f5c7', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '2548ebcf-c87b-4961-b792-07a44c9863e9', '7c2ff7c1-04d8-42d3-ad78-573e455fe981');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '00350f40-0220-40ef-b77f-4a40628aec25', '7c2ff7c1-04d8-42d3-ad78-573e455fe981');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '44c0fb2f-7f56-4343-aafe-c10b803af9c4', '7c2ff7c1-04d8-42d3-ad78-573e455fe981');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '4e6e606e-fcb8-4213-b478-44c8e8059374', '6567833d-8024-4472-8010-41f6e4fc3198');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'a7d7848e-4497-4108-95fa-1193c91cebf5', '6567833d-8024-4472-8010-41f6e4fc3198');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '09d2d483-81c0-478d-9647-6b3303d53a4b', '6567833d-8024-4472-8010-41f6e4fc3198');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, 'e6f3e0d2-a76c-448b-8f2d-9764283fd8aa', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '267bde76-48df-4195-8251-56be7cdd1fe5', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '73cf91e7-8d83-4b02-a116-5c4d6a37d3cc', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'c9147e6a-e50a-4b17-9f50-dbf10c94b18b', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '30e4cde7-1843-4e7b-93d5-19de611105b1', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'b16b69c6-055d-49de-9cef-96437380967f', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '6795cba3-e5bf-44b9-86a0-7300afa79f29', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, 'e104cca4-f2d3-49e6-b75a-d949ab8f00f6', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, 'a7756554-0d5d-4b07-bcd8-b8ad244f1075', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '9daa458d-0383-4303-a5e4-43b05b428532', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'ee3d894f-78aa-47c1-bb0b-3985ebc37f2d', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '7620ca83-3558-4ae0-b4a6-d7c3850cf6e7', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 4, '4c93fbd8-8d46-446f-922f-2d1f9d2968c0', 'aab277c1-d8fe-4c37-8626-d344f4dc3627');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 7, '1c193133-1f34-4c1f-aab1-15bbb8b29f13', 'aab277c1-d8fe-4c37-8626-d344f4dc3627');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 13, '2b987e13-33a4-433a-b6e7-c603ac10a65d', 'aab277c1-d8fe-4c37-8626-d344f4dc3627');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 5, '5a14b36a-ca6e-4e89-ab73-b2e5a7b65f38', 'a282fb64-a055-43fd-a1a4-6f681d05400f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 8, '109cfe25-2835-4239-895c-b12e6ee43715', 'a282fb64-a055-43fd-a1a4-6f681d05400f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 14, '9c483aa6-9e9f-4cf6-8c5e-91a47e736434', 'a282fb64-a055-43fd-a1a4-6f681d05400f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 2, '7228ff22-3b8c-4587-ab4e-5160a9bdca46', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 3, '7a911dcf-b5e1-432e-8c0f-e0ca9cf9a6b7', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 4, '5cf37b3b-3fb1-4fe1-b1ce-eed5ba24d807', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 5, '6b14669c-cd5a-4fda-a13f-114d5d3a0a00', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 6, '3d72bf98-2435-4222-9575-3e14a28f5992', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 7, 'ab17bdf9-1e43-4384-9b1c-1ebea6b47054', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 8, '93ed8c07-598f-4038-8321-9cca6058f0ba', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 10, '0f96777b-3feb-4958-88c6-e0d56d9596ba', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 11, '4794b054-28a8-4d79-926a-1c3f077f03d5', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 12, 'f8bac1d1-905e-4979-af16-01aa73874050', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 13, '3f5f88ef-a698-42d4-86ee-d3877addeb1a', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 14, '4779133f-5a9c-4246-9298-a338095af248', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 4, 'c0fb9e35-8ccf-4bd8-bc5b-246f7f8dabec', 'a5302ce6-cbdf-4fcc-8458-f79eadc4d14e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 7, '3f709095-e9e0-420d-9f82-997d2fd1a95b', 'a5302ce6-cbdf-4fcc-8458-f79eadc4d14e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 13, 'edb665d4-3c9f-40c8-9bc5-1be4cb50d612', 'a5302ce6-cbdf-4fcc-8458-f79eadc4d14e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 5, 'aeef22fe-329c-440b-8333-ac6d7babbc92', '375160cd-77eb-493f-835e-a496bc138c94');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 8, '09332557-1d9f-43f8-94ab-96dda39f15dc', '375160cd-77eb-493f-835e-a496bc138c94');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 14, '81049f97-d7ad-47dd-bf19-e0d4c5ae9193', '375160cd-77eb-493f-835e-a496bc138c94');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 2, '7aa6b719-455e-479e-9335-7942111177c0', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 3, 'bc59b01c-74e2-41e0-baa8-443212894036', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 4, '42e5632a-a46b-40fa-bab6-ca70d153c261', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 5, '50764b43-f12d-4264-8345-24729c597c18', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 6, 'f7dd3f4d-188b-4209-ab1d-5bd4658f0558', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 7, '79087900-2439-43a2-8173-aa6c8d350d92', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 8, '4779bb4d-c222-4fa9-99b7-c3452ed90593', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 10, '0f568cf8-995c-41c8-9dc7-58d9c181e325', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 11, '2b8175e9-db8e-4508-8305-79d9c716d76b', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 12, '3c4c56f8-8b49-4446-a4bb-3b72a5d8f121', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 13, 'cbeefb9b-9cca-4b2d-b98f-b9ab9547844c', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 14, '611592f4-6a16-4088-9a89-4dc4932dc22a', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 4, 'cd724ca8-3b81-469c-9e65-c42207a0444a', 'c656b904-4fbb-41f2-9687-2c1f86c987ce');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 7, '16a2193f-bf9a-4cd0-be29-ee169b64ba13', 'c656b904-4fbb-41f2-9687-2c1f86c987ce');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 13, '128f0944-6307-4542-804e-80df2715d6dc', 'c656b904-4fbb-41f2-9687-2c1f86c987ce');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 2, '1cb27e6b-ff83-48c9-aec4-26d0cfccb747', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 3, 'e49dd3ee-cc9b-4106-ab3f-e823a1ecb302', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 4, '9142d4b6-dffe-47f4-a038-8eccfea2a042', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 5, 'de45771d-cad1-4185-a928-adc2bf31e346', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 6, '2a98d05a-22f0-4386-be53-a12742788153', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 7, 'd34c8f88-7d30-4528-bc59-d5d5f2c023f2', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 8, 'ed984e52-bb40-4a8c-9ab3-214c38cbd32a', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 10, '81975ac2-84e9-45fb-8928-ccbae6d7bdfd', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 11, '5890bf8c-1dc3-454d-b29c-d5dc84ce056a', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 12, '6cc7aa20-9dec-4d34-b16e-5d1f5e0edb48', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 13, '9ecfaf72-4297-4e4a-b747-093365d4c06e', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 14, '45a347df-cec7-4107-b74f-755007b4e277', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 5, 'a282e10c-64d9-45b4-818b-b005cd7a6d79', '3f3336c8-8d56-437a-a3e9-943e90374bdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 8, 'a1c4672d-265b-4fcf-9bad-69c9f19687e5', '3f3336c8-8d56-437a-a3e9-943e90374bdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-218', 14, '75e776d8-216b-4dcb-8f3b-e6335e958b13', '3f3336c8-8d56-437a-a3e9-943e90374bdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 4, 'eed5949e-a7d1-4be1-afb9-8066d1d05714', 'd4f613f6-6937-4567-b446-0b7bbab05923');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 7, 'c8b9d0e5-ef87-4811-8b2d-08529b6c3478', 'd4f613f6-6937-4567-b446-0b7bbab05923');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 13, '52e54c6f-222b-44be-88fa-294511cf8e7b', 'd4f613f6-6937-4567-b446-0b7bbab05923');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 2, '5de8d8f5-f650-49bf-b586-653eef1733e5', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 3, 'cd91a6c0-46f0-4027-96b3-48936955b6bc', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 4, '51c31041-503e-4362-bde3-be9ff1e1bd03', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 5, '76265d55-3a48-4814-8669-fbb47521ab67', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 6, '75b03347-81db-4013-96e8-06908b959b60', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 7, '10d9e0f4-c485-4b30-88c4-8f83b72b3105', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 8, '081e152d-aa33-4322-87f4-971095b4ed17', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 10, '64498d71-cc79-48a1-a768-51bb6dac7203', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 11, '17289b7a-89ec-42a6-92c9-4396023279d0', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 12, '3c127bb9-7953-42e8-8575-b78ff23776ba', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 13, '5148987a-02ff-4808-8bd2-97df69bf14de', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 14, '7eec5d72-1e9c-415e-a41d-ac243ed28cd4', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 5, '060bb6c7-a63a-4e69-99bd-bb1fe856f386', '052277cf-1871-4dc6-8f24-2273629fd3fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 8, '17199bc3-08ca-4f04-a45a-f4fccf3dc74d', '052277cf-1871-4dc6-8f24-2273629fd3fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 14, 'c86df9c2-896e-4dd3-97b2-4b9e3d13e9a5', '052277cf-1871-4dc6-8f24-2273629fd3fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 4, '8ba89a4a-b5b6-4d16-9220-7974b897c5a4', '27883ef1-f2c6-4ef4-b0e3-93ce036ae69f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 5, '2c86a351-81d4-4909-8603-792e75773d4c', '2ea76a99-c5f2-4d29-889e-7ee0aa084f1b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 7, '6a812e39-d23e-4427-b077-74f73ec8825a', '27883ef1-f2c6-4ef4-b0e3-93ce036ae69f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 13, '4af897b3-2ff1-43b1-8f30-a7813295aef1', '27883ef1-f2c6-4ef4-b0e3-93ce036ae69f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 8, '8f3af709-e181-4183-ba10-9e9d5a73408c', '2ea76a99-c5f2-4d29-889e-7ee0aa084f1b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 14, 'ccfea167-6be6-43ae-9079-0ba19fabadd0', '2ea76a99-c5f2-4d29-889e-7ee0aa084f1b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 2, '078729f5-402f-4977-b35a-d5fea018dc06', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 3, '23c505c7-8dc4-4ea4-ad2d-2c27a3994060', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 4, '87b4da20-784e-41ec-9162-5eeadf7b629b', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 5, '564b3c66-63cb-4fd4-9885-b311fcdd9ca4', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 6, '6ff73bf8-1934-4eb3-83bd-088b3a4cb9b0', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 7, '86e61ab4-f913-4722-a7ea-693007b1f470', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 8, '4a544e44-0d11-463e-ae8d-c5d40f70c0e3', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 10, 'e7fe4d49-48d7-4024-ae5c-8dfa91ee8ba4', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 11, '82e75cf8-10a2-4499-9d7e-53f09f04e616', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 12, '580e5c8c-62cc-41b7-9864-69129f903b01', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 13, 'fdf206c8-f3d3-4167-b19b-4bded4a1e7af', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 14, '6c98f305-e3f2-4a35-a1eb-6494acd50010', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 4, 'e8466c8e-ef0a-4ea3-a666-c2a44ce3ce50', 'e3a367ec-9dbc-4fc1-8fbc-c017958a2985');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 7, '0605c45a-7259-4c41-938a-c28e202fd753', 'e3a367ec-9dbc-4fc1-8fbc-c017958a2985');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 13, '3dce5d72-51a7-4e72-8805-9df52a4e6a8d', 'e3a367ec-9dbc-4fc1-8fbc-c017958a2985');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 5, 'a458c256-3340-4bf5-b2e1-bf71b0b3de4d', '04847075-8b57-4d49-8cd7-504de2a808fc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 8, 'bbe2818e-3c4c-4bc0-9602-9bf76c600850', '04847075-8b57-4d49-8cd7-504de2a808fc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 14, '19371be9-3a74-4fd7-8b0c-ae9f9723b564', '04847075-8b57-4d49-8cd7-504de2a808fc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 2, 'a56ffb17-ef1d-477a-b160-e46c3ec6757d', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 3, '472ab44e-6880-41d4-9e57-659b4b5a060d', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 4, '597b921e-6dd2-48f0-92ae-5070ca3ddc2a', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 5, 'b3874206-31cb-44d0-bf2b-c1e537ac3bce', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 6, '3dc21446-5d10-45f0-a989-18572fc193b2', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 7, 'a61705b9-a0fd-4df0-b355-bd11deae3568', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 8, 'be774d70-bc38-4e9a-9d26-c5d54cb0be4e', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 10, '88c6e629-a095-4254-88f0-70b4b4a3e2e7', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 11, 'e3892e66-8611-4374-a579-132d473d6d1f', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 12, 'f0ee5db4-76e4-4f2a-b7f9-b737c5991f32', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 13, '83e32495-c1a7-402f-93cb-7e875471f2c7', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('85-C512', 14, '8f9e5226-8ed9-49cb-9f8e-8ab8a69fc194', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 4, '7a3024e6-f3a7-40a9-a51a-9d12f2ef1277', '7901e269-9bc4-4b2f-a882-855be9251b7a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 7, '12440c0d-ed58-404b-b168-d0d62b195f7e', '7901e269-9bc4-4b2f-a882-855be9251b7a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 13, 'd6fd970a-4a6f-49a1-9f65-03e0589ca0cf', '7901e269-9bc4-4b2f-a882-855be9251b7a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 2, '2e236b15-6bec-4a2e-8241-01b1499e0c71', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 3, '5d9c18d1-e5fa-4411-9959-8521a174f58e', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 4, 'a3a2d8a0-93e0-43bb-b975-5d49e363e9c6', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 5, 'c9a3e6d1-f573-4a84-8649-ce278a1694ec', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 6, '40612ed2-6c47-47b8-aa99-526defde6086', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 7, 'ebf44d5f-5369-49fd-adb8-8575e5f3fddb', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 8, '6ca8741b-99ff-4ad2-951e-3dc18b4c608e', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 10, '2d06db57-0261-469d-a458-00051598d1a7', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 11, '66f36677-1a87-4345-b60d-57773ebb5140', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 12, '752609eb-39c6-419d-bc09-88a4a0bada9b', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 13, '299ad0c9-a41b-4112-9a60-8fc5e9a9d630', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 14, '6d768cc0-c0ca-4ec7-8abc-17ee511d2151', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 5, '51653ceb-14ef-4a56-b0e2-f8c0ab410af1', '86803e3c-abbd-40bb-a095-3c653386da01');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 8, 'ee5d0a36-6938-465f-acc7-ecd449fdab10', '86803e3c-abbd-40bb-a095-3c653386da01');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-214', 14, '5a9eb422-0954-492f-aee2-1ac039e901d3', '86803e3c-abbd-40bb-a095-3c653386da01');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 4, 'a2769291-c850-4bd9-8396-64c947457c6b', 'bef69475-6042-462b-8773-26125cfcd6fb');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 7, '4ccf0abe-5897-4e8a-8634-9a9077460015', 'bef69475-6042-462b-8773-26125cfcd6fb');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 13, '4228a307-1fbc-4811-be9a-66c4073431a4', 'bef69475-6042-462b-8773-26125cfcd6fb');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 5, 'fe722442-1e97-457c-9736-6cafc20de791', 'cb8b8b33-e298-4a92-9528-27381f4c0417');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 8, 'cf1612a8-bbe0-4455-b51d-483655c15cb4', 'cb8b8b33-e298-4a92-9528-27381f4c0417');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 14, '867601dc-3dd4-4d2c-8c14-fd5a45c5896e', 'cb8b8b33-e298-4a92-9528-27381f4c0417');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 2, '953da3c0-fc19-46a3-93ab-8c3b8cc2e5e8', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 3, '81504dd8-994b-4c08-96b9-1ee1f4bd996d', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 4, '01b459e2-66cb-4c35-9ebf-c78ae77f49be', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 5, 'fda37ec1-1939-4db0-8891-00b761168016', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 6, 'a0428654-75a0-4deb-9f0a-ea39bdbf6073', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 7, '7ea8fefb-207a-4b30-8a98-cf99843cbe14', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 8, 'a8fff9f7-4095-4aaf-8b39-2cc2c8c0ec7d', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 10, 'e91ee6ac-cdc0-47ff-990c-03fcc00c1b4a', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 11, 'b0c968c9-fe67-4b3c-ae56-d3b80a18227b', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 12, 'e9874a05-0e05-4bd5-8b33-0391ebcc5c69', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 13, 'cbba59da-1fc3-43fb-a69b-6dd67f624fdb', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('83-C412', 14, 'b21a258a-6805-4af4-81ec-e129e528c163', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, '16df4c3f-3a7e-471e-bbef-93d645409a44', '5f47f8e7-3bb8-46c9-af9c-18b6287b7f2f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, '7154f40a-42d4-4a87-985c-2067600379b1', '5f47f8e7-3bb8-46c9-af9c-18b6287b7f2f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, '6518b8b4-862d-4f9b-a8dd-33b261a0d412', '5f47f8e7-3bb8-46c9-af9c-18b6287b7f2f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, '90b7ca6d-8327-49dc-9a26-16b73a0e6f44', '6c60bf05-cd90-4606-ba85-2b739d757e2a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, '83c89be9-6657-4889-94a5-298d10444e9b', '6c60bf05-cd90-4606-ba85-2b739d757e2a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, '718323d0-c567-450f-b198-b897d86722a3', '6c60bf05-cd90-4606-ba85-2b739d757e2a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 2, '262de6fd-67f3-494b-8eb0-8a3a6e67a1a2', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 3, '64e0ab9c-499f-4ad9-baab-9422867525fb', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, 'd1bd976d-89e7-4c9b-881a-254077d6964b', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, '01720381-3e33-496a-b285-a8b4f92523b1', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 6, 'e092b0a7-b0ff-4486-b7bc-9a9d7f75d38d', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, '7c70caca-896a-430d-a80c-4ad7618688ed', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, '416b63a8-f9bd-490e-a210-a0ec97e69ad1', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 10, '9fefcfaa-398c-4c94-9be1-5c6aaf21a456', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 11, '6edbb148-f462-4589-8b88-b95eedb62a9a', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 12, '7e9bd136-404a-4113-a8fc-6d1dda6f7477', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, 'c40e1e68-967e-420e-98a8-8b074284d1d1', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, 'fb987d63-1a16-44bd-bc10-e195980b5df2', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, 'f83f1f52-b0dc-45fd-91e8-f41575054cdb', '41a3b733-e953-4f20-af4b-1ff30d62f135');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, 'c294fcb6-0626-4037-91de-b532e137661e', '41a3b733-e953-4f20-af4b-1ff30d62f135');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, 'f4a3040a-c0b0-499f-ae93-a7abd2fdd776', '41a3b733-e953-4f20-af4b-1ff30d62f135');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, '7bbf75f3-dcdc-4749-9242-fb093f1577e6', '2d44aa78-80f1-47d4-99f1-6166b6a4f7eb');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, 'd565e8ce-cffc-4cce-bc06-01ceb23064b9', '2d44aa78-80f1-47d4-99f1-6166b6a4f7eb');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, '35f3ef22-589a-41c3-8072-34c6e0f155ec', '2d44aa78-80f1-47d4-99f1-6166b6a4f7eb');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 2, 'a026828a-142b-4f97-819a-d7e7abcf54d1', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 3, 'b0dce858-9a90-442c-8843-d55229379ed8', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, 'c4ed6387-e403-40cc-ade4-9e1dcaaff9cb', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, 'b55d30f9-e3b6-4a41-9292-d2bb56fef4ce', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 6, '4f89a150-5ea3-4867-a446-44cec9471ebf', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, '8b04af9f-8a74-4141-a78a-8a9d01aee650', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, 'bc813bcb-c8ad-48ef-a715-5a0cc832d433', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 10, '8ee921e6-da90-435b-b591-1ab4bacc09e2', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 11, '01d3193e-f24a-4f58-a2ef-e227ef35fb04', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 12, '342769a3-8226-4220-94f0-47597626f901', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, '18ce23d1-6150-4c6b-a5aa-2916ba463f7e', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, 'e2ded927-9383-41c7-8e80-9980cba59f1b', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 4, '5e8a5283-fd57-472d-910e-60559ceafa3e', '98b6c910-8f66-46e8-b39a-44052aaee307');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 7, '7afeebc8-969b-45a7-bbf8-772626461d4d', '98b6c910-8f66-46e8-b39a-44052aaee307');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 13, '77e56d46-e5a6-425e-8f6a-ef526fc74717', '98b6c910-8f66-46e8-b39a-44052aaee307');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 5, '7bf12064-43af-4f03-834f-ac6a5263e8ad', 'b9c185c6-4429-47f2-b30d-14e83e5c7c3b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 8, '025bccd6-9c00-44f3-8fc6-b2740c675544', 'b9c185c6-4429-47f2-b30d-14e83e5c7c3b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 14, 'fd5eea0a-f07a-4d56-ba58-edc6f80d18b0', 'b9c185c6-4429-47f2-b30d-14e83e5c7c3b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 2, 'b94aa9e1-cbaf-46a1-b14c-75d8cd59f33f', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 3, '7267b352-5373-47d6-bf74-72cb5a2b95d9', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 4, '892c4df1-0ee1-4ba5-a390-495b75a59e05', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 5, '4b6960dd-8893-484d-969d-33967a878023', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 6, 'ece9768f-9adb-400c-a21d-216d488e63c9', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 7, '43c3bf77-88bb-49d9-bee2-c6ff341eae02', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 8, '971fafff-a030-492f-88e9-c84e9f459929', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 10, 'b54aabd9-02ea-45a3-a191-a172672d77c6', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 11, '4e082ab2-17f6-4704-96c5-0c7db13015a4', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 12, '4911bf65-6c7f-4c87-a32d-ea2f763b7bd6', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 13, '2b487a9a-23d8-4d2e-a631-034368d59e1f', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('07-326', 14, '8d6c0e28-1b53-4ffa-9904-288cb72347c4', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 4, '50f45aa5-61f9-4d7b-8151-1a5822a82c28', '8a93a444-6c06-431f-9f75-7d8beaf3cb78');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 7, '39a459aa-8173-4731-9147-5dbb8ce0a64a', '8a93a444-6c06-431f-9f75-7d8beaf3cb78');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 13, 'be5df62a-623e-4ed4-9a54-e8b50b5de9bf', '8a93a444-6c06-431f-9f75-7d8beaf3cb78');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 5, '60b461b8-9272-486f-88e7-4a9a20b17a87', '8341a561-2ce6-4b52-bf5b-8d55e95ee7d3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 8, '65393b13-604b-4d8a-aaa1-5737dcb7806e', '8341a561-2ce6-4b52-bf5b-8d55e95ee7d3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 14, '99c41594-fc2c-40e8-ade6-6d652f0e35b3', '8341a561-2ce6-4b52-bf5b-8d55e95ee7d3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 2, 'a866bfa1-3db7-48c5-a1de-85ab7904c496', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 3, 'c702f84e-7185-4d42-aedf-4355caa9bad4', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 4, '7f321792-9b75-4e7c-bc70-b71aaa896c5a', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 5, 'f2bf59c0-871a-499a-8e26-23235ff923c4', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 6, 'e597b2f9-0c43-483f-b84f-f9679265ae60', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 7, '5e6a6455-6a48-42e3-9e9c-31d3c00ec4d1', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 8, '16c6ed07-95fa-4562-9285-5a9011a9e269', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 10, 'd1374e28-3a82-4787-b618-b31513e80897', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 11, 'ffc78436-30cd-47c7-b7cc-aea3ec7b908e', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 12, '1c2a2a99-e06c-4647-a113-9a332517a54b', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 13, 'cc8b72f8-0f78-48fe-a2b7-37cdfa6b60ff', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-233', 14, 'aa93c18b-6eba-4e3a-a520-44492a8fb634', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, '67524f5c-6b61-4f1e-8fe0-030e07ac32c6', '6bb06aa2-60dd-41f3-95e4-78f1f0a93a57');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, 'ca1c2ea3-e377-4414-ae0f-a4da70054cf3', '6bb06aa2-60dd-41f3-95e4-78f1f0a93a57');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, '4599754f-3c84-4cf1-b52a-1262a7c9967d', '6bb06aa2-60dd-41f3-95e4-78f1f0a93a57');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, '10e6232b-69f7-4e91-aa84-ab3ede4ba4f7', 'b7cfd9e6-7367-4e63-a7f8-62ce574a70f8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, '26b3d3dc-0254-4902-b2cc-6cbe3748d2b9', 'b7cfd9e6-7367-4e63-a7f8-62ce574a70f8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, 'ff098dc8-3817-48ff-a82c-20ff47b7d265', 'b7cfd9e6-7367-4e63-a7f8-62ce574a70f8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 2, 'c7889d62-5558-481b-835c-5cd98d2fcc8a', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 3, 'e4fccbc3-afbb-4cf3-a667-860112bb44cb', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, '4a8bcb08-849f-438f-a2dc-412d7bb6eaba', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, '8260ef0d-0841-4b52-afd6-749bdbcc68bb', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 6, '9d3279cb-31c6-4f57-9321-c3755d2ad1d4', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, '24460cb5-c935-496f-aaed-245303cb5865', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, 'dc84afcf-3b95-4546-b4bd-217eceaab93d', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 10, 'b37ac936-e8ba-48cf-a698-b2831e5f2ce9', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 11, '0a220ef9-9701-4a73-b6d7-60c87d670e17', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 12, '5e921ade-bfe1-4c19-be85-041a13368d7f', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, 'd13febe7-d1dd-424c-a53a-e51f9cbc79ca', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, 'd2b53af4-513e-46ae-9c0a-82d776b93779', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, '5047b75f-bb63-4586-b3b4-f3c37fae1b35', '67d4d682-08bf-4a40-84ec-6f5c1a7d7302');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, 'abe62604-fc4e-4fc5-8785-f7cdb2926632', '67d4d682-08bf-4a40-84ec-6f5c1a7d7302');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, '687c91f7-4acb-4a33-b4dd-cde548a0afab', '67d4d682-08bf-4a40-84ec-6f5c1a7d7302');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, '6e1f8722-2c32-4f88-95c2-68fdb744ac07', '9660f5dd-eb80-4f17-b091-95889af3560b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, '25f5a387-ad10-4da5-ae96-7c3cb93859a4', '9660f5dd-eb80-4f17-b091-95889af3560b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, 'cad92ad3-daf6-46c9-8061-010aec6fc411', '9660f5dd-eb80-4f17-b091-95889af3560b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 2, '9a741bfe-51dc-4e7f-a497-f8b7e698bb0a', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 3, 'e3b5178b-cea4-4186-80a7-089e19433e98', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 4, 'eb277fc1-12b8-40db-956d-7176930920e7', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 5, 'eca43881-fb38-4885-a983-7630e70f3bb5', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 6, 'a85a876a-fe38-40b9-8e8e-2bc3d01b9f2e', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 7, 'df70e605-473b-4c66-9300-9236aee95024', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 8, '7eb46c8d-255d-4c9e-a202-4d260bf86e18', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 10, 'daf03c52-879c-4c27-8482-a82b806d8512', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 11, '93b5a623-faf4-4519-b18e-456adb1dfad9', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 12, '9dc5f137-6097-4516-865b-e37767cfc78b', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 13, 'b7e4e622-cf3c-482e-b5de-07dc97871e1f', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('35-210', 14, 'c07a2a8c-4bea-4ade-9f57-cdd7a9fb7b0d', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '65d0b4aa-0afd-41a7-994d-167144c6c2d0', '5f2d2933-0747-403c-adfb-2d4085c4548f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'b0c0ec4e-f53f-43fd-8520-d4477aa7a952', '5f2d2933-0747-403c-adfb-2d4085c4548f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '24748fae-55f8-42fb-ab14-dcf6e74c83fe', '77da971a-a15e-4061-8006-fa4163a0ebad');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'effede96-ee61-4fc8-9fa2-4f7c607ae228', '77da971a-a15e-4061-8006-fa4163a0ebad');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '5b290635-17ad-4e84-95bb-0f5e10e77996', '77da971a-a15e-4061-8006-fa4163a0ebad');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'a0f13bc2-dc22-4986-8e9a-d464bc5e32a7', '77da971a-a15e-4061-8006-fa4163a0ebad');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, '695043dc-288f-4430-b3a0-cabfbbb315d8', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '59f76b4e-22c3-4d4e-82ad-3a8a486ae8aa', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'cedff333-846e-40ba-aeae-ee735d5dd0c2', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'a8b2ae6c-6368-424f-a1b0-8ae34784f298', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, 'd0e39f15-83cd-464d-8310-0ffaa087bf6b', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '30b61405-e39f-4c0b-ae37-0c2fc38bf806', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '55ec6015-0611-403b-b979-05070d9d5785', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '22b5c450-0096-4b73-b915-175e93503cb1', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, 'c088e844-385d-4042-be01-79422d197692', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '22ea0a2b-8338-4ef9-a9d6-fb76f25acbe5', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '916889dd-e5a3-4bc7-bcb8-4c7c94cce25f', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'c4ce8378-75e2-49b1-922a-77d714fde433', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'd97ea046-76b3-49cc-b0e5-2243c772bd38', 'bf43a87e-390c-4e38-a060-9bdd4ad9332b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'a8c71e92-f3a6-4738-b239-3768de9a3c14', 'bf43a87e-390c-4e38-a060-9bdd4ad9332b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'ee249692-5ec0-45c5-8beb-82d4b8bba4ff', '119bd994-7763-4933-92a9-9d4b4286d7b8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'e4da48d8-d787-405a-9fee-450c9d21f607', '119bd994-7763-4933-92a9-9d4b4286d7b8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'ab928ca3-1ab6-4aa1-8543-3e1f037df08a', '119bd994-7763-4933-92a9-9d4b4286d7b8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '9a067d4b-f0a5-4a24-805b-413d6bfda8ca', '119bd994-7763-4933-92a9-9d4b4286d7b8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, 'fb6f8a4a-831b-4dac-822f-5c8fca5aa74f', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '666b4337-f9b8-499d-9ff5-6d750d7726dc', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'aac3e1ab-81eb-4c66-ae56-b66e94f6df52', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '76e1f4db-9599-463a-b8be-f40d59a8614c', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '61480f01-0720-4a92-abed-9f3f95d65daf', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '5f15fa62-5adc-4eac-9490-f9d7fb431e25', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'b400b005-e7c3-41ef-bbb2-d24246240d64', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, 'c2be7b66-dc75-4703-8c56-e15fd94361ce', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, 'b754bf22-777f-43fb-b8cb-32ca2f7b8949', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '88441dbb-32d7-4cd4-a794-a98116601a22', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'b013c48a-f571-44f1-8cb5-726c86c7aa94', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '89564aaa-72a8-40eb-846a-4a7216447c73', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'e3e064b7-77e0-41c8-a03a-fa3602caf2d0', 'a9d23af4-90ae-4397-a26a-d51bda5c9ea8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'e2d75571-dc2c-4809-913f-fa20a7205873', 'a9d23af4-90ae-4397-a26a-d51bda5c9ea8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '77893a0f-5201-4ddf-b3ac-e14f40c6e7ae', 'a9d23af4-90ae-4397-a26a-d51bda5c9ea8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '1198035a-defc-4941-924e-f8e950fc2afd', 'a9d23af4-90ae-4397-a26a-d51bda5c9ea8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, '089b2718-ce2b-47bc-acda-27403271850d', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '6fe6c515-37f4-4d89-8e04-37b5296510e7', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '61bd4818-6771-4694-8234-4b9fe4d7b35d', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '46a36699-b349-460c-a428-c002da4ba50c', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, 'bf99f687-b392-4f7c-a0bf-1ed29ec9ce11', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'e7f3bcfc-a21e-42b2-81d7-65f7684ecd52', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'f30d1dc4-dbab-4be6-ae9c-88f7b017d5c1', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '81b9e55e-99b4-4a03-a3ec-74591b4d8c2f', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '001f502c-194f-4c52-9b60-5611a6d47ee0', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '101740da-bd88-44b5-b02f-dd5742e44aea', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '92e139c5-7358-4c8c-8acb-2dc3bec1a17b', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'dad7bd18-dd7e-4f76-87ad-0751a1a7c7b8', '124d75b2-3f29-4064-a4a0-c9b3e8e949ee');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '0c29da24-d207-4181-98ed-08e6aaa64d1a', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '560fd643-1b1b-48b0-9743-4383eed595a9', '124d75b2-3f29-4064-a4a0-c9b3e8e949ee');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '2ed65455-7f01-4b6d-868e-8d36710049ad', '5232ccd7-f5ad-47f3-9102-58bdf363aba2');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '3dea74a3-daa9-4d8d-9e0e-486bdaf0d95b', '158fa46f-1964-4203-8c13-23f0db79a22f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'd65927e3-6f0a-4c76-864b-a91e16a2d7af', '158fa46f-1964-4203-8c13-23f0db79a22f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '5ba6d68d-3dc7-4fbc-9f50-340e36c256d5', '5232ccd7-f5ad-47f3-9102-58bdf363aba2');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'f7246b6c-d5ff-400f-b8ca-f76795e606dc', '158fa46f-1964-4203-8c13-23f0db79a22f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'b478422b-dd9a-4af0-a8d6-cdde93425ec2', '158fa46f-1964-4203-8c13-23f0db79a22f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, '6f87edbf-b956-4033-8396-78e65a7d3d00', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '946d4baf-d52c-4c05-8f76-d021c969cb78', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '9f58a27c-f3ba-4844-8a52-a6040009229b', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'c1c968aa-7779-4139-9c1f-e4fc1738b589', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '305802e4-a157-4617-b044-f26d097e9b83', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '2dc75bf2-e579-4483-b110-5a500a371568', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '051ff070-df50-4c7c-94f6-cb1103810446', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '4f00fc85-a064-4f2d-ae6c-078c14449880', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '8e6dc8ff-0eec-418f-aa19-bbee52840c6b', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '500ff842-d154-4cac-8972-2a9510155865', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '8adb671f-f797-4d76-a22c-cf77ae83640b', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '7baac1f4-e969-4d7c-a3dc-289852a374cc', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '4ec69d44-3dea-419c-8c83-42725b56a3a8', '5a79029a-7635-4de9-b8ec-703ab5e36c0b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '53464389-cf48-47b9-bc05-38e7362bda73', '5a79029a-7635-4de9-b8ec-703ab5e36c0b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '25111d13-2cf5-4677-9bc6-3387a805ff22', '5a79029a-7635-4de9-b8ec-703ab5e36c0b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'fd386e67-dbf0-41be-a01e-1c6af54d1757', '5a79029a-7635-4de9-b8ec-703ab5e36c0b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, 'b5e8e251-0508-4a82-9f29-8efea292e18c', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '8170446d-789f-430f-947f-fbd95faba428', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'a1c516ce-e036-483c-b3ed-a1c9150b2b4c', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'f4b48691-9872-448b-a735-0e5bcf4abf9a', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '1986b851-c6a1-4165-bead-d632714ce9c0', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '73229941-e3d1-499b-a9c2-b56517cc7733', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '6168f274-9c65-4b15-97fb-6a71f450d1db', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, 'd28ca7df-4af6-4b77-889e-b2e8ce300a17', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '8417dcc6-c807-4a83-9ea3-c0fdb3ebd732', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '1a927491-5dbc-4eb4-a52e-f50de58793ae', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '0e3d6edf-9685-402c-aea4-210bb861e8b2', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'dc1c25fc-442b-4f52-9976-a6c3cfe382b4', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '295f3577-7e8c-4791-893d-e15a08c5fe5f', 'e9431cb5-ecf9-4cd7-b2a8-e40ff1313eb6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '3b703a98-18b1-400b-a2cf-4f22f72702f7', 'e9431cb5-ecf9-4cd7-b2a8-e40ff1313eb6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'bfd65cb7-00b0-44dd-a7fe-f09180a11519', '46b26cf0-20a0-48fa-a2a2-7a50eab4e375');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '92b9ad7e-cb04-4d12-a7d2-d45f92565dc2', '46b26cf0-20a0-48fa-a2a2-7a50eab4e375');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '1f64aada-7a4d-4ab5-9c99-8b4b2df2aa1a', 'cb8b6aaf-f89a-434a-9cff-ea8f839f45af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'b64eda63-f17f-4384-a87d-452b37a5cfe0', 'cb8b6aaf-f89a-434a-9cff-ea8f839f45af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '7c8424c4-549f-476e-a535-2232f540122a', 'cb8b6aaf-f89a-434a-9cff-ea8f839f45af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'b8aac672-0340-4384-9072-752d5cc02700', 'cb8b6aaf-f89a-434a-9cff-ea8f839f45af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, '6f9f5bda-78cd-49df-8e45-78d941472ff5', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, 'f7754efa-6b95-43ef-91ad-b9198d00d211', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '197f2080-45a4-4da7-a8f7-ecc602229768', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'fe8e3a1d-f3c8-410e-acc9-88b620a115ad', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, 'e57fd00c-4f29-4b63-8d82-59a5495e807e', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'c28ec29b-8998-4e20-aa36-13b7ea3d9afd', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'da7ad6e1-d8f2-44c4-a8b9-b85b7c26ecfc', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, 'd8e9fc54-261e-477f-b8e0-50fa2459985b', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '4aaf0dd6-52ec-4971-ac13-c6786a3420a4', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '868a993a-b9cc-4c2a-a223-e3013f694764', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '93b0c4a0-723f-432f-aa92-da8ba82eb720', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '6b00f3ad-9681-4ce1-b49b-6e704e11b852', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '208d59c8-c2f8-42b0-bded-9c6d2adf78ed', '7269f14e-6541-4871-9041-b68b53534530');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '882ce501-225b-4ba4-a262-e5d2ed1e4368', '7269f14e-6541-4871-9041-b68b53534530');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '47b63eb8-6459-466b-9ac1-2446612ed595', 'c2d496fc-a02e-4fa4-a23d-a1418d8e863f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'e4a3df76-c723-475e-b95f-72e499c835b7', 'c2d496fc-a02e-4fa4-a23d-a1418d8e863f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'c7508b3d-fa4f-4811-98a7-7d2dca3f4cd9', 'c2d496fc-a02e-4fa4-a23d-a1418d8e863f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '092a5e1c-c7ae-4965-af7d-729298abf4a1', 'c2d496fc-a02e-4fa4-a23d-a1418d8e863f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, 'be8d29e1-3a07-4023-99ba-db3fb290d786', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, 'fa0db2a0-85d2-4e8c-b5a9-2bfe247fc3aa', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '7892ec6d-8f30-4600-8f09-8db047721165', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '47dad550-09e8-4d6e-a4f0-57e56e11f044', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, 'b28475d9-26a4-4834-9bda-7f5240e466ee', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '035035c8-a830-475a-96a0-3b677ab4ca02', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'a5988bb0-11bc-40eb-89f7-f961a895e1d6', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '639e2dd6-f026-400f-8681-f70b65fe9966', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '6d0997e5-515d-4c62-b178-47939c86e72b', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '48536b60-4759-493f-834a-609483ce63f4', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '149fcd35-bc1c-4687-8bd3-ed3dc2585027', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '2f99072f-9f79-49c3-936c-41536c3538ae', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'f538d248-21b6-4eca-920f-9f80ef763f4e', '4ae81b54-2fd4-4aa8-bd66-a8d2ee42e8e1');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'b49a85c7-2ff7-4d31-9414-5c168292eccc', '4ae81b54-2fd4-4aa8-bd66-a8d2ee42e8e1');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '09b8f927-b00a-4e38-8c2c-76ef574266cc', 'a486eb38-2b3f-44eb-8f71-3199134731a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'faa790c0-f160-46dd-8d7e-00d9061b6365', 'a486eb38-2b3f-44eb-8f71-3199134731a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '0054efb0-9d49-4e61-a763-981e711b14ee', 'a486eb38-2b3f-44eb-8f71-3199134731a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '39d55d7c-f3c9-4a3e-a346-2499609ff214', 'a486eb38-2b3f-44eb-8f71-3199134731a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, '481913e7-8643-4d39-a7c7-86ac03ea8333', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '126abd97-2e75-48f4-9e59-006673b407e6', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'c918d630-124c-4a08-8d7e-d81832cd12a7', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '8a7cbc47-8bdf-4d1b-9d9e-5b3df1e76503', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '3aa16f88-9870-4392-8308-a9bd905301f6', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '4782b8a0-da7f-4d30-b2f5-ce31480823d8', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '43404642-7270-495d-aae0-ef5c76a165cf', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '82c60f44-453c-4ca7-b882-f173e433d402', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, 'dfafea3e-1496-4466-aa25-45390641755f', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '0d58c798-95a5-4cf3-a80e-879ea66e807a', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '54e50247-a23d-4474-b9e4-648af5c23c6b', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'ce7ac1b7-ae3b-4d57-b973-4c677bcce60d', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'aaf6b666-0f77-46d3-b4e6-8c6c96754320', '46fc7e34-dfd7-4d13-9059-36a92027162f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'a0b9dfcb-f6c6-45e1-b1d7-fd8b2b9d89f1', '46fc7e34-dfd7-4d13-9059-36a92027162f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '0b4176cb-25d2-494c-a4fa-ec18b066cd2f', '3760a9f7-2477-4cb5-a6fc-2d6128e090f6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '74602f40-f81b-4b4e-8eb1-3216b177d286', '3760a9f7-2477-4cb5-a6fc-2d6128e090f6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'c2a5fd96-3125-4371-b4d3-c3a18252aa2c', '3760a9f7-2477-4cb5-a6fc-2d6128e090f6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, 'a717f72c-653e-4c34-8543-cf339cc5c3f1', '3760a9f7-2477-4cb5-a6fc-2d6128e090f6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, 'e46a96f5-6f73-46e9-9230-5945c8dbf944', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, 'bb4b78ce-0f9f-4bfb-9f4f-7da3f5533bbd', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '602dcfac-9698-4091-ae01-556c4cdee433', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '1fa1e64d-6125-40e5-93e4-21bea09da285', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, '3d2d7d28-cd98-4a0b-9e3a-550d2a795ece', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '80d91f71-9fc0-43ca-867b-8c03493eed2a', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, 'd692ea97-c751-4217-9b63-d6a44494aeae', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '45df72eb-0ce0-4893-be8a-8c204ae5f232', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '2877efb4-bc5b-4a22-bb26-92ac5bc8f512', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, 'f0ea2e22-1999-4afb-aa43-a5265bae33b6', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '9a27354b-c3ad-46db-9e10-eed1f8526eec', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '75141b6f-c8b0-4c95-95bc-9f983364c809', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, '3c86d4ff-7965-4331-a919-1ce341267162', '5404afe5-1e1b-4a08-b8c7-8091d7efb05b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, '49bc6bd1-db2b-4cbe-abe2-c6c1c1f03db0', '5404afe5-1e1b-4a08-b8c7-8091d7efb05b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, '19e17f54-852a-42c3-9e38-2e01c5844473', 'd837511f-2894-4475-a032-462b54c5791f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '636b0b51-2f55-4349-993d-086681eb70ce', 'd837511f-2894-4475-a032-462b54c5791f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, '53d7a0da-b4bc-4165-9936-7d116702d156', 'd837511f-2894-4475-a032-462b54c5791f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '7ddfbdec-a8b7-41f8-9dc7-b43e3eee0623', 'd837511f-2894-4475-a032-462b54c5791f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 2, '3ac64584-9021-4c15-8f2b-a68d3866f2a7', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 3, '7dae1395-082d-4453-a8ea-fd426a038cb6', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 4, 'cec6fc9a-7c5b-48f6-805f-657c35848401', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 5, 'baea0385-f506-4fed-b5ae-9d1a2ec29a96', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 6, 'b8481361-988d-4e0e-a28f-63a459f54f6b', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 7, 'd661c0c1-7348-43d7-8644-f44fbd8a58de', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 8, '8314f543-8a1a-4590-b221-77e42f43ffa2', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 10, '15a98353-62ad-49da-8d9a-de9e9c9aa332', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 11, '7d5f9dcb-0183-421d-abbe-b4e5719d62f5', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 12, '7df673a4-175a-496e-842d-eb81ab4270f7', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 13, 'efbdf021-3210-4489-bdda-5e68ce5788aa', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('78-122', 14, '715ab45e-65fa-4601-ab53-35d633c921cb', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '0170ea4d-9a09-4d17-bb1f-ae62274200e6', '4cded3d7-06c1-4572-b71e-a47a27abc8d0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '0a5f66ec-7183-4265-8ad3-6c25d9212dd8', '4cded3d7-06c1-4572-b71e-a47a27abc8d0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '534532a6-50f5-46b0-a0e5-893b68e9b949', '9811833c-513a-4a79-9c44-8250ec936f8b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, 'e50cf3fd-1628-4adb-a7e2-846285bec144', '9811833c-513a-4a79-9c44-8250ec936f8b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '616a9441-18c1-429c-ace3-29fe4c1fe63c', '9811833c-513a-4a79-9c44-8250ec936f8b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '1c87879e-a50c-4c88-8547-edd71b523892', '9811833c-513a-4a79-9c44-8250ec936f8b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, 'af7bcfb9-b3b6-47f0-9c43-806a081ebe3f', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '3f43e956-dd24-4fee-8913-467ee2062aea', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '9243bdb5-59a4-4788-aa97-53cdc4eddcf4', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'ac13dd08-3942-403c-84ef-89f3fb656e81', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, 'eb891e6b-4ee7-4731-abe4-5631dfb9ab03', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'eb81447d-7032-4d4a-98e2-7f6270d8ef3d', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '5e138efe-4ac0-47df-aae4-4d8d4a245936', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '195befda-59b0-4f06-b139-639f6ab0794e', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '6901e1ab-226f-41cc-bf74-d19fd86cbef7', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, '689bad59-8feb-4c05-ab54-731cd343b277', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '97f75940-c630-4d86-8c66-9a5a35b1b616', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '34a244d8-1415-4cd6-9713-8fe7b0430b99', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '3a3ac195-e076-4f52-8873-f7c2b0051d41', '1339af4b-31f7-45a9-89be-bf08a00093f9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'e2464f9c-34d7-4362-bd72-531f554e19a4', '1339af4b-31f7-45a9-89be-bf08a00093f9');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'fcde2a96-0efe-47db-a8e3-0cd97481dc4b', '53323eab-d5e3-46e3-b1cc-3cd6661e1b76');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '2b662681-2ccc-44cf-a581-229dbc159db4', '53323eab-d5e3-46e3-b1cc-3cd6661e1b76');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '00c64ed0-4e5b-4296-86a1-9474cc9bcab7', '53323eab-d5e3-46e3-b1cc-3cd6661e1b76');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '9e21b551-ac60-43c5-a919-e590db4cf29c', '53323eab-d5e3-46e3-b1cc-3cd6661e1b76');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, 'eb9906a9-f617-4e46-aace-dd959806d7f7', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '03c4ec93-372c-4512-bac9-f24a189fed92', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, 'f21e16b9-92d5-4593-bb2a-c35d722a20a8', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '77886117-b2c7-4d82-98e3-04f52dba134f', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, '49feda85-76aa-432a-875a-6a492a1fc2da', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '39a05ce0-ca92-43de-bed6-704453f031ff', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, 'bd94987b-88ec-4aac-b698-18c68a484b30', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, 'f29125c6-3864-42ed-a6d0-b85316aa8376', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '762ddc64-a9d6-4abd-969a-dd9d9ae49f14', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, 'ff7fe988-e068-4a3d-ac20-46b5d75c3e79', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, 'fbfbdc5a-4845-4463-a77f-06bfe1b46520', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '9c9f7740-e315-49d3-aa07-002be4124891', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '43359b4f-5910-4875-8d59-c8546932bcb3', 'f8e6d7d9-1fbe-48bd-b06b-d64f73e66545');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'c1505e62-fe8b-4d4d-90f4-0ada909f456e', 'f8e6d7d9-1fbe-48bd-b06b-d64f73e66545');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'bd5aee6b-728b-4a2c-9eab-71f28b8b77fb', '070ec944-23e7-4887-b58a-ee4e9d47e4af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '40693f87-b24b-41c1-95b0-c11f113bb44b', '070ec944-23e7-4887-b58a-ee4e9d47e4af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '885d5fc1-1d0d-451e-aceb-507b93923a21', '070ec944-23e7-4887-b58a-ee4e9d47e4af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '3aa9e159-d1b4-4184-ab9f-0e3ccea7dfb7', '070ec944-23e7-4887-b58a-ee4e9d47e4af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, 'cf34ccbd-d29c-489d-bbdd-586a4bf5b4d8', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '786b53ac-326f-4b3d-9060-c6fc562ea406', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '113cfb4f-cc84-4f77-b21f-90a5ae5e5594', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'c88c866e-c677-4f78-84f5-72c00a0f1f9a', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, 'd5bbf6c9-c346-4890-8a9c-d0a3b65f42d7', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '64917720-3cb1-4bdb-8ba1-99585346cf19', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, 'b91edb44-5342-4e1b-afea-3dc2ce250705', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '388d59df-7201-4c91-9748-e74b33189532', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '33044e67-df72-4910-adb3-ac96f27988cc', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, '33230d98-1b99-4458-bd44-cad85df3359b', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '6f0f0a65-56ff-4ace-8dc6-14463ebf1bee', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '3ce31851-841a-4560-b531-f4e40d72e31c', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '497cc882-45c3-482e-80af-3c389f23e291', 'a8a41553-2301-4bf7-80a7-9f57d3c46c1c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'f9e627bb-8562-4aac-b470-8d2caabf220e', 'a8a41553-2301-4bf7-80a7-9f57d3c46c1c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'ef2dc835-0d23-4a18-865c-4576752bdee6', '2790871e-d43c-4159-b450-99d632b32a5b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, 'b0cb2599-4a79-43c0-a981-2a36e9d635da', '2790871e-d43c-4159-b450-99d632b32a5b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, 'ced5f59c-446f-4b5a-8177-8a6fe36ec54a', '2790871e-d43c-4159-b450-99d632b32a5b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '1fdb4d17-9f4c-4ad1-9934-d1856433532e', '2790871e-d43c-4159-b450-99d632b32a5b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '7e3bc5ac-b5be-4117-b3da-327b8ec94a93', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '4fde0f86-e3a3-4428-b644-5023032511f6', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, 'fdea0365-f701-4c95-9c78-57f437dbae06', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '79b34a21-6674-4ec4-ae60-5c1d0aa5edc6', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, '3c124228-e812-4f12-b970-a29cf668a79e', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'c15c7fba-92a7-4eb1-a9cf-1abc9a65f1e5', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '2c70896f-cc61-4068-b039-4d03fbfec32d', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '6497b585-26f7-485a-9291-bace4f392edb', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '585cec2f-249e-44e0-868a-98d4a90f386b', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, '52e733f8-7464-45c5-939c-e82ee34026bf', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '3d06a6df-40f9-45f9-a991-eec2a865ae71', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '745ccc72-22e0-4e26-86b2-ff07703b05d4', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '5dd3a1ce-e183-4d0d-821a-dd5c82f8ab9e', '776ff411-f505-4e7f-b158-053a9ba8df1b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'a8b8c3e2-601b-4f70-9346-ad287bbebbb1', '776ff411-f505-4e7f-b158-053a9ba8df1b');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '7054490a-9a80-4606-95c8-8b4fd967376b', '7c10e0a7-e005-4807-a8b7-ed9783995600');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '750934a7-96a7-4363-ab21-ff931979e22f', '7c10e0a7-e005-4807-a8b7-ed9783995600');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '6662c94b-76c5-4d95-9f24-b0541937ac7e', '7c10e0a7-e005-4807-a8b7-ed9783995600');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '2b9aa53e-b104-4e47-a1d8-4881115c869a', '7c10e0a7-e005-4807-a8b7-ed9783995600');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '5a8df524-ad17-425d-ae8b-03786de148f1', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '25c0e80c-9f7d-4785-9420-14a76f51bef2', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '88e98a10-7fad-47c8-b056-e521ebd074bf', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'f95a038f-14e4-4052-897b-39065d5017bf', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, 'cd25dc19-9a2b-402a-8261-434ea1fc82fe', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '6f4ad3aa-227b-4283-8e47-bb54d28767ef', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '7c8bd387-2d1b-40bd-b096-1b421760e983', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '6a830f05-7916-4900-aa6b-03a93d3697ca', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '9392af4a-796c-4157-8b91-adba0eb5dd6e', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, '91d29bdc-9eb6-42f9-a59d-f6e4b3003951', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '4489e1b3-c3d6-4aa6-a610-3d2dfa48ab81', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '79f8ca95-4204-4f0c-a8e6-9e4c00a86c2a', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '2a3a4f90-5c75-4b57-bcd5-18d2a93f92ad', '5954be10-17a6-4964-b40e-823a4fed0515');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'f8d183c2-ad8e-42be-acb8-fdadb8469059', '5954be10-17a6-4964-b40e-823a4fed0515');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '46041edd-b72f-409e-921b-5c0ce85989c9', 'b284e6fc-4a8b-4cfa-942a-225422dcdcfa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '26424f8d-d5bd-451f-9a6a-a7466f47fb6e', 'b284e6fc-4a8b-4cfa-942a-225422dcdcfa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '2d6fab53-7d00-4464-8f45-e8757cd5c433', 'b284e6fc-4a8b-4cfa-942a-225422dcdcfa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '22088f91-bb69-4c03-940d-7de2edf985f9', 'b284e6fc-4a8b-4cfa-942a-225422dcdcfa');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '49c83623-ad90-45f0-863b-f2a7b6d9ea18', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, 'e824cf2a-f695-466f-b13c-ad56efab2db9', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, 'e4572d66-21be-4f35-ae2c-c935c8d32241', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '2d6bf82c-303d-48b5-8602-e0c031f98ba3', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, '4d177208-8e56-4e47-b642-f4a42c98c5a5', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '4a74bced-3974-4638-a875-728c61cc230a', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '50f6e69c-6e3f-4d75-9c60-6b0059c89425', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '5e36ff1c-74b3-4c31-a1c4-d22c30d41e13', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '99f14ab7-6853-42f7-af0f-8f86d071d45e', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, 'a2c016df-9a19-40dd-a045-2a839c5fd824', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, 'c6a57564-ad78-4917-9315-c6dad550e767', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '18401633-a199-4166-a280-23c59957654c', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, '115670c4-49a6-416b-8dfb-469fe62a964e', '35628c2f-33b4-4262-b334-87b7c7c76a6e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, '76fdaeea-fce4-4ac5-a213-e938b9b1541e', '35628c2f-33b4-4262-b334-87b7c7c76a6e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, '3f0e1ef3-2c53-4a34-b910-ec9771fe53c1', '35628c2f-33b4-4262-b334-87b7c7c76a6e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, 'a6c71c59-d781-474e-86ac-f24d9dd1edfa', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, '38051188-5e45-4a7d-b2ca-0e2bd7907d0f', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, '9dafcf51-0d67-4cd7-ac64-b4d865b6e5d3', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 5, 'b4b9eb65-6a2e-4c06-9cda-caf1a81025e6', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 6, '5b3e0ca2-51f5-4c5f-a556-88052c4dc600', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 7, '02dd0c99-c389-4f08-b2de-7e82b5ed02bb', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 8, 'f3827b85-48df-4b90-af24-a47f75077ce3', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 10, '089af2ac-75a7-41ff-8482-4dc0e006cff6', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 11, '1d4c91f9-710d-4bf9-8753-cc8bb0078455', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 12, '32be7160-9c32-450e-9158-c22902091f54', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 13, '2ec8d093-965b-4989-9c38-cb8c74cc1f88', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 14, 'f7074530-82e6-4b11-b97a-4d14e8d98fa2', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, 'c314d015-66b7-4474-8977-5b6c3e07e873', '518e26e8-173b-49d0-aef0-51081a489b75');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, 'e05ed5b6-55c6-4882-b97d-b56c198746a0', '518e26e8-173b-49d0-aef0-51081a489b75');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, 'a58e5a77-7479-4815-bfb5-f51a8848eca7', '518e26e8-173b-49d0-aef0-51081a489b75');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, '73c678bc-0518-4884-a4de-f7a6279eeddf', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, '355c2576-6216-40de-abc9-5cddd862d6a4', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, '244998bd-e6b8-4025-a5a0-58e13fb8f628', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 5, '0e5d5a17-ccea-413f-8358-30ec908be491', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 6, '004035b0-92c6-4d1c-a3c1-ef6a571a234a', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 7, 'c1be1c4a-bcf5-46b5-a21d-dc9fc9274c14', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 8, '773a9793-a48a-4b98-9007-01d5c02854d3', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 10, '00823eeb-52e1-41fb-85d2-df40fbed1dde', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 11, '93317807-0247-4f42-8b51-a583beea68c2', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 12, '254a22a1-1e28-420e-a14b-a46ebaff3e09', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 13, 'b263f461-d258-48d2-a345-409c99a668e6', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 14, 'db8c12d8-1e47-4d83-b217-f5bd8150e966', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, '7d5b4041-fbd9-45ba-99dd-5477904e544e', '6ae3757a-86ee-41c1-9f08-4743fb84bd5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, '585cef29-0fb9-4bb0-b8b4-85f7cd51b017', '6ae3757a-86ee-41c1-9f08-4743fb84bd5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, '1ff5d404-9dbe-4698-9b5a-be79841facd1', '6ae3757a-86ee-41c1-9f08-4743fb84bd5d');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, '49819749-6e74-407c-a16e-cce0f1975347', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, '17fbbcdb-f515-48c8-9a97-0d4d7e10acd5', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, '6502c631-5ebe-430b-bcd8-14ce9e8a1821', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 5, '020c74b1-eb3c-4d25-b7a5-39cabcae468a', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 6, 'f6d77027-c502-4a20-afeb-d2fedf83a169', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 7, 'a53ae423-e302-4454-a8bb-6ff079b63e1b', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 8, '26d242ae-3efc-448a-b4c6-b3410d1ce1fe', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 10, 'cf12525f-d5c3-4f12-baba-3ab710650613', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 11, 'ab7a16df-3fcc-4ca5-8da0-52ac4f0eba16', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 12, 'e57a9c0c-e3e8-4396-9317-e575ce16e26e', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 13, '7132a7b3-f386-4b05-aa7d-3d70a23045ea', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 14, 'c7b00461-94aa-47bd-9bf2-d9853433131f', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, '143af1c6-af95-4730-b0e2-4018d05c94bd', '76d81abb-05fc-4ff6-acc8-46544df3bc3a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, '0081dd5d-bc58-47f2-84dc-5abcf18d895d', '76d81abb-05fc-4ff6-acc8-46544df3bc3a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, 'b64e7d68-575c-4824-821a-1975179be443', '76d81abb-05fc-4ff6-acc8-46544df3bc3a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 2, 'b98f8761-9bc2-4281-b652-4f1f7a531f4f', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 3, 'c9ddf67a-f054-4c31-87d2-99c7bf2c4072', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 4, 'ba431109-2e1c-46ec-97ae-c7bcb7821942', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 5, '1c6b53f5-c4ed-4e96-a961-7795c1d921e1', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 6, 'd4de2e0b-3989-4466-9ad3-fef3d844d482', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 7, '7e937dd1-27b8-4f8f-b4d6-39a0e4b3c541', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 8, 'e5328d7b-1a07-4b31-9926-1eda65be3bd8', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 10, 'ae1648b4-bcc5-41ef-b71e-9d0a488ee0a1', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 11, '3dfb8b59-68a4-4a26-8b59-ee2878c3c79f', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 12, '880ddc8c-5b74-4581-8736-52e46da183d2', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 13, 'a4bbffd4-c305-4f89-9756-fb9cd01a35ba', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('09-836', 14, 'c3c50232-e4a6-4b70-8f29-fe0a07dcc3cd', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, 'cfe46c50-0e06-41bf-b628-ad10e0829ed4', 'ce40eb05-fee5-493b-9a96-4cbaf0a4b6c3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'a4dc58ae-72e0-4646-9dfe-35ad2011b7ce', 'ce40eb05-fee5-493b-9a96-4cbaf0a4b6c3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '17d88c72-0c1c-4097-95b6-8fe6a37cc4f0', 'ce40eb05-fee5-493b-9a96-4cbaf0a4b6c3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '22a9c113-cf4a-47b2-aed4-b4099beae7a9', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '827f697e-b20c-410f-9ddb-efc0ddd6fa74', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '330276aa-0a9c-48f7-8390-0d2fb066037c', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, '08aa3c10-a47e-418b-9388-05db9e2eeba8', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, 'c6d5e797-01f3-4fca-94c3-390955d1f9a5', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '0bf6bc2f-adae-4ef3-af7e-280ec4f552a9', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '8648d602-bbbf-4877-b4fd-e4caf15896a2', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '31d1254d-4f5f-4a32-9edf-92b439c7f6be', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '27ed0abf-d0a7-4774-baec-b994aad078c0', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, '8d1020c5-074e-45de-a0ad-802bdf3e4c60', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, 'b32c3347-972a-4c6a-b43c-2525563139e7', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, 'f6610d97-160a-470c-843a-f65ec7464bf6', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '4b927f9c-4373-45d9-a41e-ce994525035e', '55bdea23-1eeb-451f-ab66-0808833fe371');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '1305759a-28bb-41d2-b2a3-2ce0018b900b', '55bdea23-1eeb-451f-ab66-0808833fe371');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '30cc07d5-0b6f-4851-8ea6-4364f190f10a', '55bdea23-1eeb-451f-ab66-0808833fe371');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '21e9a387-fefa-41c8-bcf8-34b5d551f441', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'b33cf5a4-2262-4d78-849e-5a5e9cf9ea01', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '6b31e9c6-0f61-4339-bad5-39ed993b58e3', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, '8e1ce1c3-4358-4278-93ee-8018c0b70475', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, '54e580f3-fe2c-41a8-96ed-1721bb552490', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '01bfc106-88f4-422a-b802-5a01a61039fb', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '39482718-51ab-440e-a6d3-a83462a45f7f', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '213871e7-af51-444a-a0be-085623f1c9ce', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '8a7e761f-a106-40cc-a8a2-ffdd85ccd151', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, '0ba37850-b83c-4fd3-a6ca-f131e8ea627c', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, '68529ec9-6f78-4225-94e1-7e2f4afdaf76', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, 'd403e89d-28a2-4358-bd88-0615008c2f4a', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, 'c2d0eb4c-2b4d-442d-b525-a7af7ce30a65', 'b71d32dd-0a06-4a63-8c9a-6883287fc313');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '81ec6e3a-0e74-4cdb-989c-3538fa2f8f10', 'b71d32dd-0a06-4a63-8c9a-6883287fc313');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '792614cb-9373-47cf-af31-eca506539363', 'b71d32dd-0a06-4a63-8c9a-6883287fc313');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '0a968b68-412d-487b-bd57-ebe3401a0a96', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'b1eedb2e-9431-4665-a258-46a1ba40a5a7', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'b14055f8-76fa-4695-bd15-004824b8ddd7', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, 'b8031137-b61e-44cd-bb43-49787539b810', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, '69776810-e332-43ef-ad3e-75350869617f', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '0102a341-d6e6-4357-aa00-bd52f2e5839b', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '2281f88a-2258-455b-8701-97f3078e4d42', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '11826d1e-7a5b-4f1f-a298-71d864f51add', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '0c2c3beb-ed44-436c-884c-e1b001c881b7', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, '9e9a3159-b02e-41af-be3a-0780222cb14f', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, 'a76595ee-601a-4189-8aba-2843bda9998a', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, 'c039487e-d185-4dc8-82b3-9c990f62113a', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '95da24fa-1f79-46d9-b626-aa5fdedef0ed', '96e46f76-3005-4127-897c-3f29a32c8fb4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'bfa4e9dc-5bfe-40eb-bb4d-2836260338bf', '96e46f76-3005-4127-897c-3f29a32c8fb4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '2a104af9-8b10-444f-8260-89f96cd97dbf', '96e46f76-3005-4127-897c-3f29a32c8fb4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '638e4c6d-b4e1-4a2c-9074-37e776a3500a', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '31ec0e90-9728-4464-a9d6-b67f513f2be9', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '1b5a5c5f-3253-4537-a512-68f70c222531', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, '0394f677-f70e-4501-8ae1-54d275aba9be', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, 'e26a610c-73d3-45ae-b1c3-2d787729679b', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '32f6ffe2-465e-4fbd-ba2a-b7253ab4b721', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '79e93091-f309-4cdc-8f9f-321a4a287ca5', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '11739700-6f55-4705-b8ad-70ba1f2c1bfe', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, 'fc92934c-c1cc-47d0-a4e7-2e8fef4bcb50', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, 'af697f71-73e5-49ac-a5a2-207ba6b39f70', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, '6c926749-a0a5-41bd-90fd-7bc13ce9be03', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, 'ece8f4c3-91ea-46be-adfa-9eb0af8c40b1', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, 'e6b9c7e6-6f8c-413c-ba9b-a3af7d85f7c6', '00e04873-99fd-4c81-bcc6-aca2afec13a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'b1485782-3a1f-4e4f-bad6-0bf27f189412', '00e04873-99fd-4c81-bcc6-aca2afec13a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '04759174-df35-45cf-baff-ad08ae433213', '00e04873-99fd-4c81-bcc6-aca2afec13a4');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '6115b3e6-ad92-4273-bddd-ff4b2e97344e', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '32517d4d-a8bb-41ea-874c-6f036cdf0e8e', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'e708a768-fe06-4868-9c43-8daff336dc36', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, 'b0f18d22-02f3-488c-8fc7-0816e1d6f769', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, '7fdeebbb-26dd-4e3c-aff1-df49bfbe2507', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '95e39162-f546-4a83-8986-49056d841399', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, 'e9e3ac1b-9977-4504-9dfc-3e5621e34a66', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '257b7a52-816a-4855-a3a1-3ed1c1f3067f', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, 'f4929dc7-01d5-49a7-ae6a-fa30301efa74', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, '0163ba42-e1b4-4e32-856a-fb91f6e15757', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, '68bd85eb-30ce-4ccd-86eb-160accaa3309', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, '3c71f36b-14ef-4f3b-a168-6035cfdd3fc9', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '7ecd185c-8cbf-4c0c-838d-0d50312e9266', 'dd8c95b9-37e8-429f-85de-d98a250b5786');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'f1abf341-d7ac-4b22-80c5-0295af5fb8c7', 'dd8c95b9-37e8-429f-85de-d98a250b5786');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '3534dacf-1b90-4c78-8eff-14d0ab715dc0', 'dd8c95b9-37e8-429f-85de-d98a250b5786');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, 'aa042378-cfbf-4238-aac8-d965c4bf06d5', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'fd66b514-729e-4e02-a736-1758b473c7f0', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '2a380741-fe3a-4b95-87ea-338b67ac9ec2', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, '895cb504-8e1f-489b-8d91-5bc2c63ded6d', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, 'c41a62ce-0a1b-45c7-a50b-212e87a21b8d', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, 'b9c017b0-0b84-4d13-a7de-edf5dcb2f959', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '79593446-70ac-4644-a746-b3458374b1af', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '939ed466-e5ee-45c6-a825-7a650c9a7833', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '0eeb59ce-b7c0-4820-bce8-416fa6d2638c', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, 'e8b2e2d7-088f-4d31-b293-78d3c47a534f', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, '44fa1cbb-6e90-4af4-895e-2ebffc9b200e', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, '423b47e6-cf88-46f6-b6cc-c0d3da24866e', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '314aa4fe-581d-44ca-a746-bcdd0b1fb2b0', 'f27cd5b4-e1b8-402a-b783-c01218d5a37e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'b4f05698-5781-48b1-bebd-06f676b9e3d6', 'f27cd5b4-e1b8-402a-b783-c01218d5a37e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'dc633576-8b9c-4889-9635-a551b27baafe', 'f27cd5b4-e1b8-402a-b783-c01218d5a37e');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '94f35f44-38f5-4bc7-a089-d044e2885fbb', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '453ab57b-71bb-4664-8a40-40a772e8680a', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '5a247ddf-ffb2-48a2-a30a-915d65cb342b', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, 'bc5c84d5-5b93-4d83-a89e-dc135ae42018', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, '27a684ff-ace1-4637-aa0e-6042d77fd2c7', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '83a814c9-0c04-43a0-be77-ec9a2109b5eb', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '773bf80c-122c-46c1-9105-de9ad9ded6e7', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, 'bec9da46-966a-43c6-8ddd-03f2cc3a2627', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '58c72a05-b12b-4132-b37e-8454fc522bb1', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, '5484413e-8f6c-4666-a55b-5373ea8210d6', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, '0a2a0179-1a52-4c05-8618-232632c8ca3e', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, '80c7be28-794e-4a4d-adaa-f01a01dc2d5d', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '0a40058e-90cd-4b4f-979d-51fc17f9088a', 'ce98fbbc-1fac-4a01-83c8-b2860ebcd9e8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'b1164b52-3117-4cae-ae38-58609808866b', 'ce98fbbc-1fac-4a01-83c8-b2860ebcd9e8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '1269069b-a571-461a-804f-a6b243769b17', 'ce98fbbc-1fac-4a01-83c8-b2860ebcd9e8');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '631746fa-1db8-4555-bf90-e0cbe7567a20', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '4041a7ca-9acd-4ad6-b2c1-be7e13c9eb89', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'c0e59b8b-163b-454d-9b4c-c048b76fd90b', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, '7c4a1b1a-c974-4bfd-b31f-019c1d87012e', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, '379d858a-8875-479d-9af7-f90c42cc3cbd', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, 'c590da28-ba4a-4bfd-b10c-00530312ee4f', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '059f479b-bc37-4ea5-9666-e84dd8a92232', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '845685f5-502f-412c-957c-d68596bdb54d', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, 'cff5c458-da97-4280-8416-42a1bd58ec29', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, '1ffb9e8c-30bb-49bc-b40e-c922bf4d290a', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, 'bdc45dd8-9b16-4d89-8c67-c0dac4b75d7c', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, 'd8b11bc2-9337-4e6f-b03b-cebf3bb7a218', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '37281b68-bc09-4e98-a7aa-3cba8e7afed2', 'b092efee-3af3-42e7-b4d5-2abab8c67e00');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '65b97bcf-5f58-4924-a934-e54ab0daf2e7', 'b092efee-3af3-42e7-b4d5-2abab8c67e00');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'b9724652-9e8a-43ef-8479-1f3e093c8df2', 'b092efee-3af3-42e7-b4d5-2abab8c67e00');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, 'a096f928-c82e-4460-8701-9f94d14bc3e5', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '05c7e3bd-85ea-430a-a5f7-f6ecdbcd4d1c', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'a40c96e2-a4fb-4f4d-b1de-a18ba44424de', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, 'ad628e29-fcde-4e39-bafb-a6d3ca31831c', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, 'c81294c9-09fd-416a-ac6b-9a9babf19caa', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '4330407a-fc1b-4d6e-bdb3-842b35869e94', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '24c4f8c7-5cea-4ad1-8b55-ff270e51ab3f', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, 'fd55a123-b98e-4649-8859-5f745f8662ce', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '6d1f7b6f-cfc2-4c60-a368-89555bbc3685', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, 'e882d23f-df7c-4557-ab23-c141a4b3cc4a', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, '2c317531-afb8-4d45-acc1-ec47a4b52e24', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, '06da4db2-8517-48ab-9263-3164f0570dba', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '97134e5e-ebd2-4f7c-8626-e5c4d7a336de', 'c42dcbd3-e629-46dc-ab96-5f08b705c0b3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, '8a986017-744d-4ecd-8742-7342ca240f4f', 'c42dcbd3-e629-46dc-ab96-5f08b705c0b3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, 'b8de7482-0df6-485c-b208-d0ee3ae61d5c', 'c42dcbd3-e629-46dc-ab96-5f08b705c0b3');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 2, '826e06e8-98df-4758-b046-403718089615', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 3, 'd8ae5ebf-e063-47f2-8b72-3d84ad66f74c', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 4, '5879c3f6-6150-4642-a565-08967d212bff', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 5, '36b2f97a-e63d-4784-a705-01036feac61d', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 6, '46d5ec2a-8d1e-46f0-bbac-e1dec1345aed', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 7, '829b30df-61ae-45b9-9040-1c566bb85686', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 8, '62dd483f-e2ab-45ca-b179-a1037aad1c3c', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 10, '35b2ba8e-3711-4253-9f2e-fbc03e9c19ef', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 11, '24e45cfe-16e4-4f47-b957-4723a0d2c74d', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 12, 'd1730054-1da2-4b01-ab88-1b6bdc336171', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 13, 'af421381-2ab6-4779-8358-bb3f19cb4f14', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('49-316', 14, '99db772f-feeb-4efc-8abb-0d3175833954', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, 'da12d7ac-e4a9-40c7-9fd4-99b876d317fd', '0ebcf551-5499-4b4a-8a52-17e563bfc706');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, 'c02faaad-e12f-4a70-ae0d-227c9ed72eb1', '0ebcf551-5499-4b4a-8a52-17e563bfc706');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, 'cec75862-ac48-4c02-b813-ee1aa2d729e2', '0ebcf551-5499-4b4a-8a52-17e563bfc706');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '0486c84d-5894-43f7-a68d-2d2d8687292d', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, 'bfeca2a5-da0b-41f1-bf27-41987f3b2752', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '75032e53-34cc-4b26-840f-a6f8a1f6b7a8', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '7a97011e-92c3-45db-95dc-0dae7b010f6d', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, 'c56e2eaf-8913-4328-8d8b-f3900cabe7a4', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'cebc7d51-6b53-4a54-96e6-ff4d5c24aa26', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '6f5fba55-aeb0-4e13-88b0-4963e3a39789', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, 'b32536e6-6626-41ac-93b4-8a01c31d1e82', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '3788ecb8-b800-44d5-8c76-20da858bdcd4', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, 'e16bf24a-004e-4df5-8dde-49dfc8d479fe', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '99e5e35f-e369-4c73-b660-7eb546044a4c', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, 'bc5c4136-1299-4278-90ca-80f43255efa6', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '7d8dfbb9-e4c5-468d-9480-99480fb567d5', '1d05bf71-64a1-4372-995f-d1c8628c360a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '005d7d90-d453-4dd8-8ad2-595796c8dbce', '1d05bf71-64a1-4372-995f-d1c8628c360a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '4c68d297-e949-4061-b8fa-d1145a4d699f', '1d05bf71-64a1-4372-995f-d1c8628c360a');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '141bfd13-7933-416e-838e-a92b22b092b1', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, 'cd6bc9e8-3578-48b2-a691-2f9d4938794d', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '10d1ec7a-f978-442c-b293-1d592cdb8d14', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'b7583717-3dc1-4baa-9ec5-b4ffeb1ae2be', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, 'b963fadc-b930-4405-baad-ca63e4bbe56f', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, 'd8a5aec7-65f1-4504-a26f-b6e1824a9386', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '6b2200c5-b303-4d86-a98d-4dbcdcd666c6', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '470cda61-5c36-4c16-b314-5cc01c94a393', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, '0916bd65-77cc-48e4-bc90-020eb84ce562', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, 'bb9d1bd7-4154-4dad-af58-6b53509379fc', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '49ef66b3-462f-4376-8853-b55fabab1d76', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '3ffcfe65-9cd2-41dc-9df6-5b98450237e9', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '90b7b158-7f0b-4c80-89e1-43761561b879', 'eb3a343f-b6fc-4f65-ab53-40401196c127');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, 'e91268b6-0908-4c17-88a9-9fd554fd19da', 'eb3a343f-b6fc-4f65-ab53-40401196c127');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '9a5ae180-7844-4543-b710-8bfff01bde24', 'eb3a343f-b6fc-4f65-ab53-40401196c127');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '89fd1281-71d0-4458-8860-bfa0e42472ca', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '55c39d11-8370-41f3-857e-eede03aa3377', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '2df1e334-f5b1-4c96-aecb-798ed1bbff22', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, 'd60c79e4-914d-4614-81f8-c552f3adf616', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, '55ddd7ef-93d2-46d8-8baf-85e656a1fcd1', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '9f3a7f26-e5d7-488e-b70d-75878cf4b21e', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '151798fa-ae55-459d-ab89-57b23bbc4802', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, '3e77f87b-16fe-4682-b73b-375106e6f8d6', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, 'df1b5182-8eaf-4bae-9500-57e385d723a2', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, 'a8f9c1a9-0473-4ce5-9607-9e8e745891f1', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '498e21bd-7c49-4b88-a1c5-fa18bcae010d', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '6e90cd11-4eb2-45f1-b3cd-1fe367fc9347', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '5b69541d-1c1f-40fe-83b2-b0316393ccd6', '872d100e-16e5-4def-9692-5e3685946a61');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, 'e009220d-a770-4983-96bd-dda81886d464', '872d100e-16e5-4def-9692-5e3685946a61');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, 'f135e15d-f557-4a5f-824e-f38243e4ffd1', '872d100e-16e5-4def-9692-5e3685946a61');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 2, '9a829394-7152-4a0f-aefa-4917373a5554', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 3, '4aecef7c-dd12-41e9-b2b6-3e4bb511b1fc', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 4, '42c4a802-4074-4b6c-a635-6aff63e37205', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 5, '1e9921d6-e8a1-4f93-b3eb-7c02367f9a9d', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 6, 'b00ed5ea-5b47-41bc-befd-3055f76d7a94', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 7, '0c8f6f0f-4083-455f-97b6-f48695dcc10c', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 8, '001f0656-456e-4a27-b919-6caa765f948b', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 10, 'f4551534-ad1e-4872-8fd1-dc7557aef648', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 11, 'f482d701-bac5-42ba-85c5-cc2a93030d26', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 12, '05249da4-56d7-4bf1-8a3c-5a29e8c782a2', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 13, '9a73565c-637e-4fe8-ab2e-9c4cf04c9a68', 'a4509284-499a-4420-80f7-afffa0bd6de6');
INSERT INTO public.session (location, week, id, "sessionStreamId") VALUES ('Online', 14, '33c34101-6b1b-48b2-8109-d31433c89940', 'a4509284-499a-4420-80f7-afffa0bd6de6');


--
-- Data for Name: session_allocation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: session_stream; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P02 Flexible', 'Practical', 1, 17, 19, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 1, '7a9e2c22-496a-4dff-b2ff-3361101f96c0', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P02 Flexible extra 1', 'Practical', 1, 17, 19, '{4,7,13}', '78-122', 1, 'ae7942ce-ed30-40cf-b8f0-1192f5e3fe09', '8046ee18-243f-4b89-93f2-ad56a63f133f', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P02 Flexible extra 2', 'Practical', 1, 17, 19, '{5,8,14}', '78-122', 2, '264d9e1d-470d-4aaf-9307-e641da63324c', '8046ee18-243f-4b89-93f2-ad56a63f133f', '7a9e2c22-496a-4dff-b2ff-3361101f96c0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P03 Flexible', 'Practical', 2, 8, 10, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 1, '1e51cf4e-a5e9-4527-b977-a526d155e165', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P03 Flexible extra 1', 'Practical', 2, 8, 10, '{4,7,13}', '78-122', 1, '7c2ff7c1-04d8-42d3-ad78-573e455fe981', '8046ee18-243f-4b89-93f2-ad56a63f133f', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P03 Flexible extra 2', 'Practical', 2, 8, 10, '{5,8,14}', '78-122', 2, '6567833d-8024-4472-8010-41f6e4fc3198', '8046ee18-243f-4b89-93f2-ad56a63f133f', '1e51cf4e-a5e9-4527-b977-a526d155e165');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P05 Flexible', 'Practical', 2, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-218', 1, '05403575-d340-4b78-9dd4-9ac782e419dd', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P05 Flexible extra 1', 'Practical', 2, 10, 12, '{4,7,13}', '09-218', 1, 'aab277c1-d8fe-4c37-8626-d344f4dc3627', '8046ee18-243f-4b89-93f2-ad56a63f133f', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P05 Flexible extra 2', 'Practical', 2, 10, 12, '{5,8,14}', '09-218', 2, 'a282fb64-a055-43fd-a1a4-6f681d05400f', '8046ee18-243f-4b89-93f2-ad56a63f133f', '05403575-d340-4b78-9dd4-9ac782e419dd');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P08 Flexible', 'Practical', 2, 16, 18, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-218', 1, '39b812ea-f4b0-479f-ae89-e0f742946d59', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P08 Flexible extra 1', 'Practical', 2, 16, 18, '{4,7,13}', '09-218', 1, 'a5302ce6-cbdf-4fcc-8458-f79eadc4d14e', '8046ee18-243f-4b89-93f2-ad56a63f133f', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P08 Flexible extra 2', 'Practical', 2, 16, 18, '{5,8,14}', '09-218', 2, '375160cd-77eb-493f-835e-a496bc138c94', '8046ee18-243f-4b89-93f2-ad56a63f133f', '39b812ea-f4b0-479f-ae89-e0f742946d59');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P09 Flexible', 'Practical', 3, 8, 10, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-218', 1, '06ac174c-834c-44b7-8ae4-3955692964a0', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P09 Flexible extra 1', 'Practical', 3, 8, 10, '{4,7,13}', '09-218', 1, 'c656b904-4fbb-41f2-9687-2c1f86c987ce', '8046ee18-243f-4b89-93f2-ad56a63f133f', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P09 Flexible extra 2', 'Practical', 3, 8, 10, '{5,8,14}', '09-218', 2, '3f3336c8-8d56-437a-a3e9-943e90374bdf', '8046ee18-243f-4b89-93f2-ad56a63f133f', '06ac174c-834c-44b7-8ae4-3955692964a0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P10 Flexible extra 2', 'Practical', 3, 10, 12, '{5,8,14}', '85-C512', 2, '052277cf-1871-4dc6-8f24-2273629fd3fa', '8046ee18-243f-4b89-93f2-ad56a63f133f', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P10 Flexible', 'Practical', 3, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '85-C512', 1, '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P10 Flexible extra 1', 'Practical', 3, 10, 12, '{4,7,13}', '85-C512', 1, 'd4f613f6-6937-4567-b446-0b7bbab05923', '8046ee18-243f-4b89-93f2-ad56a63f133f', '86f9de4c-a5f1-4a48-9ea2-4e25389e78c0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P12 Flexible', 'Practical', 3, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '85-C512', 1, '751145ef-8fde-412f-a1a9-8311517f9065', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P12 Flexible extra 2', 'Practical', 3, 14, 16, '{5,8,14}', '85-C512', 2, '2ea76a99-c5f2-4d29-889e-7ee0aa084f1b', '8046ee18-243f-4b89-93f2-ad56a63f133f', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P12 Flexible extra 1', 'Practical', 3, 14, 16, '{4,7,13}', '85-C512', 1, '27883ef1-f2c6-4ef4-b0e3-93ce036ae69f', '8046ee18-243f-4b89-93f2-ad56a63f133f', '751145ef-8fde-412f-a1a9-8311517f9065');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P13 Flexible', 'Practical', 3, 16, 18, '{2,3,4,5,6,7,8,10,11,12,13,14}', '85-C512', 1, '41c2db0c-52ea-4ef0-88a2-9729e3608e11', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P13 Flexible extra 1', 'Practical', 3, 16, 18, '{4,7,13}', '85-C512', 1, 'e3a367ec-9dbc-4fc1-8fbc-c017958a2985', '8046ee18-243f-4b89-93f2-ad56a63f133f', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P13 Flexible extra 2', 'Practical', 3, 16, 18, '{5,8,14}', '85-C512', 2, '04847075-8b57-4d49-8cd7-504de2a808fc', '8046ee18-243f-4b89-93f2-ad56a63f133f', '41c2db0c-52ea-4ef0-88a2-9729e3608e11');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P14 Flexible', 'Practical', 4, 8, 10, '{2,3,4,5,6,7,8,10,11,12,13,14}', '35-214', 1, '669f6d10-db7c-49f4-93aa-668a9c281821', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P14 Flexible extra 1', 'Practical', 4, 8, 10, '{4,7,13}', '35-214', 1, '7901e269-9bc4-4b2f-a882-855be9251b7a', '8046ee18-243f-4b89-93f2-ad56a63f133f', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P14 Flexible extra 2', 'Practical', 4, 8, 10, '{5,8,14}', '35-214', 2, '86803e3c-abbd-40bb-a095-3c653386da01', '8046ee18-243f-4b89-93f2-ad56a63f133f', '669f6d10-db7c-49f4-93aa-668a9c281821');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P16 Flexible', 'Practical', 4, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '83-C412', 1, '97e76f93-6668-4498-bf95-84d368322b1e', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P16 Flexible extra 1', 'Practical', 4, 10, 12, '{4,7,13}', '83-C412', 1, 'bef69475-6042-462b-8773-26125cfcd6fb', '8046ee18-243f-4b89-93f2-ad56a63f133f', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P16 Flexible extra 2', 'Practical', 4, 10, 12, '{5,8,14}', '83-C412', 2, 'cb8b8b33-e298-4a92-9528-27381f4c0417', '8046ee18-243f-4b89-93f2-ad56a63f133f', '97e76f93-6668-4498-bf95-84d368322b1e');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P18 Flexible', 'Practical', 4, 12, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', '35-210', 1, '9752990f-0301-4509-a768-fccfc54d5afe', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P18 Flexible extra 1', 'Practical', 4, 12, 14, '{4,7,13}', '35-210', 1, '6c60bf05-cd90-4606-ba85-2b739d757e2a', '8046ee18-243f-4b89-93f2-ad56a63f133f', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P18 Flexible extra 2', 'Practical', 4, 12, 14, '{5,8,14}', '35-210', 2, '5f47f8e7-3bb8-46c9-af9c-18b6287b7f2f', '8046ee18-243f-4b89-93f2-ad56a63f133f', '9752990f-0301-4509-a768-fccfc54d5afe');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P20 Flexible', 'Practical', 4, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '35-210', 1, 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P20 Flexible extra 1', 'Practical', 4, 14, 16, '{4,7,13}', '35-210', 1, '41a3b733-e953-4f20-af4b-1ff30d62f135', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P20 Flexible extra 2', 'Practical', 4, 14, 16, '{5,8,14}', '35-210', 2, '2d44aa78-80f1-47d4-99f1-6166b6a4f7eb', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'd133be1d-cc1c-4d8b-9fa3-5edf7596cc81');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P22 Flexible', 'Practical', 4, 16, 18, '{2,3,4,5,6,7,8,10,11,12,13,14}', '07-326', 1, '9a96cfa2-cb1d-464e-aae5-037f0a920a04', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P22 Flexible extra 1', 'Practical', 4, 16, 18, '{4,7,13}', '07-326', 1, '98b6c910-8f66-46e8-b39a-44052aaee307', '8046ee18-243f-4b89-93f2-ad56a63f133f', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P22 Flexible extra 2', 'Practical', 4, 16, 18, '{5,8,14}', '07-326', 2, 'b9c185c6-4429-47f2-b30d-14e83e5c7c3b', '8046ee18-243f-4b89-93f2-ad56a63f133f', '9a96cfa2-cb1d-464e-aae5-037f0a920a04');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P23 Flexible', 'Practical', 5, 8, 10, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-233', 1, 'b26aa7a8-3a08-4369-9225-87488803e9c7', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P23 Flexible extra 1', 'Practical', 5, 8, 10, '{4,7,13}', '78-233', 1, '8a93a444-6c06-431f-9f75-7d8beaf3cb78', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P23 Flexible extra 2', 'Practical', 5, 8, 10, '{5,8,14}', '78-233', 2, '8341a561-2ce6-4b52-bf5b-8d55e95ee7d3', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'b26aa7a8-3a08-4369-9225-87488803e9c7');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P25 Flexible', 'Practical', 5, 12, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', '35-210', 1, '220795a4-87a0-4df2-9045-4ceed261353d', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P25 Flexible extra 1', 'Practical', 5, 12, 14, '{4,7,13}', '35-210', 1, '6bb06aa2-60dd-41f3-95e4-78f1f0a93a57', '8046ee18-243f-4b89-93f2-ad56a63f133f', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P25 Flexible extra 2', 'Practical', 5, 12, 14, '{5,8,14}', '35-210', 2, 'b7cfd9e6-7367-4e63-a7f8-62ce574a70f8', '8046ee18-243f-4b89-93f2-ad56a63f133f', '220795a4-87a0-4df2-9045-4ceed261353d');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P27 Flexible', 'Practical', 5, 16, 18, '{2,3,4,5,6,7,8,10,11,12,13,14}', '35-210', 1, 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P27 Flexible extra 1', 'Practical', 5, 16, 18, '{4,7,13}', '35-210', 1, '67d4d682-08bf-4a40-84ec-6f5c1a7d7302', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P27 Flexible extra 2', 'Practical', 5, 16, 18, '{5,8,14}', '35-210', 2, '9660f5dd-eb80-4f17-b091-95889af3560b', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'ce4c321f-9b91-4db9-8ff9-6fc6a7627b08');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P01 Flexible', 'Practical', 1, 15, 17, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, 'da4bf765-680a-4149-847d-1176ae272f17', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P01 Flexible extra 1', 'Practical', 1, 15, 17, '{4,7}', '78-122', 1, '5f2d2933-0747-403c-adfb-2d4085c4548f', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P01 Flexible extra 2', 'Practical', 1, 15, 17, '{5,8,13,14}', '78-122', 4, '77da971a-a15e-4061-8006-fa4163a0ebad', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'da4bf765-680a-4149-847d-1176ae272f17');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P04 Flexible', 'Practical', 2, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, '80c81481-2775-4df6-a2e8-379426a1dd66', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P04 Flexible extra 1', 'Practical', 2, 10, 12, '{4,7}', '78-122', 1, 'bf43a87e-390c-4e38-a060-9bdd4ad9332b', '8046ee18-243f-4b89-93f2-ad56a63f133f', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P04 Flexible extra 2', 'Practical', 2, 10, 12, '{5,8,13,14}', '78-122', 4, '119bd994-7763-4933-92a9-9d4b4286d7b8', '8046ee18-243f-4b89-93f2-ad56a63f133f', '80c81481-2775-4df6-a2e8-379426a1dd66');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P06 Flexible', 'Practical', 2, 12, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, 'c869fa69-c358-4d02-9749-dabf247e3994', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P06 Flexible extra 1', 'Practical', 2, 12, 14, '{4,7}', '78-122', 1, '124d75b2-3f29-4064-a4a0-c9b3e8e949ee', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P06 Flexible extra 2', 'Practical', 2, 12, 14, '{5,8,13,14}', '78-122', 4, 'a9d23af4-90ae-4397-a26a-d51bda5c9ea8', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'c869fa69-c358-4d02-9749-dabf247e3994');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P07 Flexible', 'Practical', 2, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, '0181d0a6-066d-4e35-a90b-03058500dc62', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P07 Flexible extra 1', 'Practical', 2, 14, 16, '{4,7}', '78-122', 1, '5232ccd7-f5ad-47f3-9102-58bdf363aba2', '8046ee18-243f-4b89-93f2-ad56a63f133f', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P07 Flexible extra 2', 'Practical', 2, 14, 16, '{5,8,13,14}', '78-122', 4, '158fa46f-1964-4203-8c13-23f0db79a22f', '8046ee18-243f-4b89-93f2-ad56a63f133f', '0181d0a6-066d-4e35-a90b-03058500dc62');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P11 Flexible', 'Practical', 3, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, '491783f1-c2a5-4b18-bbd1-e94985167a37', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P11 Flexible extra 1', 'Practical', 3, 14, 16, '{4,7}', '78-122', 1, 'e9431cb5-ecf9-4cd7-b2a8-e40ff1313eb6', '8046ee18-243f-4b89-93f2-ad56a63f133f', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P11 Flexible extra 2', 'Practical', 3, 14, 16, '{5,8,13,14}', '78-122', 4, '5a79029a-7635-4de9-b8ec-703ab5e36c0b', '8046ee18-243f-4b89-93f2-ad56a63f133f', '491783f1-c2a5-4b18-bbd1-e94985167a37');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P15 Flexible', 'Practical', 4, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P15 Flexible extra 1', 'Practical', 4, 10, 12, '{4,7}', '78-122', 1, '46b26cf0-20a0-48fa-a2a2-7a50eab4e375', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P15 Flexible extra 2', 'Practical', 4, 10, 12, '{5,8,13,14}', '78-122', 4, 'cb8b6aaf-f89a-434a-9cff-ea8f839f45af', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'ea0eeabe-b8cc-4a00-be93-9916aca8c1a9');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P17 Flexible', 'Practical', 4, 12, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, '42d00386-8206-4378-a2d4-01cf4b990bb3', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P17 Flexible extra 1', 'Practical', 4, 12, 14, '{4,7}', '78-122', 1, '7269f14e-6541-4871-9041-b68b53534530', '8046ee18-243f-4b89-93f2-ad56a63f133f', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P17 Flexible extra 2', 'Practical', 4, 12, 14, '{5,8,13,14}', '78-122', 4, 'c2d496fc-a02e-4fa4-a23d-a1418d8e863f', '8046ee18-243f-4b89-93f2-ad56a63f133f', '42d00386-8206-4378-a2d4-01cf4b990bb3');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P19 Flexible', 'Practical', 4, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, '074271d9-a99a-4dfd-b029-521a97c40000', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P19 Flexible extra 1', 'Practical', 4, 14, 16, '{4,7}', '78-122', 1, '4ae81b54-2fd4-4aa8-bd66-a8d2ee42e8e1', '8046ee18-243f-4b89-93f2-ad56a63f133f', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P19 Flexible extra 2', 'Practical', 4, 14, 16, '{5,8,13,14}', '78-122', 4, 'a486eb38-2b3f-44eb-8f71-3199134731a4', '8046ee18-243f-4b89-93f2-ad56a63f133f', '074271d9-a99a-4dfd-b029-521a97c40000');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P24 Flexible', 'Practical', 5, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, '0ee627e1-2612-4f67-ae76-afd089a0c597', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P24 Flexible extra 1', 'Practical', 5, 10, 12, '{4,7}', '78-122', 1, '46fc7e34-dfd7-4d13-9059-36a92027162f', '8046ee18-243f-4b89-93f2-ad56a63f133f', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P24 Flexible extra 2', 'Practical', 5, 10, 12, '{5,8,13,14}', '78-122', 4, '3760a9f7-2477-4cb5-a6fc-2d6128e090f6', '8046ee18-243f-4b89-93f2-ad56a63f133f', '0ee627e1-2612-4f67-ae76-afd089a0c597');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P26 Flexible', 'Practical', 5, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '78-122', 2, 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P26 Flexible extra 1', 'Practical', 5, 14, 16, '{4,7}', '78-122', 1, '5404afe5-1e1b-4a08-b8c7-8091d7efb05b', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P26 Flexible extra 2', 'Practical', 5, 14, 16, '{5,8,13,14}', '78-122', 4, 'd837511f-2894-4475-a032-462b54c5791f', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'e7f918e0-1059-4bdb-962d-fbe1ddeb7c38');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P01 External', 'Practical', 3, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, '3be31a9e-9f95-4f29-a676-a0817b25f6a7', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P01 External extra 1', 'Practical', 3, 14, 16, '{4,7}', 'Online', 1, '4cded3d7-06c1-4572-b71e-a47a27abc8d0', '8046ee18-243f-4b89-93f2-ad56a63f133f', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P01 External extra 2', 'Practical', 3, 14, 16, '{5,8,13,14}', 'Online', 4, '9811833c-513a-4a79-9c44-8250ec936f8b', '8046ee18-243f-4b89-93f2-ad56a63f133f', '3be31a9e-9f95-4f29-a676-a0817b25f6a7');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P02 External', 'Practical', 4, 12, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, '7f20f512-a460-4f75-864a-8b1bc43e7cdf', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P02 External extra 1', 'Practical', 4, 12, 14, '{4,7}', 'Online', 1, '1339af4b-31f7-45a9-89be-bf08a00093f9', '8046ee18-243f-4b89-93f2-ad56a63f133f', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P02 External extra 2', 'Practical', 4, 12, 14, '{5,8,13,14}', 'Online', 4, '53323eab-d5e3-46e3-b1cc-3cd6661e1b76', '8046ee18-243f-4b89-93f2-ad56a63f133f', '7f20f512-a460-4f75-864a-8b1bc43e7cdf');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P03 External', 'Practical', 4, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, '711807ae-b5ab-4169-9e0e-03a474fa5312', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P03 External extra 1', 'Practical', 4, 14, 16, '{4,7}', 'Online', 1, 'f8e6d7d9-1fbe-48bd-b06b-d64f73e66545', '8046ee18-243f-4b89-93f2-ad56a63f133f', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P03 External extra 2', 'Practical', 4, 14, 16, '{5,8,13,14}', 'Online', 4, '070ec944-23e7-4887-b58a-ee4e9d47e4af', '8046ee18-243f-4b89-93f2-ad56a63f133f', '711807ae-b5ab-4169-9e0e-03a474fa5312');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P04 External extra 2', 'Practical', 5, 10, 12, '{5,8,13,14}', 'Online', 4, '2790871e-d43c-4159-b450-99d632b32a5b', '8046ee18-243f-4b89-93f2-ad56a63f133f', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P04 External', 'Practical', 5, 10, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, '1149c343-d503-43d1-b435-18e345497d5d', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P04 External extra 1', 'Practical', 5, 10, 12, '{4,7}', 'Online', 1, 'a8a41553-2301-4bf7-80a7-9f57d3c46c1c', '8046ee18-243f-4b89-93f2-ad56a63f133f', '1149c343-d503-43d1-b435-18e345497d5d');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P05 External', 'Practical', 5, 12, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P05 External extra 1', 'Practical', 5, 12, 14, '{4,7}', 'Online', 1, '776ff411-f505-4e7f-b158-053a9ba8df1b', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P05 External extra 2', 'Practical', 5, 12, 14, '{5,8,13,14}', 'Online', 4, '7c10e0a7-e005-4807-a8b7-ed9783995600', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'f42c97bd-981f-4e51-9615-ae03b6f3d1fa');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P06 External', 'Practical', 5, 14, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, 'c2c5fe9e-acda-494e-a60e-1822c7c17451', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P06 External extra 1', 'Practical', 5, 14, 16, '{4,7}', 'Online', 1, '5954be10-17a6-4964-b40e-823a4fed0515', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('P06 External extra 2', 'Practical', 5, 14, 16, '{5,8,13,14}', 'Online', 4, 'b284e6fc-4a8b-4cfa-942a-225422dcdcfa', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'c2c5fe9e-acda-494e-a60e-1822c7c17451');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T05 Flexible', 'Tutorial', 3, 12, 13, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-836', 1, 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T05 Flexible extra 1', 'Tutorial', 3, 12, 13, '{2,3,4}', '09-836', 1, '35628c2f-33b4-4262-b334-87b7c7c76a6e', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'f0e9626c-3930-434f-8d2a-d6b9774c8dd5');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T08 Flexible extra 1', 'Tutorial', 4, 10, 11, '{2,3,4}', '09-836', 1, '518e26e8-173b-49d0-aef0-51081a489b75', '8046ee18-243f-4b89-93f2-ad56a63f133f', '33c83d7b-b2e5-49be-8968-d632c8b3ddab');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T08 Flexible', 'Tutorial', 4, 10, 11, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-836', 1, '33c83d7b-b2e5-49be-8968-d632c8b3ddab', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T11 Flexible', 'Tutorial', 4, 12, 13, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-836', 1, '3367745a-227a-4a2f-98b1-b5d61b1e15d5', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T11 Flexible extra 1', 'Tutorial', 4, 12, 13, '{2,3,4}', '09-836', 1, '6ae3757a-86ee-41c1-9f08-4743fb84bd5d', '8046ee18-243f-4b89-93f2-ad56a63f133f', '3367745a-227a-4a2f-98b1-b5d61b1e15d5');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T14 Flexible', 'Tutorial', 5, 12, 13, '{2,3,4,5,6,7,8,10,11,12,13,14}', '09-836', 1, '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T14 Flexible extra 1', 'Tutorial', 5, 12, 13, '{2,3,4}', '09-836', 1, '76d81abb-05fc-4ff6-acc8-46544df3bc3a', '8046ee18-243f-4b89-93f2-ad56a63f133f', '6c5a68a6-4e77-4b59-b4ce-f46ad8c34f8f');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T01 Flexible', 'Tutorial', 1, 15, 16, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, '5189496e-4ed8-4784-8b7a-47cdad69e458', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T01 Flexible extra 1', 'Tutorial', 1, 15, 16, '{2,3,4}', '49-316', 2, 'ce40eb05-fee5-493b-9a96-4cbaf0a4b6c3', '8046ee18-243f-4b89-93f2-ad56a63f133f', '5189496e-4ed8-4784-8b7a-47cdad69e458');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T02 Flexible', 'Tutorial', 1, 16, 17, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, 'c52d4c52-ef3e-47c0-b462-d2905ba6c664', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T02 Flexible extra 1', 'Tutorial', 1, 16, 17, '{2,3,4}', '49-316', 2, '55bdea23-1eeb-451f-ab66-0808833fe371', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'c52d4c52-ef3e-47c0-b462-d2905ba6c664');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T03 Flexible', 'Tutorial', 2, 8, 9, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, '8713fe61-886d-4273-97e9-eb2653c4aadc', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T03 Flexible extra 1', 'Tutorial', 2, 8, 9, '{2,3,4}', '49-316', 2, 'b71d32dd-0a06-4a63-8c9a-6883287fc313', '8046ee18-243f-4b89-93f2-ad56a63f133f', '8713fe61-886d-4273-97e9-eb2653c4aadc');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T04 Flexible', 'Tutorial', 3, 11, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, '223540d8-80d2-4f7c-af30-8878d1f33ebf', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T04 Flexible extra 1', 'Tutorial', 3, 11, 12, '{2,3,4}', '49-316', 2, '96e46f76-3005-4127-897c-3f29a32c8fb4', '8046ee18-243f-4b89-93f2-ad56a63f133f', '223540d8-80d2-4f7c-af30-8878d1f33ebf');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T06 Flexible', 'Tutorial', 4, 9, 10, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T06 Flexible extra 1', 'Tutorial', 4, 9, 10, '{2,3,4}', '49-316', 2, '00e04873-99fd-4c81-bcc6-aca2afec13a4', '8046ee18-243f-4b89-93f2-ad56a63f133f', '9971d3c3-0f3a-4db9-ad49-b46c30c3f78e');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T07 Flexible', 'Tutorial', 4, 10, 11, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, 'faa81413-01cb-4278-abb0-9a5d21fd787c', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T07 Flexible extra 1', 'Tutorial', 4, 10, 11, '{2,3,4}', '49-316', 2, 'dd8c95b9-37e8-429f-85de-d98a250b5786', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'faa81413-01cb-4278-abb0-9a5d21fd787c');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T09 Flexible', 'Tutorial', 4, 11, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, 'eab84561-b65f-45a1-aa8a-12049f805ef8', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T09 Flexible extra 1', 'Tutorial', 4, 11, 12, '{2,3,4}', '49-316', 2, 'f27cd5b4-e1b8-402a-b783-c01218d5a37e', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'eab84561-b65f-45a1-aa8a-12049f805ef8');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T10 Flexible', 'Tutorial', 4, 12, 13, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T10 Flexible extra 1', 'Tutorial', 4, 12, 13, '{2,3,4}', '49-316', 2, 'ce98fbbc-1fac-4a01-83c8-b2860ebcd9e8', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'a7e61620-32f3-4e3b-9a1c-ed2bbb054867');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T12 Flexible', 'Tutorial', 4, 13, 14, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, '50782cea-d08c-40c0-9e6d-a4456e60fdb7', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T12 Flexible extra 1', 'Tutorial', 4, 13, 14, '{2,3,4}', '49-316', 2, 'b092efee-3af3-42e7-b4d5-2abab8c67e00', '8046ee18-243f-4b89-93f2-ad56a63f133f', '50782cea-d08c-40c0-9e6d-a4456e60fdb7');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T13 Flexible', 'Tutorial', 4, 17, 18, '{2,3,4,5,6,7,8,10,11,12,13,14}', '49-316', 2, '9d274fa3-53e4-49ed-a3c0-19026c3163af', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T13 Flexible extra 1', 'Tutorial', 4, 17, 18, '{2,3,4}', '49-316', 2, 'c42dcbd3-e629-46dc-ab96-5f08b705c0b3', '8046ee18-243f-4b89-93f2-ad56a63f133f', '9d274fa3-53e4-49ed-a3c0-19026c3163af');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T01 External', 'Tutorial', 1, 16, 17, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, '84f748b3-f559-4862-afce-da754895aed0', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T01 External extra 1', 'Tutorial', 1, 16, 17, '{2,3,4}', 'Online', 2, '0ebcf551-5499-4b4a-8a52-17e563bfc706', '8046ee18-243f-4b89-93f2-ad56a63f133f', '84f748b3-f559-4862-afce-da754895aed0');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T02 External', 'Tutorial', 3, 11, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, 'e54f0287-ddf0-48ed-beff-7552193bb314', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T02 External extra 1', 'Tutorial', 3, 11, 12, '{2,3,4}', 'Online', 2, '1d05bf71-64a1-4372-995f-d1c8628c360a', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'e54f0287-ddf0-48ed-beff-7552193bb314');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T04 External', 'Tutorial', 4, 11, 12, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, '1464c2aa-b832-4308-a792-03e09d68fe88', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T04 External extra 1', 'Tutorial', 4, 11, 12, '{2,3,4}', 'Online', 2, 'eb3a343f-b6fc-4f65-ab53-40401196c127', '8046ee18-243f-4b89-93f2-ad56a63f133f', '1464c2aa-b832-4308-a792-03e09d68fe88');
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T03 External', 'Tutorial', 4, 9, 10, '{2,3,4,5,6,7,8,10,11,12,13,14}', 'Online', 2, 'a4509284-499a-4420-80f7-afffa0bd6de6', '8046ee18-243f-4b89-93f2-ad56a63f133f', NULL);
INSERT INTO public.session_stream (name, type, day, "startTime", "endTime", weeks, location, "numberOfStaff", id, "timetableId", "basedId") VALUES ('T03 External extra 1', 'Tutorial', 4, 9, 10, '{2,3,4}', 'Online', 2, '872d100e-16e5-4def-9692-5e3685946a61', '8046ee18-243f-4b89-93f2-ad56a63f133f', 'a4509284-499a-4420-80f7-afffa0bd6de6');


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

INSERT INTO public.term (type, year, "weekNames", "startDate", "endDate", id, "isActive") VALUES ('Semester 2', 2020, '{O-Week,"Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8",Break,"Week 9","Week 10","Week 11","Week 12",Examination,Examination,Examination}', '2020-07-29 10:00:00', '2020-11-21 10:00:00', 'dbb58294-376f-49de-8cd7-459ef58df359', false);
INSERT INTO public.term (type, year, "weekNames", "startDate", "endDate", id, "isActive") VALUES ('Semester 1', 2021, '{O-Week,"Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8",Break,"Week 9","Week 10","Week 11","Week 12","Week 13",Examination,Examination,Examination}', '2021-02-21 10:00:00', '2021-06-21 10:00:00', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', true);


--
-- Data for Name: timeslot; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 8, 11, '4a3bc50b-6b97-42f9-b3dd-1b17bfdd1a84', '2c695967-3ea7-4c0b-bfb7-59620c8cc889');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 9, 18, '325b6cf0-ff86-4866-8ce4-52b0da351959', '2c695967-3ea7-4c0b-bfb7-59620c8cc889');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 12, 16, 'c95661f1-77d6-49ac-8ed8-75566d2e59ac', '2c695967-3ea7-4c0b-bfb7-59620c8cc889');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 9, 18, '6df59f9d-b823-49c3-956e-867457aa57c4', '2c695967-3ea7-4c0b-bfb7-59620c8cc889');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 9, 18, '4ce72c11-ae28-49e9-b457-467e4d3ba6a7', '2c695967-3ea7-4c0b-bfb7-59620c8cc889');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 9, 18, 'e4f69a53-588f-45c0-a763-9e547d954ad3', '2c695967-3ea7-4c0b-bfb7-59620c8cc889');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 8, 18, 'a2046386-b15b-47a9-87cc-e67658e067de', '7cf88095-d09a-4be3-8ec3-5be454f4f477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 18, 'd574fa07-8164-414e-aaa9-ae33148cc5d3', '7cf88095-d09a-4be3-8ec3-5be454f4f477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 8, 18, 'efaf7e6e-0fc5-404c-9f2f-94bfc4adbb11', '7cf88095-d09a-4be3-8ec3-5be454f4f477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 8, 18, 'ff605d83-24a2-437b-ab73-505843b6a0b1', '7cf88095-d09a-4be3-8ec3-5be454f4f477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 8, 18, '3d8a6f4f-e5ca-433a-b784-9fc15df69ca1', '7cf88095-d09a-4be3-8ec3-5be454f4f477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 10, 14, '1e789486-2658-4bbe-b075-e1c50a82a95d', '03886e63-79bd-41ad-a142-685e538dacb4');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 16, '3dd6ba7b-a85d-498c-9b91-e7051eccf584', '03886e63-79bd-41ad-a142-685e538dacb4');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 8, 10, '50ba934d-0d6f-4e10-b4b1-a60176823a21', '03886e63-79bd-41ad-a142-685e538dacb4');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 12, 16, '8c713d92-5504-4c4c-9e75-a91cd73c6e49', '03886e63-79bd-41ad-a142-685e538dacb4');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 14, 20, 'a9327cfc-6ad8-4870-81c8-02353cd90f1b', '03886e63-79bd-41ad-a142-685e538dacb4');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 7, 15, 'cc89c17f-797c-4856-9f81-236856c0e5fb', '6e4cbf72-d67e-4259-bf65-630a6eb1d477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 7, 19, '448330a8-3ed5-4d0b-bab2-17d2d9b24a74', '6e4cbf72-d67e-4259-bf65-630a6eb1d477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 7, 14, 'aff308d3-0d1a-4351-975a-d6b3d647e74c', '6e4cbf72-d67e-4259-bf65-630a6eb1d477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 17, 19, 'fcb2a90c-c66a-4f87-be3b-a31d8ba4ae59', '6e4cbf72-d67e-4259-bf65-630a6eb1d477');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 9, 13, '844814a3-39a1-4779-b9f4-65fa0d063c7a', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 16, 18, '8a82518d-7217-4aad-ac7b-439cf8c17d2f', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 9, 20, '2b4e1bba-f514-4311-8b93-051a45b37a62', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 9, 12, '03c26beb-9da0-4e12-aaec-6aad66ebc682', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 13, 20, '1fe28071-a11f-4c99-8e41-57a0b8045fb3', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 9, 20, '39799713-fed2-409a-905d-a37d738aad53', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 15, '410b662f-e318-4d60-af9c-8795027450ea', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 15, 17, '88f86c7a-0a24-4295-a53e-16b9dffdeeaf', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 8, 14, 'e7ae7fef-b40a-467b-86e5-fa4008ab873b', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 15, 17, '634d7cda-dd4f-4fe7-8d1f-9607525f36dd', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 17, 19, '1c9dde51-5521-4865-81de-83a2c9684b60', '242cbad3-d5b6-4f43-9b99-4b799c980ebd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 12, 16, 'c967deee-44a4-47a4-9192-3da67b287efb', '242cbad3-d5b6-4f43-9b99-4b799c980ebd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 12, 13, '344ee5a5-2a43-4ad4-ad1a-cac63e060d7b', '242cbad3-d5b6-4f43-9b99-4b799c980ebd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 9, 11, 'f2444abf-aed7-473e-95e7-5e52d89683cb', '242cbad3-d5b6-4f43-9b99-4b799c980ebd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 14, 19, 'ead84ebc-1471-4f44-94fa-51bd4141518f', '242cbad3-d5b6-4f43-9b99-4b799c980ebd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 9, 19, '00d281a4-bb1a-41ef-aa99-f57ed0fb7df7', '242cbad3-d5b6-4f43-9b99-4b799c980ebd');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 7, 10, '63817705-b29c-4e42-9551-37d183c93fcc', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 11, 20, '4b315791-4ebe-4555-9204-17a542e944fa', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 7, 10, 'd6bec4c2-1472-45f8-a41a-13a2fc326d7d', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 12, 14, '66750d27-d7fe-4db7-971f-d02bb06f04a7', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 16, 20, '1dbcbd0d-bbeb-411c-9d5e-3544f4b2ee7c', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 7, 11, '6385fc5a-4c5a-42f0-818a-cc40e1cbb182', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 13, 14, 'c3caa01f-28d0-4e51-aecf-25f1eda0aab9', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 7, 11, 'b7610b9d-3cc8-48d0-86e6-8dfdf24ae827', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 12, 14, '36a9c032-27b8-479c-8303-e5d5cc2bc925', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 7, 9, '870eadb9-51ca-4711-937a-aa1f7e32bd45', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 16, 20, '83c767e7-cefc-4bf0-8b6f-c5e8d8a9b340', 'fd506f28-69f7-4132-94f3-266e9870df33');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 10, 12, '79aaa6c7-9a3f-40fe-ad14-bee2c945e93b', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 13, 14, '2a981a93-ce79-4731-8afb-3e4169281d0f', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 9, 10, '1cde09e7-6cf7-4a27-8ce0-47423a952fb1', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 11, 14, 'bd6a47cb-e248-42dc-9e21-43723143667f', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 9, 10, '7695f5cb-e518-429b-8678-e3c8f490cce6', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 12, 14, '457e5074-8309-40d7-8125-d684f8f0e4d6', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 12, 13, '2a067cc4-4e25-4ab9-af74-bb24b0775d42', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 14, 16, '5e7f5d88-e6c6-4734-86c3-a470859d3ae2', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 10, 11, '78a18210-4dd5-48c1-8dd9-12cf10f9216d', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 13, 14, '3b16caed-daaa-4c3f-b9e5-2ecf7b3b4e74', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 13, 17, 'd43a896d-aab9-427c-985b-5dcdac98c2cd', '53ac4ab7-7c72-4129-a558-2e9d702a25cb');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 13, 16, 'c0fac480-46d0-47fe-bf1c-596902a3d1c5', '53ac4ab7-7c72-4129-a558-2e9d702a25cb');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 9, 12, 'e5212e03-66fe-40b4-b812-bcfcdbb35701', '53ac4ab7-7c72-4129-a558-2e9d702a25cb');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 9, 14, 'c3d86a12-09fc-4983-acc2-dc70ca7e35a0', '53ac4ab7-7c72-4129-a558-2e9d702a25cb');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 9, 17, 'e7d63abd-80db-404e-b743-2c28c169ee15', 'b97e746c-6cce-42d8-b851-33c71ca8e563');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 9, 17, 'fa467bae-e7c7-4777-a3a9-97a8469c190a', 'b97e746c-6cce-42d8-b851-33c71ca8e563');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 9, 11, '5710fff2-9893-4f9f-8bf9-c46efa7e85c8', 'b97e746c-6cce-42d8-b851-33c71ca8e563');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 14, 16, '07ce6328-f5aa-479f-b9c8-7e8de0cf25a8', 'b97e746c-6cce-42d8-b851-33c71ca8e563');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 9, 16, 'bd0127d2-78ce-4f59-b745-b81fab08796c', 'b97e746c-6cce-42d8-b851-33c71ca8e563');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 9, 14, '0a93e042-9e8a-4e71-967b-e47c5b946c54', 'b97e746c-6cce-42d8-b851-33c71ca8e563');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 7, 9, 'b60b7b8f-2ff1-4a03-86ce-6950653c5eb4', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 18, 20, '4c249dcf-9777-4b89-bd86-dce09d217c66', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 7, 20, '464fc01c-ea90-4d36-870d-fe0ab7ecea9b', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 7, 8, '37c05906-d58c-417d-bb3c-99fdd57cbee8', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 14, 20, '0036db73-b485-484e-acbe-1962859acf73', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 7, 10, '848d7d97-de05-460e-8a66-9d4c2629b7ae', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 12, 20, 'bb60f5af-ff51-4c16-beea-25baad7ee4e0', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 7, 15, 'a29c3965-975f-4d18-a21b-da92a29628b6', 'abbf094f-758c-4d84-b685-6b3ddab80cf1');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 7, 20, '311d207f-e41c-40ba-96c5-5cf94cf394fa', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 10, '2051b0b1-c22f-4452-9d89-cef48592eaf0', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 12, 16, '05cbf116-b97d-4e31-bedb-3fa8032750a4', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 7, 15, 'a40a6a58-9a66-4823-ba60-12ae24d1a7a7', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 16, 20, 'bd980168-13e4-4a6f-a37e-43ca3ceeaec2', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 7, 10, 'e235c949-0db6-432f-be3e-ff80c7d82daa', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 12, 14, '2887aeb3-396b-444b-833b-aad0ec8e9fa2', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 15, 20, '2a184fe6-17f3-4760-9b2c-c87b60c524a9', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 14, 20, '543180b7-7847-488e-803e-1bc6095eec97', '9be82e08-7a5a-4f67-9264-d96d6338f984');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 8, 14, '3a2295a3-b14f-45f1-aa70-42ddf35b7056', 'db75c78e-bdd7-40fe-8bbc-a05f810a7f47');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 12, 16, '3432eeb6-cf95-4f87-b359-1551e91377e2', 'db75c78e-bdd7-40fe-8bbc-a05f810a7f47');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 8, 17, '79713d7a-2e4a-4cec-95e1-9624739d43e4', 'db75c78e-bdd7-40fe-8bbc-a05f810a7f47');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 12, 16, 'a3006c33-875f-4f23-bea9-f92126618477', 'c0869562-3864-459a-8465-ac0eac89003c');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 10, 16, '836036b0-52d1-400d-bf0f-92e9d0d0550f', 'c0869562-3864-459a-8465-ac0eac89003c');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 13, 16, '2fad6a7f-2955-4963-8e5b-e16002c96a21', 'c0869562-3864-459a-8465-ac0eac89003c');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 12, 16, '90fc4d22-4982-40d4-9b85-5e9a0aef30d3', 'c0869562-3864-459a-8465-ac0eac89003c');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 10, 13, '0d17f071-e0c4-4464-bd34-968e1637d923', 'c0869562-3864-459a-8465-ac0eac89003c');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 14, 16, '26bfd82b-8126-4666-962b-e740c70a32b0', 'c0869562-3864-459a-8465-ac0eac89003c');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 14, 16, '94a9eeaa-dee4-4423-8a58-60a969fbefd9', '4a8a9c39-24f7-4fab-9da6-8ce9fd745d62');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 11, 16, '13366502-d4c6-48be-bf5c-67c89d03c283', '4a8a9c39-24f7-4fab-9da6-8ce9fd745d62');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 10, 12, '20df2a08-1847-4aae-97a5-cc00e3d7c58a', '4a8a9c39-24f7-4fab-9da6-8ce9fd745d62');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 10, '8a9b44a7-d12a-45db-8a35-18026abf89f7', 'c631f530-80aa-4684-ba5a-ce461d71084d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 12, 16, '77cb63e1-c82f-4cdc-933d-6f79c53aeda6', 'c631f530-80aa-4684-ba5a-ce461d71084d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 8, 14, '9c0f8c2d-4190-4499-85cd-7fce34fafd5a', 'c631f530-80aa-4684-ba5a-ce461d71084d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 8, 11, '3145ff23-f85c-4870-adc0-d2425b83829a', 'c631f530-80aa-4684-ba5a-ce461d71084d');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 8, 14, '99cae1b2-47be-430d-a1af-97a70bdf9737', '54f7915a-607d-497d-8801-01b7b961270a');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 16, 19, '1d605354-899b-40b2-ad26-6d80fae679b6', '54f7915a-607d-497d-8801-01b7b961270a');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 15, '50fc75db-dcf3-4573-a299-a560b18137ee', '54f7915a-607d-497d-8801-01b7b961270a');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 10, 18, '61e5da98-604c-4365-9bd7-cde9e782836f', '54f7915a-607d-497d-8801-01b7b961270a');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 8, 16, 'd7c6a8d6-28fa-46d1-b09d-8c8f1a7334e9', '54f7915a-607d-497d-8801-01b7b961270a');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 11, 18, '20236a2c-59ed-4ad3-adf8-c33c3e79266b', '54f7915a-607d-497d-8801-01b7b961270a');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 18, 20, '7ae68d1c-3e9d-4a76-bda6-2b1d8ac347aa', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 7, 10, 'd3878409-90ff-47fa-8a02-a1bbc1314432', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 17, 20, 'e6edc96f-00d6-46ec-af31-f3cedf00bb30', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 7, 9, '46cc22e8-612c-4537-aef7-21a26d219f09', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 14, 20, 'bf30707b-2f9c-445f-b752-6091a1bb086f', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 7, 14, 'cc2ea12f-d850-4abd-abd0-262d2d91fe9e', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 18, 20, '6930fe5d-a5d9-4527-b1bf-40f73b63c39c', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 7, 14, '18526789-587d-4644-b9d2-e10ea33e4ce9', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 18, 20, 'f03ced0c-996a-4dba-b381-38bf1a521e07', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 8, 14, '2ad3d90f-c0fb-44ab-ab38-58d7546e7995', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 16, 20, '8b5ff733-3fb0-4e38-ada2-7dac043ffbbe', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 8, 20, '69cd3981-e9e9-43b8-9cf9-9f82d6d00660', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 8, 10, '2398bb47-02de-4e2d-9157-364e05688518', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 12, 14, 'f94d6743-158f-4ef3-8b3a-90e2106bee07', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 17, 20, '34e81956-2d65-464d-bc0b-04b914f99ebf', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 14, 20, 'df19ab6a-d860-44a6-b247-0be166915b1e', '8a303a17-a00e-406b-81fe-fc1ffe8521be');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 10, 11, 'b22b7e46-ac23-4cde-8252-c5822607db2a', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 12, 13, 'b53b5f1d-3de0-4c52-8fc6-90f4cc03b2f4', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 10, 12, '901f2f95-3c62-4704-9478-41b2bf34d683', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 10, 12, '325fd0ad-463f-47b8-bf57-03204524b333', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 14, 18, 'd3617181-62aa-4fb9-936a-6d6fd8c6afa9', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 13, 16, 'b6a18054-5140-4095-b89b-0c29b1e1fac0', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 12, 16, 'cf882059-f47b-430b-854a-bfc400ce0962', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 10, 16, 'a00b0553-880a-447c-a193-637cf0102ebc', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 10, 12, 'a0b5aec2-1f4e-45c7-a4e7-ba17705c9e24', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 13, 16, '1ae8a2f6-1ec5-4418-915f-0f0313009876', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 12, 13, '34fac6d8-b26f-45e5-b134-f55482e33bbd', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 10, 13, 'fdca1036-e02b-4762-8416-81ee9e57cd4f', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 14, 16, 'fb8dbecf-798f-4399-8590-fd387634c40d', '82ebad48-e354-459f-8031-d6d482d5fa86');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 9, 11, '4edb4ccd-c546-45da-86d6-03d2bd99b9dd', '441364b8-ab97-4b65-97e6-cbd60a9780b2');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 14, 16, '85aa8fd1-2b91-4903-ad5e-d25a1261ca3c', '441364b8-ab97-4b65-97e6-cbd60a9780b2');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 9, 11, '5ea9ac70-48eb-402b-9a1f-296c98917c36', '441364b8-ab97-4b65-97e6-cbd60a9780b2');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 12, 14, '0dc8d86d-3585-463a-900b-a61dbd4aff93', '441364b8-ab97-4b65-97e6-cbd60a9780b2');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (4, 9, 12, '64bc5285-0c98-45a2-a391-fe66f6e213f8', '441364b8-ab97-4b65-97e6-cbd60a9780b2');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 14, 17, 'cbdfac90-c90a-43b9-9038-4a1d7388b795', '441364b8-ab97-4b65-97e6-cbd60a9780b2');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (1, 13, 17, '06820a19-460c-4927-957f-aa7951ac9ee3', '321c7d45-48c8-4e34-a316-be93e2c51bee');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 10, 11, 'b1ac76b1-6a05-4035-9eb4-c644beb103ec', '321c7d45-48c8-4e34-a316-be93e2c51bee');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (2, 14, 16, '53aa4834-5d2e-476e-8c07-6c935d93631e', '321c7d45-48c8-4e34-a316-be93e2c51bee');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 13, 14, '7b791fe9-41e8-4ff0-ad81-2c2124868940', '321c7d45-48c8-4e34-a316-be93e2c51bee');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (3, 15, 16, 'fa20e039-1e30-4cea-b5f4-3adaf60caa30', '321c7d45-48c8-4e34-a316-be93e2c51bee');
INSERT INTO public.timeslot (day, "startTime", "endTime", id, "userId") VALUES (5, 9, 16, '79fc58f7-c72a-4053-93a7-c213b355de64', '321c7d45-48c8-4e34-a316-be93e2c51bee');


--
-- Data for Name: timetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.timetable (id, "courseId", "termId", "permanentRequestLock", "temporaryRequestLock", "allocationToken") VALUES ('86b6d4b0-a8c5-4c42-8278-e649144f92b3', '4de5ca8e-0698-4a7d-9241-2cb9fc37b376', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', 'FREE', 'FREE', NULL);
INSERT INTO public.timetable (id, "courseId", "termId", "permanentRequestLock", "temporaryRequestLock", "allocationToken") VALUES ('8046ee18-243f-4b89-93f2-ad56a63f133f', '0a2e6669-f8aa-45e9-8aeb-7a92ed495871', '6a27f0f9-2c6c-478e-8088-ec7eb221a60d', 'FREE', 'FREE', '187031ae-209d-46a3-88c0-7eb248e76fa1');


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmnguy', 'Marvin Nguyen', 'marvin.nguyen@example.com', '52cbc02c-c5ac-401f-80ab-25eb8ff15f45', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjcrai', 'Jerry Craig', 'jerry.craig@example.com', '548c11f0-731d-4b94-bb1a-da788bb4d968', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjcrai1', 'Joe Craig', 'joe.craig@example.com', '2c695967-3ea7-4c0b-bfb7-59620c8cc889', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqdcarl', 'Don Carlson', 'don.carlson@example.com', '7cf88095-d09a-4be3-8ec3-5be454f4f477', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqspalm', 'Sue Palmer', 'sue.palmer@example.com', '03886e63-79bd-41ad-a142-685e538dacb4', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqcvasq', 'Cathy Vasquez', 'cathy.vasquez@example.com', '6e4cbf72-d67e-4259-bf65-630a6eb1d477', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqvhort', 'Vera Horton', 'vera.horton@example.com', 'c9ab8094-34ab-4223-ab61-77e6dad79c1d', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmstan', 'Michael Stanley', 'michael.stanley@example.com', '14d13548-ef30-4c14-b3b6-46cd8ae1aabd', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqbkenn', 'Bernice Kennedy', 'bernice.kennedy@example.com', '242cbad3-d5b6-4f43-9b99-4b799c980ebd', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmpham6', 'Nelson Brown', 'nelson.brown@example.com', '6cb0f404-349b-4f3c-b54e-0e16ba0f2c43', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmhowe', 'Mark Howell', 'mark.howell@example.com', 'fd506f28-69f7-4132-94f3-266e9870df33', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqdvarg', 'Danielle Vargas', 'danielle.vargas@example.com', '2dbda7f0-0ca2-46b7-ba8f-8f356ac3782e', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqafiel', 'Alfredo Fields', 'alfredo.fields@example.com', 'adcfba2f-b728-47d9-b7f3-a33dae7ca6e9', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqphaye', 'Paul Hayes', 'paul.hayes@example.com', '53ac4ab7-7c72-4129-a558-2e9d702a25cb', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjbowm', 'Jo Bowman', 'jo.bowman@example.com', 'b97e746c-6cce-42d8-b851-33c71ca8e563', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqsdixo', 'Sophia Dixon', 'sophia.dixon@example.com', 'abbf094f-758c-4d84-b685-6b3ddab80cf1', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqtolso', 'Terrance Olson', 'terrance.olson@example.com', '9be82e08-7a5a-4f67-9264-d96d6338f984', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqlrobi', 'Lawrence Robinson', 'lawrence.robinson@example.com', 'db75c78e-bdd7-40fe-8bbc-a05f810a7f47', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqswill', 'Sue Williams', 'sue.williams@example.com', 'c0869562-3864-459a-8465-ac0eac89003c', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmmyer', 'Marian Myers', 'marian.myers@example.com', '4a8a9c39-24f7-4fab-9da6-8ce9fd745d62', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqaowen', 'Amelia Owens', 'amelia.owens@example.com', 'c631f530-80aa-4684-ba5a-ce461d71084d', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjkell', 'Jamie Kelly', 'jamie.kelly@example.com', '54f7915a-607d-497d-8801-01b7b961270a', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqnpete', 'Nathaniel Peterson', 'nathaniel.peterson@example.com', '4cf129ab-e7e0-4e92-b0b0-e1f1a80ec350', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqabeck', 'Alberto Beck', 'alberto.beck@example.com', '8a303a17-a00e-406b-81fe-fc1ffe8521be', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqagard', 'Ashley Gardner', 'ashley.gardner@example.com', '3aa605c7-4d2c-4522-b455-00dd21f1d8fe', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjsutt', 'Judith Sutton', 'judith.sutton@example.com', '82ebad48-e354-459f-8031-d6d482d5fa86', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqzmill', 'Zachary Mills', 'zachary.mills@example.com', '441364b8-ab97-4b65-97e6-cbd60a9780b2', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqabail', 'Arnold Bailey', 'arnold.bailey@example.com', '321c7d45-48c8-4e34-a316-be93e2c51bee', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjlewi', 'Jeremy Lewis', 'jeremy.lewis@example.com', '07cbaafa-07d0-4701-bedd-7f29e3948452', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmreyn', 'Marlene Reynolds', 'marlene.reynolds@example.com', '46ecafda-4475-4052-b2d7-97be0e51b3b3', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqsfran', 'Stacy Franklin', 'stacy.franklin@example.com', '0b7c95da-0e0d-41cf-a1f3-8a0c7dd6e247', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqllane', 'Letitia Lane', 'letitia.lane@example.com', '4ed01478-5d16-41c0-b7db-dabb49f953b4', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqcphil', 'Carlos Phillips', 'carlos.phillips@example.com', '7395d7bd-74cb-477d-8319-7f9a5368203b', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjcrai12', 'Jeff Craig', 'jeff.craig@example.com', 'ba6d73af-1bcc-40a0-a3a3-40965487590b', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjharv', 'Jean Harvey', 'jean.harvey@example.com', '7de38723-3200-4bef-bca0-77149c327b33', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmturn', 'Marsha Turner', 'marsha.turner@example.com', '4973ac67-0124-4fac-b051-5cbe42aac24f', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqwhall', 'Walter Hall', 'walter.hall@example.com', '20af1544-1678-4ee3-a282-4c73d292a91d', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjalva', 'Juan Alvarez', 'juan.alvarez@example.com', '54dce136-3aca-4060-b993-ad95b69c067a', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqamay', 'Ashley May', 'ashley.may@example.com', 'a6e69c50-fcd7-48d9-a156-87eef8b77e50', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqahawk', 'Alfredo Hawkins', 'alfredo.hawkins@example.com', 'cd113b45-96a0-4f59-bf6a-44ca822e7135', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqmbarn', 'Maureen Barnes', 'maureen.barnes@example.com', 'c94707de-b44f-4b1d-9215-c4a57d11c157', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjholl', 'Jimmy Holland', 'jimmy.holland@example.com', 'c1ec1775-1fb9-405a-9f31-47844884e843', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjmcco', 'Jeremiah Mccoy', 'jeremiah.mccoy@example.com', '2beb55cb-a9be-4e20-abe4-69532a4e4a85', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqnnels', 'Nora Nelson', 'nora.nelson@example.com', '828dadcd-1717-4227-a9ad-4c074870d1ba', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjbrew', 'Justin Brewer', 'justin.brewer@example.com', 'f80a0add-42ce-421b-b2e8-d1e3770c9ac9', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqnshaw', 'Nelson Shaw', 'nelson.shaw@example.com', 'd23ce428-a745-4e7c-8f59-69462556fd42', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqasoto', 'Alfred Soto', 'alfred.soto@example.com', 'f2a45246-bb15-4ded-b41d-0df34359e8dc', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqgfraz', 'Gene Frazier', 'gene.frazier@example.com', '7cd50eaf-1c95-482a-970d-832f2184225b', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqkford', 'Kent Ford', 'kent.ford@example.com', '55a7224e-124e-4933-a712-bba6d69593e9', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqjpalm', 'Jenny Palmer', 'jenny.palmer@example.com', 'd6877cf8-2685-4f85-9816-af2f0618bd08', false, NULL);
INSERT INTO public."user" (username, name, email, id, "isAdmin", "settingsId") VALUES ('uqnbrow', 'Nelson Brown', 'nelson.brown@example.com', '4515930e-be87-4505-9ba4-8d5e73ff9841', false, NULL);


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

SELECT pg_catalog.setval('public.migrations_id_seq', 52, true);


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
    ADD CONSTRAINT "FK_e18308596f3076e9de1d80c6f51" FOREIGN KEY ("sessionStreamId") REFERENCES public.session_stream(id) ON DELETE CASCADE;


--
-- Name: session_stream FK_e5d1bede2546c0a492f77ae71ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_stream
    ADD CONSTRAINT "FK_e5d1bede2546c0a492f77ae71ec" FOREIGN KEY ("basedId") REFERENCES public.session_stream(id) ON DELETE CASCADE;


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
-- PostgreSQL database dump complete
--

