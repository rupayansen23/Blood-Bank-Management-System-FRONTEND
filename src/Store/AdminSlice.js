import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice(
    {
        name : 'adminInfoSlice',
        initialState : {
            adminInfo : null,
        }, 
        reducers : {
            setAdmin : (state, action)=> {state.adminInfo = action.payload},
            clearAdmin : (state)=> {state.adminInfo = null}
        }
    }
)
export const {setAdmin, clearAdmin} = AdminSlice.actions;
export const getAdmin = (state) => state.adminInfoSlice.adminInfo;
export default AdminSlice.reducer;