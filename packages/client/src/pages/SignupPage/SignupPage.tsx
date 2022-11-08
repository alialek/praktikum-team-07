import React from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Link,
  Card,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupFormValidationSchema } from '@/utils/formValidation';
import { SigninPagePath } from '@/router/paths';
import { SignupInputModel } from '@/models/auth.model';

export const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupInputModel>({
    resolver: yupResolver(signupFormValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignupInputModel) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
      }}
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
        <Typography variant="h1" fontSize="24px" align="center" mb={2} fontWeight="600">
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                label="Имя"
                {...register('first_name')}
                error={!!errors?.first_name}
                helperText={errors.first_name?.message}
                fullWidth
                autoFocus
              />

              <TextField
                type="text"
                label="Фамилия"
                {...register('second_name')}
                error={!!errors.second_name}
                helperText={errors.second_name?.message}
                fullWidth
              />

              <TextField
                type="text"
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />

              <TextField
                type="text"
                label="Телефон"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />

              <TextField
                type="text"
                label="Логин"
                {...register('login')}
                error={!!errors.login}
                helperText={errors.login?.message}
                fullWidth
              />

              <TextField
                type="password"
                label="Пароль"
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
                sx={{
                  borderRadius: '10px',
                }}
              >
                Регистрация
              </Button>

              <Typography fontSize={15} fontWeight={700} align="center">
                <Link href={SigninPagePath.path} underline="none">
                  Войти
                </Link>
              </Typography>
            </Stack>
          </CardActions>
        </form>
      </Card>
    </Grid>
  );
};
