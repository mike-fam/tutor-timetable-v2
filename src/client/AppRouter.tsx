import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { RequestPageContainer } from "./containers/requests/RequestPageContainer";
import { TimetablePageContainer } from "./containers/timetable/TimetablePageContainer";
import { AvailabilityPageContainer } from "./containers/availabilities/AvailabilityPageContainer";
import { PreferencePageContainer } from "./containers/preferences/PreferencePageContainer";
import { CourseStaffPageContainer } from "./containers/course-staff/CourseStaffPageContainer";
import { PermissionDenied } from "./PermissionDenied";
import { RequireAuth } from "./components/helpers/RequireAuth";
import { Role } from "./generated/graphql";
import { SessionSettingsPageContainer } from "./containers/session-settings/SessionSettingsPageContainer";
import { AvailabilityMonitorContainer } from "./containers/availability-monitor/AvailabilityMonitorContainer";
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
                <Route path="/requests" element={<RequestPageContainer />} />
                <Route
                    path="/availabilities"
                    element={
                        <RequireAuth>
                            <AvailabilityPageContainer />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/preferences"
                    element={
                        <RequireAuth>
                            <PreferencePageContainer />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/course-staff"
                    element={
                        <RequireAuth allowedRoles={[Role.CourseCoordinator]}>
                            <CourseStaffPageContainer />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/session-settings"
                    element={
                        <RequireAuth allowedRoles={[Role.CourseCoordinator]}>
                            <SessionSettingsPageContainer />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/availability-monitor"
                    element={
                        <RequireAuth allowedRoles={[Role.CourseCoordinator]}>
                            <AvailabilityMonitorContainer />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <RequireAuth allowedRoles={[]}>
                            <AdminPageContainer />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
