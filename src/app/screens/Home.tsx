import { useNavigate } from "react-router";
import {
  Typography,
  Box,
  Avatar,
  AvatarGroup,
  IconButton,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import {
  Calendar,
  GraduationCap,
  Users,
  Briefcase,
  MessageSquare,
  PartyPopper,
  MoreHorizontal,
  Utensils,
  Megaphone,
} from "lucide-react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const TreasureChest = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 11V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V11" />
    <path d="M2.5 11H21.5V7C21.5 5.89543 20.6046 5 19.5 5H4.5C3.39543 5 2.5 5.89543 2.5 7V11Z" />
    <path d="M12 11V14" />
    <path d="M10 14H14" />
    <path d="M4 5A2 2 0 0 1 6 3H18A2 2 0 0 1 20 5" />
    <line x1="8" y1="5" x2="8" y2="11" />
    <line x1="16" y1="5" x2="16" y2="11" />
    <line x1="8" y1="11" x2="8" y2="21" />
    <line x1="16" y1="11" x2="16" y2="21" />
  </svg>
);

const categories = [
  {
    id: "events",
    icon: Calendar,
    title: "Events",
    route: "/events",
    color: "#2d5be3",
    bg: "rgba(45, 91, 227, 0.1)",
  },
  {
    id: "academics",
    icon: GraduationCap,
    title: "Academics",
    route: "/academics",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  {
    id: "study-groups",
    icon: Users,
    title: "Groups",
    route: "/study-groups",
    color: "#f43f5e",
    bg: "rgba(244, 63, 94, 0.1)",
  },
  {
    id: "internships",
    icon: Briefcase,
    title: "Careers",
    route: "/internships",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.1)",
  },
  {
    id: "ask-seniors",
    icon: MessageSquare,
    title: "Ask Seniors",
    route: "/ask-seniors",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  {
    id: "lost-found",
    icon: TreasureChest,
    title: "Lost & Found",
    route: "/lost-found",
    color: "#0ea5e9",
    bg: "rgba(14, 165, 233, 0.1)",
  },
  {
    id: "clubs",
    icon: PartyPopper,
    title: "Clubs",
    route: "/clubs",
    color: "#ec4899",
    bg: "rgba(236, 72, 153, 0.1)",
  },
];

// ── Community-only data ──────────────────────────────
const todayMess = {
  meal: 'Lunch',
  time: '12:30 – 2:00 PM',
  items: ['Paneer Butter Masala', 'Jeera Rice', 'Dal Fry', 'Roti', 'Gulab Jamun'],
};

const noticeBoard = [
  { title: 'IEEE Workshop: Intro to Embedded Systems', tag: 'Club', tagColor: '#ec4899', date: 'Tomorrow, 3 PM' },
  { title: 'EOL Club recruitment drive — Apply on the club page', tag: 'Club', tagColor: '#8b5cf6', date: 'Mar 22' },
  { title: 'Campus photography contest — Submit entries by Friday', tag: 'Event', tagColor: '#1e3a8a', date: 'Mar 23' },
];

const trendingPosts = [
  {
    id: 1,
    initials: "AK",
    name: "Aditya K.",
    avatarColor: "#2d5be3",
    role: "Core Member, EOL",
    time: "2h ago",
    text: <><span style={{ fontWeight: 800 }}>Techflix 2026</span> registrations close this weekend! Make sure your teams are finalized. 🚀</>,
    likes: 124,
    comments: 18,
    tag: 'Hackathon',
    tagColor: '#DC2626',
  },
  {
    id: 2,
    initials: "SR",
    name: "Sneha R.",
    avatarColor: "#f43f5e",
    role: "Senior, CSE",
    time: "4h ago",
    text: "Best electives for 5th semester? Debating between Cloud Computing and AI. Thoughts? 🤔",
    likes: 45,
    comments: 32,
  },
  {
    id: 3,
    initials: "VM",
    name: "Vikram M.",
    avatarColor: "#8b5cf6",
    role: "Lead, IEEE",
    time: "5h ago",
    text: "Thanks to everyone who joined our weekend IoT workshop! Pictures are up on the club page.",
    likes: 210,
    comments: 5,
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const navigate = useNavigate();
  const [moreSnackbar, setMoreSnackbar] = useState(false);

  return (
    <Box className="pb-28 bg-slate-50 min-h-screen">
      {/* Hero Header Region */}
      {/* Hero Header Region */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f2460 0%, #2d5be3 100%)',
          pt: 4,
          pb: 9,
          px: 3,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0 0 36px 36px',
          boxShadow: '0 12px 40px rgba(45, 91, 227, 0.25)',
        }}
      >
        {/* Abstract decorative shapes */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)' }} />
        <Box sx={{ position: 'absolute', bottom: -50, left: -20, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)' }} />

        {/* Top App Bar inside Hero */}
        <Box className="flex justify-between items-center mb-6 z-10 relative">
          <Box className="flex items-center gap-3">
            <Avatar sx={{ width: 44, height: 44, background: 'linear-gradient(135deg,rgba(255,255,255,0.1), rgba(255,255,255,0))', border: '1.5px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              P
            </Avatar>
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 600, lineHeight: 1 }}>
                {getGreeting()}
              </Typography>
              <Typography variant="h3" sx={{ color: '#ffffff', fontSize: '22px', fontWeight: 800, mt: 0.5, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                Pratik 👋
              </Typography>
            </Box>
          </Box>

          <Box className="flex gap-2.5">
            <IconButton sx={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
              <SearchIcon sx={{ color: '#fff', fontSize: 22 }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, bgcolor: '#f43f5e', borderRadius: '50%', border: '2px solid #2d5be3' }} />
              <NotificationsNoneIcon sx={{ color: '#fff', fontSize: 22 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Date & Quick Status */}
        <Box className="z-10 relative mt-2">
          <Typography sx={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', fontWeight: 600, mb: 1.5, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {getTodayDate()}
          </Typography>
          <Box className="flex items-center gap-2">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', px: 1.5, py: 0.5, borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Box sx={{
                width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981',
                animation: 'breathe 2s ease-in-out infinite',
                '@keyframes breathe': {
                  '0%, 100%': { transform: 'scale(1)', opacity: 1, boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' },
                  '50%': { transform: 'scale(1.2)', opacity: 0.8, boxShadow: '0 0 0 4px rgba(16,185,129,0)' }
                }
              }} />
              <Typography sx={{ fontSize: '12px', color: '#fff', fontWeight: 800 }}>312 Online</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', px: 1.5, py: 0.5, borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Typography sx={{ fontSize: '12px', color: '#fff', fontWeight: 800 }}>💻 Techflix Reg Closes Tonight</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content Area - Pulled up to overlap hero */}
      <Box sx={{ px: 2, mt: -4, position: 'relative', zIndex: 20 }}>

        {/* Quick Access Section - Unified Grid */}
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            p: 2.5,
            mb: 3,
            boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)',
            border: '1px solid rgba(0,0,0,0.03)',
          }}
        >
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Box
                  onClick={() => navigate(cat.route)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    '&:hover .icon-box': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 16px ${cat.color}25`,
                    }
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      backgroundColor: cat.bg,
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <cat.icon size={28} strokeWidth={2.5} />
                  </Box>
                  <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#475569', textAlign: 'center', lineHeight: 1.1 }}>
                    {cat.title}
                  </Typography>
                </Box>
              </motion.div>
            ))}

            {/* Placeholder for 8th slot (More Options) for perfect grid symmetry */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 7 * 0.05 + 0.1 }}>
              <Box
                onClick={() => setMoreSnackbar(true)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover .icon-box': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
                  }
                }}
              >
                <Box
                  className="icon-box"
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    backgroundColor: '#f1f5f9',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <MoreHorizontal size={28} strokeWidth={2.5} />
                </Box>
                <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textAlign: 'center', lineHeight: 1.1 }}>
                  More
                </Typography>
              </Box>
            </motion.div>
          </div>
        </Box>
        {/* ═══════ CASCADES EVENT BANNER ═══════ */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #0f2460 0%, #1e3a8a 50%, #2d5be3 100%)',
            borderRadius: '20px',
            p: 2.5,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(15, 36, 96, 0.25)',
          }}>
            <Box sx={{ position: 'absolute', right: -15, top: -15, fontSize: '80px', opacity: 0.1, lineHeight: 1 }}>🎊</Box>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box className="flex items-center gap-2 mb-1">
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 1, py: 0.25, borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Typography sx={{ fontSize: '9px', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Happening Today</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, mb: 0.5 }}>🎊 Cascades 2026</Typography>
              <Typography sx={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Today at 5:00 PM · Arena</Typography>
            </Box>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', px: 2, py: 1, borderRadius: '12px', flexShrink: 0, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>🔔 Remind Me</Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Sticky Feed Filter Bar */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 30, bgcolor: 'rgba(248, 250, 252, 0.9)', backdropFilter: 'blur(12px)', pb: 2, pt: 1, mx: -2, px: 2 }}>
          <Box className="flex gap-2.5 overflow-x-auto pb-1" sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
            {['All Campus', 'Academics', 'Hostel', 'Events', 'Clubs', 'Q&A'].map((filter, i) => (
              <Chip
                key={filter}
                label={filter}
                clickable
                sx={{
                  bgcolor: i === 0 ? '#0f2460' : '#ffffff',
                  color: i === 0 ? '#ffffff' : '#64748b',
                  fontWeight: 800,
                  fontSize: '13px',
                  border: i === 0 ? 'none' : '1px solid #e2e8f0',
                  boxShadow: i === 0 ? '0 4px 12px rgba(15,36,96,0.15)' : 'none',
                  px: 0.5,
                  py: 1,
                  height: 'auto',
                  borderRadius: '12px',
                  '&:hover': { bgcolor: i === 0 ? '#1e3a8a' : '#f8fafc' }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Section: Trending Discussions (main content → high priority) */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 1, px: 0.5 }}>
          <Typography variant="h4" sx={{ color: '#0f2460', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon sx={{ color: '#2d5be3' }} />
            Campus Feed
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#2d5be3', fontWeight: 600, cursor: 'pointer' }}>
            Latest
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {/* Interactive Poll */}
          <Box sx={{ p: 2.5, backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <Box className="flex items-center justify-between mb-4">
              <Box className="flex items-center gap-2">
                <Box sx={{ bgcolor: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: 800, px: 1, py: 0.25, borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Poll</Box>
                <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Ends in 2h</Typography>
              </Box>
              <Typography sx={{ fontSize: '12px', color: '#0f2460', fontWeight: 800 }}>342 votes</Typography>
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', mb: 3, lineHeight: 1.3 }}>
              What's the most high-ROI CSE Elective for Semester 5? 🤔
            </Typography>

            <Box className="flex flex-col gap-3">
              {[
                { label: 'Cloud Computing (AWS)', percent: 65, active: true },
                { label: 'Applied AI & ML', percent: 25, active: false },
                { label: 'Blockchain Fundamentals', percent: 10, active: false },
              ].map((opt, i) => (
                <Box key={i} sx={{ position: 'relative', height: 48, borderRadius: '16px', overflow: 'hidden', bgcolor: opt.active ? 'rgba(45,91,227,0.04)' : '#f8fafc', border: opt.active ? '2px solid #2d5be3' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', px: 2.5, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: '#2d5be3' } }}>
                  <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${opt.percent}%`, background: opt.active ? 'linear-gradient(90deg, rgba(45,91,227,0.15) 0%, rgba(45,91,227,0.05) 100%)' : 'rgba(15,36,96,0.04)' }} />
                  <Box className="flex justify-between w-full relative z-10 items-center">
                    <Typography sx={{ fontSize: '14px', fontWeight: opt.active ? 800 : 600, color: opt.active ? '#0f172a' : '#475569' }}>{opt.label}</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 800, color: opt.active ? '#2d5be3' : '#64748b' }}>{opt.percent}%</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {trendingPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <Box
                sx={{
                  p: 2.5,
                  backgroundColor: i === 0 ? '#f4f7ff' : '#ffffff',
                  borderRadius: '24px',
                  boxShadow: i === 0 ? '0 8px 32px rgba(45, 91, 227, 0.08)' : '0 4px 20px rgba(15, 36, 96, 0.04)',
                  border: i === 0 ? '1px solid rgba(45, 91, 227, 0.15)' : '1px solid rgba(0,0,0,0.03)',
                }}
              >
                <Box className="flex justify-between items-start mb-4">
                  <Box className="flex items-center gap-3">
                    <Avatar sx={{ bgcolor: post.avatarColor, width: 44, height: 44, fontWeight: 700, border: i === 0 ? '2px solid #ffffff' : 'none', boxShadow: i === 0 ? '0 2px 8px rgba(0,0,0,0.1)' : 'none' }}>
                      {post.initials}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                        {post.name}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#64748b', mt: 0.5, fontWeight: 500 }}>
                        {post.role} • {post.time}
                      </Typography>
                    </Box>
                  </Box>
                  {i === 0 ? (
                    <Box sx={{ bgcolor: '#ffffff', color: '#1e3a8a', border: '1px solid #1e3a8a40', fontSize: '10px', fontWeight: 800, px: 1.5, py: 0.5, borderRadius: '12px', display: 'flex', alignItems: 'center', boxShadow: '0 4px 12px rgba(30,58,138,0.1)' }}>
                      ✨ Featured
                    </Box>
                  ) : (
                    <IconButton size="small" sx={{ color: '#94a3b8' }}>
                      <MoreHorizontal size={20} strokeWidth={2.5} />
                    </IconButton>
                  )}
                </Box>

                {/* Post Tag */}
                {post.tag && (
                  <Box className="mb-2">
                    <Box component="span" sx={{ bgcolor: post.tagColor + '15', color: post.tagColor, fontSize: '10px', fontWeight: 800, px: 1, py: 0.3, borderRadius: '5px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                      {post.tag}
                    </Box>
                  </Box>
                )}

                <Typography sx={{ fontSize: '15px', color: '#334155', lineHeight: 1.5, mb: 3 }}>
                  {post.text}
                </Typography>

                <Box className="flex items-center gap-4">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b', bgcolor: '#f8fafc', px: 1.5, py: 0.75, borderRadius: '20px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{post.likes}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b', bgcolor: '#f8fafc', px: 1.5, py: 0.75, borderRadius: '20px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{post.comments}</Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* ═══════ NOTICE BOARD (secondary info) ═══════ */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Box sx={{ backgroundColor: '#ffffff', borderRadius: '20px', p: 2.5, mb: 3, boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <Box className="flex items-center justify-between mb-2.5">
              <Box className="flex items-center gap-2">
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Megaphone size={15} color="#2d5be3" />
                </Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 800, color: '#0f2460', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notice Board</Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#2d5be3', fontWeight: 700, cursor: 'pointer' }}>See All</Typography>
            </Box>
            <Box className="flex flex-col gap-2">
              {noticeBoard.map((notice, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f8fafc', borderRadius: '12px', p: 1.75, border: '1px solid #e2e8f0' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box className="flex items-center gap-1.5 mb-0.5">
                      <Box sx={{ bgcolor: notice.tagColor + '18', px: 1, py: 0.15, borderRadius: '4px' }}>
                        <Typography sx={{ fontSize: '9px', fontWeight: 800, color: notice.tagColor, textTransform: 'uppercase' }}>{notice.tag}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{notice.date}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#334155', lineHeight: 1.4 }}>{notice.title}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* ═══════ TODAY'S MESS MENU (reference info → bottom) ═══════ */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Box sx={{ backgroundColor: '#ffffff', borderRadius: '20px', p: 2.5, mb: 3, boxShadow: '0 4px 20px rgba(15, 36, 96, 0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <Box className="flex items-center justify-between mb-2">
              <Box className="flex items-center gap-2">
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Utensils size={15} color="#EA580C" />
                </Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 800, color: '#0f2460', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Today's Mess Menu</Typography>
              </Box>
            </Box>
            <Box className="flex items-center gap-1.5 mb-2">
              <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#334155' }}>{todayMess.meal}</Typography>
              <Typography sx={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>· {todayMess.time}</Typography>
            </Box>
            <Box className="flex flex-wrap gap-1.5">
              {todayMess.items.map((item) => (
                <Box key={item} sx={{ bgcolor: '#f8fafc', px: 1.5, py: 0.5, borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Highlight Banner */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '24px',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 24px rgba(16, 185, 129, 0.2)',
              mb: 4,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'absolute', right: -20, top: -20, opacity: 0.2 }}>
              <GraduationCap size={120} color="#fff" strokeWidth={1.5} />
            </Box>
            <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '70%' }}>
              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '13px', mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                Live Now
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff', fontSize: '20px', mb: 1 }}>
                Alumni Webinar: First Year Survival Guide
              </Typography>
              <Box className="flex items-center gap-2 mt-2">
                <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '10px', border: '2px solid #10b981' } }}>
                  <Avatar>A</Avatar>
                  <Avatar>R</Avatar>
                  <Avatar>K</Avatar>
                </AvatarGroup>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 500 }}>
                  +42 watching
                </Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: '#fff', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Box>
          </Box>
        </motion.div>

      </Box>
      <Snackbar
        open={moreSnackbar}
        autoHideDuration={3000}
        onClose={() => setMoreSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 90, sm: 30 } }}
      >
        <Alert
          severity="info"
          onClose={() => setMoreSnackbar(false)}
          sx={{ width: '100%', borderRadius: '14px', boxShadow: '0 8px 20px rgba(15, 36, 96, 0.12)', bgcolor: '#ffffff', color: '#0f2460', '& .MuiAlert-icon': { color: '#2d5be3' } }}
        >
          More modules are coming soon!
        </Alert>
      </Snackbar>
    </Box>
  );
}