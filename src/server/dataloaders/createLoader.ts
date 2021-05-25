import { BaseEntity } from "../entities/BaseEntity";
import DataLoader from "dataloader";
import { ObjectType } from "typeorm";

export const createLoader = <T extends BaseEntity>(
    type: ObjectType<T>
): DataLoader<BaseEntity["id"], T> =>
    new DataLoader<string, T>(async (ids) => {
        const objects: T[] = await (type as any).findByIds(ids as string[]);
        const objectMap: Record<string, T> = {};
        objects.forEach((u) => {
            objectMap[u.id] = u;
        });
        return ids.map((id) => objectMap[id]);
    });
