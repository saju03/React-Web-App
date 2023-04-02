import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        name:'',
        email:'',
        profilePic:''
       
    },
    reducers:{
         userLogin:(state,action)=>{
            state.email = action.payload
           
         },
         userLogout:(state,action)=>{
            
         }
    }
}) 
export const {userLogin,userLogout} = userSlice.actions;

export default userSlice.reducer;