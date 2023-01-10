import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterPostState {
    [index:string]: boolean | undefined | string | number | { minDate?: number | undefined; maxDate?: number | undefined; } | undefined;
    view?:boolean | undefined;
    theme?:string | undefined | boolean;
    date?:{
      minDate?:number | undefined;
      maxDate?:number | undefined;
    } | undefined;
    idUser?:string | undefined;
    value:number;
    language?:string
}

const initialState: filterPostState = {
    view : undefined,
    theme: undefined,
    date: {
      minDate: undefined,
      maxDate: undefined,
    },
    idUser  : undefined,
    value   : 10,
    language:"rus"
}


export const filterPostSlice = createSlice({
    name:'filterPost',
    initialState,
    reducers:{
        setPostFilter(state , action: PayloadAction<filterPostState>){
            return state = action.payload;      
        }       
    },
    
})


export default filterPostSlice.reducer;