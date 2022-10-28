import { createSlice } from '@reduxjs/toolkit'

import { signin, signup } from './user.actions'

export interface UserState {
  isAuth: boolean
  loading: boolean
  error: string
}

const initialState: UserState = {
  isAuth: false,
  loading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signin.pending, state => {
      state.loading = true
    })
    builder.addCase(signin.fulfilled, state => {
      state.loading = false
      state.isAuth = true
    })
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    builder.addCase(signup.pending, state => {
      state.loading = true
    })
    builder.addCase(signup.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default userSlice.reducer
