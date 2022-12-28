import { createSlice } from '@reduxjs/toolkit';

import { getUserInfo, signin, signup } from './user.actions';
import { UserModel } from '@/models/user.model';

export interface UserState {
  isAuth: boolean;
  loading: boolean;
  user: UserModel;
  error: string;
}

const initialState: UserState = {
  isAuth: false,
  loading: false,
  user: null,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state) => {
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
