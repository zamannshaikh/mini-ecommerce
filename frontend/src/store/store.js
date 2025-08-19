import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../reducers/userSlice.jsx";

export const store = configureStore({
  reducer: {
    user: userSlice
  },
})