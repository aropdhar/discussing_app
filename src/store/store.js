import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../authslice/authSlice'
import activeMsgSlice from '../authslice/activeMsgSlice'

export const store = configureStore({
  reducer: {
    logedindatauser: authSlice,
    usermsgdata: activeMsgSlice,
  },
})