import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0f2460', // Dark Navy
      light: '#1c3b8a',
      dark: '#081335',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2d5be3', // Blue accent
      light: '#567ded',
      dark: '#1e40a6',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC', // Slate 50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#64748b', // Slate 500
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16, // Modern soft corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(15, 36, 96, 0.15)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0f2460 0%, #1c3b8a 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0d1e52 0%, #152d6e 100%)',
          }
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #2d5be3 0%, #4a74f0 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #234ab8 0%, #3a60cf 100%)',
          }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(15, 36, 96, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          overflow: 'visible', // Allows floating elements to stick out
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(15, 36, 96, 0.05)',
        },
        elevation8: {
          boxShadow: '0 12px 40px rgba(15, 36, 96, 0.12)',
        }
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '8px',
          fontFamily: '"Inter", sans-serif',
        },
        filled: {
          backgroundColor: '#f1f5f9',
          color: '#334155',
          border: '1px solid transparent',
        },
        colorPrimary: {
          backgroundColor: 'rgba(15, 36, 96, 0.1)',
          color: '#0f2460',
        },
        colorSecondary: {
          backgroundColor: 'rgba(45, 91, 227, 0.1)',
          color: '#2d5be3',
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.2s',
            '&:hover fieldset': {
              borderColor: '#2d5be3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2d5be3',
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
});
