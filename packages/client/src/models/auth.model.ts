import { UserModel } from './user.model';

export interface SigninInputModel extends Pick<UserModel, 'email'> {
  password: string;
}

export interface SignupInputModel extends UserModel {
  password: string;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat?: string;
}
