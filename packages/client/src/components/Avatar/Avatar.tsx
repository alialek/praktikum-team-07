import React from 'react';
import { Box } from '@mui/material';
import { GET_AVATAR_URL } from '@/сonstants/main';

import emptyAvatarImg from '../../img/emptyAvatar.svg';
import { avatarStyles } from './Styles';

type CallbackFunction = (event: React.ChangeEvent<HTMLInputElement>) => void;
interface AvatarProps {
  avatar: string;
  onChangeAvatar: CallbackFunction;
}

export const Avatar = ({ avatar, onChangeAvatar }: AvatarProps) => {
  return (
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
};
