import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

interface PageHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export default function PageHeader({ title, rightAction, transparent = false }: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={0} sx={{ background: transparent ? 'transparent' : '#ffffff', borderBottom: transparent ? 'none' : '1px solid rgba(0,0,0,0.05)', zIndex: 10 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box className="flex items-center">
          <IconButton edge="start" sx={{ color: transparent ? '#ffffff' : '#0f172a' }} onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: transparent ? '#ffffff' : '#0f172a', ml: 1 }}>
            {title}
          </Typography>
        </Box>
        {rightAction && <Box>{rightAction}</Box>}
      </Toolbar>
    </AppBar>
  );
}
