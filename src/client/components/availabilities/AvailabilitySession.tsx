import { FC, useMemo, useRef, useState } from "react";
import { Box, Center, Icon, VStack } from "@chakra-ui/react";
import { MdDragHandle } from "react-icons/md";
import { Props as SessionProps, Session } from "../timetable/Session";
import Draggable from "react-draggable";
import { ModifyTimeslotParams } from "../../types/availability";
import {
    firstLineHeight,
    realGap,
    timetableTimeslotHeight,
} from "../../constants/timetable";
import { leftFillNum, modificationTypeToTheme } from "../../utils/availability";
import { sessionStyleFromProps } from "../../utils/timetable";
import { ContextMenu } from "../helpers/context-menu/ContextMenu";
import { ContextMenuTrigger } from "../helpers/context-menu/ContextMenuTrigger";
import { ContextMenuList } from "../helpers/context-menu/ContextMenuList";
import { ContextMenuItem } from "../helpers/context-menu/ContextMenuItem";
import { ModificationType } from "../../generated/graphql";

export type AvailabilityCustomSessionProps = {
    updateSession: (sessionId: string, newProps: ModifyTimeslotParams) => void;
    removeSession: (sessionId: string) => void;
    restoreSession: (sessionId: string) => void;
    editSession: (sessionId: string) => void;
    modificationType: ModificationType;
};

type Props = SessionProps<AvailabilityCustomSessionProps>;

export const AvailabilitySession: FC<Props> = (props) => {
    const { custom, sessionId } = props;
    const {
        updateSession,
        removeSession,
        restoreSession,
        modificationType,
        editSession,
    } = custom(sessionId);
    const { top } = useMemo(() => sessionStyleFromProps(props), [props]);
    const { startTime, endTime } = props;
    const nodeRef = useRef(null);
    const [staticEndTime, setStaticEndTime] = useState(endTime);
    const theme = useMemo(() => {
        return modificationTypeToTheme(modificationType);
    }, [modificationType]);
    const removed = useMemo(() => {
        return (
            modificationType === ModificationType.RemovedModified ||
            modificationType === ModificationType.Removed
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
                                    realGap + timetableTimeslotHeight;
                                const pxToWholeHour =
                                    realTop % extendedTimeslotHeight;
                                const tenMinPx = timetableTimeslotHeight / 6;
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
                                        startTime +
                                        dragData.y / timetableTimeslotHeight;
                                }
                                updateSession(props.sessionId, {
                                    // Limit free time to less than 15 mins
                                    startTime: Math.min(
                                        Math.max(newStartTime, props.startDay),
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
                                    staticEndTime +
                                    dragData.y / timetableTimeslotHeight;
                                const newEndTimeMins = (newEndTime % 1) * 60;
                                if (
                                    newEndTimeMins < 10 ||
                                    newEndTimeMins > 50
                                ) {
                                    newEndTime = Math.round(newEndTime);
                                }
                                updateSession(props.sessionId, {
                                    endTime: Math.min(
                                        Math.max(newEndTime, startTime + 0.25),
                                        props.endDay
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
                <ContextMenuItem
                    onClick={() => editSession(props.sessionId)}
                    disabled={removed}
                >
                    Update
                </ContextMenuItem>
                <ContextMenuItem
                    onClick={() => {
                        removed
                            ? restoreSession(props.sessionId)
                            : removeSession(props.sessionId);
                    }}
                    colorScheme={removed ? "green" : "red"}
                >
                    {removed ? "Restore" : "Delete"}
                </ContextMenuItem>
            </ContextMenuList>
        </ContextMenu>
    );
};
