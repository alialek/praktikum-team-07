export interface SigninInputModel {
  email: string;
  password: string;
}

export interface SignupInputModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser extends Omit<SignupInputModel, 'password'> {
  id: number;
  display_name: string;
  avatar: string;
}
