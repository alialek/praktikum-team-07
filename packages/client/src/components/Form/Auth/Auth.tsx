import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Card,
  Box,
  Stack,
  CardContent,
  CardActions,
} from '@mui/material';
import { SigninInputModel } from '@/models/auth.model';
import { SignupPagePath } from '@/router/paths';
import {
  AUTH_LINK_TEXT,
  AUTH_BUTTON_TEXT,
  EMAIL_FIELD_LABEL,
  PASSWORD_FIELD_LABEL,
  AUTH_TITLE,
} from '@/сonstants/text';
import { signinFormValidationSchema } from '@/utils/formValidation';
import { loginFormStyles } from '@/components/Form/Styles';

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninInputModel>({
    resolver: yupResolver(signinFormValidationSchema),
    mode: 'onChange',
  });
  const onSubmit = (data: SigninInputModel) => console.log(data);
  return (
    <Box sx={loginFormStyles.boxWrapper}>
      <Card sx={loginFormStyles.card}>
        <Typography variant="h5" sx={loginFormStyles.title}>
          {AUTH_TITLE}
        </Typography>
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
      </Card>
    </Box>
  );
};