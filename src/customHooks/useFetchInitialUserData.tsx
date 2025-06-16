import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
// import { token } from "../main";
import axios from "axios"
import { API_SERVER } from "../main";
import { ProductInterface } from "../types/types";

// const Product:ProductInterface {}

const useFetchInitialUserData = () => {
        const {fetchUserData, state} = useUserContext();
        const token = localStorage.getItem("access_token")
        useEffect(() => {

            if (token) {
                fetchUserData(token);
            } else {
                console.log("No token found");
            }
            console.log(state)
        }, []);

        return {state}
}
export default useFetchInitialUserData;