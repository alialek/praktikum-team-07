import { createAsyncThunk } from '@reduxjs/toolkit';
import { SigninInputModel, SignupInputModel } from '@/models/auth.model';
import { AuthService } from '@/api/services/auth.service';

export const signin = createAsyncThunk(
  'user/signin',
  async (payload: SigninInputModel, thunkApi) => {
    try {
      const { data } = await AuthService.signin(payload);
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
