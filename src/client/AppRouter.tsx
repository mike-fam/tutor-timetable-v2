import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { RequestPageContainer } from "./containers/requests/RequestPageContainer";
import { TimetablePageContainer } from "./containers/timetable/TimetablePageContainer";
import { AvailabilityPageContainer } from "./containers/availabilities/AvailabilityPageContainer";
import { PreferencePageContainer } from "./containers/preferences/PreferencePageContainer";
import { CourseStaffPageContainer } from "./containers/course-staff/CourseStaffPageContainer";
import { PermissionDenied } from "./PermissionDenied";
import { SecretRoute } from "./components/helpers/SecretRoute";
import { Role } from "./generated/graphql";
import { SessionSettingsPageContainer } from "./containers/session-settings/SessionSettingsPageContainer";
import { AdminPageContainer } from "./containers/admin/AdminPageContainer";

export const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<TimetablePageContainer />} />
                <Route
                    path="/permission-denied"
                    element={<PermissionDenied />}
                />
                <SecretRoute
                    path="/requests"
                    element={<RequestPageContainer />}
                />
                <SecretRoute
                    path="/availabilities"
                    element={<AvailabilityPageContainer />}
                />
                <SecretRoute
                    path="/preferences"
                    element={<PreferencePageContainer />}
                />
                <SecretRoute
                    path="/course-staff"
                    element={<CourseStaffPageContainer />}
                    allowedRoles={[Role.CourseCoordinator]}
                />
                <SecretRoute
                    path="/session-settings"
                    element={<SessionSettingsPageContainer />}
                    allowedRoles={[Role.CourseCoordinator]}
                />
                <SecretRoute
                    path="/admin"
                    element={<AdminPageContainer />}
                    allowedRoles={[]}
                />
            </Routes>
        </BrowserRouter>
    );
};
