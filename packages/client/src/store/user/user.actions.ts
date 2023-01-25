import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { SigninInputModel, SignupInputModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';
import { AuthService } from '@/api/services/auth';
import { OauthSingInModel } from '@/models/oauth.model';
import { OauthService } from '@/api/services/oauth';
import { ErrorNotificationMessage, KnownError } from '@/store/user/user.slice';
import { ApiResponse } from '@/api/client';

export const signin = createAsyncThunk<
  ApiResponse<string>,
  SigninInputModel,
  { rejectValue: KnownError<ErrorNotificationMessage> }
>('user/signin', async (payload: SigninInputModel, thunkApi) => {
  try {
    const data = await AuthService.signin(payload);
    return data;
  } catch (err) {
    const error: AxiosError<ErrorNotificationMessage> = err as any;

    if (!error.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(error.response);
  }
});

export const signup = createAsyncThunk<
  ApiResponse<string>,
  SignupInputModel,
  { rejectValue: KnownError<ErrorNotificationMessage> }
>('user/signup', async (payload: SignupInputModel, thunkApi) => {
  try {
    const data = await AuthService.signup(payload);
    return data;
  } catch (err) {
    const error: AxiosError<ErrorNotificationMessage> = err as any;

    if (!error.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(error.response);
  }
});

export const getUserInfo = createAsyncThunk<
  UserModel,
  void,
  { rejectValue: KnownError<ErrorNotificationMessage> }
>('user/getInfo', async (_, thunkApi) => {
  try {
    const { data } = await AuthService.getUserInfo();
    return data;
  } catch (err) {
    const error: AxiosError<ErrorNotificationMessage> = err as any;

    if (!error.response) {
      throw err;
    }

    return thunkApi.rejectWithValue(error.response);
  }
});

export const oauthSignIn = createAsyncThunk(
  'user/oauthSignIn',
  async (payload: OauthSingInModel, thunkApi) => {
    try {
      const { data } = await OauthService.signin(payload);
      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response.data;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);
