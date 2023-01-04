import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, CardContent, CardActions, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
import { signup } from '@/store/user/user.actions';
import { RootState } from '@/store/store';

export const Registration = () => {
  const dispatch = useDispatch();
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
    // @ts-ignore
    dispatch(signup());
    if (isLoggedIn) {
      navigate(RootPath.path, { replace: true });
    }
  }, [dispatch, isLoggedIn, navigate]);

  const onSubmit = (data: SignupInputModel) => {
    // @ts-ignore
    dispatch(signup(data));
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
