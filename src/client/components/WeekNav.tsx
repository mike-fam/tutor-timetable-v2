import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import range from "lodash/range";

type Props = {
    showAllWeeks?: boolean;
    weekNames: Array<string>;
    weeksNum: number;
    chosenWeek: number;
    chooseWeek: React.Dispatch<React.SetStateAction<number>>;
    disabled?: number[];
    tabSize?: "sm" | "md" | "lg";
};

export const WeekNav: React.FunctionComponent<Props> = ({
    weekNames,
    weeksNum,
    chooseWeek,
    chosenWeek,
    showAllWeeks = true,
    disabled = [],
    tabSize = "md",
}) => {
    return (
        <Tabs
            index={showAllWeeks ? chosenWeek + 1 : chosenWeek}
            onChange={(index) => {
                chooseWeek(showAllWeeks ? index - 1 : index);
            }}
            size={tabSize}
            mt={3}
        >
            <TabList flexWrap="wrap" justifyContent="center">
                {showAllWeeks && (
                    <Tab px={4} py={2}>
                        All Weeks
                    </Tab>
                )}
                {range(weeksNum).map((index) => (
                    <Tab
                        px={4}
                        py={2}
                        key={index}
                        isDisabled={disabled.includes(index)}
                    >
                        {weekNames[index] || `Week [${index}]`}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    );
};
