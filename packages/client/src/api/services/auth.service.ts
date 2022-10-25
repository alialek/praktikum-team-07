import { api, ApiResponse } from '../client'
import { SigninModel, SignupModel } from '@/models/auth.model'

const AuthService = {
  signin(data: SigninModel): Promise<ApiResponse> {
    return api.post('/auth/signin', data)
  },
  signup(data: SignupModel): Promise<ApiResponse> {
    return api.post('/auth/signup', data)
  },
}

export default AuthService
