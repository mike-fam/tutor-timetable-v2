import { Dispatch, FC, SetStateAction } from "react";
import {
    Box,
    Center,
    Flex,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { CourseStaffsQuery } from "../../generated/graphql";
import { defaultStr } from "../../constants";
import sortBy from "lodash/sortBy";

type Props = {
    term: string;
    course: string;
    courseStaffs: CourseStaffsQuery["courseStaffs"];
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
                return [courseStaff.role, courseStaff.user.name];
            }).map((courseStaff, key) => (
                <Box
                    key={courseStaff.user.id}
                    onClick={(e) => chooseTutor(courseStaff.user.id)}
                    bg={
                        currentTutor === courseStaff.user.id ? bgColor : "white"
                    }
                    borderRadius="md"
                    borderWidth="1px"
                    p={2}
                >
                    <Flex>
                        <Center w="100px">
                            <Text>{courseStaff.user.name}</Text>
                        </Center>
                    </Flex>
                </Box>
            ))}
        </SimpleGrid>
    );
};
