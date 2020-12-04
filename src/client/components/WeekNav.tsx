import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

type Props = {
    numOfWeeks: Array<number>;
};

// Placeholder content
export const WeekNav: React.FunctionComponent<Props> = (props: Props) => {
    console.log(props.numOfWeeks);

    return (
        <div>
            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>All Weeks</Tab>
                    {props.numOfWeeks.map((week, index) => (
                        <Tab key={index}>Week {week}</Tab>
                    ))}
                </TabList>
            </Tabs>
        </div>
    );
};
