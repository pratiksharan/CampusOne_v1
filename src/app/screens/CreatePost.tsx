import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  Box,
  InputAdornment,
} from '@mui/material';
import PremiumCard from '../components/PremiumCard';
import { motion, AnimatePresence } from 'motion/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import BusinessIcon from '@mui/icons-material/Business';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type CategoryType = 'events' | 'academics' | 'study-groups' | 'internships' | 'ask-seniors' | 'lost-found' | '';

export default function CreatePost() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('');
  
  // Shared Form State
  const [content, setContent] = useState('');
  
  // Event State
  const [eventType, setEventType] = useState('');
  
  // Senior State
  const [seniorTopic, setSeniorTopic] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Academics State
  const [academicSubject, setAcademicSubject] = useState('');
  
  // Opportunity State
  const [oppType, setOppType] = useState('');
  
  // Lost & Found State
  const [lostStatus, setLostStatus] = useState<'lost' | 'found' | ''>('');
  const [contactViaChat, setContactViaChat] = useState(true);

  const handleSubmit = () => {
    alert('Post created successfully!');
    navigate('/');
  };

  const handleSelectCategory = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setStep(2);
  };

  const postTypes = [
    { id: '', title: 'General Discussion', desc: 'Share thoughts, questions, or updates with everyone.', iconColor: '#2d5be3', icon: <ChatBubbleOutlineIcon sx={{ fontSize: 32, color: '#2d5be3' }}/>, bg: '#eff6ff', border: '#bfdbfe' },
    { id: 'events', title: 'Campus Event', desc: 'Promote a club event, workshop, or hackathon.', iconColor: '#10b981', icon: <EventIcon sx={{ fontSize: 32, color: '#10b981' }}/>, bg: '#ecfdf5', border: '#a7f3d0' },
    { id: 'ask-seniors', title: 'Ask Seniors', desc: 'Get advice on placements, electives, or campus life.', iconColor: '#f59e0b', icon: <SchoolIcon sx={{ fontSize: 32, color: '#f59e0b' }}/>, bg: '#fffbeb', border: '#fde68a' },
    { id: 'academics', title: 'Academic Doubt', desc: 'Need help with assignments or core concepts?', iconColor: '#f43f5e', icon: <MenuBookIcon sx={{ fontSize: 32, color: '#f43f5e' }}/>, bg: '#fff1f2', border: '#fecdd3' },
    { id: 'internships', title: 'Opportunity', desc: 'Share an internship or job opening.', iconColor: '#8b5cf6', icon: <WorkOutlineIcon sx={{ fontSize: 32, color: '#8b5cf6' }}/>, bg: '#f5f3ff', border: '#ddd6fe' },
    { id: 'lost-found', title: 'Lost & Found', desc: 'Report a lost item or something you found.', iconColor: '#0ea5e9', icon: <SearchIcon sx={{ fontSize: 32, color: '#0ea5e9' }}/>, bg: '#f0f9ff', border: '#bae6fd' },
  ];

  const currentType = postTypes.find(p => p.id === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen" style={{ paddingBottom: '120px' }}>
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => step === 2 ? setStep(1) : navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', ml: 1 }}>
            {step === 1 ? 'Create Post' : 'Compose'}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="p-4 pt-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Box className="pb-3 mb-4" sx={{ borderBottom: '1px solid #e2e8f0' }}>
                <Typography variant="h4" sx={{ color: '#0f2460', mb: 1, fontWeight: 900, letterSpacing: '-0.8px' }}>
                  What do you want to share?
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Selecting the right category makes sure your post reaches the right students on CampusOne.
                </Typography>
              </Box>

              <div className="flex flex-col gap-3 pb-8">
                {postTypes.map((pt, i) => (
                  <motion.div
                    key={pt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                  >
                    <PremiumCard 
                      elevation={0}
                      onClick={() => handleSelectCategory(pt.id as CategoryType)}
                      whileTap={{ scale: 0.96, backgroundColor: pt.bg }}
                      sx={{ 
                        borderRadius: '20px', 
                        border: '1px solid transparent',
                        borderLeft: `5px solid ${pt.iconColor}`,
                        bgcolor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'border 0.2s, background-color 0.2s, box-shadow 0.2s',
                        boxShadow: '0 4px 12px rgba(15, 36, 96, 0.03)',
                        '&:hover': {
                          borderColor: pt.border,
                          bgcolor: pt.bg,
                          boxShadow: '0 8px 16px rgba(15, 36, 96, 0.06)',
                        }
                      }}
                    >
                      <Box sx={{ p: '20px !important', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ width: 60, height: 60, borderRadius: '16px', bgcolor: pt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {pt.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                            {pt.title}
                          </Typography>
                          <Typography sx={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.4, fontWeight: 500 }}>
                            {pt.desc}
                          </Typography>
                        </Box>
                        <ChevronRightIcon sx={{ color: '#cbd5e1' }} />
                      </Box>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header info for selected category */}
              <Box className="flex items-center gap-3 mb-5" sx={{ pb: 3, borderBottom: '1px solid #e2e8f0' }}>
                 <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: currentType?.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {currentType?.icon}
                 </Box>
                 <Box>
                   <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                     Drafting Post
                   </Typography>
                   <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.3px' }}>
                     {currentType?.title}
                   </Typography>
                 </Box>
              </Box>

              {/* DYNAMIC TOP FIELDS (Before Text Editor) */}

              {/* EVENT SPECIFIC FIELDS */}
              {selectedCategory === 'events' && (
                <Box className="space-y-4 mb-4">
                  {/* Banner Upload */}
                  <Box sx={{ border: '2px dashed #cbd5e1', borderRadius: '20px', p: 4, textAlign: 'center', bgcolor: '#f8fafc', cursor: 'pointer', '&:hover': { borderColor: '#10b981', bgcolor: '#ecfdf5' }, transition: 'all 0.2s' }}>
                    <AddPhotoAlternateIcon sx={{ fontSize: 40, color: '#94a3b8', mb: 1 }} />
                    <Typography sx={{ fontWeight: 800, color: '#64748b' }}>Add Banner Image</Typography>
                  </Box>
                  <TextField fullWidth placeholder="Event Title" variant="standard" InputProps={{ disableUnderline: true, sx: { fontSize: '24px', fontWeight: 900, color: '#0f172a' } }} />
                  
                  <Box className="flex gap-3">
                    <Box className="flex-1 flex flex-col gap-1" sx={{ bgcolor: '#f8fafc', p: 1.5, px: 2, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Date</Typography>
                      <input type="date" style={{ background: 'transparent', outline: 'none', border: 'none', fontWeight: 700, color: '#0f172a', width: '100%' }} />
                    </Box>
                    <Box className="flex-1 flex flex-col gap-1" sx={{ bgcolor: '#f8fafc', p: 1.5, px: 2, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Time</Typography>
                      <input type="time" style={{ background: 'transparent', outline: 'none', border: 'none', fontWeight: 700, color: '#0f172a', width: '100%' }} />
                    </Box>
                  </Box>
                  
                  <TextField fullWidth placeholder="Location (e.g. CS Seminar Hall)" variant="outlined" InputProps={{ startAdornment: <LocationOnIcon sx={{ color: '#94a3b8', mr: 1 }} />, sx: { borderRadius: '16px', bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } } }} />
                  
                  <Box>
                    <Typography sx={{ fontSize: '12px', color: '#0f2460', fontWeight: 800, textTransform: 'uppercase', mb: 1.5 }}>Event Type</Typography>
                    <div className="flex flex-wrap gap-2">
                      {['Hackathon', 'Workshop', 'Seminar', 'Cultural'].map(type => (
                        <Chip key={type} label={type} onClick={() => setEventType(type)} sx={{ bgcolor: eventType === type ? '#10b981' : '#f1f5f9', color: eventType === type ? '#ffffff' : '#475569', fontWeight: 700, borderRadius: '10px', p: 0.5, '&:hover': { bgcolor: eventType === type ? '#059669' : '#e2e8f0' } }} />
                      ))}
                    </div>
                  </Box>
                </Box>
              )}

              {/* ASK SENIORS / ACADEMICS / OPPORTUNITY TITLES */}
              {['ask-seniors', 'academics', 'internships'].includes(selectedCategory) && (
                <Box sx={{ mb: 3 }}>
                  <TextField 
                    fullWidth 
                    placeholder={selectedCategory === 'internships' ? "Role Title" : "Question Title"} 
                    variant="standard" 
                    InputProps={{ disableUnderline: true, sx: { fontSize: '22px', fontWeight: 900, color: '#0f172a' } }} 
                  />
                  {selectedCategory === 'academics' && (
                    <Typography sx={{ fontSize: '13px', color: '#64748b', fontWeight: 600, mt: 0.5, cursor: 'pointer', '&:hover': { color: '#2d5be3' } }}>
                      Check if your doubt has already been answered →
                    </Typography>
                  )}
                </Box>
              )}

              {/* ASK SENIORS TOPIC TAGS */}
              {selectedCategory === 'ask-seniors' && (
                <Box className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {['Placements', 'Academics', 'Campus Life', 'Other'].map(topic => (
                      <Chip key={topic} label={topic} onClick={() => setSeniorTopic(topic)} sx={{ bgcolor: seniorTopic === topic ? '#f59e0b' : '#f1f5f9', color: seniorTopic === topic ? '#ffffff' : '#475569', fontWeight: 700, borderRadius: '10px', p: 0.5 }} />
                    ))}
                  </div>
                </Box>
              )}

              {/* ACADEMICS SUBJECT TAGS */}
              {selectedCategory === 'academics' && (
                <Box className="mb-4">
                  <Typography sx={{ fontSize: '12px', color: '#0f2460', fontWeight: 800, textTransform: 'uppercase', mb: 1.5 }}>Tag Your Question</Typography>
                  <div className="flex flex-wrap gap-2">
                    {['Calculus', 'DBMS', 'Physics', 'Chemistry', 'Data Structures', 'Other'].map(subject => (
                      <Chip key={subject} label={subject} onClick={() => setAcademicSubject(subject)} sx={{ bgcolor: academicSubject === subject ? '#f43f5e' : '#f1f5f9', color: academicSubject === subject ? '#ffffff' : '#475569', fontWeight: 700, borderRadius: '10px', p: 0.5 }} />
                    ))}
                  </div>
                </Box>
              )}

              {/* LOST & FOUND PRE-TEXT FIELDS */}
              {selectedCategory === 'lost-found' && (
                <Box className="space-y-4 mb-4">
                  <div className="flex gap-3">
                    <Button fullWidth onClick={() => setLostStatus('lost')} sx={{ py: 2, borderRadius: '16px', fontWeight: 800, textTransform: 'none', fontSize: '16px', border: '2px solid', borderColor: lostStatus === 'lost' ? '#ef4444' : '#fee2e2', bgcolor: lostStatus === 'lost' ? '#ef4444' : '#fff', color: lostStatus === 'lost' ? '#fff' : '#ef4444' }}>
                      🔴 I Lost This
                    </Button>
                    <Button fullWidth onClick={() => setLostStatus('found')} sx={{ py: 2, borderRadius: '16px', fontWeight: 800, textTransform: 'none', fontSize: '16px', border: '2px solid', borderColor: lostStatus === 'found' ? '#10b981' : '#d1fae5', bgcolor: lostStatus === 'found' ? '#10b981' : '#fff', color: lostStatus === 'found' ? '#fff' : '#10b981' }}>
                      🟢 I Found This
                    </Button>
                  </div>

                  {/* Upload Image Field */}
                  <Box sx={{ border: '2px dashed #bae6fd', borderRadius: '20px', p: 4, textAlign: 'center', bgcolor: '#f0f9ff', cursor: 'pointer', '&:hover': { borderColor: '#0ea5e9' }, transition: 'all 0.2s' }}>
                    <AddPhotoAlternateIcon sx={{ fontSize: 40, color: '#0ea5e9', mb: 1 }} />
                    <Typography sx={{ fontWeight: 800, color: '#0284c7' }}>Tap to add photo</Typography>
                  </Box>

                  <TextField fullWidth placeholder="Item Name (e.g. Blue Hydroflask)" variant="standard" InputProps={{ disableUnderline: true, sx: { fontSize: '22px', fontWeight: 900, color: '#0f172a' } }} />
                  <TextField fullWidth placeholder="Last Seen / Found Location" variant="outlined" InputProps={{ startAdornment: <LocationOnIcon sx={{ color: '#94a3b8', mr: 1 }} />, sx: { borderRadius: '16px', bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } } }} />
                  
                  <Box className="flex flex-col gap-1" sx={{ bgcolor: '#f8fafc', p: 1.5, px: 2, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>Date Lost / Found</Typography>
                    <input type="date" style={{ background: 'transparent', outline: 'none', border: 'none', fontWeight: 700, color: '#0f172a', width: '100%' }} />
                  </Box>
                </Box>
              )}


              {/* SHARED TEXT EDITOR AREA (Subtle Background Tint) */}
              <Box sx={{ border: '1px solid #e2e8f0', borderRadius: '20px', mb: 4, overflow: 'hidden', '&:focus-within': { borderColor: '#0f2460', boxShadow: '0 0 0 4px rgba(15, 36, 96, 0.05)' }, transition: 'all 0.2s', bgcolor: '#f7f8fc' }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={selectedCategory === '' ? 6 : 4}
                  placeholder={
                    selectedCategory === 'ask-seniors' || selectedCategory === 'academics' ? "Describe your question in detail..." : 
                    selectedCategory === 'lost-found' ? "Description & Distinguishing Features..." :
                    selectedCategory === 'internships' ? "Detailed job description and requirements..." :
                    "Write something for the DSU community..."
                  }
                  variant="standard"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  InputProps={{ disableUnderline: true, sx: { p: 3, fontSize: '16px', color: '#0f172a', lineHeight: 1.6 } }}
                />
                <Box className="flex items-center justify-between" sx={{ px: 2, py: 1.5, borderTop: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
                  <Box className="flex gap-2">
                    <IconButton sx={{ color: '#475569', bgcolor: '#f1f5f9', borderRadius: '12px' }}><AttachFileIcon /></IconButton>
                    <IconButton sx={{ color: '#475569', bgcolor: '#f1f5f9', borderRadius: '12px' }}><AddPhotoAlternateIcon /></IconButton>
                    <IconButton sx={{ color: '#475569', bgcolor: '#f1f5f9', borderRadius: '12px' }}><InsertEmoticonIcon /></IconButton>
                  </Box>
                  <Typography sx={{ color: '#94a3b8', fontWeight: 600, fontSize: '13px' }}>
                    {content.length}/1000
                  </Typography>
                </Box>
              </Box>

              {/* DYNAMIC BOTTOM FIELDS (After Text Editor) */}

              {/* OPPORTUNITY DETAILS */}
              {selectedCategory === 'internships' && (
                <Box className="space-y-4 mb-4" sx={{ pt: 2, borderTop: '1px solid #e2e8f0' }}>
                  <Typography sx={{ fontSize: '12px', color: '#0f2460', fontWeight: 800, textTransform: 'uppercase', mb: 2 }}>Opportunity Details</Typography>
                  
                  <Box className="flex items-center gap-3">
                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', flexShrink: 0, cursor: 'pointer' }}>
                      <BusinessIcon sx={{ color: '#94a3b8' }} />
                    </Box>
                    <TextField fullWidth placeholder="Company / Organization Name" variant="outlined" InputProps={{ sx: { borderRadius: '16px', bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } } }} />
                  </Box>
                  
                  <Box>
                    <div className="flex flex-wrap gap-2">
                      {['Internship', 'Full-time', 'Freelance', 'Research'].map(type => (
                        <Chip key={type} label={type} onClick={() => setOppType(type)} sx={{ bgcolor: oppType === type ? '#8b5cf6' : '#f1f5f9', color: oppType === type ? '#ffffff' : '#475569', fontWeight: 700, borderRadius: '10px', p: 0.5 }} />
                      ))}
                    </div>
                  </Box>
                  
                  <TextField fullWidth placeholder="Stipend / Salary Info" variant="outlined" InputProps={{ startAdornment: <InputAdornment position="start"><Typography sx={{ fontWeight: 800, color: '#475569' }}>₹</Typography></InputAdornment>, sx: { borderRadius: '16px', bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } } }} />
                  
                  <TextField fullWidth placeholder="Application Link" variant="outlined" InputProps={{ startAdornment: <LinkIcon sx={{ color: '#94a3b8', mr: 1 }} />, sx: { borderRadius: '16px', bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } } }} />
                </Box>
              )}

              {/* ANONYMITY SETTINGS (Ask Seniors) */}
              {selectedCategory === 'ask-seniors' && (
                <Box sx={{ backgroundColor: '#fffbeb', p: 2.5, borderRadius: '20px', border: '1px solid #fde68a', mb: 4 }}>
                  <Typography sx={{ fontSize: '13px', color: '#0f2460', fontWeight: 800, textTransform: 'uppercase', mb: 1 }}>Anonymity Settings</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#f59e0b' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f59e0b' },
                        }}
                      />
                    }
                    label={<Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#0f172a' }}>Post Anonymously</Typography>}
                  />
                  <Typography sx={{ fontSize: '13px', color: '#d97706', fontWeight: 600, mt: 1, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                    Your name won't be shown to anyone in the Ask Seniors thread.
                  </Typography>
                </Box>
              )}

              {/* LOST & FOUND PREFERENCES */}
              {selectedCategory === 'lost-found' && (
                <Box sx={{ backgroundColor: '#f8fafc', p: 2.5, borderRadius: '20px', border: '1px solid #e2e8f0', mb: 4 }}>
                  <Typography sx={{ fontSize: '13px', color: '#0f2460', fontWeight: 800, textTransform: 'uppercase', mb: 1 }}>Contact Preference</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={contactViaChat}
                        onChange={(e) => setContactViaChat(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#2d5be3' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#2d5be3' },
                        }}
                      />
                    }
                    label={<Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#0f172a' }}>Via CampusOne Chat</Typography>}
                  />
                </Box>
              )}

              {/* Final Submit Button */}
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: '#2d5be3',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '17px',
                    py: 2,
                    borderRadius: '16px',
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(45, 91, 227, 0.25)',
                    '&:hover': {
                      backgroundColor: '#1e40af',
                      boxShadow: '0 12px 28px rgba(45, 91, 227, 0.35)',
                    },
                  }}
                >
                  Post to Feed
                </Button>
                <Typography sx={{ textAlign: 'center', mt: 3, mb: 5, fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                  📋 Remember to be respectful · DSU community guidelines apply
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}