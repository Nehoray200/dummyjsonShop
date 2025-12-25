import React from 'react';
import {
  Grid, 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageSide from '../components/ImageSide'
import AuthForm  from '../components/Form/AuthForm'
import myBackgroundImageOne from '../assets/Register_Light.svg';
import myBackgroundImageTwo from '../assets/Register_Dark.svg';
import {registerFields} from '../utils/formFields'

const Register = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>

      <ImageSide lightImage={myBackgroundImageOne} darkImage={myBackgroundImageTwo}/>

      <AuthForm 
                title={"Sign up"}
                buttonText={"Register"}
                fields={registerFields}
                onSubmit={() => console.log("Form Submitted")}
            />
    </Grid>
  );
};

export default Register