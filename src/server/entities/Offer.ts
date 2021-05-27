import { Field, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from "typeorm";
import { Lazy } from "../utils/query";
import { Session } from "./Session";
import { StaffRequest } from "./StaffRequest";
import { User } from "./User";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";

@ObjectType()
@Entity()
export class Offer extends CourseRelatedEntity {
    @Field(() => StaffRequest)
    @ManyToOne(() => StaffRequest, (staffRequest) => staffRequest.offers, {
        lazy: true,
        onDelete: "CASCADE",
    })
    request: Lazy<StaffRequest>;

    @RelationId((offer: Offer) => offer.request)
    requestId: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.offers, { lazy: true })
    user: Lazy<User>;

    @Field(() => [Session])
    @ManyToMany(() => Session, (session) => session.offerPreferences, {
        lazy: true,
        cascade: true,
    })
    @JoinTable()
    preferences: Lazy<Session[]>;

    public async getCourse(): Promise<Course> {
        const loaders = Offer.loaders;
        const request = await loaders.staffRequest.load(this.requestId);
        return await request.getCourse();
    }
}
