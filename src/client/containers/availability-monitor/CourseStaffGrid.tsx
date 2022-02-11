import { Dispatch, FC, SetStateAction } from "react";
import {
    Box,
    Center,
    Flex,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { StaffEnteredAvailability } from "../../generated/graphql";
import { defaultStr } from "../../constants";
import sortBy from "lodash/sortBy";

type Props = {
    term: string;
    course: string;
    courseStaffs: StaffEnteredAvailability[];
    currentTutor: string;
    chooseTutor: Dispatch<SetStateAction<string>>;
};

export const CourseStaffGrid: FC<Props> = ({
    term,
    course,
    courseStaffs,
    currentTutor,
    chooseTutor,
}) => {
    const bgColor = useColorModeValue("gray.100", "gray.900");

    if (term === defaultStr || course === defaultStr) {
        return null;
    }
    return (
        <SimpleGrid minChildWidth="120px" spacing="20px">
            {sortBy(courseStaffs, (courseStaff) => {
                return [courseStaff.name];
            }).map((courseStaff, key) => (
                <Box
                    key={key}
                    onClick={(e) => chooseTutor(courseStaff.id)}
                    bg={
                        currentTutor === courseStaff.id
                            ? bgColor
                            : courseStaff.entered
                            ? "green.100"
                            : "white"
                    }
                    borderRadius="md"
                    borderWidth="1px"
                    p={2}
                >
                    <Flex>
                        <Center w="100px">
                            <Text>{courseStaff.name}</Text>
                        </Center>
                    </Flex>
                </Box>
            ))}
        </SimpleGrid>
    );
};
