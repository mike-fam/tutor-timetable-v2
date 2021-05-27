import { Column, Entity, OneToMany, RelationId } from "typeorm";
import { Timetable } from "./Timetable";
import { Lazy } from "../utils/query";
import { Field, ObjectType } from "type-graphql";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { User } from "./User";
import { Permission } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";
import { Term } from "./Term";

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

    // TODO maybe inject loaders into superclass
    private loaders: DataLoaders;

    public async hasPermission(
        user: User,
        permission: Permission
    ): Promise<boolean> {
        let activeTerm;
        try {
            activeTerm = await Term.findOneOrFail({
                isActive: true,
            });
        } catch (e) {
            throw new Error("No active term");
        }
        if (permission === Permission.READ) {
            return true;
        } else if (permission === Permission.UPDATE) {
            return user.isCoordinatorOf(this, activeTerm);
        }
        return super.hasPermission(user, permission);
    }

    public async getCourse(): Promise<Course> {
        return this;
    }
}
