import React, { FC, MouseEvent, useMemo } from "react";
import {
    ClickableSession,
    Props as ClickableSessionProps,
} from "../timetable/ClickableSession";
import { PopoverSession } from "../timetable/PopoverSession";
import { TimetableStreamPopover } from "../timetable/TimetableStreamPopover";
import { BoxProps } from "@chakra-ui/react";
import { ContextMenu } from "../helpers/context-menu/ContextMenu";
import { ContextMenuList } from "../helpers/context-menu/ContextMenuList";
import { ContextMenuItem } from "../helpers/context-menu/ContextMenuItem";

export type SessionSettingsStyleProps = Omit<
    BoxProps,
    "onClick" | "_hover" | "id"
>;

export type StreamSettingsCustomSessionProps = {
    courseCode: string;
    baseAllocation: [number[], string[], number];
    extraAllocations: Array<[number[], string[], number]>;
    weekNames: string[];
    location: string;
    styles: SessionSettingsStyleProps;
    restoreStream: (streamId: string) => any;
    deleteStream: (streamId: string) => any;
    editStream: (streamId: string) => any;
    isDeleted: boolean;
};

type Props = ClickableSessionProps<StreamSettingsCustomSessionProps>;

export const SessionSettingsTimetableStream: FC<Props> = (props) => {
    const { custom, sessionId, name } = props;
    const {
        extraAllocations,
        location,
        courseCode,
        weekNames,
        baseAllocation,
        styles,
        restoreStream,
        deleteStream,
        editStream,
        isDeleted,
    } = useMemo(() => custom(sessionId), [custom, sessionId]);
    return (
        <ContextMenu>
            {({ openMenu }) => (
                <>
                    <PopoverSession
                        sessionComponent={
                            <ClickableSession
                                {...props}
                                {...styles}
                                p={1}
                                onContextMenu={(event: MouseEvent) => {
                                    event.preventDefault();
                                    openMenu(event.clientX, event.clientY);
                                }}
                            >
                                {name}
                            </ClickableSession>
                        }
                        popoverContent={
                            <TimetableStreamPopover
                                name={name}
                                courseCode={courseCode}
                                baseAllocation={baseAllocation}
                                customAllocation={extraAllocations}
                                weekNames={weekNames}
                                location={location}
                            />
                        }
                    />
                    <ContextMenuList>
                        <ContextMenuItem onClick={() => editStream(sessionId)}>
                            Edit
                        </ContextMenuItem>
                        {isDeleted ? (
                            <ContextMenuItem
                                onClick={() => restoreStream(sessionId)}
                                colorScheme="green"
                            >
                                Restore
                            </ContextMenuItem>
                        ) : (
                            <ContextMenuItem
                                onClick={() => deleteStream(sessionId)}
                                colorScheme="red"
                            >
                                Delete
                            </ContextMenuItem>
                        )}
                    </ContextMenuList>
                </>
            )}
        </ContextMenu>
    );
};
