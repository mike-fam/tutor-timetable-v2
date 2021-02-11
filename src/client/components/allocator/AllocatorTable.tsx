import {
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

type Props = {
    totalHours: { [key: string]: number };
};

export const AllocatorTable: React.FC<Props> = ({ totalHours }) => {
    const totalHoursSorted = useMemo(
        () =>
            Object.entries(totalHours).sort(
                ([, num1], [, num2]) => num2 - num1
            ),
        [totalHours]
    );

    return (
        <Table w="50%" alignSelf="center">
            <TableCaption>
                Total allocation hours for every staff member
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Staff</Th>
                    <Th isNumeric>Total Hours</Th>
                    <Th isNumeric>Rank</Th>
                </Tr>
            </Thead>
            <Tbody>
                {totalHoursSorted.map(([user, hours], index) => (
                    <Tr key={index}>
                        <Td>{user}</Td>
                        <Td isNumeric>{hours}</Td>
                        <Td isNumeric>{index + 1}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
