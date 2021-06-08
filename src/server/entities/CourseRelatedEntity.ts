import { Course } from "./Course";

export interface CourseRelatedEntity {
    getCourse(): Promise<Course>;
}
