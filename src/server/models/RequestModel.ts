import { StaffRequest, User } from "../entities";
import { BaseModel } from "./BaseModel";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";
import { RequestStatus } from "../types/request";

export class RequestModel extends BaseModel<StaffRequest>() {
    protected static entityCls = StaffRequest;

    /**
     * A user can read a request if they are an admin OR
     * they share the same course as the request creator.
     * @param request The StaffRequest to check
     * @param user The user that wants to read the request.
     * @returns A PermissionState object.
     * @protected
     */
    protected static async canRead(
        request: StaffRequest,
        user: User
    ): Promise<PermissionState> {
        const course = await request.getCourse();
        const term = await request.getTerm();
        return { hasPerm: await user.isStaffOf(course, term) };
    }

    /**
     * A user can update a request if they are an admin
     * OR they created the request, in which case they can change the following fields:
     *  - Placeholder for now
     * OR they are the course coordinator and in the same course as the request creator, where they can change:
     *  - finaliser
     *  - status
     * @param request
     * @param updatedFields
     * @param user
     * @returns
     */
    protected static async canUpdate(
        request: StaffRequest,
        updatedFields: DeepPartial<StaffRequest>,
        user: User
    ): Promise<PermissionState> {
        const course = await request.getCourse();
        const term = await request.getTerm();

        // Makes sure the user is the same user that created the request.
        if (user.id === request.id) {
            // placeholder
            return { hasPerm: false };
        }
        // if user is course coordinator
        if (user.isCoordinatorOf(course, term)) {
            // If request is already closed, they cannot make changes.
            if (request.status === RequestStatus.CLOSED) {
                return {
                    hasPerm: false,
                    errMsg:
                        "The request is closed and cannot have any changes made to it.",
                };
            }
            // If finaliser field is not the same as the user.
            if (updatedFields.finaliser && updatedFields.finaliser !== user) {
                return {
                    hasPerm: false,
                    errMsg:
                        "You cannot set the finaliser as anyone except yourself.",
                };
            }
        }
        return { hasPerm: false };
    }

    // TODO
    protected static async canCreate(
        request: StaffRequest,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: false };
    }

    // TODO
    protected static async canDelete(
        request: StaffRequest,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: false };
    }
}
