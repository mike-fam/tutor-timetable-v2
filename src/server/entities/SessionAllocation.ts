import { Column, Entity, ManyToOne, RelationId, Unique } from "typeorm";
import { User } from "./User";
import { Session } from "./Session";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { UserRelatedEntity } from "./UserRelatedEntity";
import { Utils } from "../utils/Util";
import { DataLoaderKey } from "../types/dataloaders";

@ObjectType()
@Entity()
@Unique(["session", "user"])
export class SessionAllocation
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity, UserRelatedEntity {
    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.sessionAllocations, {
        lazy: true,
    })
    session: Lazy<Session>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sessionAllocations, { lazy: true })
    user: Lazy<User>;

    @RelationId(
        (sessionAllocation: SessionAllocation) => sessionAllocation.session
    )
    @Column()
    sessionId: string;

    @RelationId(
        (sessionAllocation: SessionAllocation) => sessionAllocation.user
    )
    @Column()
    userId: string;

    public async getCourse(): Promise<Course> {
        const loaders = Utils.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Utils.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loaders = Utils.loaders;
        return await loaders.user.load(this.userId);
    }
}
