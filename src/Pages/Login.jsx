import React from 'react';
import {
  Grid, 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ImageSide from '../components/ImageSide'
import FormsRegistration  from '../components/FormsRegistration '
import myBackgroundImageOne from '../assets/light.svg';
import myBackgroundImageTwo from '../assets/dark.svg';

const Login = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      
      {/* --- צד שמאל: תמונה --- */}
      <ImageSide lightImage={myBackgroundImageOne} darkImage={myBackgroundImageTwo}/>

      {/* --- צד ימין: טופס --- */}
      <FormsRegistration/>
    </Grid>
  );
};

export default Login;