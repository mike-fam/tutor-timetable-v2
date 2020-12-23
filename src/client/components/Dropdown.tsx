import React, { SelectHTMLAttributes } from "react";
import { Select } from "@chakra-ui/react";
import { Map } from "immutable";
import entries from "lodash/entries";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    options: Map<number, string>;
    size?: string;
    noDefault?: boolean;
};

export const Dropdown: React.FunctionComponent<Props> = ({
    options,
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
            {options.toArray().map(([id, optionString]) => (
                <option key={id} value={id}>
                    {optionString}
                </option>
            ))}
        </Select>
    );
};
