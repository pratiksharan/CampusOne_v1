import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  AvatarGroup,
  Chip,
  Box,
  InputBase,
} from '@mui/material';
import PremiumCard from '../components/PremiumCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const memberColors = ['#1E3A8A', '#DC2626', '#16A34A', '#7C3AED', '#EA580C', '#0891b2', '#db2777'];

const studyGroupsData = [
  {
    id: 2,
    name: 'English Writing & Communication Group',
    subject: 'Technical English — 2nd Sem',
    members: 8,
    maxMembers: 12,
    avatarInitials: ['N', 'T', 'M', 'A', 'R', 'S', 'K', 'P'],
    rolesNeeded: ['Peer Reviewer'],
    description: 'Improving technical writing, presentation skills, and grammar together. Peer review sessions for reports and proposals.',
    isLive: true,
    pinnedMessage: 'Next session: Friday 5PM — Topic: Project Proposal Review',
    messages: [
      { id: 200, type: 'system', text: 'Pratik joined the group', time: '1:00 PM' },
      { id: 201, sender: 'Neha', initials: 'N', text: 'my draft is ready for peer review', isFile: false, time: '2:30 PM' },
      { id: 202, sender: 'Tanvi', initials: 'T', text: "I'll review yours tonight", isFile: false, time: '2:45 PM', reactions: ['👍 2', '❤️ 1'] },
      { id: 203, sender: 'Pratik', isYou: true, text: 'Hey everyone! Thanks for adding me. I can also help reviewing.', isFile: false, time: '2:50 PM' },
      { id: 204, sender: 'Meera', initials: 'M', text: 'Report Writing Guide.pdf', isFile: true, fileSize: '2.4 MB', time: '3:00 PM' },
      { id: 205, sender: 'Kiran', initials: 'K', text: 'Thanks Meera, this is super helpful!', isFile: false, time: '3:15 PM', replyTo: { sender: 'Meera', text: 'Report Writing Guide.pdf' } },
      { id: 206, sender: 'Pratik', isYou: true, text: 'Awesome, I will check the guide out before sending my draft.', isFile: false, time: '3:20 PM' }
    ]
  },
  {
    id: 3,
    name: 'DBMS Exam Prep Group',
    subject: 'Database Management Systems — 2nd Sem CSE',
    members: 8,
    maxMembers: 12,
    avatarInitials: ['A', 'M', 'K', 'D'],
    rolesNeeded: ['Note Taker', 'Query Practice Lead'],
    description: 'Focused prep for DBMS internals — ER diagrams, normalization, SQL queries & past paper solving.',
    isLive: true,
  },
  {
    id: 4,
    name: 'Engineering Maths Problem Solvers',
    subject: 'Engineering Mathematics II — 2nd Sem',
    members: 6,
    maxMembers: 10,
    avatarInitials: ['M', 'D', 'R', 'A'],
    rolesNeeded: ['Doubt Solver'],
    description: 'Tackle Laplace transforms, differential equations & probability together. We solve 10 problems every session.',
    isLive: false,
  },
  {
    id: 5,
    name: 'Physics Lab Group B',
    subject: 'Applied Physics — 1st Sem',
    members: 4,
    maxMembers: 4,
    avatarInitials: ['S', 'J', 'R', 'V'],
    rolesNeeded: [],
    description: 'Group for the upcoming pendulum experiment. Ensure you read the manual before Thursday.',
    isLive: false,
  }
];

export default function StudyGroups() {
  const navigate = useNavigate();
  const [joined, setJoined] = useState<Set<number>>(new Set([2]));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const handleJoin = (groupId: number) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const currentActiveGroupData = studyGroupsData.find(g => g.id === activeGroup);

  const filteredGroups = studyGroupsData.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myGroups = filteredGroups.filter(g => joined.has(g.id));
  const otherGroups = filteredGroups.filter(g => !joined.has(g.id));

  if (currentActiveGroupData) {
    return (
      <div className="bg-[#f8fafc] flex flex-col" style={{ height: 'calc(100dvh - 80px)', overflow: 'hidden' }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ background: '#ffffff', color: '#0f172a', borderBottom: '1px solid #e2e8f0' }}>
          <Toolbar sx={{ px: 1, py: 0.5, minHeight: '60px !important' }}>
            <IconButton edge="start" color="inherit" onClick={() => setActiveGroup(null)} sx={{ mr: 0, p: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            
            <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '11px', fontWeight: 700, border: '2px solid #ffffff' } }}>
                {currentActiveGroupData.avatarInitials.map((initial, idx) => (
                  <Avatar key={idx} sx={{ bgcolor: memberColors[idx % memberColors.length] }}>{initial}</Avatar>
                ))}
              </AvatarGroup>
              <Box sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2 }}>
                  {currentActiveGroupData.name}
                </Typography>
                <Box className="flex items-center gap-1 mt-0.5">
                  <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                    {currentActiveGroupData.members} members
                  </Typography>
                  {currentActiveGroupData.isLive && (
                    <>
                      <Typography sx={{ fontSize: '10px', color: '#cbd5e1' }}>•</Typography>
                      <Typography sx={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981', mr: 0.5 }} />
                        Live
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Box>

            <Box className="flex items-center gap-0">
              <IconButton sx={{ color: '#0f172a', p: 1 }}>
                <PeopleIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton sx={{ color: '#0f172a', p: 1 }}>
                <FolderIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton sx={{ color: '#0f172a', p: 1 }}>
                <MoreVertIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box className="flex-1 overflow-y-auto relative flex flex-col bg-[#f0f4f8]">
          {/* Pinned Message */}
          {currentActiveGroupData.pinnedMessage && (
            <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: '#0f2460', color: '#fff', px: 1.5, py: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(15, 36, 96, 0.15)' }}>
              <Box className="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
                <PushPinIcon sx={{ fontSize: 16, color: '#60a5fa', transform: 'rotate(45deg)' }} />
                <Typography sx={{ fontSize: '12.5px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentActiveGroupData.pinnedMessage}
                </Typography>
              </Box>
              <Button variant="contained" size="small" startIcon={<CalendarTodayIcon sx={{ fontSize: 12 }} />} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '10px', fontWeight: 700, boxShadow: 'none', px: 1.2, py: 0.5, borderRadius: '6px', whiteSpace: 'nowrap', minWidth: 'auto', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)', boxShadow: 'none' } }}>
                Add
              </Button>
            </Box>
          )}

          {/* Messages Feed */}
          <Box className="p-3 flex flex-col gap-3 pb-4 min-h-min">
            {currentActiveGroupData.messages?.map((msg: any, idx: number) => {
              if (msg.type === 'system') {
                return (
                  <Box key={msg.id} className="flex justify-center my-1.5">
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.06)', px: 2, py: 0.5, borderRadius: '12px' }}>
                      <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                        {msg.text}
                      </Typography>
                    </Box>
                  </Box>
                );
              }

              return (
                <Box key={msg.id} sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', alignSelf: msg.isYou ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  {!msg.isYou && (
                    <Avatar sx={{ width: 24, height: 24, bgcolor: memberColors[idx % memberColors.length], fontSize: '10px', fontWeight: 800, mb: 2 }}>
                      {msg.initials}
                    </Avatar>
                  )}
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.isYou ? 'flex-end' : 'flex-start' }}>
                    {!msg.isYou && (
                      <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#475569', ml: 0.5, mb: 0.25 }}>
                        {msg.sender}
                      </Typography>
                    )}

                    <Box sx={{ 
                      bgcolor: msg.isYou ? '#0f2460' : '#ffffff', 
                      p: msg.isFile ? 0 : 1.2, 
                      px: msg.isFile ? 0 : 1.5,
                      borderRadius: '16px', 
                      borderBottomRightRadius: msg.isYou ? '4px' : '16px',
                      borderBottomLeftRadius: msg.isYou ? '16px' : '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                      border: msg.isYou ? 'none' : '1px solid #e2e8f0',
                      position: 'relative'
                    }}>
                      {/* Reply preview */}
                      {msg.replyTo && (
                        <Box sx={{ bgcolor: 'rgba(0,0,0,0.04)', borderLeft: '3px solid #60a5fa', p: 0.75, mb: 1, borderRadius: '4px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                          <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6' }}>{msg.replyTo.sender}</Typography>
                          <Typography sx={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.replyTo.text}</Typography>
                        </Box>
                      )}

                      {/* Content */}
                      {msg.isFile ? (
                        <Box sx={{ p: 1, py: 1.2, display: 'flex', alignItems: 'center', gap: 1.2, minWidth: 180 }}>
                          <Box sx={{ bgcolor: '#e0e7ff', p: 1, borderRadius: '8px' }}>
                            <FilePresentIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: msg.isYou ? '#fff' : '#1e293b' }}>{msg.text}</Typography>
                            <Typography sx={{ fontSize: '10.5px', color: msg.isYou ? 'rgba(255,255,255,0.7)' : '#64748b', mt: 0.25 }}>{msg.fileSize} • PDF</Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography sx={{ fontSize: '14px', color: msg.isYou ? '#ffffff' : '#1e293b', lineHeight: 1.4 }}>
                          {msg.text}
                        </Typography>
                      )}
                    </Box>

                    {/* Meta info row: time, read receipt, reactions */}
                    <Box className="flex items-center gap-1.5 mt-0.5" sx={{ alignSelf: msg.isYou ? 'flex-end' : 'flex-start', px: 0.5 }}>
                      <Typography sx={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{msg.time}</Typography>
                      {msg.isYou && <CheckCircleIcon sx={{ fontSize: 12, color: '#3b82f6' }} />}
                    </Box>

                    {/* Reactions */}
                    {msg.reactions && (
                      <Box className="flex items-center gap-1 mt-0.5" sx={{ alignSelf: msg.isYou ? 'flex-end' : 'flex-start' }}>
                        {msg.reactions.map((reaction: string, i: number) => (
                          <Box key={i} sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', px: 0.75, py: 0.2, fontSize: '11px', display: 'flex', alignItems: 'center', gap: 0.5, boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                            {reaction}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Improved Message Input Bar */}
        <Box sx={{ bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0', p: 1.5, pb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', bgcolor: '#f1f5f9', borderRadius: '24px', flex: 1, alignItems: 'center', p: 0.25, pl: 0.5 }}>
            <IconButton sx={{ color: '#64748b', p: 1 }}>
              <EmojiEmotionsIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <InputBase 
              placeholder="Message the group..." 
              sx={{ flex: 1, fontSize: '14px', px: 0.5 }} 
            />
            <IconButton sx={{ color: '#64748b', p: 1 }}>
              <AttachFileIcon sx={{ fontSize: 18, transform: 'rotate(45deg)' }} />
            </IconButton>
            <IconButton sx={{ color: '#64748b', p: 1, mr: 0.5 }}>
              <ImageIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
          <IconButton sx={{ bgcolor: '#0f2460', color: '#fff', '&:hover': { bgcolor: '#1e3a8a' }, width: 40, height: 40, flexShrink: 0, boxShadow: '0 4px 12px rgba(15,36,96,0.2)' }}>
            <SendIcon sx={{ fontSize: 18, ml: 0.5 }} />
          </IconButton>
        </Box>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="bg-slate-50 min-h-screen relative pb-24">
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div className="flex items-center">
            <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', ml: 1 }}>
              Study Groups
            </Typography>
          </div>
          <IconButton sx={{ bgcolor: '#0f172a', color: '#fff', '&:hover': { bgcolor: '#1e293b' }, width: 36, height: 36, boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)' }}>
            <AddIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Toolbar>
        
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: '16px', px: 2, py: 1 }}>
            <SearchIcon sx={{ color: '#94a3b8', fontSize: 20, mr: 1 }} />
            <InputBase 
              placeholder="Search by subject or name..." 
              sx={{ flex: 1, fontSize: '14px', fontWeight: 500 }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>
      </AppBar>

      <div className="p-4">
        {myGroups.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#2d5be3', textTransform: 'uppercase', letterSpacing: '1px', mb: 2 }}>
              My Groups ({myGroups.length})
            </Typography>
            <div className="flex flex-col gap-4">
              {myGroups.map(group => <GroupCard key={group.id} group={group} isJoined={true} onJoin={() => handleJoin(group.id)} onEnter={() => setActiveGroup(group.id)} />)}
            </div>
          </Box>
        )}

        <Box>
          <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', mb: 2 }}>
            Discover Groups
          </Typography>
          <div className="flex flex-col gap-4">
            {otherGroups.map(group => <GroupCard key={group.id} group={group} isJoined={false} onJoin={() => handleJoin(group.id)} onEnter={() => setActiveGroup(group.id)} />)}
            {otherGroups.length === 0 && (
              <Typography sx={{ textAlign: 'center', color: '#94a3b8', mt: 4, py: 4 }}>No groups found matching your search.</Typography>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}

function GroupCard({ group, isJoined, onJoin, onEnter }: { group: any, isJoined: boolean, onJoin: () => void, onEnter: () => void }) {
  const isFull = group.members >= group.maxMembers;

  return (
    <PremiumCard
      sx={{
        border: '1px solid',
        borderColor: isJoined ? '#bfdbfe' : 'rgba(0,0,0,0.05)',
        boxShadow: isJoined ? '0 8px 24px rgba(45, 91, 227, 0.08)' : undefined,
        bgcolor: isJoined ? '#f8fafc' : '#ffffff',
        borderLeft: isJoined ? '4px solid #0f2460' : undefined,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: '20px !important', position: 'relative' }}>
        
        {/* Status Badges Row */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, position: 'absolute', top: 16, right: 16 }}>
          {group.isLive && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#ef4444', background: '#fef2f2', px: 1.2, py: 0.5, borderRadius: '8px', border: '1px solid #fee2e2' }}>
              <Box sx={{ position: 'relative', width: 6, height: 6 }}>
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', bgcolor: '#ef4444', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', bgcolor: '#ef4444' }} />
              </Box>
              <Typography sx={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live</Typography>
            </Box>
          )}
          {isFull ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#fff', background: '#ef4444', px: 1, py: 0.25, borderRadius: '6px' }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full</Typography>
            </Box>
          ) : isJoined ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#16a34a', background: '#f0fdf4', px: 1, py: 0.25, borderRadius: '6px', border: '1px solid #bbf7d0' }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Joined ✓</Typography>
            </Box>
          ) : null}
        </Box>

        <Chip label={group.subject} size="small" sx={{ height: 24, fontSize: '11px', fontWeight: 700, bgcolor: isJoined ? '#e0e7ff' : '#f1f5f9', color: isJoined ? '#3730a3' : '#475569', mb: 1.5, borderRadius: '6px' }} />

        <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', mb: 1, pr: 8, lineHeight: 1.2 }}>
          {group.name}
        </Typography>

        <Typography sx={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {group.description}
        </Typography>

        {group.rolesNeeded.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <Typography sx={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, mr: 0.5, textTransform: 'uppercase' }}>Seeking:</Typography>
            {group.rolesNeeded.map((role: string) => (
              <Chip key={role} label={role} size="small" sx={{ height: 20, bgcolor: '#fff7ed', color: '#ea580c', border: '1px solid #ffedd5', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }} />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          <Box className="flex items-center gap-1">
            <Typography sx={{ fontSize: '12px', fontWeight: 800, color: isFull ? '#ef4444' : '#0f172a' }}>
              {group.members}<span style={{ color: '#94a3b8', fontWeight: 600 }}>/{group.maxMembers}</span>
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>members</Typography>
          </Box>
        
          <div className="flex items-center justify-between gap-3">
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '12px', fontWeight: 700, border: '2px solid #ffffff' } }}>
              {group.avatarInitials.map((initial: string, idx: number) => (
                <Avatar key={idx} sx={{ bgcolor: memberColors[idx % memberColors.length], width: 32, height: 32 }}>{initial}</Avatar>
              ))}
            </AvatarGroup>

            {isJoined ? (
              <Button variant="contained" onClick={onEnter} sx={{ borderRadius: '12px', py: 1, px: 3, fontSize: '13px', fontWeight: 800, textTransform: 'none', bgcolor: '#0f2460', color: '#ffffff', boxShadow: '0 4px 12px rgba(15, 36, 96, 0.2)', '&:hover': { bgcolor: '#1e3a8a', boxShadow: '0 6px 16px rgba(15, 36, 96, 0.3)' } }}>
                Open Chat
              </Button>
            ) : (
              <Button variant="outlined" onClick={onJoin} disabled={isFull} sx={{ borderRadius: '12px', py: 1, px: 3, fontSize: '13px', fontWeight: 800, textTransform: 'none', color: isFull ? '#94a3b8' : '#0f172a', borderColor: isFull ? '#cbd5e1' : '#e2e8f0', bgcolor: isFull ? '#f1f5f9' : 'transparent', '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' } }}>
                {isFull ? 'Group Full' : 'Join'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </PremiumCard>
  );
}