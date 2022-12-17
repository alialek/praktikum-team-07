export interface UserModel {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface AvatarModel {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface ChangePasswordModel {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat?: string;
}
