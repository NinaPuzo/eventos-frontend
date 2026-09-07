import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  element: React.JSX.Element;
  allowedRoles: string[];
  userRoles: string[];
};

const ProtectedRoute = ({
  element,
  allowedRoles,
  userRoles,
}: ProtectedRouteProps) => {
  const hasRole = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    return <Navigate to={"/"} />;
  }

  return element;
};
export default ProtectedRoute;

{
  /*type ProtectedRouteProps = {
  element: React.JSX.Element;
  allowedRoleIds: string[];
  userRoleId: string;
};

const ProtectedRoute = ({
  element,
  allowedRoleIds,
  userRoleId,
}: ProtectedRouteProps) => {
  if (!userRoleId) {
    return <Navigate to="/" />;
  }

  return allowedRoleIds.includes(userRoleId) ? element : <Navigate to="/" />;
};

export default ProtectedRoute;*/
}
