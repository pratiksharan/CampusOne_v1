import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { App as CapApp } from '@capacitor/app';
import { theme } from './theme';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    const backListener = CapApp.addListener('backButton', () => {
      const currentPath = window.location.pathname;
      
      // If we are NOT on the main landing pages, go back in history
      if (currentPath !== '/' && currentPath !== '/login') {
        router.navigate(-1);
      } else {
        // On root pages, minimize or exit (Capacitor default)
        CapApp.exitApp();
      }
    });

    return () => {
      backListener.then(l => l.remove());
    };
  }, []);

  return (
    <div className="h-full">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}