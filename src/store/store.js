import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../authslice/authSlice'

export const store = configureStore({
  reducer: {
    logedindatauser: authSlice,
  },
})