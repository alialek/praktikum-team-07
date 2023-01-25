import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardActions, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 } from 'uuid';
import { AxiosError } from 'axios';
import { passwordValidationSchema } from '@/utils/formValidation';
import { ProfilePagePath } from '@/router/paths';
import {
  PROFILE_CHANGE_DATA,
  BACK_TEXT,
  SECOND_PASSWORD_FIELD_LABEL,
  FIRST_PASSWORD_FIELD_LABEL,
  REPEAT_PASSWORD_FIELD_LABEL,
} from '@/сonstants/text';
import { changePasswordStyles } from '@/components/Form/Styles';

import { ProfileService } from '@/api/services/profile';
import { ChangePasswordModel } from '@/models/user.model';
import { Notification } from '@/store/alert/alert.slice';
import { enqueueSnackbar as enqueueSnackbarAction } from '@/store/alert/alert.actions';
import { useAppDispatch } from '@/hooks';
import { ErrorNotificationMessage, KnownError } from '@/store/user/user.slice';

export const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const enqueueSnackbar = (args: Notification) =>
    dispatch(enqueueSnackbarAction({ ...args }));
  const { changePassword } = ProfileService;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePasswordModel>({
    resolver: yupResolver(passwordValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: ChangePasswordModel) => {
    const { oldPassword, newPassword } = data;

    changePassword({ oldPassword, newPassword })
      .then(() => {
        enqueueSnackbar({
          key: v4(),
          message: 'Пароль изменён 🔑',
          options: {
            key: v4(),
            variant: 'success',
          },
        });
      })
      .then(() => reset())
      .catch((e: AxiosError) => {
        const {
          data: { reason },
        } = e.response as unknown as KnownError<ErrorNotificationMessage>;
        enqueueSnackbar({
          key: v4(),
          message: `😐 ${reason}`,
          options: {
            key: v4(),
            variant: 'error',
          },
        });
      });
  };

  return (
    <Card sx={changePasswordStyles.card}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardContent>
          <Stack direction="column" spacing={2}>
            <TextField
              variant="filled"
              type="password"
              id="password"
              label={FIRST_PASSWORD_FIELD_LABEL}
              {...register('oldPassword')}
              error={!!errors?.oldPassword}
              helperText={errors.oldPassword?.message}
              fullWidth
            />

            <TextField
              variant="filled"
              type="password"
              id="passwordNew"
              label={SECOND_PASSWORD_FIELD_LABEL}
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              fullWidth
            />

            <TextField
              variant="filled"
              type="password"
              id="passwordNewRepeat"
              label={REPEAT_PASSWORD_FIELD_LABEL}
              {...register('newPasswordRepeat')}
              error={!!errors.newPasswordRepeat}
              helperText={errors.newPasswordRepeat?.message}
              fullWidth
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack sx={changePasswordStyles.btnBlock} direction="column" width="100%">
            <Button type="submit" disabled={!isValid} sx={changePasswordStyles.button}>
              {PROFILE_CHANGE_DATA}
            </Button>

            <Button
              component={Link}
              to={ProfilePagePath.path}
              sx={changePasswordStyles.link}
            >
              {BACK_TEXT}
            </Button>
          </Stack>
        </CardActions>
      </form>
    </Card>
  );
};
