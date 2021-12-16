import { FC } from "react";
import { Text, useColorModeValue, useTheme, VStack } from "@chakra-ui/react";
import format from "date-fns/format";

type Props = {
    name: string;
    startDate: Date;
    endDate: Date;
};

export const WeekPreviewCard: FC<Props> = ({ name, startDate, endDate }) => {
    const theme = useTheme();
    const { blue, red } = theme.colors;
    const borderColor = useColorModeValue(blue["500"], blue["500"]);
    const weekTitleColor = useColorModeValue(red["600"], red["500"]);
    return (
        <VStack
            borderRadius="20px"
            width="100%"
            height="100%"
            justify="center"
            boxShadow={`0px 0px 5px 1px ${borderColor}`}
        >
            <Text
                fontSize="3xl"
                color={weekTitleColor}
                fontWeight="bold"
                mb={2}
            >
                {name}
            </Text>
            <Text>{format(startDate, "dd MMM yyyy")}</Text>
            <Text>to</Text>
            <Text>{format(endDate, "dd MMM yyyy")}</Text>
        </VStack>
    );
};
