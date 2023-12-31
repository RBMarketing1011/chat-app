import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/userSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
  reducer: {
    [ apiSlice.reducerPath ]: apiSlice.reducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store 