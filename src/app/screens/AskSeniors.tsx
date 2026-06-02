import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Button,
  Fab,
  Box,
  Divider,
  InputBase,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import StarIcon from '@mui/icons-material/Star';
import { Sparkles } from 'lucide-react';

interface Reply {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  text: string;
  upvotes: number;
  isAccepted?: boolean;
}

interface QuestionThread {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  timeAgo: string;
  question: string;
  details: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  upvotes: number;
  replies: Reply[];
}

const questionsData: QuestionThread[] = [
  {
    id: 1,
    name: 'Aditya K',
    initials: 'AK',
    avatarColor: '#1E3A8A',
    timeAgo: '2h ago',
    question: 'Which are the best electives to pick in 3rd year CSE for someone interested in backend?',
    details: "I'm looking at 'Advanced Database Systems' vs 'Cloud Computing'. Which one has a more practical syllabus and better projects?",
    category: 'Academics',
    categoryColor: '#1E40AF',
    categoryBg: '#DBEAFE',
    upvotes: 34,
    replies: [
      {
        id: 101,
        name: 'Rohan Sharma',
        initials: 'RS',
        avatarColor: '#059669',
        timeAgo: '1h ago',
        text: 'Definitely go for Cloud Computing with Prof. Sharma. The assignments involve deploying real microservices on AWS, which is heavily asked in interviews.',
        upvotes: 18,
        isAccepted: true,
      },
      {
        id: 102,
        name: 'Sneha Patel',
        initials: 'SP',
        avatarColor: '#EA580C',
        timeAgo: '45m ago',
        text: 'Advanced Databases is good but very theoretical. If you want practical backend knowledge, Cloud is the way to go.',
        upvotes: 7,
      }
    ],
  },
  {
    id: 2,
    name: 'Sneha R',
    initials: 'SR',
    avatarColor: '#DC2626',
    timeAgo: '5h ago',
    question: 'How do I prepare for campus placements in 2nd year itself?',
    details: 'Should I focus entirely on DSA right now or start picking up web development to build resume projects? Feeling a bit overwhelmed.',
    category: 'Placements',
    categoryColor: '#15803D',
    categoryBg: '#DCFCE7',
    upvotes: 28,
    replies: [],
  },
  {
    id: 3,
    name: 'Vikram M',
    initials: 'VM',
    avatarColor: '#7C3AED',
    timeAgo: '1d ago',
    question: 'Can first years participate in the main Techflix Hackathon?',
    details: 'I heard it was only for pre-final years, but I really want to join a team.',
    category: 'Events',
    categoryColor: '#B45309',
    categoryBg: '#FEF3C7',
    upvotes: 15,
    replies: [
      {
        id: 301,
        name: 'Techflix Org',
        initials: 'TO',
        avatarColor: '#4F46E5',
        timeAgo: '20h ago',
        text: 'Yes! First years are highly encouraged to participate. The easiest way is to find a group on the Study Groups > Hackathon Teams page.',
        upvotes: 42,
      }
    ],
  },
];

export default function AskSeniors() {
  const navigate = useNavigate();
  // State for main feed
  const [upvotes, setUpvotes] = useState<Record<number, number>>({});
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'Hot' | 'New' | 'Top'>('Hot');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for thread view
  const [activeThreadId, setActiveThreadId] = useState<number | null>(null);
  const [replyUpvotes, setReplyUpvotes] = useState<Record<number, number>>({});

  const handleUpvote = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUpvotes(prev => ({
      ...prev,
      [id]: prev[id] === 1 ? 0 : 1
    }));
  };

  const handleDownvote = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setUpvotes(prev => ({
      ...prev,
      [id]: prev[id] === -1 ? 0 : -1
    }));
  };

  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReplyUpvote = (id: number) => {
    setReplyUpvotes(prev => ({
      ...prev,
      [id]: prev[id] === 1 ? 0 : 1
    }));
  };

  const activeThread = questionsData.find(q => q.id === activeThreadId);

  // INSIDE THREAD VIEW
  if (activeThread) {
    const threadVoteState = upvotes[activeThread.id] || 0;
    const isBookmarked = bookmarks.has(activeThread.id);

    return (
      <div className="bg-[#f8fafc] flex flex-col" style={{ height: 'calc(100dvh - 80px)', overflow: 'hidden' }}>
        <AppBar position="static" elevation={0} sx={{ background: '#ffffff', color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}>
          <Toolbar sx={{ px: 1, py: 0.5, minHeight: '60px !important' }}>
            <IconButton edge="start" onClick={() => setActiveThreadId(null)} sx={{ color: '#0f172a', mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '16px', flex: 1 }}>
              Discussion
            </Typography>
            <IconButton onClick={(e) => toggleBookmark(activeThread.id, e)} sx={{ color: isBookmarked ? '#2d5be3' : '#64748b' }}>
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box className="flex-1 overflow-y-auto pb-4 relative flex flex-col bg-[#f1f5f9]">
          
          {/* Original Question Post */}
          <Box sx={{ bgcolor: '#fff', p: 3, mb: 1, borderBottom: '1px solid #e2e8f0' }}>
            <div className="flex items-center gap-3 mb-3">
              <Avatar sx={{ bgcolor: activeThread.avatarColor, width: 36, height: 36, fontSize: '13px', fontWeight: 700 }}>
                {activeThread.initials}
              </Avatar>
              <div>
                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                  {activeThread.name}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                  {activeThread.timeAgo} • Posted in <span style={{color: activeThread.categoryColor}}>{activeThread.category}</span>
                </Typography>
              </div>
            </div>

            <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, mb: 1.5 }}>
              {activeThread.question}
            </Typography>
            
            <Typography sx={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.6, mb: 3 }}>
              {activeThread.details}
            </Typography>

            <div className="flex items-center gap-4">
              {/* Voting Pill */}
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <IconButton 
                  size="small" 
                  onClick={() => handleUpvote(activeThread.id)}
                  sx={{ color: threadVoteState === 1 ? '#ef4444' : '#64748b', p: 1, borderRadius: 0, '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                >
                  <ArrowUpwardRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: threadVoteState === 1 ? '#ef4444' : (threadVoteState === -1 ? '#3b82f6' : '#0f172a'), minWidth: 20, textAlign: 'center' }}>
                  {activeThread.upvotes + threadVoteState}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={() => handleDownvote(activeThread.id)}
                  sx={{ color: threadVoteState === -1 ? '#3b82f6' : '#64748b', p: 1, borderRadius: 0, '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)' } }}
                >
                  <ArrowDownwardRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#64748b' }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
                  {activeThread.replies.length} Answers
                </Typography>
              </Box>
            </div>
          </Box>

          {/* Answers Section */}
          <Box sx={{ px: 2, pt: 2, pb: 4 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#475569', mb: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Answers
            </Typography>
            
            {activeThread.replies.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography sx={{ color: '#94a3b8', fontSize: '14.5px', fontWeight: 600 }}>No answers yet. Be the first to help!</Typography>
              </Box>
            ) : (
              <div className="flex flex-col gap-3">
                {activeThread.replies.map(reply => {
                  const rVoteState = replyUpvotes[reply.id] || 0;
                  return (
                    <Card key={reply.id} elevation={0} sx={{ borderRadius: '16px', border: reply.isAccepted ? '1px solid #10b981' : '1px solid rgba(0,0,0,0.05)', bgcolor: reply.isAccepted ? '#f0fdf4' : '#fff' }}>
                      <CardContent sx={{ p: '16px !important' }}>
                        {reply.isAccepted && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#10b981', mb: 1.5 }}>
                            <StarIcon sx={{ fontSize: 16 }} />
                            <Typography sx={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Accepted Answer</Typography>
                          </Box>
                        )}
                        <div className="flex items-start gap-3">
                          <Avatar sx={{ bgcolor: reply.avatarColor, width: 32, height: 32, fontSize: '12px', fontWeight: 700 }}>
                            {reply.initials}
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                                {reply.name}
                              </Typography>
                              <Typography sx={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                                {reply.timeAgo}
                              </Typography>
                            </div>
                            <Typography sx={{ fontSize: '14px', color: '#334155', lineHeight: 1.5, mb: 2 }}>
                              {reply.text}
                            </Typography>
                            
                            {/* Reply Action Row */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={() => handleReplyUpvote(reply.id)}>
                                <ArrowUpwardRoundedIcon sx={{ fontSize: 18, color: rVoteState === 1 ? '#ef4444' : '#94a3b8' }} />
                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: rVoteState === 1 ? '#ef4444' : '#64748b' }}>
                                  {reply.upvotes + rVoteState}
                                </Typography>
                              </Box>
                              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#64748b', cursor: 'pointer', '&:hover': { color: '#2d5be3' } }}>
                                Reply
                              </Typography>
                            </Box>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </Box>
        </Box>

        {/* Reply Input Bar */}
        <Box sx={{ bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0', p: 1.5, pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', bgcolor: '#f1f5f9', borderRadius: '24px', flex: 1, alignItems: 'center', p: 0.5, pl: 2 }}>
            <InputBase 
              placeholder="Add your answer..." 
              sx={{ flex: 1, fontSize: '14.5px', py: 0.5 }} 
            />
          </Box>
          <IconButton sx={{ bgcolor: '#0f2460', color: '#fff', '&:hover': { bgcolor: '#1e3a8a' }, width: 44, height: 44, flexShrink: 0, boxShadow: '0 4px 12px rgba(15,36,96,0.2)' }}>
            <SendIcon sx={{ fontSize: 18, ml: 0.5 }} />
          </IconButton>
        </Box>
      </div>
    );
  }

  // MAIN FORUM FEED
  return (
    <div className="bg-slate-50 min-h-screen relative pb-28">
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar sx={{ px: 1.5 }}>
          <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', ml: 1, flex: 1 }}>
            Knowledge Base
          </Typography>
        </Toolbar>

        {/* Search Bar */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: '16px', px: 2, py: 1.2, border: '1px solid #e2e8f0' }}>
            <SearchIcon sx={{ color: '#94a3b8', fontSize: 20, mr: 1.5 }} />
            <InputBase 
              placeholder="Search discussions, subjects..." 
              sx={{ flex: 1, fontSize: '14.5px', fontWeight: 500 }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>

        {/* Filters */}
        <Box sx={{ px: 2, pb: 1.5, pt: 1, display: 'flex', gap: 1, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
          {(['Hot', 'New', 'Top'] as const).map(tab => (
            <Chip
              key={tab}
              label={tab}
              icon={tab === 'Hot' ? <WhatshotIcon sx={{ fontSize: 16 }} /> : tab === 'New' ? <NewReleasesIcon sx={{ fontSize: 16 }} /> : <StarIcon sx={{ fontSize: 16 }} />}
              onClick={() => setActiveTab(tab)}
              sx={{
                bgcolor: activeTab === tab ? '#0f2460' : '#f8fafc',
                color: activeTab === tab ? '#fff' : '#475569',
                border: '1px solid',
                borderColor: activeTab === tab ? '#0f2460' : '#e2e8f0',
                fontWeight: 700,
                fontSize: '12px',
                borderRadius: '8px',
                '& .MuiChip-icon': { color: activeTab === tab ? '#fff' : '#64748b' }
              }}
            />
          ))}
        </Box>
      </AppBar>

      <div className="p-4">
        {/* AI Summary Card */}
        <Box sx={{ mb: 4, p: 3, borderRadius: '20px', background: 'linear-gradient(135deg, rgba(45,91,227,0.06) 0%, rgba(45,91,227,0.01) 100%)', border: '1px solid rgba(45,91,227,0.2)', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', right: -20, top: -20, opacity: 0.05 }}>
            <Sparkles size={120} color="#2d5be3" />
          </Box>
          <Box className="flex items-center gap-2 mb-2 relative z-10">
            <Sparkles size={18} color="#2d5be3" />
            <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#2d5be3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI Summary • Subreddits
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '14px', lineHeight: 1.6, color: '#1e293b', fontWeight: 500, position: 'relative', zIndex: 10 }}>
            Trending Topic: Many students are currently asking about 3rd-year CSE electives. The consensus suggests "Cloud Computing" offers the best practical projects for backend interviews.
          </Typography>
        </Box>

        <div className="flex flex-col gap-4 pb-12">
          {questionsData
            .filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.category.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((q) => {
            const voteState = upvotes[q.id] || 0;
            const isBookmarked = bookmarks.has(q.id);
            return (
              <Card
                key={q.id}
                onClick={() => setActiveThreadId(q.id)}
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  bgcolor: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#cbd5e1',
                    boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)',
                  }
                }}
              >
                <CardContent sx={{ p: '20px !important' }}>
                  {/* Category and Author header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Chip
                        label={q.category}
                        size="small"
                        sx={{
                          bgcolor: `${q.categoryColor}15`,
                          color: q.categoryColor,
                          fontWeight: 800,
                          fontSize: '10px',
                          borderRadius: '6px',
                          height: 22,
                        }}
                      />
                      <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                        Posted by {q.name} • {q.timeAgo}
                      </Typography>
                    </div>
                  </div>

                  {/* Question text */}
                  <Typography
                    sx={{
                      fontSize: '16.5px',
                      fontWeight: 800,
                      color: '#0f172a',
                      lineHeight: 1.4,
                      mb: 1,
                    }}
                  >
                    {q.question}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.5,
                      mb: 2.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {q.details}
                  </Typography>

                  {/* Reddit-style Action bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Voting Pill */}
                      <Box 
                        onClick={(e) => e.stopPropagation()}
                        sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: '16px', overflow: 'hidden' }}
                      >
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleUpvote(q.id, e)}
                          sx={{ color: voteState === 1 ? '#ef4444' : '#64748b', p: 0.75, borderRadius: 0, '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                        >
                          <ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography sx={{ fontSize: '13px', fontWeight: 800, color: voteState === 1 ? '#ef4444' : (voteState === -1 ? '#3b82f6' : '#0f172a'), minWidth: 16, textAlign: 'center' }}>
                          {q.upvotes + voteState}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={(e) => handleDownvote(q.id, e)}
                          sx={{ color: voteState === -1 ? '#3b82f6' : '#64748b', p: 0.75, borderRadius: 0, '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)' } }}
                        >
                          <ArrowDownwardRoundedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>

                      {/* Comments Pill */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        backgroundColor: '#f1f5f9',
                        borderRadius: '16px',
                        px: 1.5,
                        py: 0.75,
                      }}>
                        <ChatBubbleOutlineIcon sx={{ fontSize: 16, color: '#64748B' }} />
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                          {q.replies.length}
                        </Typography>
                      </Box>
                    </div>

                    <IconButton 
                      size="small"
                      onClick={(e) => toggleBookmark(q.id, e)}
                      sx={{ color: isBookmarked ? '#2d5be3' : '#94a3b8' }}
                    >
                      {isBookmarked ? <BookmarkIcon sx={{ fontSize: 20 }} /> : <BookmarkBorderIcon sx={{ fontSize: 20 }} />}
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floating Ask button */}
      <Fab
        variant="extended"
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          background: 'linear-gradient(135deg, #0f2460 0%, #1c3b8a 100%)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '14px',
          textTransform: 'none',
          borderRadius: '24px',
          px: 3,
          py: 2,
          boxShadow: '0 8px 24px rgba(15,36,96,0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0b1a45 0%, #173278 100%)',
            boxShadow: '0 12px 28px rgba(15,36,96,0.3)',
          },
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <AddIcon sx={{ mr: 1, fontSize: 22 }} />
        Ask
      </Fab>
    </div>
  );
}