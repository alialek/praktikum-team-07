import React from 'react';
import { Box } from '@mui/material';
import { GET_AVATAR_URL } from '@/сonstants/main';

import emptyAvatarImg from '../../img/emptyAvatar.svg';
import { avatarStyles } from './Styles';

type CallbackFunction = (event: React.ChangeEvent<HTMLInputElement>) => void;
interface AvatarProps {
  avatar: string;
  onChangeAvatar: CallbackFunction;
  disabled: boolean;
}

export const Avatar = ({ avatar, disabled, onChangeAvatar }: AvatarProps) => {
  return (
    <Box sx={avatarStyles.boxWrapper}>
      <Box sx={disabled ? avatarStyles.boxInnerDisabled : avatarStyles.boxInner}>
        <input
          disabled={disabled}
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
