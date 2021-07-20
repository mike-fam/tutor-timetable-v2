import React from "react";
import { StreamInput } from "../../generated/graphql";
import { Stack } from "@chakra-ui/react";
import { FormikBaseAllocation } from "./FormikBaseAllocation";
import { UserMap } from "../../hooks/useUsersOfCourse";
import { FormikExtraAllocations } from "./FormikExtraAllocations";

type Props = {
    stream: Partial<StreamInput>;
    weekNames: string[];
    users: UserMap;
};

export const StreamAllocationDrawerContent: React.FC<Props> = ({
    stream,
    weekNames,
    users,
}) => {
    return (
        <Stack>
            <FormikBaseAllocation
                name="baseStaffRequirement"
                weekNames={weekNames}
                users={users}
            />
            <FormikExtraAllocations
                name="extraStaffRequirement"
                weekNames={weekNames}
                users={users}
            />
        </Stack>
    );
};
