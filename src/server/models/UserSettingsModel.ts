import { BaseModel } from "./BaseModel";
import { User, UserSettings } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

export class UserSettingsModel extends BaseModel<UserSettings> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = UserSettings;
        this.loader = loaders.userSettings;
    }

    /**
     * A user can read a user settings if they are admin or are the owner of the
     * settings entry
     * @param settings
     * @param user
     * @protected
     */
    protected async canRead(
        settings: UserSettings,
        user: User
    ): Promise<PermissionState> {
        return {
            hasPerm: settings.userId === user.id,
        };
    }

    /**
     * A user can update the user settings if EITHER
     * they are admin
     * OR
     * they are the owner of the settings and they don't change the owner field
     * @param settings
     * @param updatedFields
     * @param user
     * @protected
     */
    protected async canUpdate(
        settings: UserSettings,
        updatedFields: Partial<UserSettings>,
        user: User
    ): Promise<PermissionState> {
        if (settings.userId !== user.id) {
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
     * Only admins can delete user settings
     * @param toDelete
     * @param user
     * @protected
     */
    protected async canDelete(
        toDelete: UserSettings,
        user: User
    ): Promise<PermissionState> {
        return super.canDelete(toDelete, user);
    }

    /**
     * Only admins can create user settings
     * @param toCreate
     * @param user
     * @protected
     */
    protected async canCreate(
        toCreate: UserSettings,
        user: User
    ): Promise<PermissionState> {
        return super.canCreate(toCreate, user);
    }
}
