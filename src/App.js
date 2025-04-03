import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context
import { AuthContext } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VideoList from './pages/videos/VideoList';
import VideoEditor from './pages/videos/VideoEditor';
import SubscriptionManager from './pages/subscription/SubscriptionManager';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/videos" element={
            <ProtectedRoute>
              <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
                <VideoList />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/videos/:id" element={
            <ProtectedRoute>
              <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
                <VideoEditor />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/subscription" element={
            <ProtectedRoute>
              <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode}>
                <SubscriptionManager />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
