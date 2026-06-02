import { useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Box,
} from '@mui/material';
import PremiumCard from '../components/PremiumCard';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

const academicsData = [
  {
    id: 1,
    subject: 'Calculus II',
    subjectColor: '#1E3A8A',
    question: 'How to solve integration by parts for complex functions?',
    upvotes: 24,
    answers: 8,
    askedBy: 'Arjun S.',
    timeAgo: '2 hours ago',
  },
  {
    id: 2,
    subject: 'Data Structures',
    subjectColor: '#16A34A',
    question: 'Best approach for implementing a Red-Black Tree?',
    upvotes: 18,
    answers: 5,
    askedBy: 'Priya S.',
    timeAgo: '5 hours ago',
  },
  {
    id: 3,
    subject: 'Physics',
    subjectColor: '#7C3AED',
    question: 'Clarification needed on Maxwell\'s equations for electromagnetic waves',
    upvotes: 31,
    answers: 12,
    askedBy: 'Rahul K.',
    timeAgo: '1 day ago',
  },
  {
    id: 4,
    subject: 'Operating Systems',
    subjectColor: '#DC2626',
    question: 'Page replacement algorithms - FIFO vs LRU comparison?',
    upvotes: 15,
    answers: 6,
    askedBy: 'Divya R.',
    timeAgo: '1 day ago',
  },
  {
    id: 5,
    subject: 'Database Systems',
    subjectColor: '#EA580C',
    question: 'When to use MongoDB vs PostgreSQL in production?',
    upvotes: 42,
    answers: 15,
    askedBy: 'Aisha M.',
    timeAgo: '2 days ago',
  },
];

const subjectsFilter = ['All', 'Calculus II', 'Data Structures', 'Physics', 'Operating Systems', 'Database Systems'];

export default function Academics() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredDiscussions = academicsData.filter(
    (item) => activeFilter === 'All' || item.subject === activeFilter
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', ml: 1 }}>
            Academics Forum
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Filter Bar */}
      <Box
        className="flex gap-2 overflow-x-auto px-4 pt-4 pb-2"
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {subjectsFilter.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onClick={() => setActiveFilter(filter)}
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '12px',
              height: 38,
              px: 1,
              flexShrink: 0,
              transition: 'all 0.2s ease',
              ...(activeFilter === filter
                ? {
                    bgcolor: '#1e3a8a',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
                    '&:hover': { bgcolor: '#1e40af' },
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

      <div className="p-4 space-y-4">
        {filteredDiscussions.map((item) => (
          <PremiumCard key={item.id}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <div className="flex justify-between items-start mb-3">
                {/* Subject Tag at Top */}
                <Chip
                  label={item.subject}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: '11px',
                    bgcolor: `${item.subjectColor}15`, // Adding 15 for approx 10% opacity in hex
                    color: item.subjectColor,
                    borderRadius: '8px',
                  }}
                />

                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                  {item.timeAgo}
                </Typography>
              </div>

              {/* Question Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: 1.5,
                  lineHeight: 1.4,
                  fontSize: '16px',
                }}
              >
                {item.question}
              </Typography>

              {/* Metadata */}
              <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                  {item.askedBy[0]}
                </div>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>
                  Asked by <span className="text-slate-700 font-semibold">{item.askedBy}</span>
                </Typography>
              </div>

              {/* Engagement Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Upvote Count */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <ThumbUpIcon sx={{ fontSize: 16, color: '#64748b' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                      {item.upvotes}
                    </Typography>
                  </div>

                  {/* Answer Count */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <CommentIcon sx={{ fontSize: 16, color: '#64748b' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                      {item.answers}
                    </Typography>
                  </div>
                </div>

                {/* View Discussion Button */}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    color: '#1e3a8a',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  View Discussion →
                </Button>
              </div>
            </CardContent>
          </PremiumCard>
        ))}

        {/* Empty state */}
        {filteredDiscussions.length === 0 && (
          <Box className="flex flex-col items-center justify-center py-16">
            <Typography sx={{ fontSize: '48px', mb: 2 }}>📚</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#334155', mb: 0.5 }}>
              No discussions found
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
              Try a different filter or search term
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}