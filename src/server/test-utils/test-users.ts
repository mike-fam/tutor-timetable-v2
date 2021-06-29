import { User } from "../entities";

let marvinN: User;
let jerryC: User;
let joeC: User;
let jerryL: User;

export const marvinNguyen = async () => {
    if (!marvinN) {
        marvinN = await User.findOneOrFail({ username: "uqmnguy" });
    }
    return marvinN;
};

export const jerryCraig = async () => {
    if (!jerryC) {
        jerryC = await User.findOneOrFail({ username: "uqjcrai" });
    }
    return jerryC;
};

export const joeCraig = async () => {
    if (!joeC) {
        joeC = await User.findOneOrFail({ username: "uqjcrai1" });
    }
    return joeC;
};

export const jerryLewis = async () => {
    if (!jerryL) {
        jerryL = await User.findOneOrFail({ username: "uqjlewi" });
    }
    return jerryL;
};
