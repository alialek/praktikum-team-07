import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  Box,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { signupFormValidationSchema } from '@/utils/formValidation';
import { RootPath } from '@/router/paths';
import { SignupInputModel } from '@/models/auth.model';
import {
  FIRST_NAME_FIELD_LABEL,
  SECOND_NAME_FIELD_LABEL,
  EMAIL_FIELD_LABEL,
  PHONE_FIELD_LABEL,
  LOGIN_FIELD_LABEL,
  PASSWORD_FIELD_LABEL,
  PROFILE_CHANGE_DATA,
  BACK_TEXT,
} from '@/сonstants/text';
import { profileStyles } from '@/components/Form/Styles';
import { Avatar } from '@/components/Avatar';

export const Profile = () => {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | null>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupInputModel>({
    resolver: yupResolver(signupFormValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignupInputModel) => {
    console.log(JSON.stringify(data, null, 2), selectedFile);
  };

  return (
    <Box sx={profileStyles.boxWrapper}>
      <Card sx={profileStyles.card}>
        <Avatar
          data={{
            display_name: '',
            avatar: '',
            id: 1,
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            phone: '',
          }}
          onChangeAvatar={(event) => {
            const { files }: { files: FileList | null } = (
              event as React.ChangeEvent<HTMLInputElement>
            ).target as HTMLInputElement;

            if (!files?.length) {
              return;
            }

            const [file] = files;

            setSelectedFile(file);
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <TextField
                variant="filled"
                type="text"
                id="registrationFirstName"
                label={FIRST_NAME_FIELD_LABEL}
                {...register('first_name')}
                error={!!errors?.first_name}
                helperText={errors.first_name?.message}
                fullWidth
                autoFocus
              />

              <TextField
                variant="filled"
                type="text"
                id="registrationSecondName"
                label={SECOND_NAME_FIELD_LABEL}
                {...register('second_name')}
                error={!!errors.second_name}
                helperText={errors.second_name?.message}
                fullWidth
              />

              <TextField
                variant="filled"
                type="text"
                id="registrationEmail"
                label={EMAIL_FIELD_LABEL}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />

              <TextField
                variant="filled"
                type="text"
                id="registrationPhone"
                label={PHONE_FIELD_LABEL}
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />

              <TextField
                variant="filled"
                type="text"
                id="registrationLogin"
                label={LOGIN_FIELD_LABEL}
                {...register('login')}
                error={!!errors.login}
                helperText={errors.login?.message}
                fullWidth
              />

              <TextField
                variant="filled"
                type="password"
                id="registrationPassword"
                label={PASSWORD_FIELD_LABEL}
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Stack sx={profileStyles.btnBlock} direction="column" width="100%">
              <Button disabled={isValid} sx={profileStyles.button}>
                {PROFILE_CHANGE_DATA}
              </Button>

              <Button component={Link} to={RootPath.path} sx={profileStyles.link}>
                {BACK_TEXT}
              </Button>
            </Stack>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};
