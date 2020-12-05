import { Button, Checkbox } from "@chakra-ui/react";
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
                            {props.courses.map((course, index) => (
                                <label key={index}>
                                    <Field
                                        type="checkbox"
                                        name="checked"
                                        value={course}
                                        as={Checkbox}
                                    />
                                    {course}
                                </label>
                            ))}
                        </div>
                        <Button type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
