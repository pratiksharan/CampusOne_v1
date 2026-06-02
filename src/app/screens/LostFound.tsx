import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, CardMedia, CardContent, Button, Chip, Box, Fab } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../components/PageHeader';
import PremiumCard from '../components/PremiumCard';

const lostFoundData = [
  {
    id: 1,
    type: 'Lost' as const,
    item: 'Black Backpack with Laptop',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    location: 'Library, 2nd Floor',
    dateReported: '2026-03-18',
    description: 'Black JanSport backpack containing a Dell laptop, charger, and a blue notebook with name tag inside.',
    reportedBy: 'Rahul S.',
    timeAgo: '1 day ago',
  },
  {
    id: 2,
    type: 'Found' as const,
    item: 'Blue Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    location: 'Cafeteria, Table 5',
    dateReported: '2026-03-17',
    description: 'Milton brand blue water bottle with anime stickers. Found near the billing counter.',
    reportedBy: 'Priya M.',
    timeAgo: '2 days ago',
  },
  {
    id: 3,
    type: 'Lost' as const,
    item: 'Student ID Card',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    location: 'Sports Complex',
    dateReported: '2026-03-16',
    description: 'DSU Student ID — Name: Aditya Kumar, Roll: 25CS101. Last seen near the basketball court.',
    reportedBy: 'Aditya K.',
    timeAgo: '3 days ago',
  },
  {
    id: 4,
    type: 'Found' as const,
    item: 'White Earphones (AirPods)',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80',
    location: 'CS Lab 301',
    dateReported: '2026-03-18',
    description: 'Apple AirPods Pro found on a desk in CS Lab 301 after the DSA lecture.',
    reportedBy: 'Security Desk',
    timeAgo: '1 day ago',
  },
  {
    id: 5,
    type: 'Lost' as const,
    item: 'Silver Laptop (MacBook Air)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    location: 'Seminar Hall 2',
    dateReported: '2026-03-19',
    description: 'MacBook Air M2 with a black hardshell case. Left behind after the guest lecture.',
    reportedBy: 'Sneha R.',
    timeAgo: '5 hours ago',
  },
];

const filterOptions = ['All', 'Lost', 'Found'];

export default function LostFound() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = lostFoundData.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="bg-slate-50 min-h-screen relative pb-28">
      <PageHeader title="Lost & Found" />

      {/* Filter Bar */}
      <Box className="px-4 pt-3 pb-1">
        <Box className="flex gap-2">
          {filterOptions.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => setActiveFilter(filter)}
              sx={{
                fontWeight: 700,
                fontSize: '13px',
                borderRadius: '10px',
                height: 36,
                px: 0.5,
                transition: 'all 0.2s ease',
                ...(activeFilter === filter
                  ? {
                    bgcolor: filter === 'Lost' ? '#DC2626' : filter === 'Found' ? '#059669' : '#0f2460',
                    color: '#ffffff',
                    boxShadow: filter === 'Lost'
                      ? '0 4px 12px rgba(220, 38, 38, 0.3)'
                      : filter === 'Found'
                        ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                        : '0 4px 12px rgba(15, 36, 96, 0.25)',
                    '&:hover': {
                      bgcolor: filter === 'Lost' ? '#DC2626' : filter === 'Found' ? '#059669' : '#0f2460',
                    },
                  }
                  : {
                    bgcolor: '#ffffff',
                    color: '#475569',
                    border: '1px solid #e2e8f0',
                    '&:hover': { bgcolor: '#f8fafc' },
                  }),
              }}
            />
          ))}
        </Box>

        <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, mt: 1.5, mb: 0.5 }}>
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} reported
        </Typography>
      </Box>

      {/* Cards */}
      <div className="px-4 space-y-5 pb-4">
        {filteredItems.map((item) => {
          const isLost = item.type === 'Lost';

          return (
            <PremiumCard key={item.id} sx={{ overflow: 'hidden' }}>
              {/* Image */}
              <div className="relative">
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.item}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }} />

                {/* LOST / FOUND Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    bgcolor: isLost ? '#DC2626' : '#059669',
                    color: '#ffffff',
                    borderRadius: '12px',
                    px: 1.75,
                    py: 0.75,
                    boxShadow: isLost
                      ? '0 4px 16px rgba(220, 38, 38, 0.45)'
                      : '0 4px 16px rgba(5, 150, 105, 0.45)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 0 6px rgba(255,255,255,0.5)',
                    }}
                  />
                  <Typography sx={{ fontSize: '12px', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {item.type}
                  </Typography>
                </Box>

                {/* Time ago */}
                <Box className="absolute bottom-3 right-3 flex items-center gap-1" sx={{ bgcolor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', borderRadius: '8px', px: 1.25, py: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }} />
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>
                    {item.timeAgo}
                  </Typography>
                </Box>
              </div>

              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', mb: 0.75, lineHeight: 1.3 }}>
                  {item.item}
                </Typography>

                <Typography sx={{ fontSize: '13.5px', color: '#64748b', mb: 2.5, lineHeight: 1.6 }}>
                  {item.description}
                </Typography>

                <Box className="flex items-center gap-1.5 mb-4">
                  <LocationOnIcon sx={{ fontSize: 16, color: '#2d5be3' }} />
                  <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>
                    {item.location}
                  </Typography>
                </Box>

                {/* Reporter & Contact */}
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: isLost ? '#FEE2E2' : '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: '12px', fontWeight: 800, color: isLost ? '#DC2626' : '#059669' }}>
                        {item.reportedBy[0]}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>
                      by <span className="font-bold text-slate-700">{item.reportedBy}</span>
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#0f2460',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '12px',
                      py: 0.75,
                      px: 2.5,
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(15, 36, 96, 0.2)',
                      '&:hover': {
                        bgcolor: '#1a367d',
                        boxShadow: '0 6px 16px rgba(15, 36, 96, 0.3)',
                      },
                    }}
                  >
                    Contact
                  </Button>
                </Box>
              </CardContent>
            </PremiumCard>
          );
        })}

        {filteredItems.length === 0 && (
          <Box className="flex flex-col items-center justify-center py-16">
            <Typography sx={{ fontSize: '48px', mb: 2 }}>🔍</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#334155', mb: 0.5 }}>
              No items found
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
              Try switching filters or report a new item
            </Typography>
          </Box>
        )}
      </div>

      {/* Floating Report Button */}
      <Fab
        variant="extended"
        sx={{
          position: 'fixed',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #0f2460 0%, #2d5be3 100%)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '14px',
          textTransform: 'none',
          borderRadius: '16px',
          px: 3,
          py: 2,
          boxShadow: '0 8px 28px rgba(15,36,96,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0b1a45 0%, #1e4fd0 100%)',
            boxShadow: '0 12px 32px rgba(15,36,96,0.4)',
          },
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <AddIcon sx={{ mr: 1, fontSize: 22 }} />
        Report Item
      </Fab>
    </div>
  );
}