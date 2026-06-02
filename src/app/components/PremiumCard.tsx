import { Card, CardProps, Box } from '@mui/material';
import { motion } from 'motion/react';

export default function PremiumCard({ children, sx, onClick, ...props }: CardProps) {
  return (
    <Box component={motion.div} whileTap={{ scale: 0.96 }} onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default', height: '100%' }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)',
          height: '100%',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Card>
    </Box>
  );
}
