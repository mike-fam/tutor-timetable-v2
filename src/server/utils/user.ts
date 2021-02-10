import { User } from "../entities";
import { redacted } from "../constants";

export const getOrCreateUsersByUsernames = async (
    usernames: string[]
): Promise<User[]> => {
    if (usernames.length === 0) {
        return [];
    }
    const existingUsers = await User.find({
        where: usernames.map((username) => ({
            username,
        })),
    });
    const remainingUsernames = usernames.filter(
        (username) =>
            !existingUsers.map((user) => user.username).includes(username)
    );
    const newUsers = await User.save(
        User.create(
            remainingUsernames.map((username) => ({
                username,
                name: redacted,
                email: redacted,
            }))
        )
    );
    return [...existingUsers, ...newUsers];
};
