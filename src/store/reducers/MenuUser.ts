import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface menuUserState {
    active:boolean
}

const initialState: menuUserState = {
    active: false
}


export const menuUserSlice = createSlice({
    name:'menuUserState',
    initialState,
    reducers:{
        ActiveMenuUser(state){
            return state = {
                active : true
            }  
        },
        UnActiveMenuUser(state){
            return state = {
                active : false
            }  
        }
    },
    
})

export default menuUserSlice.reducer;