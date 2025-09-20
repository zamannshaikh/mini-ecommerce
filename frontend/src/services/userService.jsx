import { useNavigate } from "react-router-dom";
import axios from "../api/axiosconfig";
import { loadUser, removeUser } from "../reducers/userSlice";

  export const asyncRegisterUser=  (user)=> async(dispatch,getState)=>{
    try {
        const response = await axios.post("/users",user);
        console.log(response.data);
        dispatch(loadUser(response.data));
    } catch (error) {
        console.error("Error fetching user:", error);
        
    }
}



// export const asyncLoginUser=  (user)=> async(dispatch,getState)=>{

//     try {
//         const response = await axios.get(`/users?username=${user.username}&password=${user.password}`);
//         console.log(response.data[0]);
//         localStorage.setItem("user",JSON.stringify(response.data[0]));
//     } catch (error) {
//         console.error("Error fetching user:", error);
//     }
// }
export const asyncLoginUser = (user) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `/users?username=${user.username}&password=${user.password}`
    );

    if (response.data.length > 0) {
      const loggedInUser = response.data[0];
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // ✅ Update Redux with user object
      dispatch(loadUser(loggedInUser));
    } else {
      console.log("Invalid credentials");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};


export const asyncLogoutUser=  (user)=> async(dispatch,getState)=>{

    try {
       localStorage.removeItem("user");
       dispatch(removeUser());
       console.log("user logged out");
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


export const asyncUpdateUser = (updatedUser) => async (dispatch, getState) => {
  try {
    // Get current user from state
    const currentUser = getState().userReducer.data;

    if (!currentUser || !currentUser.id) {
      console.error("No user found to update");
      return;
    }

    // Send PATCH request to update only changed fields
    const response = await axios.patch(`/users/${currentUser.id}`, updatedUser);

    // Save updated user to localStorage
    localStorage.setItem("user", JSON.stringify(response.data));

    // Update redux store
    dispatch(loadUser(response.data));

    console.log("User updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};


export const asyncDeleteUser = (id) => async (dispatch, getState) => {
    try {

        await axios.delete(`/users/${id}`);
        dispatch(asyncLogoutUser());
       
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
        
    }
}