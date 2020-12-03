import React, { ChangeEventHandler } from "react";

type Props = {
    onChange: ChangeEventHandler<HTMLSelectElement>;
    children: string[];
};

export const Dropdown: React.FunctionComponent<Props> = ({
    onChange,
    children,
}) => {
    return (
        <select onChange={onChange}>
            {children.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
