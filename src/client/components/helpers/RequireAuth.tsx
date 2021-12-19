import { FC, ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../utils/user";
import { Role } from "../../generated/graphql";

type Props = {
    allowedRoles?: Role[];
    children: ReactElement;
};

export const RequireAuth: FC<Props> = ({
    allowedRoles = [Role.Staff, Role.CourseCoordinator],
    children,
}) => {
    const { user } = useContext(UserContext)!;
    if (user.isAdmin) {
        return children;
    }
    if (
        !user.courseStaffs.some((courseStaff) =>
            allowedRoles.includes(courseStaff.role)
        )
    ) {
        return <Navigate to="/permission-denied" />;
    }
    return children;
};
