import { createMethodDecorator } from "type-graphql";
import { Permission } from "../types/permission";
import { CourseRelatedEntity } from "../entities/CourseRelatedEntity";
import { MyContext } from "../types/context";

export function CheckPermEntity(perm: Permission) {
    return createMethodDecorator(
        async ({ context }: { context: MyContext }, next) => {
            const user = context.req.user;
            // Get entity result
            const result = await next();

            // Throw error if result is not an entity obj or an array of entity objs
            if (
                !(
                    result instanceof CourseRelatedEntity ||
                    result instanceof Array
                )
            ) {
                throw new Error(
                    `Permission error: Expect an object type but got ${typeof result}`
                );
            }
            if (result instanceof CourseRelatedEntity) {
                if (await result.hasPermission(user, perm)) {
                    return result;
                }
            } else {
                // result is an array
                for (const object of result) {
                    // Error if not of type entity
                    if (!(object instanceof CourseRelatedEntity)) {
                        throw new Error(
                            `Permission error: Expect an object type but got ${typeof object}`
                        );
                    }
                    await object.hasPermission(user, perm);
                }
                return result;
            }
        }
    );
}
