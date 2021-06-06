import { BaseModel } from "./BaseModel";
import { SessionStream, Timetable, User } from "../entities";
import { PermissionState } from "../types/permission";
import { Utils } from "../utils/Util";
import { Service } from "typedi";

@Service()
export class SessionStreamModel extends BaseModel<SessionStream> {
    public constructor() {
        super();
        this.entityCls = SessionStream;
        this.loader = Utils.loaders.sessionStream;
    }

    /**
     * A user can read a preference entry if EITHER of these holds
     *
     * they are admin
     * OR
     * they are a staff member of the course the stream belongs to
     * @param stream
     * @param user
     * @protected
     */
    protected async canRead(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        if (!(await user.isStaffOf(course, term))) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can update a session stream if EITHER of these conditions holds
     *
     * They are admin
     * OR
     * They are the course coordinator of the session stream
     *
     * If they are the course coordinator, ALL of the following conditions apply
     *      * If the session stream is based on another stream, they cannot
     *          modify the startTime, endTime, day and type of that stream
     *          WITHOUT setting based to null first
     *      * They cannot change the timetable of the stream
     * @param stream
     * @param updatedFields
     * @param user
     * @protected
     */
    protected async canUpdate(
        stream: SessionStream,
        updatedFields: Partial<SessionStream>,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        if (
            updatedFields.timetableId &&
            updatedFields.timetableId !== stream.timetableId
        ) {
            return { hasPerm: false };
        }
        if (updatedFields.timetable) {
            const timetable = (await updatedFields.timetable) as Timetable;
            if (timetable.id !== stream.timetableId) {
                return { hasPerm: false };
            }
        }
        if (stream.basedId) {
            if (updatedFields.basedId === null) {
                return { hasPerm: true };
            }
            if (
                updatedFields.startTime &&
                updatedFields.startTime !== stream.startTime
            ) {
                return {
                    hasPerm: false,
                    errMsg:
                        "You cannot change the start time of a based stream",
                };
            }
            if (
                updatedFields.endTime &&
                updatedFields.endTime !== stream.endTime
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the end time of a based stream",
                };
            }
            if (updatedFields.type && updatedFields.type !== stream.type) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the type of a based stream",
                };
            }
            if (updatedFields.day && updatedFields.day !== stream.day) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the day of a based stream",
                };
            }
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a stream if EITHER
     * they are admin
     * OR
     * they are course coordinator of the course and term of that stream
     * @param stream
     * @param user
     * @protected
     */
    protected async canDelete(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        return {
            hasPerm: await user.isCoordinatorOf(course, term),
        };
    }

    /**
     * A user can create a session stream if EITHER
     * they are admin
     * OR
     * they are course coordinator of the course and term of that stream AND
     * IF the stream is based
     * @param stream
     * @param user
     * @protected
     */
    protected async canCreate(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        let timetable: Timetable;
        if (stream.timetableId) {
            timetable = await Utils.loaders.timetable.load(stream.timetableId);
        } else {
            timetable = await stream.timetable;
        }
        const course = await timetable.getCourse();
        const term = await timetable.getTerm();
        return { hasPerm: await user.isCoordinatorOf(course, term) };
    }
}
