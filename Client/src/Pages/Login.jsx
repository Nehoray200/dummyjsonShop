import React, { useContext, useState } from 'react';
import { Grid, Stack, Typography, Box, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
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
    <Grid container component="main" sx={{
      pt: 2,
      height: '100%',
      display: 'flex',
      backgroundColor: "background.paper",
      color: 'text.primary',
    }}
    >
      <ImageSide lightImage={Login_Light} darkImage={Login_Dark} />

      <Stack spacing={2} sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper'
      }}>

        <AuthForm
          title={"Sign In"}
          buttonText={"Login"}
          fields={loginFields}
          onSubmit={handleLogin}
        />

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="body2" color="text.secondary"> Don't have an account? </Typography>
          <Button
            component={Link}
            to="/register"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Register
          </Button>
        </Box>
      </Stack>
      <GlobalAlert message={loginError} />

    </Grid>
  );
};

export default Login;