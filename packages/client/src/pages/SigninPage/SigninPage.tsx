import React from 'react';
// import { Link } from 'react-router-dom';
import { SignupPagePath } from '@/router/paths';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Link, Button, TextField, Typography, Card, Box, Grid, Stack, CardContent, CardActions} from '@mui/material'

// import Image from '../../assets/images/background.png';


interface IFormInputs {
    email: string
    password: string
  }
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }).required();

// const styles = {
//   paperContainer: {
//     backgroundImage: `url(${Image})`,
    
//   }
// };

export const SigninPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);
  return (
    // <Box 
    // component="div"
    // style={styles.paperContainer}
    // sx={{backgroungSize: "cover", backgroundRepeat: "no-repeat"}}>
    <Box 
      component="div"
      sx={{maxWidth: 552, ml: 'auto', mr: 'auto'}}
    >
      <Box 
        component="span"
        sx={{ display: 'inline-block', transform: 'scale(0.8)'}}
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
              <Card sx={{ minWidth: 552, padding: '50px 40px', borderRadius: '10px', }}>
                <CardContent>
                  <Typography 
                    fontSize={24} 
                    fontWeight="600" 
                    padding="0 0 24px 0"
                    align="center">
                    Вход
                  </Typography>
            
                  <Stack direction="column" spacing={4}>
                    <TextField             
                      {...register("email")}
                      id="email"
                      label="Email"
                      placeholder="Email"
                      autoFocus
                      variant="outlined"
                      error={!!errors?.email}
                      helperText={errors.email && "Поле е-mail должно иметь корректное значение"}
                      />

                    <TextField
                      type="password"
                      id="outlined-textarea"
                      label="Пароль"
                      placeholder="Пароль"
                      error={!!errors?.password}
                      helperText={errors.password && "Поле пароля должно быть заполнено"}
                      multiline 
                      
                      {...register("password")}/>

  
                      <Typography
                        variant="caption"
                        fontSize={18} 
                        fontWeight="500"
                        align="center"
                      >
                        <Link 
                          href={SignupPagePath.path}
                          underline="none">
                          Нет аккаунта? Регистрация</Link>
                        
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
                        borderRadius: '10px'}}
                    >
                      Войти
                  </Button>
                </CardActions>
                
              </Card>  
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  // </Box>

  )
}
