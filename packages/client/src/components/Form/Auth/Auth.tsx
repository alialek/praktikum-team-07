import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Stack, CardContent, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SigninInputModel } from '@/models/auth.model';
import { SignupPagePath, RootPath } from '@/router/paths';
import {
  AUTH_LINK_TEXT,
  AUTH_BUTTON_TEXT,
  LOGIN_FIELD_LABEL,
  PASSWORD_FIELD_LABEL,
} from '@/сonstants/text';
import { signinFormValidationSchema } from '@/utils/formValidation';
import { loginFormStyles } from '@/components/Form/Styles';
import { signin } from '@/store/user/user.actions';
import { RootState } from '@/store/store';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninInputModel>({
    resolver: yupResolver(signinFormValidationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    // @ts-ignore
    dispatch(signin());
    if (isLoggedIn) {
      navigate(RootPath.path, { replace: true });
    }
  }, [dispatch, isLoggedIn, navigate]);

  const onSubmit = (data: SigninInputModel) => {
    // @ts-ignore
    dispatch(signin(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <TextField
            type="text"
            {...register('login')}
            id="authEmail"
            label={LOGIN_FIELD_LABEL}
            autoFocus
            error={!!errors?.login}
            helperText={errors.login?.message}
          />

          <TextField
            type="password"
            id="authPassword"
            label={PASSWORD_FIELD_LABEL}
            error={!!errors?.password}
            helperText={errors.password?.message}
            {...register('password')}
          />

          <Button component={Link} to={SignupPagePath.path} sx={loginFormStyles.link}>
            {AUTH_LINK_TEXT}
          </Button>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          type="submit"
          size="medium"
          fullWidth
          disabled={!isValid}
          sx={loginFormStyles.button}
        >
          {AUTH_BUTTON_TEXT}
        </Button>
      </CardActions>
    </form>
  );
};
