import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Box } from '@mui/material';
import { GET_AVATAR_URL } from '@/сonstants/main';

import emptyAvatarImg from '../../img/emptyAvatar.svg';
import editAvatarIcon from '../../img/edit.svg';
import { IUser } from '@/models/auth.model';

interface IProps {
  data: IUser;
  onChangeAvatar: () => void;
}

export const Avatar = ({ data: { avatar }, onChangeAvatar }: IProps): ReactJSXElement => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        cursor: 'pointer',
        margin: 'auto',
        width: 256,
        height: 256,
        borderRadius: 65,
        ':hover:after': {
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          content: "''",
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundImage: `url(${editAvatarIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 40,
          borderRadius: 65,
        },
      }}
    >
      <input
        style={{
          overflow: 'hidden',
          width: 256,
          height: 256,
          zIndex: 2,
          cursor: 'pointer',
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0,
        }}
        onChange={onChangeAvatar}
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
      />
      <img
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={avatar.length ? `${GET_AVATAR_URL}/${avatar}` : emptyAvatarImg}
        alt="Аватар"
      />
    </Box>
  </Box>
);
