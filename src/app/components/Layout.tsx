import { Outlet, useLocation, useNavigate } from 'react-router';
import { BottomNavigation, BottomNavigationAction, Paper, CircularProgress, Skeleton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { motion, AnimatePresence } from 'motion/react';

const GenericSkeleton = () => (
  <Box sx={{ p: 2, pt: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 2 }}>
      <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" height={24} />
      </Box>
    </Box>
    <Box sx={{ px: 2 }}>
      <Skeleton variant="rounded" width="100%" height={260} sx={{ mb: 3, borderRadius: '24px' }} />
      <Skeleton variant="rounded" width="100%" height={160} sx={{ mb: 3, borderRadius: '24px' }} />
      <Skeleton variant="rounded" width="100%" height={160} sx={{ borderRadius: '24px' }} />
    </Box>
  </Box>
);

const DelayedOutlet = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      {loading ? (
        <GenericSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#0f2460' });
    }
  }, []);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/groups' || path === '/study-groups') return 'groups';
    if (path === '/create-post') return 'post';
    if (path === '/clubs' || path.startsWith('/clubs/')) return 'clubs';
    if (path === '/profile') return 'profile';
    return '';
  };

  const handleNavigation = (newValue: string) => {
    switch (newValue) {
      case 'home':
        navigate('/');
        break;
      case 'groups':
        navigate('/study-groups');
        break;
      case 'post':
        navigate('/create-post');
        break;
      case 'clubs':
        navigate('/clubs');
        break;
      case 'profile':
        navigate('/profile');
        break;
    }
  };

  // Pull-to-refresh state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pullY, setPullY] = useState(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0 && !refreshing) {
      const diff = e.touches[0].clientY - touchStartY.current;
      if (diff > 0 && diff < 120) {
        setPullY(diff);
      }
    }
  }, [refreshing]);

  const handleTouchEnd = useCallback(() => {
    if (pullY > 60 && !refreshing) {
      setRefreshing(true);
      setPullY(60);
      // Simulate refresh
      setTimeout(() => {
        setRefreshing(false);
        setPullY(0);
      }, 1200);
    } else {
      setPullY(0);
    }
  }, [pullY, refreshing]);

  return (
    <div
      className="flex flex-col bg-slate-50"
      style={{
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
        /* Push ALL content below the Android status bar */
        paddingTop: 'env(safe-area-inset-top, 28px)',
      }}
    >
      {/* Pull-to-refresh indicator */}
      {(pullY > 0 || refreshing) && (
        <Box sx={{
          position: 'absolute',
          top: 'env(safe-area-inset-top, 28px)',
          left: '50%',
          transform: `translateX(-50%) translateY(${Math.min(pullY, 60)}px)`,
          zIndex: 50,
          transition: refreshing ? 'none' : 'transform 0.2s ease',
        }}>
          <Box sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CircularProgress
              size={20}
              thickness={5}
              sx={{ color: '#2d5be3', ...(refreshing ? {} : { transform: `rotate(${pullY * 3}deg) !important` }) }}
              variant={refreshing ? 'indeterminate' : 'determinate'}
              value={Math.min((pullY / 60) * 100, 100)}
            />
          </Box>
        </Box>
      )}

      {/* Main Content Area */}
      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: '90px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          transform: pullY > 0 ? `translateY(${pullY * 0.4}px)` : undefined,
          transition: refreshing ? 'none' : 'transform 0.2s ease',
        }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {/* Page Transition Animation */}
        <AnimatePresence mode="wait">
          <DelayedOutlet key={location.pathname} />
        </AnimatePresence>
      </div>

      {/* Bottom Navigation (Floating Island Dock) */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '92%', 
          maxWidth: '430px',
          zIndex: 1000 
        }}
      >
        <Paper 
          elevation={8}
          sx={{
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.4)',
            overflow: 'hidden',
          }}
        >
          <BottomNavigation
            value={getActiveTab()}
            onChange={(event, newValue) => handleNavigation(newValue)}
            showLabels={false} // Hide labels for a cleaner dock look, use icons only or custom chips
            sx={{
              height: 72,
              backgroundColor: 'transparent',
              '& .MuiBottomNavigationAction-root': {
                color: '#94A3B8', // Slate 400
                minWidth: 'auto',
                padding: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& .MuiBottomNavigationAction-label': {
                  display: 'none', // Force hiding labels
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&.Mui-selected': {
                  color: '#2d5be3', // Brand Accent Blue
                  '& .MuiSvgIcon-root': {
                    fontSize: 32, // Slight scale up when active
                    color: '#2d5be3',
                    filter: 'drop-shadow(0px 4px 8px rgba(45, 91, 227, 0.4))'
                  },
                },
              },
            }}
          >
            <BottomNavigationAction
              value="home"
              icon={
                <Box sx={{
                  backgroundColor: getActiveTab() === 'home' ? 'rgba(45, 91, 227, 0.1)' : 'transparent',
                  borderRadius: '16px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <HomeIcon />
                </Box>
              }
            />
            <BottomNavigationAction
              value="groups"
              icon={
                <Box sx={{
                  backgroundColor: getActiveTab() === 'groups' ? 'rgba(45, 91, 227, 0.1)' : 'transparent',
                  borderRadius: '16px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <GroupsIcon />
                </Box>
              }
            />
            <BottomNavigationAction
              value="post"
              icon={
                <Box sx={{
                  backgroundColor: getActiveTab() === 'post' ? '#2d5be3' : '#0f2460',
                  borderRadius: '20px',
                  width: '56px', // Make center button slightly larger and prominent
                  height: '56px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy transition
                  transform: getActiveTab() === 'post' ? 'scale(1.05) translateY(-4px)' : 'scale(1) translateY(-8px)',
                  boxShadow: '0 8px 16px rgba(15, 36, 96, 0.25)',
                }}>
                  <AddIcon sx={{ fontSize: 32, color: '#ffffff !important' }} />
                </Box>
              }
            />
            <BottomNavigationAction
              value="clubs"
              icon={
                <Box sx={{
                  backgroundColor: getActiveTab() === 'clubs' ? 'rgba(45, 91, 227, 0.1)' : 'transparent',
                  borderRadius: '16px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <CelebrationIcon />
                </Box>
              }
            />
            <BottomNavigationAction
              value="profile"
              icon={
                <Box sx={{
                  backgroundColor: getActiveTab() === 'profile' ? 'rgba(45, 91, 227, 0.1)' : 'transparent',
                  borderRadius: '16px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}>
                  <PersonIcon />
                </Box>
              }
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}