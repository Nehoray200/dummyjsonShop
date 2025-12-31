import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { ServerContext } from './Context/ServerContext';
import { ColorModeContext } from './Context/ColorModeContext';
import { AuthProvider } from './Context/AuthProvider';
import Navbar from './components/Nav/Navbar'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import axios from 'axios';
import getDesignTokens from './Theme/theme'
import SingleCategory from './Pages/SingleCategory'
import AllCategories from './Pages/AllCategories'
import SingleProduct from './Pages/SingleProduct'

function App() {
  const dummyServer = axios.create({ baseURL: 'https://dummyjson.com' });
  const localServer = axios.create({ baseURL: 'http://localhost:3000' });

  const [mode, setMode] = useState('light')
  const [theme, setTheme] = useState(createTheme({ palette: { mode: mode } }));

  useEffect(() => {
    const themeConfig = getDesignTokens(mode);
    const newTheme = createTheme(themeConfig);
    setTheme(newTheme);
  }, [mode])


  const toggleColorMode = () => {
    setMode((prvMode) => (prvMode == 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <ColorModeContext.Provider value={{ toggleColorMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <ServerContext.Provider value={{ dummyServer, localServer }}>
              <AuthProvider>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Navbar />
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path='/Categories/' element={<AllCategories />} />
                    <Route path='/Category/:id' element={<SingleCategory />} />
                    <Route path='/Products/:id' element={<SingleProduct />} />
                  </Routes>
                </Box>
              </Box>
              </AuthProvider>
            </ServerContext.Provider>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider >
    </>
  )
}

export default App
