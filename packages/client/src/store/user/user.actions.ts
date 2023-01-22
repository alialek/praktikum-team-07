import { createAsyncThunk } from '@reduxjs/toolkit';
import { SigninInputModel, SignupInputModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';
import { AuthService } from '@/api/services/auth';
import { OauthSingInModel } from '@/models/oauth.model';
import { OauthService } from '@/api/services/oauth';
import notificationService from '@/global/Notification.service';

export const signin = createAsyncThunk(
  'user/signin',
  async (payload: SigninInputModel, thunkApi) => {
    try {
      const { data } = await AuthService.signin(payload);
      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      // TODO затипизировать
      // @ts-ignore
      if (hasErrResponse.status > 200) {
        const { data } = hasErrResponse;
        // @ts-ignore
        const { reason, error } = data;
        notificationService.addNotification(error, reason, 'error');
      }

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const signup = createAsyncThunk(
  'user/signup',
  async (payload: SignupInputModel, thunkApi) => {
    try {
      const { data } = await AuthService.signup(payload);
      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const getUserInfo = createAsyncThunk<UserModel, void>(
  'user/getInfo',
  async (_, thunkApi) => {
    try {
      const { data } = await AuthService.getUserInfo();
      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);

export const oauthSignIn = createAsyncThunk(
  'user/oauthSignIn',
  async (payload: OauthSingInModel, thunkApi) => {
    try {
      const { data } = await OauthService.signin(payload);
      return data;
    } catch (e) {
      const hasErrResponse = (e as { response: { [key: string]: string } }).response;

      if (!hasErrResponse) {
        throw e;
      }

      return thunkApi.rejectWithValue(hasErrResponse);
    }
  },
);
