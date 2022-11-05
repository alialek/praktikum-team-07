import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box } from '@mui/material';
import { GET_AVATAR_URL } from '@/сonstants/main';

import emptyAvatarImg from '../../img/emptyAvatar.svg';
import { IUser } from '@/models/auth.model';
import { avatarStyles } from './Styles';

interface IProps {
  data: IUser;
  onChangeAvatar: () => void;
}

export const Avatar = ({ data: { avatar }, onChangeAvatar }: IProps): ReactJSXElement => (
  <Box sx={avatarStyles.boxWrapper}>
    <Box sx={avatarStyles.boxInner}>
      <input
        style={avatarStyles.avatarInput as React.CSSProperties}
        onChange={onChangeAvatar}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
      />
      <img
        style={avatarStyles.img as React.CSSProperties}
        src={avatar.length ? `${GET_AVATAR_URL}/${avatar}` : emptyAvatarImg}
        alt="Аватар"
      />
    </Box>
  </Box>
);
