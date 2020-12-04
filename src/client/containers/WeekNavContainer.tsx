import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

type Props = {};

// Placeholder content
export const WeekNavContainer: React.FunctionComponent<Props> = () => {
    return (
        <div>
            <Tabs defaultIndex={1}>
                <TabPanels>
                    <TabPanel>
                        <p>All Weeks</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Week 1</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Week 2</p>
                    </TabPanel>
                </TabPanels>
                <TabList>
                    <Tab>All Weeks</Tab>
                    <Tab>Week 1</Tab>
                    <Tab>Week 2</Tab>
                </TabList>
            </Tabs>
        </div>
    );
};
