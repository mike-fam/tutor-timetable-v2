import { Heading } from "@chakra-ui/react";
import React from "react";

// Placeholder, proper types will be introduced.
type Props = {
    // Determines personal or open requests.
    type: string;
    // modal stuff.
    toggle: Function;
    // Proper types will come later.
    userType: string;
};

export const RequestList: React.FunctionComponent<Props> = (props: Props) => {
    const openList = [0, 1, 2, 3, 4, 5];
    const personalList = [0, 1, 2];

    const viewRequest = () => {
        props.toggle("open");
    };

    return (
        <div>
            {props.type === "open" ? (
                <div>
                    {openList.map((item, index) => (
                        <div onClick={() => viewRequest()}>
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {personalList.map((item, index) => (
                        <div onClick={() => viewRequest()}>
                            <Heading size="md">Request Title</Heading>
                            <p>Requestor name, status, session</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
