import { registerEnumType } from "type-graphql";

export enum SessionType {
    Practical = "Practical",
    Tutorial = "Tutorial",
    Seminar = "Seminar",
    Lecture = "Lecture",
    Studio = "Studio",
}

registerEnumType(SessionType, {
    name: "SessionType",
    description: "Type of a session",
});
