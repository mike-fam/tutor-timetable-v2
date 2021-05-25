import { CourseRelatedEntity } from "../entities/CourseRelatedEntity";
import DataLoader from "dataloader";
import { ObjectType } from "typeorm";

export const getLoader = <T extends typeof CourseRelatedEntity>(type: T) => {
    return new DataLoader((ids: readonly string[]) => {
        return type.findByIds(["1"]);
    });
};

export const createUserLoader = <T extends CourseRelatedEntity>(
    type: ObjectType<T>
): DataLoader<string, T> =>
    new DataLoader<string, T>(async (ids) => {
        const objects: T[] = await (type as any).findByIds(ids as string[]);
        const objectMap: Record<string, T> = {};
        objects.forEach((u) => {
            objectMap[u.id] = u;
        });
        return ids.map((id) => objectMap[id]);
    });
