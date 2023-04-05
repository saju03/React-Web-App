import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        name:'',
        email:'',
        profileImg:''
       
    },
    reducers:{
         userLogin:(state,action)=>{
            console.log(action.payload);
           
            state.name = action.payload.user
            state.email = action.payload.email
           state.profileImg = action.payload.profileImg
            
         }
         
    }
}) 
export const {userLogin} = userSlice.actions;

export default userSlice.reducer;