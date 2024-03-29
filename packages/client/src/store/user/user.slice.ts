import { createSlice } from '@reduxjs/toolkit';
import { AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import type { RootState } from '../store';
import { getUserInfo, signin, signup } from './user.actions';
import { UserModel } from '@/models/user.model';

const initialState: UserState = {
  isAuth: false,
  loading: false,
  profile: {
    id: 0,
    display_name: '',
    avatar: '',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isAuth = true;
    },
    fetchUser: (state, param) => {
      const { payload } = param;
      state.profile = { ...payload };
    },
    removeUser: (state) => {
      state.profile = initialState.profile;
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
      state.signInErrorMessage = action.payload;
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
      state.signUpErrorMessage = action.payload;
    });

    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.profile = action.payload as UserModel;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;

export const showUserData = (state: RootState) => state.user;
export const { setIsLoggedIn, fetchUser, removeUser } = actions;
export default reducer;

export interface ErrorNotificationMessage {
  reason: string;
  error: string;
}

export interface UserState {
  isAuth: boolean;
  loading: boolean;
  profile: UserModel;
  error?: KnownError<ErrorNotificationMessage>;
  signInErrorMessage?: KnownError<ErrorNotificationMessage>;
  signUpErrorMessage?: KnownError<ErrorNotificationMessage>;
}

export interface KnownError<T, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
