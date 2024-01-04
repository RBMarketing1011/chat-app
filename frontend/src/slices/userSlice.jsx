import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user'))
    :
    null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) =>
    {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    removeCredentials: (state, action) =>
    {
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, removeCredentials } = userSlice.actions

export default userSlice.reducer 