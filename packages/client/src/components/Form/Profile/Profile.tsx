import { Link } from 'react-router-dom';
import { Button, TextField, Card, CardContent, CardActions, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { profileValidationSchema } from '@/utils/formValidation';
import { RootPath } from '@/router/paths';
import { UserModel } from '@/models/user.model';
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
} from '@/сonstants/text';
import { profileStyles } from '@/components/Form/Styles';
import { Avatar } from '@/components/Avatar';

export const Profile = () => {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | null>();
  const [edit, setEdit] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserModel>({
    resolver: yupResolver(profileValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: UserModel) => {
    console.log(JSON.stringify(data, null, 2), selectedFile);
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files }: { files: FileList | null } = event.target;

    if (!files?.length) {
      return;
    }

    const [file] = files;

    setSelectedFile(file);
  };

  const handleEditProfile = () => {
    setEdit(false);
  };

  return (
    <Card sx={profileStyles.card}>
      <Avatar avatar="" onChangeAvatar={handleChangeAvatar} />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardContent>
          <Stack direction="column" spacing={2}>
            <TextField
              disabled={edit}
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
              disabled={edit}
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
              disabled={edit}
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
              disabled={edit}
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
              disabled={edit}
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
              disabled={edit}
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
              disabled={edit}
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
            <Button disabled={!isValid} sx={profileStyles.button}>
              {PROFILE_CHANGE_DATA}
            </Button>

            <Button onClick={handleEditProfile} sx={profileStyles.link}>
              {EDIT_CHANGE_DATA}
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
