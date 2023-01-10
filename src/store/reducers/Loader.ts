import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoaderState {
    active:boolean
}

const initialState: LoaderState = {
    active: false
}


export const LoaderSlice = createSlice({
    name:'loaderState',
    initialState,
    reducers:{
        ActiveLoader(state){
            return state = {
                active : true
            }     
        },
        UnActiveLoader(state){
            return state = {
                active : false
            }      
        }      
    },
    
})

export default LoaderSlice.reducer;