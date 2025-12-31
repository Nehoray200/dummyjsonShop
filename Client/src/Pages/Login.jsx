import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ServerContext } from '../Context/ServerContext';
import { AuthContext } from '../Context/AuthProvider';
import ImageSide from '../components/ImageSide';
import AuthForm from '../components/Form/AuthForm';
import Login_Light from '../assets/Login_Light.svg';
import Login_Dark from '../assets/Login_Dark.svg';
import GlobalAlert from '../components/GlobalAlert'; // וודא שהייבוא קיים
import { loginFields } from '../components/Form/formFields';

const Login = () => {
  const { localServer } = useContext(ServerContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const handleLogin = async (data) => {
    try {
      setLoginError(""); 
      
      const { email, password } = data;
      const response = await localServer.get('/users/login', {
        params: {
          email: email,
          password: password
        }
      });
      
      login(response.data);
      navigate('/');

    } catch (error) {
      console.error(error);
      // השרת מחזיר 404 כשהסיסמה לא נכונה, אנחנו תופסים את זה כאן
      setLoginError(error.response?.data || "Login failed");
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100%' }}>
      <ImageSide lightImage={Login_Light} darkImage={Login_Dark} />

      <AuthForm
        title={"Sign In"}
        buttonText={"Login"}
        fields={loginFields}
        onSubmit={handleLogin}
      />
      <GlobalAlert message={loginError} /> 
      
    </Grid>
  );
};

export default Login;