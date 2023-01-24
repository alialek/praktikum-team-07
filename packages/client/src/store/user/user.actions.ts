import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { SigninInputModel, SignupInputModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';
import { AuthService } from '@/api/services/auth';
import { OauthSingInModel } from '@/models/oauth.model';
import { OauthService } from '@/api/services/oauth';
import { ErrorNotificationMessage } from '@/store/user/user.slice';

export const signin = createAsyncThunk<
  SigninInputModel,
  SigninInputModel,
  { rejectValue: ErrorNotificationMessage }
>('user/signin', async (payload: SigninInputModel, thunkApi) => {
  try {
    const { data } = await AuthService.signin(payload);
    return data;
  } catch (err) {
    const error: AxiosError<ErrorNotificationMessage> = err as any;

    if (!error.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk<
  SignupInputModel,
  SignupInputModel,
  { rejectValue: ErrorNotificationMessage }
>('user/signup', async (payload: SignupInputModel, thunkApi) => {
  try {
    const { data } = await AuthService.signup(payload);
    return data;
  } catch (err) {
    const error: AxiosError<ErrorNotificationMessage> = err as any;

    if (!error.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const getUserInfo = createAsyncThunk<
  UserModel,
  void,
  { rejectValue: ErrorNotificationMessage }
>('user/getInfo', async (_, thunkApi) => {
  try {
    const { data } = await AuthService.getUserInfo();
    return data;
  } catch (err) {
    const error: AxiosError<ErrorNotificationMessage> = err as any;

    if (!error.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const oauthSignIn = createAsyncThunk(
  'user/oauthSignIn',
  async (payload: OauthSingInModel, thunkApi) => {
    try {
      const { data } = await OauthService.signin(payload);
      return data;
    } catch (err) {
      const error: AxiosError<ErrorNotificationMessage> = err as any;

      if (!error.response) {
        throw err;
      }

      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);
