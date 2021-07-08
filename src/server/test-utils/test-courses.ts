import { Course } from "../entities";

let csse1001Cache: Course;
let csse2002Cache: Course;

export const csse1001 = async () => {
    if (!csse1001Cache) {
        csse1001Cache = await Course.findOneOrFail({ code: "CSSE1001" });
    }
    return csse1001Cache;
};

export const csse2002 = async () => {
    if (!csse2002Cache) {
        csse2002Cache = await Course.findOneOrFail({ code: "CSSE2002" });
    }
    return csse2002Cache;
};
