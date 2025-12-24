import React from 'react';
import {
  Grid, 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageSide from '../components/ImageSide'
import AuthForm  from '../components/Form/AuthForm'
import myBackgroundImageOne from '../assets/light.svg';
import myBackgroundImageTwo from '../assets/dark.svg';
import {loginFields} from '../utils/formFields'

const Login = () => {

   
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>

      <ImageSide lightImage={myBackgroundImageOne} darkImage={myBackgroundImageTwo}/>

      <AuthForm 
                title={"Sign In"}
                buttonText={"Login"}
                fields={loginFields}
                onSubmit={() => console.log("Form Submitted")}
            />
    </Grid>
  );
};

export default Login;