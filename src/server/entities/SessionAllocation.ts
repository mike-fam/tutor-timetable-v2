import { Entity, ManyToOne, RelationId, Unique } from "typeorm";
import { User } from "./User";
import { Session } from "./Session";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";

@ObjectType()
@Entity()
@Unique(["session", "user"])
export class SessionAllocation
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
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
    sessionId: string;

    @RelationId(
        (sessionAllocation: SessionAllocation) => sessionAllocation.user
    )
    userId: string;

    public async getCourse(): Promise<Course> {
        const loaders = SessionAllocation.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = SessionAllocation.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getTerm();
    }
}
