import React, { SelectHTMLAttributes } from "react";
import { Select } from "@chakra-ui/react";
import { Map } from "immutable";
import { notSet } from "../../constants";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    options: Map<number, string>;
    size?: string;
};

export const Dropdown: React.FunctionComponent<Props> = ({
    options,
    ...props
}) => {
    return (
        <Select {...props}>
            <option disabled value={notSet}>
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
