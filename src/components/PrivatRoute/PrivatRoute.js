import { Navigate, Outlet } from "react-router";

export const PrivatRoute = ({ authed }) => {
    return authed ? <Outlet /> : <Navigate to="/" replace />;
};
