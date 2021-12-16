import { FC, useContext } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import { UserContext } from "../../utils/user";
import { Role } from "../../generated/graphql";

type Props = RouteProps & {
    allowedRoles?: Role[];
};

export const SecretRoute: FC<Props> = ({
    allowedRoles = [Role.Staff, Role.CourseCoordinator],
    ...props
}) => {
    const { user } = useContext(UserContext)!;
    if (user.isAdmin) {
        return <Route {...props} />;
    }
    if (user.courseStaffs.length === 0) {
        return <Navigate to="/permission-denied" />;
    }
    if (
        user.courseStaffs.filter((courseStaff) =>
            allowedRoles.includes(courseStaff.role)
        ).length === 0
    ) {
        return <Navigate to="/permission-denied" />;
    }
    return <Route {...props} />;
};
