import React, { useEffect } from "react";
import {
    HStack,
    IconButton,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { BsPencilSquare, BsX } from "react-icons/bs";
import { CloseIcon, EditIcon, Icon } from "@chakra-ui/icons";
import { useLazyQueryWithError } from "../../hooks/useQueryWithError";
import { useCourseStaffsLazyQuery } from "../../generated/graphql";
import { notSet } from "../../constants";
import { Loadable } from "../../components/helpers/Loadable";
import { capitalCase } from "change-case";
import sortBy from "lodash/sortBy";

type Props = {
    term: number;
    course: number;
};

export const CourseStaffTableContainer: React.FC<Props> = ({
    term,
    course,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [getCourseStaff, { data }] = useLazyQueryWithError(
        useCourseStaffsLazyQuery
    );
    useEffect(() => {
        if (term === notSet || course === notSet) {
            return;
        }
        getCourseStaff({
            variables: {
                courseTermInput: {
                    courseId: course,
                    termId: term,
                },
            },
        });
    }, [term, course, getCourseStaff]);
    if (term === notSet || course === notSet) {
        return null;
    }
    return (
        <>
            <Loadable isLoading={!data}>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Name</Th>
                            <Th>Role</Th>
                            <Th>Is New?</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortBy(data?.courseStaffs, (courseStaff) => {
                            return [courseStaff.role, courseStaff.user.name];
                        }).map((courseStaff, key) => (
                            <Tr key={key}>
                                <Td>{courseStaff.user.username}</Td>
                                <Td>{courseStaff.user.name}</Td>
                                <Td>{capitalCase(courseStaff.role)}</Td>
                                <Td>
                                    {courseStaff.isNew ? "New" : "Experienced"}
                                </Td>
                                <Td isNumeric>
                                    <IconButton
                                        aria-label="edit-staff"
                                        colorScheme="blue"
                                        icon={<Icon as={BsPencilSquare} />}
                                        size="md"
                                    />
                                    <IconButton
                                        ml={2}
                                        aria-label="remove-staff"
                                        colorScheme="red"
                                        icon={<Icon boxSize="1.5em" as={BsX} />}
                                        size="md"
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Loadable>
        </>
    );
};
