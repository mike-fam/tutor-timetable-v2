import { registerEnumType } from "type-graphql";

export enum ModificationType {
    UNCHANGED,
    ADDED,
    MODIFIED,
    REMOVED,
    REMOVED_MODIFIED,
}

registerEnumType(ModificationType, {
    name: "ModificationType",
});
