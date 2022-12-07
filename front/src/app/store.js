import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todoReducer";


export const store = configureStore({
    reducer: todoSlice
})