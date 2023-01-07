// import React, { useState } from 'react';
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
  AUTH_BUTTON_YANDEX,
} from '@/сonstants/text';
import { signinFormValidationSchema } from '@/utils/formValidation';
import { loginFormStyles } from '@/components/Form/Styles';
import { signin } from '@/store/user/user.actions';
import { RootState } from '@/store/store';
import YandexIcon from '../../../assets/images/Yandex_icon.svg';
import { OauthService } from '@/api/services/oauth';
import { REDIRECT_URI } from '@/сonstants/main';

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

  const takeOauthAunthification = async () => {
    console.log('call ya-practicum api');
    try {
      const response: any = await OauthService.getServiceId();
      const yapServiceId = response.data.service_id;
      const yaRedirectUri: string = window.location.origin;
      localStorage.setItem('redirect_uri', yaRedirectUri);
      window.open(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yapServiceId}&redirect_uri=${REDIRECT_URI}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-return-assign
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
      <CardActions>
        <Button
          variant="contained"
          type="button"
          size="medium"
          fullWidth
          sx={loginFormStyles.yaButton}
          startIcon={<img src={YandexIcon} />}
          onClick={takeOauthAunthification}
        >
          {AUTH_BUTTON_YANDEX}
        </Button>
      </CardActions>
    </form>
  );
};
