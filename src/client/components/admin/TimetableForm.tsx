import { FC } from "react";
import { Form, Formik } from "formik";
import { FreezeState, TimetableInput } from "../../generated/graphql";
import { AdminEditMode } from "../../types/admin";
import { Button, VStack } from "@chakra-ui/react";
import { FormikSelect } from "../helpers/formik/FormikSelect";
import { defaultStr } from "../../constants";
import { sentenceCase } from "change-case";

type Props = {
    initialValues?: TimetableInput;
    submit: (values: TimetableInput) => void;
    editMode: AdminEditMode;
    loading?: boolean;
    courseOptions?: string[];
    termOptions?: string[];
    courseIdToText?: (courseId: string) => string;
    termIdToText?: (termId: string) => string;
};

export const TimetableForm: FC<Props> = ({
    initialValues,
    submit,
    editMode,
    loading = false,
    courseOptions = [],
    termOptions = [],
    courseIdToText = () => defaultStr,
    termIdToText = () => defaultStr,
}) => {
    return (
        <Formik<TimetableInput>
            initialValues={
                initialValues || {
                    courseId: "",
                    termId: "",
                    permanentRequestLock: FreezeState.Free,
                    temporaryRequestLock: FreezeState.Free,
                }
            }
            onSubmit={submit}
            enableReinitialize
        >
            <Form>
                <VStack spacing={4}>
                    <FormikSelect
                        name="courseId"
                        label="Course"
                        options={courseOptions}
                        optionToText={(val) => courseIdToText(String(val))}
                        isDisabled={editMode === "edit"}
                    />
                    <FormikSelect
                        name="termId"
                        label="Term"
                        options={termOptions}
                        optionToText={(val) => termIdToText(String(val))}
                        isDisabled={editMode === "edit"}
                    />
                    <FormikSelect
                        name="permanentRequestLock"
                        options={[
                            FreezeState.Free,
                            FreezeState.Lock,
                            FreezeState.ApprovalRequired,
                        ]}
                        optionToText={(val) => sentenceCase(val as string)}
                    />
                    <FormikSelect
                        name="temporaryRequestLock"
                        options={[
                            FreezeState.Free,
                            FreezeState.Lock,
                            FreezeState.ApprovalRequired,
                        ]}
                        optionToText={(val) => sentenceCase(val as string)}
                    />
                    <Button
                        type="submit"
                        isLoading={loading}
                        colorScheme="blue"
                        alignSelf="flex-start"
                    >
                        {editMode === "add" ? "Add" : "Save"} Timetable
                    </Button>
                </VStack>
            </Form>
        </Formik>
    );
};
