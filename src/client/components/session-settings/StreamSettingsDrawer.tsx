import React, { FC } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { Form, Formik, FormikErrors } from "formik";
import { StreamInput } from "../../generated/graphql";
import { StreamSettingsDrawerContent } from "./StreamSettingsDrawerContent";
import { StreamAllocationDrawerContent } from "./StreamAllocationDrawerContent";
import { UserMap } from "../../hooks/useUsersOfCourse";

type Props = {
    isOpen: boolean;
    close: () => void;
    stream: Partial<StreamInput>;
    weekNames: string[];
    numberOfWeeks: number;
    onSave: (newState: Partial<StreamInput>) => any;
    deleteStreams: () => void;
    users: UserMap;
};

export const StreamSettingsDrawer: FC<Props> = ({
    isOpen,
    close,
    stream,
    weekNames,
    numberOfWeeks,
    onSave,
    deleteStreams,
    users,
}) => {
    return (
        <Drawer isOpen={isOpen} onClose={close} size="lg">
            <DrawerOverlay />
            <DrawerContent>
                <Formik<Partial<StreamInput>>
                    initialValues={stream}
                    validate={(values) => {
                        const errors: FormikErrors<typeof values> = {};
                        const { startTime, endTime } = values;
                        if (startTime && endTime) {
                            if (endTime <= startTime) {
                                const message =
                                    "Start time must be before end time";
                                errors.startTime = message;
                                errors.endTime = message;
                            } else if (endTime - startTime < 0.25) {
                                const message =
                                    "Start time and end time must be at least 15 minutes apart";
                                errors.startTime = message;
                                errors.endTime = message;
                            }
                        }
                        return errors;
                    }}
                    onSubmit={(value) => {
                        onSave(value);
                        close();
                    }}
                >
                    <Form>
                        <DrawerCloseButton />
                        <DrawerHeader>Edit Session Stream</DrawerHeader>

                        <DrawerBody maxH="85vh" overflow="auto">
                            <Tabs isFitted variant="enclosed">
                                <TabList mb="1em">
                                    <Tab>Settings</Tab>
                                    <Tab>Allocation</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <StreamSettingsDrawerContent
                                            stream={stream}
                                            weekNames={weekNames}
                                            numberOfWeeks={numberOfWeeks}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <StreamAllocationDrawerContent
                                            stream={stream}
                                            weekNames={weekNames}
                                            users={users}
                                        />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </DrawerBody>

                        <DrawerFooter>
                            <HStack spacing={3} justify="end">
                                <Button variant="outline" onClick={close}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={() => {
                                        deleteStreams();
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button colorScheme="blue" type="submit">
                                    Save
                                </Button>
                            </HStack>
                        </DrawerFooter>
                    </Form>
                </Formik>
            </DrawerContent>
        </Drawer>
    );
};
