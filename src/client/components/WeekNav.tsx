import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import range from "lodash/range";

type Props = {
    weekNames: Array<string>;
    weeksNum: number;
    chosenWeek: number;
    chooseWeek: React.Dispatch<React.SetStateAction<number>>;
};

export const WeekNav: React.FunctionComponent<Props> = ({
    weekNames,
    weeksNum,
    chooseWeek,
    chosenWeek,
}) => {
    return (
        <Tabs
            index={chosenWeek + 1}
            onChange={(index) => {
                chooseWeek(index - 1);
            }}
        >
            <TabList flexWrap="wrap" justifyContent="center">
                <Tab h="60px">All Weeks</Tab>
                {range(weeksNum).map((index) => (
                    <Tab h="60px" key={index}>
                        {weekNames[index] || `Week [${index}]`}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    );
};
