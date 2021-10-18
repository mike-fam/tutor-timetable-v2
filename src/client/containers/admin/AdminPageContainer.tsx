import React, { useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Grid, GridItem, Heading, UnorderedList } from "@chakra-ui/react";
import { AdminSidebarLink } from "../../components/admin/AdminSidebarLink";
import { CourseForm } from "../../components/admin/CourseForm";
import { AddOrSelect } from "../../components/admin/AddOrSelect";
import { AdminPage } from "../../types/admin";

type Props = {};

const pages: AdminPage[] = ["Term", "Course", "Timetable"];

export const AdminPageContainer: React.FC<Props> = () => {
    const [currentPage, selectPage] = useState<AdminPage>("Timetable");
    return (
        <Wrapper>
            <Grid templateColumns="1fr 6fr" gap={6}>
                <GridItem colStart={2}>
                    <Heading>Admin Controls</Heading>
                </GridItem>
                <UnorderedList styleType="none" spacing={1} ml={0}>
                    {pages.map((page, key) => (
                        <li key={`${page}-${key}`}>
                            <AdminSidebarLink
                                name={page}
                                onClick={() => {
                                    selectPage(page);
                                }}
                                selected={page === currentPage}
                            />
                        </li>
                    ))}
                </UnorderedList>
                <GridItem>
                    <AddOrSelect
                        elementType={currentPage}
                        elements={[]}
                        onAdd={() => {}}
                        onSelect={() => {}}
                    />
                    {currentPage === "Course" ? (
                        <CourseForm submit={() => {}} editMode="add" />
                    ) : currentPage === "Timetable" ? (
                        "Timetable here"
                    ) : (
                        "Term here"
                    )}
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
