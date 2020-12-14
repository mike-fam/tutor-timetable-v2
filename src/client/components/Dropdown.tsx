import React, { SelectHTMLAttributes } from "react";
import { Select } from "@chakra-ui/react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    children: string[];
    size?: string;
    noDefault?: boolean;
};

export const Dropdown: React.FunctionComponent<Props> = ({
    children,
    noDefault = true,
    ...props
}) => {
    return (
        <Select {...props} isFullWidth={false}>
            {noDefault ? (
                <option disabled defaultChecked>
                    Select a value
                </option>
            ) : null}
            {children.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </Select>
    );
};
