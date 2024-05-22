import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("logedinstore") ? JSON.parse(localStorage.getItem("logedinstore")) : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginstore: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { loginstore } = authSlice.actions

export default authSlice.reducer