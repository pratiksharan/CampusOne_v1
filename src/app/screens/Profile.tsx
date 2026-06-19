import { useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('campusone_auth');
    navigate('/login');
  };

  return (
    <div className="bg-[#0f172a] min-h-screen pb-24 relative overflow-hidden">
      {/* Background Mesh Gradient Hero */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: -50, left: -20, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0) 70%)', filter: 'blur(30px)' }} />
        <Box sx={{ position: 'absolute', bottom: 40, right: -40, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.5) 0%, rgba(56,189,248,0) 70%)', filter: 'blur(40px)' }} />
        <Box sx={{ position: 'absolute', top: 20, right: 60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0) 70%)', filter: 'blur(25px)' }} />
      </Box>

      {/* Transparent AppBar */}
      <AppBar position="sticky" elevation={0} sx={{ background: 'transparent', zIndex: 1 }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: '#ffffff' }} onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', ml: 1, flex: 1 }}>
            Academic Identity
          </Typography>
          <IconButton edge="end" sx={{ color: '#ffffff' }}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* User Info Glass Overlay */}
      <Box sx={{ position: 'relative', zIndex: 1, pt: 1, pb: 4, px: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 104,
            height: 104,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            fontSize: '36px',
            fontWeight: 800,
            margin: '0 auto',
            mb: 2,
            border: '4px solid rgba(255,255,255,0.2)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          }}
        >
          PS
        </Avatar>
        <Typography sx={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', mb: 0.5, letterSpacing: '-0.5px' }}>
          Pratik Sharan
        </Typography>

        <Typography sx={{ fontSize: '15px', color: '#60a5fa', fontWeight: 700, mb: 0.5 }}>
          CS Student • App Dev & Cybersecurity Enthusiast
        </Typography>

        <Typography sx={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, mb: 2.5 }}>
          B.Tech CSE · 1st Year · 2025 Batch
        </Typography>

        {/* Verified Email Glass pill */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mb: 3.5, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', px: 2, py: 1, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <VerifiedIcon sx={{ fontSize: 16, color: '#60a5fa' }} />
          <Typography sx={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
            eng25cs0654@dsu.edu.in
          </Typography>
        </Box>
      </Box>

      {/* Main Content Overlapping Sheet */}
      <Box sx={{ position: 'relative', zIndex: 2, bgcolor: '#f8fafc', borderRadius: '32px 32px 0 0', minHeight: '50vh', px: 3, pt: 4, pb: 10, boxShadow: '0 -10px 40px rgba(0,0,0,0.15)' }}>
        
        {/* About Section */}
        <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          About
        </Typography>
        <Typography sx={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, mb: 4 }}>
          1st year CS student at DSU with a passion for building apps and exploring cybersecurity. Currently learning React and JavaScript while working on real-world projects. Always up for hackathons and collaborating on interesting ideas.
        </Typography>

        {/* Portfolio & Links (Horizontal row) */}
        <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Links & Portfolio
        </Typography>
        <div className="flex gap-3 mb-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#1e293b', color: '#fff', px: 2.5, py: 1.5, borderRadius: '14px' }}>
            <GitHubIcon sx={{ fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>GitHub</Typography>
          </Box>
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#0077b5', color: '#fff', px: 2.5, py: 1.5, borderRadius: '14px' }}>
            <LinkedInIcon sx={{ fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>LinkedIn</Typography>
          </Box>
        </div>

        {/* Skills & Technologies */}
        <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Skills & Technologies
        </Typography>
        <Card elevation={0} sx={{ borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', mb: 4, boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)' }}>
          <CardContent sx={{ p: 2.5, pb: '20px !important' }}>
            <div className="flex flex-wrap gap-2">
              {['Python', 'C', 'JavaScript', 'React', 'HTML/CSS', 'Cybersecurity Basics', 'Linux & Terminal'].map(skill => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{ bgcolor: '#f1f5f9', color: '#334155', fontWeight: 700, fontSize: '13px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles & Clubs */}
        <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Clubs & Roles
        </Typography>
        <Card elevation={0} sx={{ borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', mb: 4, boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)' }}>
          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '14px', color: '#64748b', fontWeight: 600, mb: 1 }}>
              Not part of any club yet
            </Typography>
            <Typography 
              onClick={() => navigate('/clubs')}
              sx={{ fontSize: '14px', color: '#2d5be3', fontWeight: 800, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              Explore Clubs →
            </Typography>
          </CardContent>
        </Card>

        {/* Hackathons & Achievements */}
        <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Achievements
        </Typography>
        <Card elevation={0} sx={{ borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', mb: 5, boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)', overflow: 'hidden' }}>
          <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderBottom: '1px solid #e0f2fe', display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ bgcolor: '#0ea5e9', color: '#fff', p: 1, borderRadius: '50%', display: 'flex' }}>
              <EmojiEventsIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0369a1' }}>HCF Hackathon 2026</Typography>
              <Typography sx={{ fontSize: '12px', color: '#0284c7', fontWeight: 600 }}>Participant</Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', bgcolor: '#fdf4ff' }}>
            <Box sx={{ bgcolor: '#c026d3', color: '#fff', p: 1, borderRadius: '50%', display: 'flex' }}>
              <EmojiEventsIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#86198f' }}>CICADA Hackathon 2025</Typography>
              <Typography sx={{ fontSize: '12px', color: '#a21caf', fontWeight: 600 }}>Participant</Typography>
            </Box>
          </Box>
        </Card>

        {/* Settings Area / Logout */}
        <ListItem onClick={handleLogout} sx={{ py: 2, px: 3, cursor: 'pointer', borderRadius: '16px', bgcolor: '#fff', border: '1px solid #fee2e2', transition: 'background-color 0.2s', '&:hover': { backgroundColor: '#fef2f2' } }}>
          <ListItemIcon sx={{ minWidth: 44 }}>
            <LogoutIcon sx={{ color: '#ef4444' }} />
          </ListItemIcon>
          <ListItemText primary="Logout of CampusOne" primaryTypographyProps={{ fontWeight: 700, color: '#ef4444', fontSize: '15px' }} />
          <ChevronRightIcon sx={{ color: '#fca5a5', fontSize: 24 }} />
        </ListItem>
        
      </Box>
    </div>
  );
}