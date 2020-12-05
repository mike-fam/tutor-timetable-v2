import { Checkbox } from "@chakra-ui/react";
import { Field, Formik, Form } from "formik";
import React from "react";

type Props = {
    courses: Array<String>;
};

export const CourseSelect: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Formik
                initialValues={{
                    checked: [],
                }}
                // Placeholder
                onSubmit={async (values) => {
                    alert(JSON.stringify(values));
                }}
            >
                {({ values }) => (
                    <Form>
                        <div>
                            <label>
                                <Field
                                    type="checkbox"
                                    name="checked"
                                    value="One"
                                    as={Checkbox}
                                />
                                One
                            </label>
                            <label>
                                <Field
                                    type="checkbox"
                                    name="checked"
                                    value="Two"
                                    as={Checkbox}
                                />
                                Two
                            </label>
                            <label>
                                <Field
                                    type="checkbox"
                                    name="checked"
                                    value="Three"
                                    as={Checkbox}
                                />
                                Three
                            </label>
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
