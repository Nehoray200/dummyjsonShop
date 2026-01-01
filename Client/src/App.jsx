import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material'; // ניקיתי imports מיותרים
import axios from 'axios';

import { ServerContext } from './Context/ServerContext';
import { ColorModeProvider } from './Context/ColorModeContext';
import { AuthProvider } from './Context/AuthProvider';
import Navbar from './components/Nav/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import SingleCategory from './Pages/SingleCategory';
import AllCategories from './Pages/AllCategories';
import SingleProduct from './Pages/SingleProduct';

function App() {
  
  const dummyServer = axios.create({ baseURL: 'https://dummyjson.com' });
  const localServer = axios.create({ baseURL: 'http://localhost:3000' });

  return (
    <ColorModeProvider>
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
                  <Route path='/Profile' element={<Profile />} />
                </Routes>
              </Box>
            </Box>
          </AuthProvider>
        </ServerContext.Provider>
      </BrowserRouter>
    </ColorModeProvider>
  );
}

export default App;