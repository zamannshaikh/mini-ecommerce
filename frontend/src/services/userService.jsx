import axios from "../api/axiosconfig";
import { loadUser } from "../reducers/userSlice";
  export const asyncGetUser=  ()=> async(dispatch,getState)=>{
    try {
        const response = await axios.get("/users");
        console.log(response.data);
        dispatch(loadUser(response.data));
    } catch (error) {
        console.error("Error fetching user:", error);
        
    }
}