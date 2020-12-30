import { Heading } from "@chakra-ui/react";
import React from "react";

// Placeholder, proper types will be introduced.
type Props = {
    // Determines personal or open requests.
    type: string;
    // modal stuff.
    toggle: Function;
};

// Will likely rewrite this component later when filters are implemented.
export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    const openList = [0, 1, 2, 3, 4, 5];
    const personalList = [0, 1, 2];

    return (
        <div>
            {props.type === "all" ? (
                <div>
                    {openList.map((item, index) => (
                        <div onClick={() => props.toggle("open")}>
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {personalList.map((item, index) => (
                        <div onClick={() => props.toggle("open")}>
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
