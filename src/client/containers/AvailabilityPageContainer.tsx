import React, { useState } from "react";
import { AvailabilityTimetableContainer } from "./AvailabilityTimetableContainer";
import { Map, Set } from "immutable";
import { AvailabilityContext } from "../utils/availability";
import { AvailabilityTimeslotType } from "../types/availability";
import { ContextMenu } from "../components/helpers/ContextMenu";
import { ContextMenuTrigger } from "../components/helpers/ContextMenuTrigger";
import { Box } from "@chakra-ui/react";
import { ContextMenuList } from "../components/helpers/ContextMenuList";
import { ContextMenuItem } from "../components/helpers/ContextMenuItem";

type Props = {};

export const AvailabilityPageContainer: React.FC<Props> = () => {
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
                    <Box w={300} h={300} bg="tomato" p={0}>
                        Right click here
                    </Box>
                </ContextMenuTrigger>
                <ContextMenuList>
                    <ContextMenuItem onClick={() => console.log("Option 1")}>
                        Option 1
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={() => console.log("Option 2")}
                        colorScheme="red"
                    >
                        Option 2
                    </ContextMenuItem>
                    <ContextMenuItem
                        onClick={(e) => console.log("Option 3")}
                        colorScheme="blue"
                    >
                        Option 3
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => console.log("Option 4")}>
                        Option 4
                    </ContextMenuItem>
                </ContextMenuList>
            </ContextMenu>
        </AvailabilityContext.Provider>
    );
};
