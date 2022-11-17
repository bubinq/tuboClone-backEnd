import { useContext } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/authContext";

export const PrivateGuard = () => {
    const {authUser} = useContext(AuthContext)
    if (!authUser) {
        return <Navigate to="/" redirect></Navigate>
    } else {
        return <Outlet/>
    }
}