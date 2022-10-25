import { createAsyncThunk } from '@reduxjs/toolkit'
import { SigninModel, SignupModel } from '@/models/auth.model'
import AuthService from '@/api/services/auth.service'

export const signin = createAsyncThunk(
  'user/signin',
  async (payload: SigninModel, thunkApi) => {
    try {
      const { data } = await AuthService.signin(payload)
      return data
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.reason)
    }
  }
)

export const signup = createAsyncThunk(
  'user/signup',
  async (payload: SignupModel, thunkApi) => {
    try {
      const { data } = await AuthService.signup(payload)
      return data
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response.data.reason)
    }
  }
)
