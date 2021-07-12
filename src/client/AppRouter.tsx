import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { RequestPageContainer } from "./containers/requests/RequestPageContainer";
import { TimetablePageContainer } from "./containers/timetable/TimetablePageContainer";
import { AvailabilityPageContainer } from "./containers/availabilities/AvailabilityPageContainer";
import { PreferencePageContainer } from "./containers/preferences/PreferencePageContainer";
import { AllocatorPageContainer } from "./containers/allocator/AllocatorPageContainer";
import { CourseStaffPageContainer } from "./containers/course-staff/CourseStaffPageContainer";
import { PermissionDenied } from "./PermissionDenied";
import { SecretRoute } from "./components/helpers/SecretRoute";
import { Role } from "./generated/graphql";
import { SessionSettingsPageContainer } from "./containers/session-settings/SessionSettingsPageContainer";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" component={TimetablePageContainer} exact />
                <Route
                    path="/permission-denied"
                    component={PermissionDenied}
                    exact
                />
                <SecretRoute
                    path="/requests"
                    component={RequestPageContainer}
                    exact
                />
                <SecretRoute
                    path="/availabilities"
                    component={AvailabilityPageContainer}
                    exact
                />
                <SecretRoute
                    path="/preferences"
                    component={PreferencePageContainer}
                    exact
                />
                <SecretRoute
                    path="/allocator"
                    component={AllocatorPageContainer}
                    allowedRoles={[Role.CourseCoordinator]}
                />
                <SecretRoute
                    path="/course-staff"
                    component={CourseStaffPageContainer}
                    allowedRoles={[Role.CourseCoordinator]}
                />
                <SecretRoute
                    path="/session-settings"
                    component={SessionSettingsPageContainer}
                    allowedRoles={[Role.CourseCoordinator]}
                />
            </Switch>
        </BrowserRouter>
    );
};
