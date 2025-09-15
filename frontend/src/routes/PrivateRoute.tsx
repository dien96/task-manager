import { Outlet } from "react-router-dom";

type PrivateRouteProps = {
  allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  return <Outlet />;
};

export default PrivateRoute;
