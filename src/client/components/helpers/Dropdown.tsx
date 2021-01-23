import React, { SelectHTMLAttributes } from "react";
import { Select, SelectProps } from "@chakra-ui/react";
import { Map } from "immutable";

type Props = SelectHTMLAttributes<HTMLSelectElement> &
    Partial<SelectProps> & {
        options: Map<number, string>;
        size?: string;
        noDefault?: boolean;
    };

export const Dropdown: React.FunctionComponent<Props> = ({
    options,
    ...props
}) => {
    return (
        <Select {...props}>
            <option disabled defaultChecked>
                Select a value
            </option>
            {options.toArray().map(([id, optionString]) => (
                <option key={id} value={id}>
                    {optionString}
                </option>
            ))}
        </Select>
    );
};
