import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, CardMedia, CardContent, Button, Chip, Box, IconButton, AppBar, Toolbar, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PageHeader from '../components/PageHeader';
import PremiumCard from '../components/PremiumCard';

const eventsData = [
  {
    id: 0,
    title: 'La Casa De Code',
    date: '2026-02-27',
    time: '1:30 PM',
    location: 'A Block, DSU Main Campus',
    image: '/lacasadecode_poster.jpg',
    type: 'Hackathon',
    daysLeft: 0,
    description: '24-Hour Internal Hackathon — Your ticket to Techflix Season 2!',
    attendees: 450,
    category: 'hackathon',
    about: 'La Casa De Code is a high-intensity 24-hour internal hackathon organized by the Department of CSE at Dayananda Sagar University. This is your chance to showcase your innovation and secure a spot in Techflix Season 2 (National Level Hackathon). Compete for a ₹20k Prize Pool and exclusive mentorship.',
    organizer: 'CSE Dept, DSU',
    organizerLogo: '/techflix_logo.png',
  },
  {
    id: 1,
    title: 'HackNation 2026',
    date: '2026-03-20',
    time: '9:00 AM',
    location: 'Main Auditorium',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    type: 'Hackathon',
    daysLeft: 1,
    description: '36-hour coding marathon — Build, pitch, win. Open to all branches.',
    attendees: 320,
    category: 'hackathon',
    about: 'Join the biggest hackathon in the state. HackNation brings together developers, designers, and product enthusiasts for 36 hours of intense building. Mentors from top tech companies will be present to guide you through the ideation and execution process. Free food, schwags, and cash prizes worth ₹1 Lakh await the winners.',
    organizer: 'Tech Syndicate',
    organizerLogo: 'https://ui-avatars.com/api/?name=TS&background=0f2460&color=fff',
  },
  {
    id: 2,
    title: 'AI & Machine Learning Workshop',
    date: '2026-03-22',
    time: '2:00 PM',
    location: 'CS Lab 201',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    type: 'Workshop',
    daysLeft: 3,
    description: 'Hands-on deep learning session with TensorFlow & PyTorch.',
    attendees: 85,
    category: 'workshop',
    about: 'A beginner-friendly hands-on workshop covering the fundamentals of Neural Networks. You will build and train your first image classification model from scratch using PyTorch. Please bring your laptops fully charged.',
    organizer: 'AI/ML Club',
    organizerLogo: 'https://ui-avatars.com/api/?name=AI&background=10b981&color=fff',
  },
  {
    id: 3,
    title: 'Startup Founders Panel',
    date: '2026-03-25',
    time: '5:00 PM',
    location: 'Conference Hall B',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    type: 'Seminar',
    daysLeft: 6,
    description: 'Hear from 4 successful founders on building products that matter.',
    attendees: 150,
    category: 'seminar',
    about: 'Ever wondered what it takes to build a startup while in college? We are hosting 4 alumni founders who successfully raised seed funding. They will discuss finding product-market fit, building a core team, and balancing academics with entrepreneurship.',
    organizer: 'E-Cell DSU',
    organizerLogo: 'https://ui-avatars.com/api/?name=EC&background=f59e0b&color=fff',
  },
  {
    id: 4,
    title: 'DSU Cultural Fest 2026',
    date: '2026-03-19',
    time: '10:00 AM',
    location: 'Open Air Theatre',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    type: 'Cultural',
    daysLeft: 0,
    description: 'Music, dance, drama & art — the biggest cultural event of the year.',
    attendees: 500,
    category: 'cultural',
    about: 'The most awaited event of the year! Join us for 3 days of non-stop entertainment featuring Battle of Bands, Fashion Show, Group Dance competitions, and a DJ night to wrap it all up. Grab your passes now before they sell out.',
    organizer: 'Cultural Council',
    organizerLogo: 'https://ui-avatars.com/api/?name=CC&background=f43f5e&color=fff',
  },
  {
    id: 5,
    title: 'Cloud Computing Bootcamp',
    date: '2026-03-26',
    time: '11:00 AM',
    location: 'Seminar Hall 3',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    type: 'Workshop',
    daysLeft: 7,
    description: 'AWS & GCP fundamentals with hands-on lab exercises.',
    attendees: 60,
    category: 'workshop',
    about: 'Learn how to deploy scalable web architectures. This bootcamp will cover EC2, S3, Docker containers, and CI/CD pipelines. By the end of this session, you will have your own portfolio website hosted live on the cloud.',
    organizer: 'Cloud Tech',
    organizerLogo: 'https://ui-avatars.com/api/?name=CT&background=0ea5e9&color=fff',
  },
];

const filterOptions = ['All', 'Today', 'This Week', 'Hackathons', 'Workshops'];

const tagStyles: Record<string, { bg: string; color: string; border: string }> = {
  Hackathon: { bg: '#FFF7ED', color: '#C2410C', border: '#FDBA74' },
  Workshop: { bg: '#ECFDF5', color: '#047857', border: '#6EE7B7' },
  Seminar: { bg: '#F5F3FF', color: '#6D28D9', border: '#C4B5FD' },
  Cultural: { bg: '#FFF1F2', color: '#BE123C', border: '#FDA4AF' },
};

export default function Events() {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleRegister = (eventId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (registered.includes(eventId)) {
      setRegistered(registered.filter(id => id !== eventId));
    } else {
      setRegistered([...registered, eventId]);
    }
  };

  const filteredEvents = eventsData.filter((event) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Today') return event.daysLeft === 0;
    if (activeFilter === 'This Week') return event.daysLeft <= 7;
    if (activeFilter === 'Hackathons') return event.type === 'Hackathon';
    if (activeFilter === 'Workshops') return event.type === 'Workshop';
    return true;
  });

  const selectedEvent = eventsData.find(e => e.id === selectedEventId);

  // DEEP DIVE VIEW
  if (selectedEvent) {
    const isRegistered = registered.includes(selectedEvent.id);
    const tag = tagStyles[selectedEvent.type] || tagStyles.Seminar;

    return (
      <div className="bg-slate-50 min-h-screen pb-24">
        {/* Transparent Header overlay over image */}
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'linear-gradient(rgba(0,0,0,0.6), transparent)', pt: 1, pb: 4, px: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setSelectedEventId(null)} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Hero Image */}
        <Box sx={{ position: 'relative', height: '320px', width: '100%' }}>
          <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(15,23,42,0.9) 100%)' }} />
          
          <Box sx={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
            <Chip
              label={selectedEvent.type}
              size="small"
              sx={{ fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', bgcolor: tag.bg, color: tag.color, mb: 1.5 }}
            />
            <Typography sx={{ fontSize: '28px', fontWeight: 900, color: '#fff', lineHeight: 1.15, mb: 1 }}>
              {selectedEvent.title}
            </Typography>
            <Box className="flex items-center gap-2">
              <Avatar src={selectedEvent.organizerLogo} sx={{ width: 24, height: 24 }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                By {selectedEvent.organizer}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Content Body */}
        <div className="p-5 -mt-4 relative z-10 bg-slate-50 rounded-t-[32px]">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 mt-2">
             <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
               <Box className="flex items-center gap-2 mb-1">
                 <EventAvailableIcon sx={{ fontSize: 18, color: '#2d5be3' }} />
                 <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Date & Time</Typography>
               </Box>
               <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                 {new Date(selectedEvent.date).toLocaleDateString()}
               </Typography>
               <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                 {selectedEvent.time}
               </Typography>
             </Box>
             
             <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
               <Box className="flex items-center gap-2 mb-1">
                 <LocationOnIcon sx={{ fontSize: 18, color: '#ea580c' }} />
                 <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Location</Typography>
               </Box>
               <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                 {selectedEvent.location}
               </Typography>
             </Box>
          </div>

          <Box className="flex items-center justify-between mb-6 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
             <Box className="flex items-center gap-3">
               <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <PeopleAltIcon sx={{ color: '#4f46e5' }} />
               </Box>
               <Box>
                 <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#1e3a8a' }}>{selectedEvent.attendees} Attending</Typography>
                 <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Students from DSU</Typography>
               </Box>
             </Box>
          </Box>

          <div className="w-full h-px bg-slate-200 mb-6" />

          {/* About Section */}
          <Box className="mb-8">
            <Box className="flex items-center gap-2 mb-3">
              <InfoOutlinedIcon sx={{ color: '#0f172a', fontSize: 22 }} />
              <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>About This Event</Typography>
            </Box>
            <Typography sx={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
              {selectedEvent.about}
            </Typography>
          </Box>

          {/* Bottom Sticky Action */}
          <Box className="flex items-center gap-2" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 3, pt: 2, background: 'linear-gradient(transparent, #ffffff 20%)', zIndex: 40 }}>
            <IconButton sx={{ 
              bgcolor: '#f8fafc', 
              color: '#0f2460', 
              border: '2px solid #e2e8f0', 
              borderRadius: '16px', 
              width: 56, 
              height: 56,
              transition: 'all 0.2s',
              '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
            }}>
              <EventAvailableIcon />
            </IconButton>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleRegister(selectedEvent.id)}
              sx={{
                bgcolor: isRegistered ? '#f0fdf4' : '#0f2460',
                color: isRegistered ? '#16a34a' : '#ffffff',
                boxShadow: isRegistered ? 'none' : '0 8px 24px rgba(15, 36, 96, 0.25)',
                fontWeight: 800,
                fontSize: '16px',
                py: '16px',
                borderRadius: '16px',
                border: isRegistered ? '2px solid #bbf7d0' : 'none',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: isRegistered ? '#dcfce7' : '#1a367d',
                  boxShadow: isRegistered ? 'none' : '0 12px 28px rgba(15, 36, 96, 0.35)',
                },
              }}
            >
              {isRegistered ? 'You are Registered 🎉' : 'Register for Event'}
            </Button>
          </Box>

        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <PageHeader title="Campus Events" />

      {/* Filter Bar */}
      <Box
        className="flex gap-2 overflow-x-auto px-4 py-3"
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
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
              flexShrink: 0,
              transition: 'all 0.2s ease',
              ...(activeFilter === filter
                ? {
                    bgcolor: '#0f2460',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(15, 36, 96, 0.25)',
                    '&:hover': { bgcolor: '#0f2460' },
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

      {/* Event Count */}
      <Box className="px-4 pb-2">
        <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </Typography>
      </Box>

      <div className="px-4 space-y-5 pb-6">
        {filteredEvents.map((event) => {
          const isRegistered = registered.includes(event.id);
          const isUrgent = event.daysLeft <= 1;
          const tag = tagStyles[event.type] || tagStyles.Seminar;

          return (
            <PremiumCard 
              key={event.id} 
              onClick={() => setSelectedEventId(event.id)}
              sx={{ 
                overflow: 'hidden', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(15, 36, 96, 0.08)' } 
              }}
            >
              {/* Banner Image */}
              <div className="relative">
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
                {/* Dark bottom gradient for readability */}
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(transparent, rgba(0,0,0,0.55))' }} />

                {/* Event Tag — top-left */}
                <div className="absolute top-3 left-3">
                  <Chip
                    label={event.type}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      bgcolor: tag.bg,
                      color: tag.color,
                      border: `1.5px solid ${tag.border}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                  />
                </div>

                {/* Countdown Badge — top-right, red when urgent */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    bgcolor: isUrgent ? 'rgba(239, 68, 68, 0.95)' : 'rgba(15, 36, 96, 0.9)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: isUrgent
                      ? '0 4px 16px rgba(239, 68, 68, 0.4)'
                      : '0 4px 16px rgba(15, 36, 96, 0.3)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                    {event.daysLeft === 0 ? 'NOW' : event.daysLeft}
                  </Typography>
                  {event.daysLeft > 0 && (
                    <Typography sx={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,0.85)', mt: 0.25, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {event.daysLeft === 1 ? 'Day Left' : 'Days'}
                    </Typography>
                  )}
                </Box>

                {/* Attendees — bottom-right over image */}
                <Box className="absolute bottom-3 right-3 flex items-center gap-1" sx={{ bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: '8px', px: 1.25, py: 0.5 }}>
                  <PeopleAltIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.9)' }} />
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                    {event.attendees}+
                  </Typography>
                </Box>
              </div>

              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                {/* Title */}
                <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', mb: 0.5, lineHeight: 1.3 }}>
                  {event.title}
                </Typography>

                {/* Description */}
                <Typography sx={{ fontSize: '13.5px', color: '#64748b', mb: 2.5, lineHeight: 1.5 }}>
                  {event.description}
                </Typography>

                {/* Date & Location Info Row */}
                <Box className="flex items-center gap-4 mb-4">
                  <Box className="flex items-center gap-1.5">
                    <AccessTimeIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                    <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {event.time}
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-1.5">
                    <LocationOnIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                    <Typography sx={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>
                      {event.location}
                    </Typography>
                  </Box>
                </Box>

                {/* Register Button (Swapped to View Details to encourage opening the sheet) */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEventId(event.id);
                  }}
                  sx={{
                    bgcolor: isRegistered ? '#f0fdf4' : '#0f2460',
                    color: isRegistered ? '#16a34a' : '#ffffff',
                    boxShadow: 'none',
                    fontWeight: 800,
                    fontSize: '14.5px',
                    textTransform: 'none',
                    py: 1.5,
                    borderRadius: '14px',
                    border: isRegistered ? '1.5px solid #bbf7d0' : '1px solid #e2e8f0',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      bgcolor: isRegistered ? '#dcfce7' : '#f1f5f9',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {isRegistered ? '✓ Registered' : 'View Event Details'}
                </Button>
              </CardContent>
            </PremiumCard>
          );
        })}

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <Box className="flex flex-col items-center justify-center py-16">
            <Typography sx={{ fontSize: '48px', mb: 2 }}>📭</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#334155', mb: 0.5 }}>
              No events found
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
              Try a different filter to see more events
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}