import { User } from "./User";

export interface UserRelatedEntity {
    getOwner(): Promise<User>;
}
