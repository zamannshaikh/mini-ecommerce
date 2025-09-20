import { createSlice } from "@reduxjs/toolkit";
const initialState={
    data:[ ],
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        loadUser:(state,action)=>{
            state.data=action.payload;

        }, 
        removeUser:(state,action)=>{
            state.data=null;
        },
        
     
    }
});
export const {loadUser,removeUser,} = userSlice.actions;
export default userSlice.reducer;