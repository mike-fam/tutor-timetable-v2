import { Button } from "@chakra-ui/react";
import React, { useCallback, useContext, useMemo } from "react";
import {
    AvailabilityModificationType,
    useUpdateAvailabilitiesMutation,
} from "../generated/graphql";
import { useMutationWithError } from "../hooks/useQueryWithError";
import { AvailabilityContext } from "../utils/availability";

type Props = {};

export const AvailabilitySubmitButton: React.FC<Props> = ({}) => {
    const { timeslots, setTimeslots } = useContext(AvailabilityContext);
    const [
        updateAvailabilities,
        { loading: updateLoading },
    ] = useMutationWithError(useUpdateAvailabilitiesMutation, {
        timeslots: timeslots.valueSeq().toArray(),
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
                            modificationType:
                                AvailabilityModificationType.Unchanged,
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
                    timeslot.modificationType ===
                    AvailabilityModificationType.Unchanged
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
