import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, CardContent, CardActions, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { signupFormValidationSchema } from '@/utils/formValidation';
import { RootPath, SigninPagePath } from '@/router/paths';
import { SignupInputModel } from '@/models/auth.model';
import {
  REGISTRATION_LINK_TEXT,
  REGISTRATION_BUTTON_TEXT,
  FIRST_NAME_FIELD_LABEL,
  SECOND_NAME_FIELD_LABEL,
  EMAIL_FIELD_LABEL,
  PHONE_FIELD_LABEL,
  LOGIN_FIELD_LABEL,
  PASSWORD_FIELD_LABEL,
} from '@/сonstants/text';
import { loginFormStyles } from '@/components/Form/Styles';
import { getUserInfo, signup } from '@/store/user/user.actions';
import { window } from '@/utils/ssrWindow';
import { AppDispatch, RootState } from '@/store/store';
import { Notification } from '@/store/alert/alert.slice';
import { enqueueSnackbar as enqueueSnackbarAction } from '@/store/alert/alert.actions';

export const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const enqueueSnackbar = (args: Notification) =>
    dispatch(enqueueSnackbarAction({ ...args }));
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupInputModel>({
    resolver: yupResolver(signupFormValidationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isLoggedIn) {
      window.localStorage.setItem('user_in', JSON.stringify(isLoggedIn));
      navigate(RootPath.path, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (formData: SignupInputModel) => {
    dispatch(signup(formData)).then(({ payload }) => {
      if (payload && 'reason' in payload && payload?.status === 401) {
        enqueueSnackbar({
          key: v4(),
          message: payload?.reason as string,
          options: {
            key: v4(),
            variant: 'error',
          },
        });
      } else if (payload && payload.status === 200) {
        navigate(RootPath.path, { replace: true });
        dispatch(getUserInfo());
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <TextField
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
            type="text"
            id="registrationSecondName"
            label={SECOND_NAME_FIELD_LABEL}
            {...register('second_name')}
            error={!!errors.second_name}
            helperText={errors.second_name?.message}
            fullWidth
          />

          <TextField
            type="text"
            id="registrationEmail"
            label={EMAIL_FIELD_LABEL}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            type="text"
            id="registrationPhone"
            label={PHONE_FIELD_LABEL}
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
          />

          <TextField
            type="text"
            id="registrationLogin"
            label={LOGIN_FIELD_LABEL}
            {...register('login')}
            error={!!errors.login}
            helperText={errors.login?.message}
            fullWidth
          />

          <TextField
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
        <Stack direction="column" width="100%" spacing={3}>
          <Button
            variant="contained"
            type="submit"
            size="medium"
            fullWidth
            disabled={!isValid}
            sx={loginFormStyles.button}
          >
            {REGISTRATION_BUTTON_TEXT}
          </Button>

          <Button component={Link} to={SigninPagePath.path} sx={loginFormStyles.link}>
            {REGISTRATION_LINK_TEXT}
          </Button>
        </Stack>
      </CardActions>
    </form>
  );
};
