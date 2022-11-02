import React from 'react'
import {
  Button,
  TextField,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import backgroundImg from '../../assets/images/background.jpg'
import {
    PHONE_REGEX,
    REQUIRED_VALUE_MESSAGE,
    MIN_MESSAGE,
    MAX_MESSAGE,
    PHONE_VALUE_MESSAGE,
    EMAIL_VALUE_MESSAGE
} from "@/сonstants/main";

type SignupSubmitForm = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    login: string,
    password: string;
}

export const SignupPage: React.FC = () => {
    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required(REQUIRED_VALUE_MESSAGE)
            .min(2,  MIN_MESSAGE + "2")
            .max(20, MAX_MESSAGE + "20"),
        lastname: Yup.string()
            .required(REQUIRED_VALUE_MESSAGE)
            .min(2,  MIN_MESSAGE + "2")
            .max(20, MAX_MESSAGE + "20"),
        login: Yup.string()
            .required(REQUIRED_VALUE_MESSAGE)
            .min(6, MIN_MESSAGE + "6")
            .max(20, MAX_MESSAGE + "20"),
        email: Yup.string()
            .required(REQUIRED_VALUE_MESSAGE)
            .email(EMAIL_VALUE_MESSAGE),
        phone:  Yup.string()
            .required(REQUIRED_VALUE_MESSAGE)
            .matches(PHONE_REGEX, PHONE_VALUE_MESSAGE),
        password: Yup.string()
            .required(REQUIRED_VALUE_MESSAGE)
            .min(6, MIN_MESSAGE + "6")
            .max(40, MAX_MESSAGE + "40"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<SignupSubmitForm>({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const onSubmit = (data: SignupSubmitForm) => {
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        <Grid container
             spacing={0}
             direction="column"
             alignItems="center"
             justifyContent="center"
             style={{
                 minHeight: "100vh",
                 backgroundImage:
                     `url(${backgroundImg})`,

                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
                 backgroundPosition: "center"
             }}>
            <Grid style={{
                    maxWidth: "709px",
                    padding: '50px 40px',
                    background: '#FAFAFA',
                    borderRadius: '10px',
                    width: "80%"
                 }}>
                <Typography variant="h1" fontSize="24px" align="center" mb={2} fontWeight="600">
                    Регистрация
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Grid item mb={2}>
                            <TextField
                                type="text"
                                label="Имя"
                                {...register('firstname')}
                                error={!!errors.firstname}
                                fullWidth
                            />
                            <Typography variant="inherit" color='#d32f2f'>
                                {errors.firstname?.message}
                            </Typography>
                    </Grid>

                    <Grid item mb={2}>
                            <TextField
                                type="text"
                                label="Фамилия"
                                {...register('lastname')}
                                error={!!errors.lastname}
                                fullWidth
                            />
                            <Typography variant="inherit" color='#d32f2f'>
                                {errors.lastname?.message}
                            </Typography>
                    </Grid>

                    <Grid item mb={2}>
                        <TextField
                            type="text"
                            label="Email"
                            {...register('email')}
                            error={!!errors.email}
                            fullWidth
                        />
                        <Typography variant="inherit" color='#d32f2f'>
                            {errors.email?.message}
                        </Typography>
                    </Grid>

                    <Grid item mb={2}>
                        <TextField
                            type="text"
                            label="Телефон"
                            {...register('phone')}
                            error={!!errors.phone}
                            fullWidth
                        />
                        <Typography variant="inherit" color='#d32f2f'>
                            {errors.phone?.message}
                        </Typography>
                    </Grid>

                    <Grid item mb={2}>
                        <TextField
                            type="text"
                            label="Логин"
                            {...register('login')}
                            error={!!errors.login}
                            fullWidth
                        />
                        <Typography variant="inherit" color='#d32f2f'>
                            {errors.login?.message}
                        </Typography>
                    </Grid>

                    <Grid item mb={2}>

                        <TextField
                            type="password"
                            label="Пароль"
                            fullWidth
                            {...register('password')}
                            error={!!errors.password}
                        />
                        <Typography variant="inherit" color='#d32f2f'>
                            {errors.password?.message}
                        </Typography>
                    </Grid>

                    <Grid item mb={3}>
                        <Button
                            variant="contained"
                            type="submit"
                            size="medium"
                            fullWidth
                            disabled={!isValid}
                        >
                            Регистрация
                        </Button>
                    </Grid>

                    <Grid
                          style={{
                              fontSize: "15px",
                              fontWeight: "700",
                              textAlign: "center"
                          }}
                          >
                        <Link href="#" underline="none">Войти</Link>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}
