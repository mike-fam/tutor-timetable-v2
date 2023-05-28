import { createContext } from "react";
import { firstLineHeight, realGap } from "../constants/timetable";
import { IsoDay, StackInfo, TimeRange } from "../../types/date";
import { Props as SessionProps } from "../components/timetable/Session";
import * as CSS from "csstype";
import { Set } from "immutable";
import { TimetableSettings, TimetableState } from "../types/timetable";
import {
    populateTreeDepth,
    populateTreeHeight,
    preOrderTraversal,
    Tree,
    TreeNode,
} from "../../utils/tree";
import { defaultInt, defaultStr } from "../constants";

type SessionStyle = {
    topPx: CSS.Property.Top<number>;
    heightPx: CSS.Property.Height<number>;
    top: number;
    height: number;
    display: CSS.Property.Display;
    width: CSS.Property.Width;
    left: CSS.Property.Left;
};

/**
 * Convert session properties to CSS properties in an object that's suitable for react styling
 *
 * @param {Omit<SessionProps, "name">} sessionProps properties of session to get
 *      style from
 * @returns {SessionStyle} Style information of session
 */
export const sessionStyleFromProps = <T>({
    startTime,
    endTime,
    startDay,
    endDay,
    stackSize,
    elemStackIndex,
    elemStackStart,
    elemStackWidth,
    longestBranchSize,
    splitBranchSize,
    timeslotHeight,
}: Omit<SessionProps<T>, "name" | "custom">): {
    topPx: CSS.Property.Top<number>;
    heightPx: CSS.Property.Height<number>;
    top: number;
    height: number;
    display: CSS.Property.Display;
    width: CSS.Property.Width;
    left: CSS.Property.Left;
} => {
    // Which time slot does this start from? 0th, 1st, 2nd or 3rd, etc.
    const relativeStart = Math.max(Math.min(startTime, endDay) - startDay, 0);

    // Which time slot does this end on? 0th, 1st, 2nd or 3rd, etc.
    const relativeEnd = Math.max(Math.min(endTime, endDay) - startDay, 0);

    // Top Pixel
    const top =
        firstLineHeight +
        realGap +
        relativeStart * timeslotHeight +
        Math.floor(relativeStart) * realGap;
    const sessionDuration = relativeEnd - relativeStart;
    const height =
        sessionDuration * timeslotHeight +
        Math.max(Math.ceil(sessionDuration - 1), 0) * realGap;
    const display = sessionDuration ? "block" : "none";
    const width = `(100% - ${(stackSize - 1) * realGap}px) * ${
        elemStackWidth / stackSize
    } + ${((stackSize - longestBranchSize) * realGap) / splitBranchSize}px`;
    const unitWidth = `(100% - ${(stackSize - 1) * realGap}px) / ${stackSize}`;
    const left = `calc(${elemStackIndex * realGap}px + (${unitWidth}) * ${
        longestBranchSize - splitBranchSize
    } + (${width}) * ${elemStackIndex - longestBranchSize + splitBranchSize})`;
    return {
        topPx: `${top}px`,
        heightPx: height,
        display,
        width: `calc(${width})`,
        left,
        top,
        height,
    };
};

/**
 * Return all ranges with clashed information
 * 2 ranges clash if a range starts later than the other's start, but earlier than its end.
 *
 * @param {TimeRange} ranges array of ranges. A range is an array with the
 *      structure [id, start, end]
 * @returns { {string: StackInfo} } object holding clashed info. Each value has the
 *     following structure
 *      {
 *          stacked: int,
 *          stackStart: int
 *          stackEnd: int
 *      }
 *      where stacked represents the number of ranges this range clashes with
 *      stackIndex represents the index of this range relative to its clashing
 *      range.
 */
export const getClashedRanges = (
    ranges: Array<TimeRange>
): { [key: string]: StackInfo } => {
    ranges.sort(({ start: start1, end: end1 }, { start: start2, end: end2 }) =>
        start1 - start2 !== 0 ? start1 - start2 : end2 - end1
    );
    const clashedTrees: Tree<TimeRange["id"]>[] = [];
    const result: { [key: string]: StackInfo } = {};
    const timeRangeIdToTreeNode: Map<
        TimeRange["id"],
        TreeNode<TimeRange["id"]>
    > = new Map();
    ranges.forEach(({ id, start }, index) => {
        const timeslotsBefore = ranges.slice(0, index).reverse();
        let clashedFound = false;
        const thisNode = new TreeNode(id);
        timeRangeIdToTreeNode.set(id, thisNode);
        for (const { id: otherId, end: otherEnd } of timeslotsBefore) {
            if (start < otherEnd) {
                // Found clash
                clashedFound = true;
                timeRangeIdToTreeNode.get(otherId)!.addChild(thisNode);
                break;
            }
        }
        if (!clashedFound) {
            clashedTrees.push(new Tree(thisNode));
        }
    });
    for (const tree of clashedTrees) {
        populateTreeHeight(tree);
        populateTreeDepth(tree);
        const treeHeight = tree.getRoot().getHeight()!;
        const stackSize = treeHeight + 1;
        for (const node of preOrderTraversal(tree)) {
            const longestBranchSize = node.getHeight()! + node.getDepth()! + 1;
            if (node.isRoot()) {
                result[node.getElement()] = {
                    stackSize,
                    elemStackIndex: 0,
                    elemStackStart: 0,
                    elemStackWidth: 1,
                    longestBranchSize,
                    splitBranchSize: stackSize,
                };
            } else {
                const parentStackInfo = result[node.getParent()!.getElement()];
                const parentStackEnd =
                    parentStackInfo.elemStackStart +
                    parentStackInfo.elemStackWidth;
                result[node.getElement()] = {
                    stackSize,
                    elemStackIndex: node.getDepth()!,
                    elemStackStart: parentStackEnd,
                    elemStackWidth:
                        node.getParent()!.getHeight()! === node.getHeight()! + 1
                            ? parentStackInfo.elemStackWidth
                            : (stackSize - parentStackEnd) /
                              (node.getHeight()! + 1),
                    longestBranchSize,
                    splitBranchSize:
                        node.getParent()!.getHeight()! === node.getHeight()! + 1
                            ? parentStackInfo.splitBranchSize
                            : node.getHeight()! + 1,
                };
            }
        }
    }
    return result;
};

export const TimetableContext = createContext<TimetableState>({
    chosenWeek: defaultInt,
    chosenCourses: Set<string>(),
    chosenTermId: defaultStr,
    chooseWeek: () => {},
    setChosenCourses: () => {},
    chooseTerm: () => {},
});

export const TimetableSettingsContext = createContext<TimetableSettings>({
    displayedDays: [
        IsoDay.MON,
        IsoDay.TUE,
        IsoDay.WED,
        IsoDay.THU,
        IsoDay.FRI,
        IsoDay.SAT,
        IsoDay.SUN,
    ],
    setDisplayedDays: () => {},
    dayStartTime: 7,
    dayEndTime: 20,
    setDayStartTime: () => {},
    setDayEndTime: () => {},
    displayMySessionsOnly: false,
    setDisplayMySessionsOnly: () => {},
});
