import axios from "../api/axiosconfig";
import { loadUser } from "../reducers/userSlice";
  export const asyncRegisterUser=  (user)=> async(dispatch,getState)=>{
    try {
        const response = await axios.post("/users",user);
        console.log(response.data);
        dispatch(loadUser(response.data));
    } catch (error) {
        console.error("Error fetching user:", error);
        
    }
}



export const asyncLoginUser=  (user)=> async(dispatch,getState)=>{

    try {
        const response = await axios.get(`/users?username=${user.username}&password=${user.password}`);
        console.log(response.data[0]);
        localStorage.setItem("user",JSON.stringify(response.data[0]));
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

export const asyncLogoutUser=  (user)=> async(dispatch,getState)=>{

    try {
       
        localStorage.setItem("user"," ");
    } catch (error) {
        console.error("Error logging out  user:", error);
    }
}

export const asyncCurrentUser=  (user)=> async(dispatch,getState)=>{

    try {
       
     const user = JSON.parse(localStorage.getItem("user"));
     if(user){
        dispatch(loadUser(user));
        
     }
     else {
        console.log("user not logged in!!")
     }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}