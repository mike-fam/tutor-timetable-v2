import React, { useContext, useMemo, useRef, useState } from "react";
import { Box, Center, Icon, VStack } from "@chakra-ui/react";
import { MdDragHandle } from "react-icons/md";
import {
    Props as SessionProps,
    Session,
} from "../components/timetable/Session";
import Draggable from "react-draggable";
import { ModificationType, ModifyTimeslotParams } from "../types/availability";
import {
    firstLineHeight,
    realGap,
    timeSlotHeight,
} from "../constants/timetable";
import { leftFillNum, modificationTypeToTheme } from "../utils/availability";
import {
    sessionStyleFromProps,
    TimetableSettingsContext,
} from "../utils/timetable";
import { ContextMenu } from "../components/helpers/ContextMenu";
import { ContextMenuTrigger } from "../components/helpers/ContextMenuTrigger";
import { ContextMenuList } from "../components/helpers/ContextMenuList";
import { ContextMenuItem } from "../components/helpers/ContextMenuItem";

type Props = SessionProps & {
    key?: number;
    updateSession: (sessionId: number, newProps: ModifyTimeslotParams) => void;
    removeSession: (sessionId: number) => void;
    restoreSession: (sessionId: number) => void;
    modificationType: ModificationType;
};

export const AvailabilitySession: React.FC<Props> = ({
    updateSession,
    removeSession,
    restoreSession,
    modificationType,
    ...props
}) => {
    const { top } = useMemo(() => sessionStyleFromProps(props), [props]);
    const { startTime, endTime } = props;
    const nodeRef = useRef(null);
    const [staticEndTime, setStaticEndTime] = useState(endTime);
    const { dayEndTime, dayStartTime } = useContext(TimetableSettingsContext);
    const theme = useMemo(() => {
        return modificationTypeToTheme(modificationType);
    }, [modificationType]);
    const removed = useMemo(() => {
        return (
            modificationType === ModificationType.REMOVED_MODIFIED ||
            modificationType === ModificationType.REMOVED
        );
    }, [modificationType]);
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Session {...props} theme={theme} opacity={removed ? 0.5 : 1}>
                    <VStack
                        spacing={0}
                        h="100%"
                        align="stretch"
                        justify="space-between"
                    >
                        <Center h={2}>
                            <Icon as={MdDragHandle} />
                        </Center>
                        <Draggable
                            axis="y"
                            onDrag={(_, dragData) => {
                                // Calculate relatively based on the CHANGING top pixel, because the
                                //  "anchor point" of the drag bar also changes as the top edge is dragged
                                const realTop = top - firstLineHeight - realGap;
                                const extendedTimeslotHeight =
                                    realGap + timeSlotHeight;
                                const pxToWholeHour =
                                    realTop % extendedTimeslotHeight;
                                const tenMinPx = timeSlotHeight / 6;
                                let newStartTime: number;
                                // Snap to 5 mins to whole hour
                                if (
                                    (pxToWholeHour - tenMinPx < 0 ||
                                        pxToWholeHour + tenMinPx + realGap >
                                            extendedTimeslotHeight) &&
                                    Math.abs(dragData.y) <= tenMinPx
                                ) {
                                    newStartTime = Math.round(startTime);
                                } else {
                                    // Drag normally
                                    newStartTime =
                                        startTime + dragData.y / timeSlotHeight;
                                }
                                updateSession(props.id, {
                                    // Limit free time to less than 15 mins
                                    startTime: Math.min(
                                        Math.max(newStartTime, dayStartTime),
                                        endTime - 0.25
                                    ),
                                });
                            }}
                            nodeRef={nodeRef}
                            // To snap drag bar in place
                            position={{
                                x: 0,
                                y: 0,
                            }}
                            disabled={removed}
                        >
                            <Box
                                position="absolute"
                                w="100%"
                                top={0}
                                h={2}
                                _hover={{
                                    cursor: "ns-resize",
                                }}
                                ref={nodeRef}
                            />
                        </Draggable>
                        <Box p={1} h="100%">
                            {`${leftFillNum(
                                Math.floor(startTime),
                                2
                            )}:${leftFillNum(
                                Math.floor((startTime % 1) * 60),
                                2
                            )}-${leftFillNum(
                                Math.floor(endTime),
                                2
                            )}:${leftFillNum(
                                Math.floor((endTime % 1) * 60),
                                2
                            )}`}
                        </Box>
                        <Center
                            h={2}
                            _hover={{
                                cursor: "ns-resize",
                            }}
                            ref={nodeRef}
                        >
                            <Icon as={MdDragHandle} />
                        </Center>
                        <Draggable
                            axis="y"
                            onDrag={(e, dragData) => {
                                // Calculate relatively based on the STATIC top pixel.
                                let newEndTime =
                                    staticEndTime + dragData.y / timeSlotHeight;
                                const newEndTimeMins = (newEndTime % 1) * 60;
                                if (
                                    newEndTimeMins < 10 ||
                                    newEndTimeMins > 50
                                ) {
                                    newEndTime = Math.round(newEndTime);
                                }
                                updateSession(props.id, {
                                    endTime: Math.min(
                                        Math.max(newEndTime, startTime + 0.25),
                                        dayEndTime
                                    ),
                                });
                            }}
                            onStop={() => {
                                setStaticEndTime(endTime);
                            }}
                            nodeRef={nodeRef}
                            // To snap drag bar in place
                            position={{
                                x: 0,
                                y: 0,
                            }}
                            disabled={removed}
                        >
                            <Box
                                position="absolute"
                                w="100%"
                                bottom={0}
                                h={2}
                                _hover={{
                                    cursor: "ns-resize",
                                }}
                                ref={nodeRef}
                            />
                        </Draggable>
                    </VStack>
                </Session>
            </ContextMenuTrigger>
            <ContextMenuList>
                <ContextMenuItem onClick={() => console.log("updating")}>
                    Update
                </ContextMenuItem>
                <ContextMenuItem
                    onClick={() => {
                        removed
                            ? restoreSession(props.id)
                            : removeSession(props.id);
                    }}
                    colorScheme={removed ? "green" : "red"}
                >
                    {removed ? "Restore" : "Delete"}
                </ContextMenuItem>
            </ContextMenuList>
        </ContextMenu>
    );
};
