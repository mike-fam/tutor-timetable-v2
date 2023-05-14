import { Term } from "../entities";
import { TermType } from "../types/term";

let semTwo2020Cache: Term;
let semOne2021Cache: Term;

export const semTwo2020 = async () => {
    if (!semTwo2020Cache) {
        semTwo2020Cache = await Term.findOneOrFail({
            where: {
                type: TermType.SEMESTER_2,
                year: 2020,
            },
        });
    }
    return semTwo2020Cache;
};

export const semOne2021 = async () => {
    if (!semOne2021Cache) {
        semOne2021Cache = await Term.findOneOrFail({
            where: {
                type: TermType.SEMESTER_1,
                year: 2021,
            },
        });
    }
    return semOne2021Cache;
};
