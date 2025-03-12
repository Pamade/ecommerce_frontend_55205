import React from "react";
import { Navigate } from "react-router";
import useFetchInitialUserData from "../customHooks/useFetchInitialUserData";

interface RouteProps  {
    children: React.ReactNode,
}

const UserLoggedRoute = ({children}:RouteProps) => {
    const {state} = useFetchInitialUserData();
    
    if (state.user) {
        return <Navigate to="/"/>
    }
    return <>{children}</>
}
export default UserLoggedRoute