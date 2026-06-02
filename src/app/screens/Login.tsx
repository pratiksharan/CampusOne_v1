import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, TextField, Typography, Box, Paper, IconButton, InputAdornment, Chip, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion, AnimatePresence } from 'motion/react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

const VALID_DOMAINS = ['.ac.in', '.edu', '.edu.in'];

function isCollegeEmail(email: string): boolean {
  const lower = email.toLowerCase().trim();
  return VALID_DOMAINS.some((d) => lower.endsWith(d));
}

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 'success'>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem('campusone_auth')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }

    // Cleanup function when leaving the page
    return () => {
      if (Capacitor.isNativePlatform()) {
        StatusBar.setStyle({ style: Style.Dark });
        StatusBar.setBackgroundColor({ color: '#0f2460' });
      }
    };
  }, []);

  const handleEmailContinue = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('Please enter your college email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!isCollegeEmail(trimmed)) {
      setEmailError('Only official college emails allowed (.ac.in, .edu, .edu.in)');
      return;
    }
    setEmailError('');
    setStep(2);
  };

  const handleLogin = () => {
    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      localStorage.setItem('campusone_auth', 'true');
      setTimeout(() => navigate('/', { replace: true }), 1400);
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: 'linear-gradient(160deg, #0f2460 0%, #1E3A8A 50%, #2548a0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 100,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
        }}
      />

      {/* Top branding */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pb: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            CampusOne
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              mt: 0.5,
            }}
          >
            Your verified campus hub
          </Typography>
        </motion.div>
      </Box>

      {/* Card sliding up */}
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, delay: 0.2 }}
        style={{ width: '100%', maxWidth: '450px', zIndex: 2 }}
      >
        <Paper
          elevation={24}
          sx={{
            borderRadius: '32px 32px 0 0',
            px: 4,
            pt: 4,
            pb: 6,
            minHeight: 400,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          {/* Verified badge */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: 16, color: '#2d5be3 !important' }} />}
              label="College Email Verified Access Only"
              sx={{
                background: 'rgba(45, 91, 227, 0.1)',
                color: '#2d5be3',
                fontWeight: 600,
                fontSize: '13px',
                height: 36,
                borderRadius: '12px',
                px: 1,
                '& .MuiChip-icon': { ml: '8px' },
              }}
            />
          </Box>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Typography variant="h3" sx={{ color: '#0f2460', mb: 1, textAlign: 'center' }}>
                  Welcome back
                </Typography>
                <Typography sx={{ fontSize: '15px', color: '#64748B', mb: 4, textAlign: 'center' }}>
                  Sign in with your college email to continue
                </Typography>

                <TextField
                  fullWidth
                  placeholder="yourname@college.ac.in"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmailContinue()}
                  error={!!emailError}
                  helperText={emailError}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: '#94A3B8', fontSize: 22 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {emailError && (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#94A3B8',
                      mt: -1,
                      mb: 2,
                      fontStyle: 'italic',
                      pl: 2
                    }}
                  >
                    Accepted domains: .ac.in, .edu, .edu.in
                  </Typography>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleEmailContinue}
                  sx={{
                    mt: emailError ? 1 : 3,
                    height: 56,
                    fontSize: '16px',
                  }}
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Typography variant="h3" sx={{ color: '#0f2460', mb: 1 }}>
                  Enter password
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                  <Typography sx={{ fontSize: '15px', color: '#64748B' }}>
                    Signing in as <span style={{ fontWeight: 600, color: '#0f2460' }}>{email}</span>
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => { setStep(1); setPasswordError(''); }}
                    sx={{ minWidth: 'auto', p: 0.5, fontSize: '13px', fontWeight: 600 }}
                  >
                    Change
                  </Button>
                </Box>

                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  error={!!passwordError}
                  helperText={passwordError}
                  autoFocus
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ fontSize: 20, color: '#94A3B8' }} />
                            ) : (
                              <Visibility sx={{ fontSize: 20, color: '#94A3B8' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 1 }}>
                  <Button size="small" sx={{ p: 0, fontSize: '13px' }}>
                    Forgot password?
                  </Button>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{ height: 56, fontSize: '16px' }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Sign In'}
                </Button>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: 32,
                  paddingBottom: 16,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                >
                  <CheckCircleIcon sx={{ fontSize: 80, color: '#10b981' }} />
                </motion.div>
                <Typography variant="h3" sx={{ color: '#0f2460', mt: 3, textAlign: 'center' }}>
                  Welcome back!
                </Typography>
                <Typography sx={{ fontSize: '15px', color: '#64748B', mt: 1, textAlign: 'center' }}>
                  Redirecting to your dashboard...
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Box>
  );
}