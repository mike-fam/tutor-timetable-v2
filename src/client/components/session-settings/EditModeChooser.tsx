import { HStack, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { EditMode } from "../../types/session-settings";

type Props = {
    changeEditMode: (index: EditMode) => any;
};

export const EditModeChooser: FC<Props> = ({ changeEditMode }) => {
    return (
        <>
            <HStack spacing={4}>
                <Text fontWeight="bold" ml="auto" fontSize="lg">
                    Edit Mode
                </Text>
                <Tabs
                    variant="soft-rounded"
                    colorScheme="green"
                    onChange={(index) => changeEditMode(index)}
                >
                    <TabList>
                        <Tab>Settings</Tab>
                        <Tab>Allocation</Tab>
                    </TabList>
                </Tabs>
            </HStack>
        </>
    );
};
