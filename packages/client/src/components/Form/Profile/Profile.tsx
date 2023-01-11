/* eslint-disable camelcase */
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Stack,
  Box,
  CardMedia,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { profileValidationSchema } from '@/utils/formValidation';
import { ChangePasswordPagePath, RootPath } from '@/router/paths';
import { AvatarModel, UserModel } from '@/models/user.model';
import {
  FIRST_NAME_FIELD_LABEL,
  SECOND_NAME_FIELD_LABEL,
  EMAIL_FIELD_LABEL,
  PHONE_FIELD_LABEL,
  LOGIN_FIELD_LABEL,
  PROFILE_CHANGE_DATA,
  BACK_TEXT,
  DISPLAY_NAME_FIELD_LABEL,
  EDIT_CHANGE_DATA,
  AVATAR_TEXT,
  CHANGE_PASSWORD_TEXT,
} from '@/сonstants/text';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { showUserData, fetchUser } from '@/store/user/user.slice';
import { profileStyles } from '@/components/Form/Styles';
import { Avatar } from '@/components/Avatar';
import { ProfileService } from '@/api/services/profile';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile: user } = useAppSelector(showUserData);
  const { first_name, second_name, email, phone, login, display_name, avatar } = user;
  const { updateProfile, updateAvatar } = ProfileService;

  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [edit, setEdit] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<AvatarModel | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<UserModel>({
    resolver: yupResolver(profileValidationSchema),
    mode: 'onChange',
    defaultValues: {
      first_name,
      second_name,
      email,
      phone,
      login,
      display_name,
      avatar,
    },
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSubmit = (data: UserModel) => {
    if (data.avatar) {
      const formData = new FormData();
      formData.append('avatar', data.avatar[0]);
      updateProfile(data)
        .then(() => updateAvatar<UserModel>(formData))
        .then((res) => {
          const { data: payload } = res;
          dispatch(fetchUser({ ...data, avatar: payload.avatar }));
        })
        .then(() => setNewAvatar(null))
        .then(() => setEdit(!edit));
    } else {
      updateProfile(data)
        .then(() => {
          dispatch(fetchUser(data));
        })
        .then(() => setEdit(!edit));
    }
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: { files: FileList | null } = event.target;

    if (!files?.length) {
      return;
    }

    const [file] = files;
    setNewAvatar(file);
    setSelectedFile(file);
  };

  const handleEditProfile = () => {
    setEdit(true);
  };

  return (
    <Card sx={profileStyles.card}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Avatar
          register={register}
          avatar={avatar}
          disabled={!edit}
          onChangeAvatar={handleChangeAvatar}
        />
        {newAvatar ? (
          <Box sx={profileStyles.avatarBlock}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                height="140"
                src={preview as string}
                alt="Новый аватар"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {AVATAR_TEXT}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${newAvatar.name} - ${(newAvatar.size / (1024 * 1024)).toFixed(
                    2,
                  )} MB`}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ) : null}
        <CardContent>
          <Typography variant="h1" padding="0 0 32px 0" textAlign="center">
            Привет, {first_name} 🤘
          </Typography>
          <Stack direction="column" spacing={2}>
            <TextField
              disabled={!edit}
              variant="filled"
              type="text"
              id="profileFirstName"
              label={FIRST_NAME_FIELD_LABEL}
              {...register('first_name')}
              error={!!errors?.first_name}
              helperText={errors.first_name?.message}
              fullWidth
            />

            <TextField
              disabled={!edit}
              variant="filled"
              type="text"
              id="profileSecondName"
              label={SECOND_NAME_FIELD_LABEL}
              {...register('second_name')}
              error={!!errors.second_name}
              helperText={errors.second_name?.message}
              fullWidth
            />

            <TextField
              disabled={!edit}
              variant="filled"
              type="text"
              id="profileEmail"
              label={EMAIL_FIELD_LABEL}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />

            <TextField
              disabled={!edit}
              variant="filled"
              type="text"
              id="profilePhone"
              label={PHONE_FIELD_LABEL}
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />

            <TextField
              disabled={!edit}
              variant="filled"
              type="text"
              id="profileLogin"
              label={LOGIN_FIELD_LABEL}
              {...register('login')}
              error={!!errors.login}
              helperText={errors.login?.message}
              fullWidth
            />

            <TextField
              disabled={!edit}
              variant="filled"
              type="text"
              id="display_name"
              label={DISPLAY_NAME_FIELD_LABEL}
              {...register('display_name')}
              error={!!errors.display_name}
              helperText={errors.display_name?.message}
              fullWidth
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack sx={profileStyles.btnBlock} direction="column" width="100%">
            <Button onClick={handleEditProfile} sx={profileStyles.link}>
              {EDIT_CHANGE_DATA}
            </Button>

            <Button
              type="submit"
              disabled={!isDirty || !isValid}
              sx={profileStyles.button}
            >
              {PROFILE_CHANGE_DATA}
            </Button>

            <Button
              component={Link}
              to={ChangePasswordPagePath.path}
              sx={profileStyles.button}
            >
              {CHANGE_PASSWORD_TEXT}
            </Button>

            <Button component={Link} to={RootPath.path} sx={profileStyles.link}>
              {BACK_TEXT}
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
};
