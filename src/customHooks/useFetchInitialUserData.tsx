import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { token } from "../main";

const useFetchInitialUserData = () => {
        const {fetchUserData, state} = useUserContext();
    
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