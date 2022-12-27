import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Stack, CardContent, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SigninInputModel } from '@/models/auth.model';
import { SignupPagePath, RootPath } from '@/router/paths';
import {
  AUTH_LINK_TEXT,
  AUTH_BUTTON_TEXT,
  EMAIL_FIELD_LABEL,
  PASSWORD_FIELD_LABEL,
  AUTH_BUTTON_YANDEX,
} from '@/сonstants/text';
import { signinFormValidationSchema } from '@/utils/formValidation';
import { loginFormStyles } from '@/components/Form/Styles';
import { setIsLoggedIn } from '@/store/user/user.slice';
import YandexIcon from '../../../assets/images/Yandex_icon.svg';
import { OauthService } from '@/api/services/oauth';

// type Props = {}

// type State = OauthSingInModel & {
//   access_token: string;
// }

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serviceId, setServiceId] = useState<string>();
  const [accessCode, setAccessCode] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninInputModel>({
    resolver: yupResolver(signinFormValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {
    dispatch(setIsLoggedIn());
    navigate(RootPath.path, { replace: true });
  };

  const takeOauthAunthification = () => {
    console.log('call ya-practicum api');
    OauthService.getServiceId()
      .then((response: any) => {
        setServiceId(response.data.service_id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    console.log(serviceId);
    console.log('call yandex oauth service');
    OauthService.getAccessCode(serviceId!)
      .then((response: any) => {
        setAccessCode(response.data.code);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    console.log(accessCode);
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
      <CardActions>
        <Button
          variant="info"
          type="button"
          size="medium"
          fullWidth
          sx={loginFormStyles.button}
          startIcon={<img src={YandexIcon} />}
          onClick={takeOauthAunthification}
        >
          {AUTH_BUTTON_YANDEX}
        </Button>
      </CardActions>
    </form>
  );
};
