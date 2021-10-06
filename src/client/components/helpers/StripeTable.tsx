import React, { ReactNode } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

type Props = {
    columns: string[];
    data: { id: string; cells: (string | ReactNode)[] }[];
};

export const StripeTable: React.FC<Props> = ({ columns, data }) => {
    return (
        <Table variant="striped">
            <Thead>
                <Tr>
                    {columns.map((column) => (
                        <Th key={column}>{column}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map(({ id, cells }) => (
                    <Tr key={id}>
                        {cells.map((cell, key) => (
                            <Td key={key}>{cell}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
