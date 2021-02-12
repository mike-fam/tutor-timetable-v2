import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    Tabs,
} from "@chakra-ui/react";
import { CourseStaffForm } from "../../components/course-staff/CourseStaffForm";
import { Role } from "../../generated/graphql";
import { StaffSeniority } from "../../types/courseStaff";
import { Form, Formik } from "formik";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: {
        usernames: string[];
        role: Role;
        isNew: StaffSeniority;
    }) => void;
    loading: boolean;
};

export const AddCourseStaffModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onSubmit,
    loading,
}) => {
    const [isMultipleStaff, setIsMultipleStaff] = useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <Formik
                    initialValues={{
                        username: "",
                        role: Role.Staff,
                        isNew: StaffSeniority.EXPERIENCED,
                    }}
                    onSubmit={(values) => {
                        onSubmit({
                            ...values,
                            usernames: isMultipleStaff
                                ? values.username
                                      .split(",")
                                      .map((username) => username.trim())
                                : [values.username],
                        });
                    }}
                >
                    <Form>
                        <ModalHeader>Add Course Staff</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Tabs
                                index={+isMultipleStaff}
                                onChange={(value) =>
                                    setIsMultipleStaff(!!value)
                                }
                                size="md"
                                variant="enclosed"
                            >
                                <TabList>
                                    <Tab>Add single staff member</Tab>
                                    <Tab>Add multiple staff members</Tab>
                                </TabList>
                            </Tabs>
                            <CourseStaffForm
                                onSubmit={onSubmit}
                                multipleStaff={isMultipleStaff}
                                editable={true}
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                                isLoading={loading}
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};
