import React, { createContext, useState } from "react";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Grid, GridItem, Heading, UnorderedList } from "@chakra-ui/react";
import { AdminSidebarLink } from "../../components/admin/AdminSidebarLink";
import { AdminPage } from "../../types/admin";
import { AdminMiniRoute } from "../../components/admin/AdminMiniRoute";
import { AdminCourseContainer } from "./AdminCourseContainer";
import { AdminTimetableContainer } from "./AdminTimetableContainer";

type Props = {};

const pages: AdminPage[] = ["Timetable", "Course", "Term"];

export type AdminPageState = {
    currentPage: AdminPage;
};

export const AdminPageContext = createContext<AdminPageState>({
    currentPage: "Timetable",
});

export const AdminPageContainer: React.FC<Props> = () => {
    const [currentPage, selectPage] = useState<AdminPage>("Timetable");
    return (
        <AdminPageContext.Provider value={{ currentPage }}>
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
                        <AdminMiniRoute
                            page="Course"
                            component={AdminCourseContainer}
                        />
                        <AdminMiniRoute
                            page="Timetable"
                            component={AdminTimetableContainer}
                        />
                    </GridItem>
                </Grid>
            </Wrapper>
        </AdminPageContext.Provider>
    );
};
