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
};

export const WeekNav: React.FunctionComponent<Props> = ({
    weekNames,
    weeksNum,
    chooseWeek,
    chosenWeek,
    showAllWeeks = true,
    disabled = [],
}) => {
    return (
        <Tabs
            index={showAllWeeks ? chosenWeek + 1 : chosenWeek}
            onChange={(index) => {
                chooseWeek(showAllWeeks ? index - 1 : index);
            }}
        >
            <TabList flexWrap="wrap" justifyContent="center">
                {showAllWeeks && <Tab h="60px">All Weeks</Tab>}
                {range(weeksNum).map((index) => (
                    <Tab
                        h="60px"
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
