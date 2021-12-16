import { FC } from "react";
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { BsX } from "react-icons/bs";
import { Icon } from "@chakra-ui/icons";
import { CourseStaffsQuery } from "../../generated/graphql";
import { defaultStr } from "../../constants";
import { capitalCase } from "change-case";
import sortBy from "lodash/sortBy";
import { HelpIcon } from "../helpers/HelpIcon";
import { redacted } from "../../../server/constants";

type Props = {
    term: string;
    course: string;
    courseStaffs: CourseStaffsQuery["courseStaffs"];
    removeCourseStaff: (courseStaffId: string) => void;
};

export const CourseStaffTable: FC<Props> = ({
    term,
    course,
    removeCourseStaff,
    courseStaffs,
}) => {
    if (term === defaultStr || course === defaultStr) {
        return null;
    }
    return (
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
                {sortBy(courseStaffs, (courseStaff) => {
                    return [courseStaff.role, courseStaff.user.name];
                }).map((courseStaff, key) => (
                    <Tr key={key}>
                        <Td>{courseStaff.user.username}</Td>
                        <Td>
                            {courseStaff.user.name}
                            {courseStaff.user.name === redacted && (
                                <HelpIcon>
                                    {redacted} means that the user either hasn't
                                    logged in before, or they refuse to share
                                    their name. This will be changed after they
                                    log in or change their information
                                </HelpIcon>
                            )}
                        </Td>
                        <Td>{capitalCase(courseStaff.role)}</Td>
                        <Td>{courseStaff.isNew ? "New" : "Experienced"}</Td>
                        <Td isNumeric>
                            <IconButton
                                ml={2}
                                aria-label="remove-staff"
                                colorScheme="red"
                                icon={<Icon boxSize="1.5em" as={BsX} />}
                                size="md"
                                onClick={() => {
                                    removeCourseStaff(courseStaff.id);
                                }}
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
