import { UserModel } from './user.model';

export interface SigninInputModel extends Pick<UserModel, 'email'> {
  password: string;
  login: string;
}

export interface SignupInputModel extends UserModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
