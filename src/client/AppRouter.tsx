import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { RequestPageContainer } from "./containers/requests/RequestPageContainer";
import { TimetablePageContainer } from "./containers/timetable/TimetablePageContainer";
import { AvailabilityPageContainer } from "./containers/availabilities/AvailabilityPageContainer";
import { PreferencePageContainer } from "./containers/preferences/PreferencePageContainer";
import { AllocatorPageContainer } from "./containers/allocator/AllocatorPageContainer";
import { CourseStaffPageContainer } from "./containers/course-staff/CourseStaffPageContainer";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" component={TimetablePageContainer} exact />
                <Route path="/requests" component={RequestPageContainer} />
                <Route
                    path="/availabilities"
                    component={AvailabilityPageContainer}
                />
                <Route
                    path="/preferences"
                    component={PreferencePageContainer}
                />
                <Route path="/allocator" component={AllocatorPageContainer} />
                <Route
                    path="/course-staff"
                    component={CourseStaffPageContainer}
                />
            </Switch>
        </BrowserRouter>
    );
};
