import { Column, Entity, ManyToOne, RelationId, Unique } from "typeorm";
import { SessionStream } from "./SessionStream";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { Utils } from "../utils/Util";
import { DataLoaderKey } from "../types/dataloaders";

@ObjectType()
@Entity()
@Unique(["sessionStream", "user"])
export class StreamAllocation
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
    @Field(() => SessionStream)
    @ManyToOne(
        () => SessionStream,
        (sessionStream) => sessionStream.streamAllocations,
        { lazy: true }
    )
    sessionStream: Lazy<SessionStream>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.streamAllocations, { lazy: true })
    user: Lazy<User>;

    @RelationId((allocation: StreamAllocation) => allocation.sessionStream)
    @Column()
    sessionStreamId: string;

    @RelationId((allocation: StreamAllocation) => allocation.user)
    @Column()
    userId: string;

    public async getCourse(): Promise<Course> {
        const loaders = Utils.loaders;
        const stream = await loaders.sessionStream.load(this.sessionStreamId);
        return await stream.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Utils.loaders;
        const stream = await loaders.sessionStream.load(this.sessionStreamId);
        return await stream.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loaders = Utils.loaders;
        return await loaders.user.load(this.userId);
    }
}
