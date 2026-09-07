import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
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

export default ProtectedRoute;
