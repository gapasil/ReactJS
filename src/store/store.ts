import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer   from "./reducers/UserSlice";
import  editorReducer from "./reducers/EditorSlice";
import  burgerReducer from "./reducers/Burger"
import  modalReducer  from "./reducers/Modal"
import  loaderReducer from "./reducers/Loader"
import  menuUserReducer from "./reducers/MenuUser"
import  filterPostReducer from "./reducers/FilterPost"

const rootReducer = combineReducers({
    userReducer,
    editorReducer,
    burgerReducer,
    modalReducer,
    loaderReducer,
    filterPostReducer,
    menuUserReducer
})

export const setupStore = () =>{
    return configureStore({
        reducer:rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']