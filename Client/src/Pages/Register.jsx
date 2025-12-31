import React, { useContext, useState } from 'react'; // הוספת useState
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ServerContext } from '../Context/ServerContext';
import { AuthContext } from '../Context/AuthProvider';
import ImageSide from '../components/ImageSide';
import AuthForm from '../components/Form/AuthForm';
import GlobalAlert from '../components/GlobalAlert';
import myBackgroundImageOne from '../assets/Register_Light.svg';
import myBackgroundImageTwo from '../assets/Register_Dark.svg';
import { registerFields } from '../components/Form/formFields'

const Register = () => {
  const { localServer } = useContext(ServerContext);
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");

  const handleRegister = async (formData) => {
    try {
      setRegisterError("");
      const response = await localServer.post('/users/register',formData)
      navigate('/login');

    } catch (error) {
      console.error(error);
      setRegisterError(error.response?.data || "Register failed");
    }
  };
  return (
    <Grid container component="main" sx={{ height: '100%' }}>

      <ImageSide lightImage={myBackgroundImageOne} darkImage={myBackgroundImageTwo} />

      <AuthForm
        title={"Sign up"}
        buttonText={"Register"}
        fields={registerFields}
        onSubmit={handleRegister}
      />
       <GlobalAlert message={registerError} />
    </Grid>
  );
};

export default Register