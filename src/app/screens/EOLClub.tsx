import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'motion/react';
import { Sparkles, Users, Clapperboard, Award, Film, Info, HelpCircle, Calendar, ArrowRight, MessageSquare } from 'lucide-react';

export default function EOLClub() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const faqs = [
    { q: "What is the primary focus of Echoes of Lumière?", a: "Echoes of Lumière is dedicated to exploring the realms of theatre, cinematic craftsmanship, and visual storytelling, creating a transformative space for students." },
    { q: "Can I participate if I'm not a film major?", a: "Absolutely! Echoes of Lumière welcomes students from all majors. Our goal is to bring together diverse perspectives and talents." },
    { q: "Are there any prerequisites or skills required?", a: "No specific skills are required. The club is open to all students passionate about storytelling, cinema, and creativity." },
    { q: "How can the club benefit me academically?", a: "By exploring the intersection of theatre and cinematic artistry, Echoes of Lumière enhances your storytelling and creative skills, contributing to a well-rounded education." }
  ];

  const upcomingWorkshops = [
    { title: "FILM POSTER FACE-OFF", date: "Upcoming", desc: "Design visually compelling posters under time constraints and test your creative wits." },
    { title: "VFX VISUAL BLITZ", date: "Upcoming", desc: "Learn and apply basic visual effect techniques to bring the impossible to life on screen." }
  ];

  const events = [
    { title: "Hands on Filmmaking", date: "23 May 2024", desc: "Lighting, color theory, and professional camera techniques.", image: "/gall-new-1.jpg" },
    { title: "Theatre Workshop", date: "19 April 2024", desc: "Led by Sumukha Kumar. Deepening appreciation for theatre.", image: "/gall-new-2.png" },
    { title: "Impromptu Acting", date: "10 Jan 2024", desc: "Unleash your inner actor through spontaneous performances.", image: "/gall-new-3.png" }
  ];

  return (
    <Box className="bg-slate-50 min-h-screen pb-28">
      {/* Hero Section */}
      <Box
        sx={{
          height: 320,
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)',
          position: 'relative',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(76, 29, 149, 0.4)'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        {/* Abstract cinematic rings */}
        <Box sx={{ position: 'absolute', top: -100, right: -50, width: 300, height: 300, borderRadius: '50%', border: '40px solid rgba(255,255,255,0.05)' }} />

        <Box className="relative z-10 pt-4 px-4 flex justify-between items-center">
          <IconButton onClick={() => navigate('/clubs')} sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
            <ArrowBackIcon />
          </IconButton>
          <Chip label="Recruiting Now 🎬" sx={{ bgcolor: '#fff', color: '#4c1d95', fontWeight: 800 }} />
        </Box>

        <Box className="relative z-10 flex flex-col items-center justify-center mt-6 text-center px-4">
          <Box
            sx={{
              width: 80, height: 80, borderRadius: '24px', bgcolor: '#fff', 
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}
          >
            <img src="/eol-logo.jpg" alt="EOL Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.3)' }} />
          </Box>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900, mb: 0.5, letterSpacing: '0.5px' }}>
            Echoes of Lumière
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500, fontStyle: 'italic' }}>
            "Not just a creative club, it's a dramatic experience."
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: 3, mt: -4, position: 'relative', zIndex: 20 }}>
        
        {/* Stats Bar */}
        <Box sx={{ bgcolor: '#fff', borderRadius: '20px', p: 2, display: 'flex', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', mb: 3 }}>
          <Box className="text-center flex-1">
            <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#4c1d95' }}>189+</Typography>
            <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Members</Typography>
          </Box>
          <Box sx={{ width: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />
          <Box className="text-center flex-1">
            <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#4c1d95' }}>20+</Typography>
            <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Projects</Typography>
          </Box>
          <Box sx={{ width: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />
          <Box className="text-center flex-1">
            <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#4c1d95' }}>15</Typography>
            <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Workshops</Typography>
          </Box>
        </Box>

        {/* About Section */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info size={18} color="#db2777" /> About the Club
          </Typography>
          <Box sx={{ bgcolor: '#fff', p: 2.5, borderRadius: '20px', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <Typography sx={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.7 }}>
              Join us in creating a transformative space where the realms of theatre, cinematic craftsmanship, and visual storytelling converge. Through mobile cinema making, photography escapades, and nurturing creativity, we explore diverse narratives and hone our storytelling prowess.
            </Typography>
          </Box>
        </Box>

        {/* Faculties & Founders */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Award size={18} color="#8b5cf6" /> Core Leadership
          </Typography>
          <Box className="flex flex-col gap-3">
            <Box sx={{ bgcolor: '#f5f3ff', p: 2, borderRadius: '20px', border: '1px solid #ede9fe', display: 'flex', alignItems: 'center', gap: 2.5, boxShadow: '0 4px 12px rgba(124,58,237,0.05)' }}>
              <Avatar src="/rochna.png" sx={{ width: 56, height: 56, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(76,29,149,0.1)' }} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#4c1d95', mb: 0.25 }}>Dr. Rochna Roy</Typography>
                <Typography sx={{ fontSize: '11px', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Faculty Co-ordinator</Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: '#f5f3ff', p: 2, borderRadius: '20px', border: '1px solid #ede9fe', display: 'flex', alignItems: 'center', gap: 2.5, boxShadow: '0 4px 12px rgba(124,58,237,0.05)' }}>
              <Avatar src="/sreemathy.png" sx={{ width: 56, height: 56, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(76,29,149,0.1)' }} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#4c1d95', mb: 0.25 }}>Dr. V. Sreemathy</Typography>
                <Typography sx={{ fontSize: '11px', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Faculty Co-ordinator</Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: '#ffffff', p: 2, borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2.5, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <Avatar src="/rakshit.png" sx={{ width: 56, height: 56, border: '2px solid #f8fafc' }} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#334155', mb: 0.25 }}>Rakshit Kumar</Typography>
                <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Co-Founder</Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: '#ffffff', p: 2, borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 2.5, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <Avatar src="/dhruti.png" sx={{ width: 56, height: 56, border: '2px solid #f8fafc' }} />
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#334155', mb: 0.25 }}>Dhruti Purushotham</Typography>
                <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Co-Founder</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Visual Gallery */}
        <Box sx={{ mb: 4 }}>
          <Box className="flex justify-between items-center mb-2">
            <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Sparkles size={18} color="#f59e0b" /> Visual Gallery
            </Typography>
            <Box className="flex items-center gap-1 text-slate-400 opacity-80">
              <Typography sx={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Swipe</Typography>
              <ArrowRight size={14} />
            </Box>
          </Box>
          <Box className="flex gap-3 overflow-x-auto pb-2" sx={{ scrollSnapType: 'x mandatory', '&::-webkit-scrollbar': { display: 'none' } }}>
            {[
              "/gallery-1.png",
              "/gall-new-1.jpg", 
              "/gall-new-2.png", 
              "/gall-new-3.png", 
              "/gall-new-4.png", 
              "/gall-new-5.png"
            ].map((imgUrl, idx) => (
              <Box key={idx} sx={{ width: 220, height: 160, borderRadius: '16px', flexShrink: 0, scrollSnapAlign: 'start', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                <img src={imgUrl} alt={`Gallery ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabIndex} 
            onChange={(_, newValue) => setTabIndex(newValue)} 
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: '#4c1d95', height: 3, borderRadius: '3px 3px 0 0' } }}
          >
            <Tab 
              label={<Typography sx={{ fontWeight: 800, fontSize: '14px', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}><Calendar size={16} /> Events</Typography>} 
              sx={{ color: '#64748b', '&.Mui-selected': { color: '#4c1d95' } }}
            />
            <Tab 
              label={<Typography sx={{ fontWeight: 800, fontSize: '14px', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}><HelpCircle size={16} /> Q&A / FAQ</Typography>} 
              sx={{ color: '#64748b', '&.Mui-selected': { color: '#4c1d95' } }}
            />
          </Tabs>
        </Box>

        {/* Tab 0: Events */}
        {tabIndex === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Upcoming Workshops */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Calendar size={18} color="#f43f5e" /> Upcoming Workshops
              </Typography>
              <Box className="flex flex-col gap-3">
                {upcomingWorkshops.map((ev, i) => (
                  <Box key={i} sx={{ bgcolor: '#fff0f6', p: 2, borderRadius: '16px', border: '1px solid #fce7f3', display: 'flex', flexDirection: 'column' }}>
                    <Box className="flex justify-between items-start mb-1.5">
                      <Typography sx={{ fontSize: '14px', fontWeight: 900, color: '#be185d', letterSpacing: '0.5px' }}>{ev.title}</Typography>
                      <Chip label="REGISTER" size="small" sx={{ bgcolor: '#ec4899', color: '#fff', fontWeight: 800, fontSize: '10px', height: 22, boxShadow: '0 2px 8px rgba(236,72,153,0.3)' }} />
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{ev.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* What to Expect (Events grid) */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Film size={18} color="#ec4899" /> Hall of Fame Events
              </Typography>
              <Box className="flex flex-col gap-3">
                {events.map((ev, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                    <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', gap: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                      <Box sx={{ width: 64, height: 64, borderRadius: '12px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        {ev.image ? (
                          <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <Box sx={{ width: '100%', height: '100%', bgcolor: i % 2 === 0 ? '#fdf2f8' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Clapperboard size={20} color={i % 2 === 0 ? '#db2777' : '#2563eb'} />
                          </Box>
                        )}
                      </Box>
                      <Box className="flex flex-col justify-center">
                        <Typography sx={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', mb: 0.25 }}>{ev.title}</Typography>
                        <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', mb: 0.5, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{ev.date}</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{ev.desc}</Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        )}

        {/* Tab 1: Q&A / FAQ */}
        {tabIndex === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            
            {/* Ask the Board Direct Q&A Input */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ bgcolor: '#f8fafc', p: 2.5, borderRadius: '20px', border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MessageSquare size={18} color="#10b981" /> Ask the Board Directly
                  </Typography>
                  <Typography sx={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.4 }}>
                    Too shy to ask on the WhatsApp group? Send an anonymous or direct question to the club leaders. We usually reply within 24 hours!
                  </Typography>
                </Box>
                <TextField 
                  fullWidth 
                  placeholder="How do I join the design team...?" 
                  multiline
                  rows={2}
                  sx={{ 
                    bgcolor: '#fff', 
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                      '&:hover fieldset': { borderColor: '#4c1d95' },
                      '&.Mui-focused fieldset': { borderColor: '#4c1d95', borderWidth: '2px' },
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          sx={{ bgcolor: '#4c1d95', color: '#fff', '&:hover': { bgcolor: '#5b21b6' }, borderRadius: '10px' }}
                          onClick={() => alert("Your question was sent securely to the board!")}
                        >
                          <SendIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>

            {/* FAQs */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <HelpCircle size={18} color="#0ea5e9" /> Frequent Questions
              </Typography>
              <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                {faqs.map((faq, i) => (
                  <Accordion key={i} disableGutters elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: i !== faqs.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#475569' }} />} sx={{ bgcolor: '#ffffff' }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                        {faq.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: '#f8fafc', p: 2 }}>
                      <Typography sx={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                        {faq.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          </motion.div>
        )}
        
        {/* Placeholder bottom space */}
        <Box sx={{ height: 80 }} />
      </Box>

      {/* Floating Apply Action */}
      <Box 
        sx={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, 
          p: 3, background: 'linear-gradient(0deg, #ffffff 60%, rgba(255,255,255,0) 100%)', 
          zIndex: 50, display: 'flex', justifyContent: 'center'
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #4c1d95 0%, #db2777 100%)',
            color: '#fff',
            borderRadius: '16px',
            py: 2,
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: '0 8px 32px rgba(157, 23, 77, 0.3)',
            display: 'flex', gap: 1
          }}
          onClick={() => {
            alert("Redirecting to EOL Google Form Application...");
          }}
        >
          <Sparkles size={20} /> Join Echoes of Lumière
        </Button>
      </Box>
    </Box>
  );
}
