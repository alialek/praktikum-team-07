/* eslint-disable camelcase */
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  CardMedia,
  Typography,
  FormControlLabel,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { profileValidationSchema } from '@/utils/formValidation';
import { ChangePasswordPagePath } from '@/router/paths';
import { AvatarModel, UserModel } from '@/models/user.model';
import {
  FIRST_NAME_FIELD_LABEL,
  SECOND_NAME_FIELD_LABEL,
  EMAIL_FIELD_LABEL,
  PHONE_FIELD_LABEL,
  LOGIN_FIELD_LABEL,
  PROFILE_CHANGE_DATA,
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
import { Notification } from '@/store/alert/alert.slice';
import { enqueueSnackbar as enqueueSnackbarAction } from '@/store/alert/alert.actions';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const Profile = () => {
  const dispatch = useAppDispatch();
  const enqueueSnackbar = (args: Notification) =>
    dispatch(enqueueSnackbarAction({ ...args }));
  const { profile: user } = useAppSelector(showUserData);
  const { first_name, second_name, email, phone, login, display_name, avatar } = user;
  const { updateProfile, updateAvatar } = ProfileService;

  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [toggle, setToggleData] = useState<boolean>(false);
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
    if (data.avatar !== null) {
      const formData = new FormData();
      formData.append('avatar', data.avatar[0]);
      updateProfile(data)
        .then(() => updateAvatar<UserModel>(formData))
        .then((res) => {
          const { data: payload } = res;
          dispatch(fetchUser({ ...data, avatar: payload.avatar }));
        })
        .then(() => setNewAvatar(null))
        .then(() => setToggleData(!toggle));
    } else {
      updateProfile(data)
        .then(({ status }) => {
          if (status === 200) {
            enqueueSnackbar({
              key: v4(),
              message: 'Профиль отредактирован 💾',
              options: {
                key: v4(),
                variant: 'success',
              },
            });
          }
        })
        .then(() => {
          dispatch(fetchUser(data));
        })
        .then(() => setToggleData(!toggle));
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
    setToggleData(!toggle);
  };

  return (
    <form style={{ width: '60%' }} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{ p: 4, m: 2, borderRadius: '16px' }}>
            <Avatar
              register={register}
              avatar={avatar}
              disabled={!toggle}
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
            ) : (
              <div />
            )}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 4, m: 2, borderRadius: '16px' }}>
            <Typography
              variant="h4"
              padding="0 0 32px 0"
              textAlign="left"
              sx={{ textTransform: 'uppercase', fontWeight: '700' }}
            >
              Привет, {first_name} 🤘
            </Typography>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12} container>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={toggle}
                        onChange={handleEditProfile}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label={EDIT_CHANGE_DATA}
                  />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    component={Link}
                    to={ChangePasswordPagePath.path}
                    sx={profileStyles.button}
                  >
                    {CHANGE_PASSWORD_TEXT}
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!toggle}
                  variant="outlined"
                  type="text"
                  id="profileFirstName"
                  label={FIRST_NAME_FIELD_LABEL}
                  {...register('first_name')}
                  error={!!errors?.first_name}
                  helperText={errors.first_name?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!toggle}
                  variant="outlined"
                  type="text"
                  id="profileSecondName"
                  label={SECOND_NAME_FIELD_LABEL}
                  {...register('second_name')}
                  error={!!errors.second_name}
                  helperText={errors.second_name?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!toggle}
                  variant="outlined"
                  type="text"
                  id="profileEmail"
                  label={EMAIL_FIELD_LABEL}
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!toggle}
                  variant="outlined"
                  type="text"
                  id="profilePhone"
                  label={PHONE_FIELD_LABEL}
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!toggle}
                  variant="outlined"
                  type="text"
                  id="profileLogin"
                  label={LOGIN_FIELD_LABEL}
                  {...register('login')}
                  error={!!errors.login}
                  helperText={errors.login?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!toggle}
                  variant="outlined"
                  type="text"
                  id="display_name"
                  label={DISPLAY_NAME_FIELD_LABEL}
                  {...register('display_name')}
                  error={!!errors.display_name}
                  helperText={errors.display_name?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={!isDirty || !isValid}
                  sx={{ opacity: toggle ? '1' : '0' }}
                >
                  {PROFILE_CHANGE_DATA}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
