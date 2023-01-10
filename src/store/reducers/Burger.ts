import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BurgerState {
    active:boolean
}

const initialState: BurgerState = {
    active: true
}


export const burgerSlice = createSlice({
    name:'burgerState',
    initialState,
    reducers:{
        ActiveBurger(state){
            return state = {
                active : true
            }  
        },
        UnActiveBurger(state){
            return state = {
                active : false
            }  
        }
    },
    
})

export default burgerSlice.reducer;