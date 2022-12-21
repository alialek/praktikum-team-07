import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardActions, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordModel>({
    resolver: yupResolver(passwordValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: ChangePasswordModel) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { newPasswordRepeat, ...password } = data;

    ProfileService.changePassword(password);
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
