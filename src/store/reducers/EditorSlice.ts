import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
    editor:any
}

const initialState: EditorState = {
    editor: false
}


export const editorSlice = createSlice({
    name:'editorRedux',
    initialState,
    reducers:{
        setEditor(state , action: PayloadAction<EditorState>){
            return state = action.payload;      
        }       
    },
    
})

export default editorSlice.reducer;