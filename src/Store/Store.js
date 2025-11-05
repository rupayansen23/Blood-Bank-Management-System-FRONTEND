import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./AdminSlice"

export const store = configureStore(
    {
        reducer : {
            adminInfoSlice: adminReducer,
        },
    },
);