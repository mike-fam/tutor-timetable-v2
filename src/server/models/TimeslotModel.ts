import { BaseModel } from "./BaseModel";
import { Course, CourseStaff, Term, Timeslot, User } from "../entities";
import { PermissionState } from "../types/permission";
import { asyncMap, asyncSome } from "../../utils/array";
import { DataLoaders } from "../types/dataloaders";

export class TimeslotModel extends BaseModel<Timeslot> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Timeslot;
        this.loader = loaders.timeslot;
    }

    /**
     * A user can read a timeslot entry if EITHER
     * they are admin
     * OR
     * they are the owner of that timeslot
     * OR
     * they are the course coordinator of that owner
     * @param timeslot
     * @param user
     */
    protected async canRead(
        timeslot: Timeslot,
        user: User
    ): Promise<PermissionState> {
        const owner = await timeslot.getOwner();
        const staff = (await this.loaders.courseStaff.loadMany(
            owner.courseStaffIds
        )) as CourseStaff[];
        const courseTerm: [Course, Term][] = await asyncMap(
            staff,
            async (staff) => [await staff.getCourse(), await staff.getTerm()]
        );
        if (owner.id === user.id) {
            return { hasPerm: true };
        } else if (
            await asyncSome(
                courseTerm,
                async ([course, term]) =>
                    await user.isCoordinatorOf(course, term)
            )
        ) {
            return { hasPerm: true };
        }
        return { hasPerm: false };
    }

    /**
     * A user can update a timeslot if EITHER
     * They are admin
     * OR
     * They are the owner of the timeslot, AND
     *      * They cannot change the user of the timeslot
     * @param timeslot
     * @param updatedFields
     * @param user
     * @protected
     */
    protected async canUpdate(
        timeslot: Timeslot,
        updatedFields: Partial<Timeslot>,
        user: User
    ): Promise<PermissionState> {
        if (timeslot.userId !== user.id) {
            return { hasPerm: false };
        }
        if (updatedFields.userId && updatedFields.userId !== user.id) {
            return { hasPerm: false };
        }
        if (updatedFields.user && (await updatedFields.user).id !== user.id) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a timeslot if EITHER
     * they are admin
     * OR
     * they are the owner of that timeslot
     * @param timeslot
     * @param user
     * @protected
     */
    protected async canDelete(
        timeslot: Timeslot,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: timeslot.userId === user.id };
    }

    /**
     * A user can create a timeslot if EITHER
     * they are admin
     * OR
     * they are the owner of that timeslot
     * @param timeslot
     * @param user
     * @protected
     */
    protected async canCreate(
        timeslot: Timeslot,
        user: User
    ): Promise<PermissionState> {
        if (timeslot.userId && timeslot.userId !== user.id) {
            return { hasPerm: false };
        }
        if (timeslot.user && (await timeslot.user).id !== user.id) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }
}
