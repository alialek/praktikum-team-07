import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Stack, CardContent, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
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
import { getUserInfo, signin } from '@/store/user/user.actions';
import { AppDispatch } from '@/store/store';
import YandexIcon from '../../../assets/images/Yandex_icon.svg';
import { OauthService } from '@/api/services/oauth';
import { REDIRECT_URI } from '@/сonstants/main';
import { enqueueSnackbar as enqueueSnackbarAction } from '@/store/alert/alert.actions';
import { window } from '@/utils/ssrWindow';
import { Notification } from '@/store/alert/alert.slice';

export const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const enqueueSnackbar = (args: Notification) =>
    dispatch(enqueueSnackbarAction({ ...args }));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninInputModel>({
    resolver: yupResolver(signinFormValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (formData: SigninInputModel) => {
    dispatch(signin(formData)).then(({ payload }) => {
      if (payload && payload.status === 401) {
        enqueueSnackbar({
          key: v4(),
          // @ts-ignore
          message: `😐 ${payload.reason}`,
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

  const takeOauthAuthentication = async () => {
    try {
      const response = await OauthService.getServiceId();
      const yapServiceId = response.data.service_id;
      window.open(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yapServiceId}&redirect_uri=${REDIRECT_URI}`,
        '_self',
      );
    } catch (error) {
      console.log(error);
    }
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
      <CardActions>
        <Button
          variant="contained"
          type="button"
          size="medium"
          fullWidth
          sx={loginFormStyles.yaButton}
          startIcon={<img src={YandexIcon} alt="YandexIcon" />}
          onClick={takeOauthAuthentication}
        >
          {AUTH_BUTTON_YANDEX}
        </Button>
      </CardActions>
    </form>
  );
};
