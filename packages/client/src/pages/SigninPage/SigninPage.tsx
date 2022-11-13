import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Card,
  Grid,
  Stack,
  CardContent,
  CardActions,
} from '@mui/material';
import { SigninInputModel } from '@/models/auth.model';
import { SignupPagePath } from '@/router/paths';
import { signinFormValidationSchema } from '@/utils/formValidation';

export const SigninPage = () => {
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Card
        sx={{
          maxWidth: '552px',
          padding: '50px 40px',
          background: '#FAFAFA',
          borderRadius: '10px',
          width: '100%',
        }}
      >
        <Typography fontSize={24} fontWeight="600" padding="0 0 24px 0" align="center">
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                {...register('email')}
                id="email"
                label="Email"
                autoFocus
                error={!!errors?.email}
                helperText={errors.email?.message}
              />

              <TextField
                type="password"
                id="outlined-textarea"
                label="Пароль"
                error={!!errors?.password}
                helperText={errors.password?.message}
                {...register('password')}
              />

              <Typography variant="caption" fontSize={15} fontWeight={700} align="center">
                <Link to={SignupPagePath.path}>Нет аккаунта? Регистрация</Link>
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              size="medium"
              fullWidth
              disabled={!isValid}
              sx={{
                borderRadius: '10px',
              }}
            >
              Войти
            </Button>
          </CardActions>
        </form>
      </Card>
    </Grid>
  );
};
