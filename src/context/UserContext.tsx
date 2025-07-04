import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { API_SERVER } from "../main";
import {User} from "../types/types";
import { ContextState } from "../types/types";
import { useNavigate } from "react-router";


interface State extends ContextState{
    user: User | null;
}

const initialState: State = {
    user: null,
    loading: false,
    error: null,
};

// Define Action Types
type Action =
    | { type: "START_FETCH_USER_DATA" }
    | { type: "FETCH_USER_DATA_SUCCESS"; payload: User }
    | { type: "FETCH_USER_DATA_ERROR"; payload: string }
    | {type: "LOGOUT"}

// Reducer Function
const userReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "START_FETCH_USER_DATA":
            return { ...state, loading: true, error: null };
        case "FETCH_USER_DATA_SUCCESS":
            return { ...state, user: action.payload, loading: false, error: null };
        case "FETCH_USER_DATA_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "LOGOUT":
            return {...initialState, loading:false, error:null}
        default:
            return state;
    }
};

// Create Context
const UserContext = createContext<{
    state: State;
    fetchUserData: (token: string) => Promise<void>;
    logout:() => void;
}>({
    state: initialState,
    fetchUserData: async () => {},
    logout: () => {},
});

// Context Provider Component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    // const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('access_token');
        dispatch({type:"LOGOUT"})
        // navigate("/")
    }

    const fetchUserData = async (token: string) => {
        dispatch({ type: "START_FETCH_USER_DATA" });

        try {
            const res = await axios.get(`${API_SERVER}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (res.status !== 200) {
                throw new Error("Failed to fetch");
            }
            const data: User = res.data
            
            dispatch({ type: "FETCH_USER_DATA_SUCCESS", payload: data });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "FETCH_USER_DATA_ERROR", payload: error.message });
            }
        }
    };

    useEffect(() => {
        const w = async() => {
            await fetchUserData(localStorage.getItem("access_token")!)
        }
        w()
    }, [])

    return (
        <UserContext.Provider value={{ state, fetchUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext)
    return context;
}