import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToOne, RelationId } from "typeorm";
import { User } from "./User";
import { Lazy } from "../utils/query";
import { BaseEntity } from "./BaseEntity";
import { Utils } from "../utils/Util";

@ObjectType()
@Entity()
export class UserSettings extends BaseEntity {
    @Field(() => User)
    @OneToOne(() => User, (user) => user.settings, { lazy: true })
    user: Lazy<User>;

    @RelationId((settings: UserSettings) => settings.user)
    @Column()
    userId: string;

    public async getOwner(): Promise<User> {
        const loaders = Utils.loaders;
        return await loaders.user.load(this.userId);
    }
}
