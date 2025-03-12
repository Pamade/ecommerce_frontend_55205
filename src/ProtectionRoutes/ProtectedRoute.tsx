import React from "react";
import { Navigate } from "react-router";
import useFetchInitialUserData from "../customHooks/useFetchInitialUserData";

interface ProtectedRouteProps  {
    children: React.ReactNode,
}

const ProtectedRoute = ({children}:ProtectedRouteProps) => {
    
    const {state} = useFetchInitialUserData();
    
    if (!state.user) {
        return <Navigate to="/"/>
    }
    return <>{children}</>
}
export default ProtectedRoute