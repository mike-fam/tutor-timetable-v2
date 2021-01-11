import React, { useState } from "react";
import { AvailabilityTimetableContainer } from "./AvailabilityTimetableContainer";
import { Map, Set } from "immutable";
import { AvailabilityContext } from "../utils/availability";
import { AvailabilityTimeslotType, TempTimeslot } from "../types/availability";
import { ContextMenu } from "../components/helpers/ContextMenu";
import { ContextMenuTrigger } from "../components/helpers/ContextMenuTrigger";
import { Box } from "@chakra-ui/react";
import { ContextMenuList } from "../components/helpers/ContextMenuList";
import { ContextMenuItem } from "../components/helpers/ContextMenuItem";
import { log } from "util";

type Props = {};

export const AvailabilityPageContainer: React.FC<Props> = ({}) => {
    const [existingTimeslots, setExistingTimeslots] = useState(
        Map<number, AvailabilityTimeslotType>()
    );
    const [tempRemovedTimeslots, setTempRemovedTimeslots] = useState(
        Set<number>()
    );
    return (
        <AvailabilityContext.Provider
            value={{
                existingTimeslots,
                tempRemovedTimeslots,
                setExistingTimeslots,
                setTempRemovedTimeslots,
            }}
        >
            <AvailabilityTimetableContainer />
            <ContextMenu>
                <ContextMenuTrigger>
                    <Box w={300} h={300} bg="tomato" p={0} />
                </ContextMenuTrigger>
                <ContextMenuList>
                    <ContextMenuItem
                        onClick={(e) => console.log(e.clientX, e.clientY)}
                    >
                        Option 1
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={(e) => console.log(e.clientX, e.clientY)}
                        colorScheme="red"
                    >
                        Option 2
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={(e) => console.log(e.clientX, e.clientY)}
                        colorScheme="blue"
                    >
                        Option 3
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => {}}>
                        Option 4
                    </ContextMenuItem>
                </ContextMenuList>
            </ContextMenu>
        </AvailabilityContext.Provider>
    );
};
