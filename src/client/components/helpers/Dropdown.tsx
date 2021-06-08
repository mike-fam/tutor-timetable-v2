import React, { SelectHTMLAttributes } from "react";
import { Select, SelectProps } from "@chakra-ui/react";
import { Map } from "immutable";
import { defaultStr } from "../../constants";

type Props = SelectHTMLAttributes<HTMLSelectElement> &
    Partial<SelectProps> & {
        options: Map<string, string>;
        size?: string;
    };

export const Dropdown: React.FunctionComponent<Props> = ({
    options,
    ...props
}) => {
    return (
        <Select {...props}>
            <option disabled value={defaultStr}>
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
