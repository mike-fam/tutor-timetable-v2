import { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {};

export const RequestTimetableLegends: FC<Props> = () => {
    return (
        <>
            <Text color="red.500" fontWeight="bold">
                Red means that session clashes with your current timetable
            </Text>
            <Text color="yellow.500" fontWeight="bold">
                Yellow means that session doesn't clash with your timetable, but
                you are not available on that time
            </Text>
            <Text color="green.500" fontWeight="bold">
                Green means that session doesn't clash and you are available on
                that time
            </Text>
        </>
    );
};
