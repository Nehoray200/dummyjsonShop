import React from 'react';
import {
  Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageSide from '../components/ImageSide'
import AuthForm from '../components/Form/AuthForm'
import Login_Light from '../assets/Login_Light.svg';
import Login_Dark from '../assets/Login_Dark.svg';
import { loginFields } from '../components/Form/formFields'

const Login = () => {


  return (
    <Grid container component="main" sx={{ height: '100%' }}>
      <ImageSide lightImage={Login_Light} darkImage={Login_Dark} />

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