import { Button } from "@chakra-ui/react";
import { FC, useCallback, useContext, useMemo } from "react";
import {
    ModificationType,
    useUpdateAvailabilitiesMutation,
} from "../../generated/graphql";
import { useMutationWithError } from "../../hooks/useApolloHooksWithError";
import { AvailabilityContext } from "../../utils/availability";

type Props = {};

export const AvailabilitySubmitButton: FC<Props> = () => {
    const { timeslots, setTimeslots } = useContext(AvailabilityContext);
    const [updateAvailabilities, { loading: updateLoading }] =
        useMutationWithError(useUpdateAvailabilitiesMutation, {
            variables: {
                timeslots: timeslots.valueSeq().toArray(),
            },
        });
    const submitTimeslots = useCallback(async () => {
        try {
            const newTimeslots = await updateAvailabilities();
            if (newTimeslots.data) {
                setTimeslots((prev) => prev.clear());
                newTimeslots.data.updateAvailabilities.forEach((timeslot) => {
                    setTimeslots((prev) =>
                        prev.set(timeslot.id, {
                            ...timeslot,
                            modificationType: ModificationType.Unchanged,
                        })
                    );
                });
            }
        } catch (err) {
            console.error(err);
        }
    }, [setTimeslots, updateAvailabilities]);
    const modified = useMemo(() => {
        return (
            timeslots.size !==
            timeslots.filter(
                (timeslot) =>
                    timeslot.modificationType === ModificationType.Unchanged
            ).size
        );
    }, [timeslots]);

    return (
        <Button
            colorScheme="green"
            variant="solid"
            isLoading={updateLoading}
            onClick={() => {
                submitTimeslots();
            }}
            disabled={!modified}
        >
            Submit Changes
        </Button>
    );
};
