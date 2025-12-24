import React from 'react';
import {
  Grid, 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageSide from '../components/ImageSide'
import AuthForm  from '../components/Form/AuthForm'
import myBackgroundImageOne from '../assets/light.svg';
import myBackgroundImageTwo from '../assets/dark.svg';

const Login = () => {

    const registerFields = [
    { 
        id: 'email', 
        label: 'Email Address', 
        name: 'email', 
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        errorMessage: 'Email is incorrect missing @ or .'
    },
    { 
        id: 'password', 
        label: 'Password', 
        name: 'password', 
        type: 'password', 
        required: true,
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        errorMessage: 'מינימום 6 תווים, כולל אותיות ומספרים'
    },
    // שדה ללא ולידציה מיוחדת
    { 
        id: 'firstName', 
        label: 'First Name', 
        name: 'firstName', 
        width: 6, 
        required: true 
    } 
];
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>

      <ImageSide lightImage={myBackgroundImageOne} darkImage={myBackgroundImageTwo}/>

      <AuthForm 
                title={"Sign In"}
                buttonText={"Login"}
                fields={registerFields}
                onSubmit={() => console.log("Form Submitted")}
            />
    </Grid>
  );
};

export default Login;