import { useState } from 'react';
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
  Button,
  Box,
} from '@mui/material';
import PremiumCard from '../components/PremiumCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ScienceIcon from '@mui/icons-material/Science';
import PublicIcon from '@mui/icons-material/Public';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

interface ClubData {
  id: number;
  name: string;
  icon: React.ReactNode;
  image?: string;
  color: string;
  members: number;
  description: string;
  recruiting: boolean;
  pinnedPost?: string;
}

const clubsData: ClubData[] = [
  {
    id: 1,
    name: 'EOL Club',
    icon: <LocalMoviesIcon sx={{ color: 'white', fontSize: 28 }} />,
    image: '/eol-logo.jpg',
    color: '#9333EA',
    members: 189,
    description: '"Not just a creative club, it\'s a dramatic experience." Echoes of Lumière is dedicated to exploring the realms of theatre, cinematic craftsmanship, and visual storytelling. We welcome students from all majors to participate in hands-on filmmaking, scriptwriting, and impromptu acting, creating a transformative space to unleash your inner creativity.',
    recruiting: true,
    pinnedPost: '🏆 FILM POSTER FACE-OFF! Put your design skills to the test under time constraints. Registrations open now 🎬',
  },
  {
    id: 2,
    name: 'CHEMFUN Club',
    icon: <ScienceIcon sx={{ color: 'white', fontSize: 28 }} />,
    color: '#16A34A',
    members: 134,
    description: 'Fun experiments, chemistry quizzes & live lab demos open to all branches. We make science exciting and accessible well beyond what the syllabus covers.',
    recruiting: false,
  },
  {
    id: 3,
    name: 'MUNSOC',
    icon: <PublicIcon sx={{ color: 'white', fontSize: 28 }} />,
    color: '#7C3AED',
    members: 210,
    description: 'Diplomacy, global affairs & high-stakes debate. Represent nations, draft resolutions and negotiate with delegates from universities across India at our flagship conferences.',
    recruiting: true,
    pinnedPost: 'MUNSOC Spring Conference 2026 — delegate registrations now open! 🌍',
  },
  {
    id: 4,
    name: 'IEEE Club',
    icon: <ElectricBoltIcon sx={{ color: 'white', fontSize: 28 }} />,
    color: '#EA580C',
    members: 167,
    description: 'Tech talks, hands-on workshops, research paper presentations & direct networking with industry professionals and IEEE senior members from top tech companies.',
    recruiting: false,
  },
];

export default function Clubs() {
  const navigate = useNavigate();
  const [appliedClubs, setAppliedClubs] = useState<Set<number>>(new Set());
  const [expandedDesc, setExpandedDesc] = useState<Set<number>>(new Set());

  const toggleApply = (id: number) => {
    setAppliedClubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleDesc = (id: number) => {
    setExpandedDesc((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', ml: 1 }}>
            Campus Clubs
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="p-4">
        <Typography variant="body2" sx={{ color: '#475569', mb: 3, fontWeight: 500 }}>
          DSU · {clubsData.length} active clubs · {clubsData.reduce((a, c) => a + c.members, 0)}+ members
        </Typography>

        <div className="flex flex-col gap-5">
          {clubsData.map((club) => {
            const isApplied = appliedClubs.has(club.id);
            const isExpanded = expandedDesc.has(club.id);
            return (
              <PremiumCard
                key={club.id}
                sx={{
                  overflow: 'visible',
                  position: 'relative',
                }}
              >
                {/* Top color accent bar */}
                <Box
                  sx={{
                    height: 8,
                    borderRadius: '24px 24px 0 0',
                    background: `linear-gradient(90deg, ${club.color} 0%, ${club.color}99 100%)`,
                  }}
                />

                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  {/* Header row */}
                  <div className="flex items-start gap-4 mb-3">
                    {/* Show image for EOL, icon avatar for others */}
                    {club.image ? (
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '20px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          bgcolor: '#ffffff',
                          border: '1px solid rgba(0,0,0,0.08)',
                          boxShadow: `0 4px 12px ${club.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img
                          src={club.image}
                          alt={club.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                          }}
                        />
                      </Box>
                    ) : (
                      <Avatar
                        sx={{
                          bgcolor: club.color,
                          width: 60,
                          height: 60,
                          borderRadius: '16px',
                          boxShadow: `0 8px 16px ${club.color}33`,
                        }}
                      >
                        {club.icon}
                      </Avatar>
                    )}

                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                          {club.name}
                        </Typography>
                        {club.recruiting && (
                          <Chip
                            label="Recruiting"
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: '11px',
                              fontWeight: 800,
                              backgroundColor: '#dcfce7',
                              color: '#16a34a',
                              borderRadius: '8px',
                              border: '1px solid #bbf7d0',
                              '& .MuiChip-label': { px: 1 },
                            }}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PeopleAltOutlinedIcon sx={{ fontSize: 16, color: '#64748B' }} />
                        <Typography sx={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                          {club.members} members
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <Box sx={{ mb: 2.5 }}>
                    <div
                      style={!isExpanded ? {
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '14px',
                        color: '#475569',
                        lineHeight: '1.6',
                      } : {
                        fontSize: '14px',
                        color: '#475569',
                        lineHeight: '1.6',
                      }}
                    >
                      {club.description}
                    </div>
                    <Typography
                      onClick={() => toggleDesc(club.id)}
                      sx={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: club.color,
                        cursor: 'pointer',
                        mt: 1,
                        display: 'inline-block',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </Typography>


                  </Box>

                  {/* Pinned post */}
                  {club.pinnedPost && (
                    <Box
                      sx={{
                        backgroundColor: `${club.color}08`,
                        border: `1px solid ${club.color}20`,
                        borderRadius: '16px',
                        p: 2,
                        mb: 3,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PushPinIcon sx={{ fontSize: 14, color: club.color }} />
                        <Typography sx={{ fontSize: '11px', fontWeight: 800, color: club.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Pinned
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '14px', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                        {club.pinnedPost}
                      </Typography>
                    </Box>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      onClick={() => club.id === 1 ? navigate('/clubs/eol') : undefined}
                      sx={{
                        flex: 1,
                        borderRadius: '12px',
                        py: 1.25,
                        fontSize: '14.5px',
                        fontWeight: 700,
                        textTransform: 'none',
                        backgroundColor: '#0f2460',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(15, 36, 96, 0.2)',
                        '&:hover': {
                          backgroundColor: '#1a367d',
                          boxShadow: '0 6px 16px rgba(15, 36, 96, 0.3)',
                        }
                      }}
                    >
                      About the Club
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => toggleApply(club.id)}
                      startIcon={isApplied ? <HourglassBottomIcon sx={{ fontSize: 18 }} /> : undefined}
                      sx={{
                        flex: 1,
                        borderRadius: '12px',
                        py: 1.25,
                        fontSize: '14.5px',
                        fontWeight: 700,
                        textTransform: 'none',
                        ...(isApplied
                          ? {
                              borderColor: '#fde047',
                              color: '#a16207',
                              backgroundColor: '#fef9c3',
                              '&:hover': {
                                backgroundColor: '#fef08a',
                                borderColor: '#fde047',
                              },
                            }
                          : {
                              borderColor: '#cbd5e1',
                              color: '#475569',
                              backgroundColor: 'transparent',
                              '&:hover': {
                                backgroundColor: '#f8fafc',
                                borderColor: '#94a3b8'
                              }
                            }),
                      }}
                    >
                      {isApplied ? 'Application Sent' : 'Apply to Join'}
                    </Button>
                  </Box>
                </CardContent>
              </PremiumCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}