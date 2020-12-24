import React from "react";
import { RequestItem } from "./RequestItem";

// Placeholder, proper types will be introduced.
type Props = {
    type: string;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    const openList = [0, 1, 2, 3, 4, 5];
    const personalList = [0, 1, 2];
    return (
        <div>
            {props.type === "open" ? (
                <div>
                    {openList.map((item, index) => (
                        <RequestItem key={index} />
                    ))}
                </div>
            ) : (
                <div>
                    {personalList.map((item, index) => (
                        <RequestItem key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};
