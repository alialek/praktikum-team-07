import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Link,
  Button,
  TextField,
  Typography,
  Card,
  Box,
  Grid,
  Stack,
  CardContent,
  CardActions,
} from '@mui/material';
import { SigninInputModel } from '@/models/auth.model';
import { SignupPagePath } from '@/router/paths';
import {
  REQUIRED_VALUE_MESSAGE,
  EMAIL_VALUE_MESSAGE,
} from '@/сonstants/validationMessages';
import * as FormValidate from '../../utils/formValidation';

export const SigninPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInputModel>({
    resolver: yupResolver(FormValidate.loginFormValidationSchema),
  });
  const onSubmit = (data: SigninInputModel) => console.log(data);
  return (
    <Box
      component="div"
      sx={{ maxWidth: 552, ml: 'auto', mr: 'auto', transform: 'scale(0.8)' }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card
              sx={{
                minWidth: 552,
                padding: '50px 40px',
                borderRadius: '10px',
                backgroundColor: '#FAFAFA',
              }}
            >
              <CardContent>
                <Typography
                  fontSize={24}
                  fontWeight="600"
                  padding="0 0 24px 0"
                  align="center"
                >
                  Вход
                </Typography>

                <Stack direction="column" spacing={4}>
                  <TextField
                    {...register('login')}
                    id="email"
                    label="Email"
                    placeholder="Email"
                    autoFocus
                    variant="outlined"
                    error={!!errors?.login}
                    helperText={errors.login && EMAIL_VALUE_MESSAGE}
                  />

                  <TextField
                    type="password"
                    id="outlined-textarea"
                    label="Пароль"
                    placeholder="Пароль"
                    error={!!errors?.password}
                    helperText={errors.password && REQUIRED_VALUE_MESSAGE}
                    multiline
                    {...register('password')}
                  />

                  <Typography
                    variant="caption"
                    fontSize={18}
                    fontWeight="500"
                    align="center"
                  >
                    <Link href={SignupPagePath.path} underline="none">
                      Нет аккаунта? Регистрация
                    </Link>
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: '10px',
                  }}
                >
                  Войти
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
