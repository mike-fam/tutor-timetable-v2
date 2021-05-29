import { Column, Entity, OneToMany, RelationId } from "typeorm";
import { Timetable } from "./Timetable";
import { Lazy } from "../utils/query";
import { Field, ObjectType } from "type-graphql";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { User } from "./User";

@ObjectType()
@Entity()
export class Course extends CourseRelatedEntity {
    @Field()
    @Column("varchar", { length: 20, unique: true })
    code: string;

    @Field()
    @Column("varchar", { length: 100 })
    title: string;

    @OneToMany(() => Timetable, (timetable) => timetable.course, { lazy: true })
    timetables: Lazy<Timetable[]>;

    @RelationId((course: Course) => course.timetables)
    timetableIds: string[];

    // TODO: FieldResolver
    // async getTimetables(loader: TimetableLoader) {
    //     return await loader.loadMany(this.timetableIds);
    // }

    public async canRead(user: User): Promise<boolean> {
        return true;
    }

    public async getCourse(): Promise<Course> {
        return this;
    }
}
