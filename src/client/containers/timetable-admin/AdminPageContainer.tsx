import React, { useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Box, Grid, GridItem, Heading, UnorderedList } from "@chakra-ui/react";
import { AdminSidebarLink } from "../../components/admin/AdminSidebarLink";
import { defaultStr } from "../../constants";

type Props = {};

const pages = ["Term", "Course", "Timetable"];

export const AdminPageContainer: React.FC<Props> = () => {
    const [selectedPage, selectPage] = useState(defaultStr);
    return (
        <Wrapper>
            <Grid templateColumns="1fr 6fr" gap={6}>
                <GridItem colStart={2}>
                    <Heading>Admin Controls</Heading>
                </GridItem>
                <UnorderedList styleType="none" spacing={1} ml={0}>
                    {pages.map((page) => (
                        <li>
                            <AdminSidebarLink
                                name={page}
                                onClick={() => {
                                    selectPage(page);
                                }}
                                selected={page === selectedPage}
                            />
                        </li>
                    ))}
                </UnorderedList>
                <Box height="100%" width="100%" bgColor="tomato">
                    test
                </Box>
            </Grid>
        </Wrapper>
    );
};
