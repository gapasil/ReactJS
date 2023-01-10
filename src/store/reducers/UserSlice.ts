import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

interface UserState {
    users: User[];
    authorization: boolean;
    error: string;
}

const initialState: UserState = {
    users:[],
    authorization: false,
    error: ''
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state , action: PayloadAction<UserState>){
            
            return state = action.payload;      
        }       
    },
    
})


export default userSlice.reducer;