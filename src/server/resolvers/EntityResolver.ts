import { Resolver } from "type-graphql";
import { Service } from "typedi";
import { UserModel } from "../models/UserModel";
import { TimetableModel } from "../models/TimetableModel";
import { CourseModel } from "../models/CourseModel";

@Service()
@Resolver({ isAbstract: true })
export abstract class EntityResolver {
    public constructor(
        protected courseModel: CourseModel,
        protected userModel: UserModel,
        protected timetableModel: TimetableModel
    ) {}
}
