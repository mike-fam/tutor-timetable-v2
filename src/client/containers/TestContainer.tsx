import React from "react";
import { Test } from "../components/Test";
import { useTestHook } from "../hooks/testHook";

type Props = {};

export const TestContainer: React.FunctionComponent<Props> = () => {
    const [testData] = useTestHook();
    return <Test test={testData} />;
};
