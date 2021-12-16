import { FC } from "react";
import { Form, Formik } from "formik";
import { TermInput, TermType } from "../../generated/graphql";
import { AdminEditMode } from "../../types/admin";
import { Button, Switch, VStack } from "@chakra-ui/react";
import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";
import { FormikSelect } from "../helpers/formik/FormikSelect";
import { sentenceCase } from "change-case";
import { FormikNumberInput } from "../helpers/formik/FormikNumberInput";
import { FormikDateRangeInput } from "../helpers/formik/FormikDateRangeInput";
import { FormikArrayInput } from "../helpers/formik/FormikArrayInput";
import identity from "lodash/identity";
import { FormikCheckbox } from "../helpers/formik/FormikCheckbox";
import addWeeks from "date-fns/addWeeks";
import format from "date-fns/format";
import { isDateValid } from "../../../utils/date";
import { WeekCarousel } from "./WeekCarousel";

type Props = {
    initialValues: TermInput;
    submit: (values: TermInput) => void;
    editMode: AdminEditMode;
    loading?: boolean;
};

export const TermForm: FC<Props> = ({
    initialValues,
    submit,
    editMode,
    loading = false,
}) => {
    return (
        <Formik<TermInput>
            initialValues={initialValues}
            onSubmit={submit}
            enableReinitialize
        >
            {({ values }) => (
                <Form>
                    <VStack spacing={4}>
                        <FormikSelect
                            name="type"
                            label="Term Type"
                            options={[
                                TermType.Semester_1,
                                TermType.Semester_2,
                                TermType.SummerSemester,
                                TermType.Trimester_1,
                                TermType.Trimester_2,
                                TermType.Trimester_3,
                            ]}
                            optionToText={(val) => sentenceCase(val as string)}
                        />
                        <FormikNumberInput name="year" />
                        <FormikDateRangeInput
                            nameFrom="startDate"
                            nameTo="endDate"
                            label="Start and End Dates"
                            wholeWeeksOnly
                            dateFormat="dd MMM yyyy"
                        />
                        <FormikArrayInput<string>
                            name="weekNames"
                            label="Week Names"
                            strToValue={identity}
                            valueToStr={identity}
                            defaultValue={(index) => `Week ${index}`}
                            columns={3}
                            helpText={(value, index) => {
                                const dateFormat = "dd MMM yyyy";
                                if (
                                    !isDateValid(values.startDate) ||
                                    !isDateValid(values.endDate)
                                ) {
                                    return void 0;
                                }
                                const startOfWeek = addWeeks(
                                    startOfISOWeek(values.startDate),
                                    index
                                );
                                const endOfWeek = endOfISOWeek(startOfWeek);
                                return `${format(
                                    startOfWeek,
                                    dateFormat
                                )} to ${format(endOfWeek, dateFormat)}`;
                            }}
                        />
                        <FormikCheckbox name="isActive" as={Switch} />
                        <WeekCarousel
                            startDate={values.startDate}
                            endDate={values.endDate}
                            weekNames={values.weekNames}
                        />
                        <Button
                            type="submit"
                            isLoading={loading}
                            colorScheme="blue"
                            alignSelf="flex-start"
                        >
                            {editMode === "add" ? "Add" : "Save"} Term
                        </Button>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};
