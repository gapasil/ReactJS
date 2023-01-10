import React from "react"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    active  : boolean,
    text    : string,
    type    : typeModal,
    positionText : positionTextModal,
    state?   : React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export enum typeModal {
    Select = "select",
    Default = "default"
}
export enum positionTextModal {
    Left = "left",
    Center = "center"
}

const initialState: ModalState = {
    active: false,
    text  : "Тестовый текст:",
    type  : typeModal.Select,
    positionText : positionTextModal.Center
}

export const ModalSlice = createSlice({
    name:'modalState',
    initialState,
    reducers:{
        setModal(state , action: PayloadAction<ModalState>){
            return state = action.payload;      
        }       
    },
    
})

export default ModalSlice.reducer;