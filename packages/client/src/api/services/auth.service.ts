import { api, ApiResponse } from '../client'
import { SigninInputModel, SignupInputModel } from '@/models/auth.model'

const AuthService = {
  signin(data: SigninInputModel): Promise<ApiResponse> {
    return api.post('/auth/signin', data)
  },
  signup(data: SignupInputModel): Promise<ApiResponse> {
    return api.post('/auth/signup', data)
  },
}

export default AuthService
