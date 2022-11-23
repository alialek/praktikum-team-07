import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Button, TextField, Stack, CardContent, CardActions } from '@mui/material';
// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SigninInputModel } from '@/models/auth.model';
import { SignupPagePath } from '@/router/paths';
import {
  AUTH_LINK_TEXT,
  AUTH_BUTTON_TEXT,
  EMAIL_FIELD_LABEL,
  PASSWORD_FIELD_LABEL,
} from '@/сonstants/text';
import { signinFormValidationSchema } from '@/utils/formValidation';
import { loginFormStyles } from '@/components/Form/Styles';
import { signin } from '@/store/user/user.actions';

export const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const [isLoggedIn, setIsLoggedIn] = useState(user?.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninInputModel>({
    resolver: yupResolver(signinFormValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SigninInputModel) => {
    dispatch(signin(JSON.stringify(data)));
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Stack direction="column" spacing={2}>
          <TextField
            type="text"
            {...register('email')}
            id="authEmail"
            label={EMAIL_FIELD_LABEL}
            autoFocus
            error={!!errors?.email}
            helperText={errors.email?.message}
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
