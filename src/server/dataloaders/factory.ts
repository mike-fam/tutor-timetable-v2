import { CourseRelatedEntity } from "../entities/CourseRelatedEntity";
import DataLoader from "dataloader";

export const getLoader = <T extends typeof CourseRelatedEntity>(type: T) => {
    return new DataLoader((ids: readonly string[]) => {
        return type.findByIds(["1"]);
    });
};
