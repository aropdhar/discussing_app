import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const activeMsgSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userMsgName: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { userMsgName } = activeMsgSlice.actions

export default activeMsgSlice.reducer