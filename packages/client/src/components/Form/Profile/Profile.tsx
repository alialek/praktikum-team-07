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
import { useAppSelector } from '@/hooks';
import { showUserData } from '@/store/user/user.slice';
import { profileStyles } from '@/components/Form/Styles';
import { Avatar } from '@/components/Avatar';
import { ProfileService } from '@/api/services/profile';

export const Profile = () => {
  const { profile: user } = useAppSelector(showUserData);
  const { first_name, second_name, email, phone, login, display_name } = user;

  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [edit, setEdit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<AvatarModel | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    console.log(JSON.stringify(data, null, 2), selectedFile);

    const formData = new FormData();
    formData.append('avatar', selectedFile as Blob);

    ProfileService.avatar(formData);
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: { files: FileList | null } = event.target;

    if (!files?.length) {
      return;
    }

    const [file] = files;
    setAvatar(file);
    setSelectedFile(file);
  };

  const handleEditProfile = () => {
    setEdit(true);
  };

  return (
    <Card sx={profileStyles.card}>
      <Avatar avatar="" onChangeAvatar={handleChangeAvatar} />
      <Box sx={profileStyles.avatarBlock}>
        {avatar ? (
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
                {`${avatar.name} - ${(avatar.size / (1024 * 1024)).toFixed(2)} MB`}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardContent>
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
              defaultValue="Иван"
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
              defaultValue="Иванов"
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
              defaultValue="iivanov@ya.ru"
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
              defaultValue="+79036742614"
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
              defaultValue="iivanov"
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
              defaultValue="otvertka2022"
              fullWidth
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack sx={profileStyles.btnBlock} direction="column" width="100%">
            <Button onClick={handleEditProfile} sx={profileStyles.link}>
              {EDIT_CHANGE_DATA}
            </Button>

            <Button type="submit" disabled={!isValid} sx={profileStyles.button}>
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
