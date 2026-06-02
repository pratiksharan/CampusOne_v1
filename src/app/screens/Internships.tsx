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
  Chip,
  Avatar,
  Box,
} from '@mui/material';
import PremiumCard from '../components/PremiumCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';

const internshipsData = [
  {
    id: 1,
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100',
    role: 'Software Engineering Intern',
    stipend: '₹80,000/month',
    type: 'Paid',
    deadline: '2026-03-10',
    duration: '3 months',
    location: 'Bangalore',
    skills: ['Python', 'Java', 'Data Structures & Algorithms'],
    category: 'tech',
    about: 'Join our Cloud Infrastructure team to build scalable services that power Google Cloud products. You will work closely with senior engineers, deploying code that impacts millions of users globally.',
  },
  {
    id: 2,
    company: 'Microsoft',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100',
    role: 'Cloud Computing Intern',
    stipend: '₹75,000/month',
    type: 'Paid',
    deadline: '2026-03-12',
    duration: '6 months',
    location: 'Hyderabad',
    skills: ['Azure', 'Cloud Architecture', 'Python'],
    category: 'tech',
    about: 'Learn the ins and outs of enterprise cloud solutions by working directly on Microsoft Azure infrastructure. Great opportunity to earn your cloud certifications while interning.',
  },
  {
    id: 3,
    company: 'Startup Hub',
    companyLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100',
    role: 'Product Management Intern',
    stipend: 'Unpaid',
    type: 'Unpaid',
    deadline: '2026-03-05',
    duration: '2 months',
    location: 'Remote',
    skills: ['Product Design', 'Analytics', 'Agile'],
    category: 'management',
    about: 'An intense 8-week program where you will guide a new feature from ideation to launch. Perfect for ambitious students looking to pivot into product management.',
  },
  {
    id: 4,
    company: 'Amazon',
    companyLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
    role: 'Data Science Intern',
    stipend: '₹70,000/month',
    type: 'Paid',
    deadline: '2026-03-15',
    duration: '4 months',
    location: 'Mumbai',
    skills: ['Machine Learning', 'Statistics', 'Python', 'SQL'],
    category: 'tech',
    about: 'Apply cutting-edge machine learning algorithms to optimize supply chain logistics. You will be dealing with massive datasets and driving real business value.',
  },
];

const filterOptions = ['All', 'Paid', 'Unpaid', 'Tech', 'Management'];

export default function Internships() {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [applied, setApplied] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedInternshipId, setSelectedInternshipId] = useState<number | null>(null);

  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(itemId => itemId !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const handleApply = (id: number) => {
    if (!applied.includes(id)) {
      setApplied([...applied, id]);
    }
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date('2026-02-26');
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const filteredInternships = internshipsData.filter((internship) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Paid') return internship.type === 'Paid';
    if (activeFilter === 'Unpaid') return internship.type === 'Unpaid';
    if (activeFilter === 'Tech') return internship.category === 'tech';
    if (activeFilter === 'Management') return internship.category === 'management';
    return true;
  });

  const selectedInternship = internshipsData.find(i => i.id === selectedInternshipId);

  // DEEP DIVE VIEW
  if (selectedInternship) {
    const daysLeft = getDaysLeft(selectedInternship.deadline);
    const isApplied = applied.includes(selectedInternship.id);
    const isBookmarked = bookmarked.includes(selectedInternship.id);

    return (
      <div className="bg-slate-50 min-h-screen pb-24">
        {/* Detail App Bar */}
        <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <Toolbar>
            <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => setSelectedInternshipId(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', ml: 1, flexGrow: 1 }}>
              Opportunity Details
            </Typography>
            <IconButton 
              onClick={() => toggleBookmark(selectedInternship.id)}
              sx={{ color: isBookmarked ? '#2d5be3' : '#64748b' }}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className="p-5">
          {/* Header Info */}
          <Box className="flex items-center gap-4 mb-6">
            <Avatar 
              src={selectedInternship.companyLogo} 
              variant="rounded" 
              sx={{ width: 80, height: 80, borderRadius: '20px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }} 
            />
            <Box>
              <Typography sx={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, mb: 0.5 }}>
                {selectedInternship.role}
              </Typography>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#64748b' }}>
                {selectedInternship.company}
              </Typography>
            </Box>
          </Box>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Box className="flex items-center gap-2 mb-1">
                  <CurrencyRupeeIcon sx={{ fontSize: 18, color: selectedInternship.type === 'Paid' ? '#10b981' : '#64748b' }} />
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Stipend</Typography>
                </Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 800, color: selectedInternship.type === 'Paid' ? '#10b981' : '#0f172a' }}>
                  {selectedInternship.stipend}
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Box className="flex items-center gap-2 mb-1">
                  <AccessTimeIcon sx={{ fontSize: 18, color: '#2d5be3' }} />
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Duration</Typography>
                </Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  {selectedInternship.duration}
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Box className="flex items-center gap-2 mb-1">
                  <LocationOnIcon sx={{ fontSize: 18, color: '#ea580c' }} />
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Location</Typography>
                </Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  {selectedInternship.location}
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ borderRadius: '16px', border: selectedInternship.type === 'Paid' ? '2px solid #a7f3d0' : '1px solid #e2e8f0', bgcolor: selectedInternship.type === 'Paid' ? '#ecfdf5' : '#ffffff' }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Box className="flex items-center gap-2 mb-1">
                  <BusinessCenterIcon sx={{ fontSize: 18, color: selectedInternship.type === 'Paid' ? '#059669' : '#64748b' }} />
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: selectedInternship.type === 'Paid' ? '#059669' : '#64748b', textTransform: 'uppercase' }}>Type</Typography>
                </Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 800, color: selectedInternship.type === 'Paid' ? '#059669' : '#0f172a' }}>
                  {selectedInternship.type}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div className="w-full h-px bg-slate-200 mb-6" />

          {/* About Role */}
          <Box className="mb-6">
            <Box className="flex items-center gap-2 mb-3">
              <DescriptionIcon sx={{ color: '#0f172a', fontSize: 20 }} />
              <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>About the Role</Typography>
            </Box>
            <Typography sx={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
              {selectedInternship.about}
            </Typography>
          </Box>

          {/* Skills Required */}
          <Box className="mb-8">
            <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', mb: 3 }}>Required Skills</Typography>
            <div className="flex flex-wrap gap-2">
              {selectedInternship.skills.map((skill, idx) => (
                <Chip
                  key={idx}
                  label={skill}
                  sx={{
                    bgcolor: 'rgba(45, 91, 227, 0.08)',
                    color: '#1e3a8a',
                    fontSize: '13px',
                    fontWeight: 700,
                    px: 1,
                    py: 2,
                    borderRadius: '10px',
                    border: '1px solid rgba(45, 91, 227, 0.15)'
                  }}
                />
              ))}
            </div>
          </Box>

          {/* Apply Banner Bottom Sticky-like */}
          <Card elevation={0} sx={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 12px 32px rgba(15,36,96,0.1)', overflow: 'hidden' }}>
             <Box sx={{ bgcolor: daysLeft <= 3 ? '#fff1f2' : '#f8fafc', px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: daysLeft <= 3 ? '#e11d48' : '#64748b', textAlign: 'center' }}>
                  ⏳ Applications close in {daysLeft} days (Deadline: {new Date(selectedInternship.deadline).toLocaleDateString()})
                </Typography>
             </Box>
             <CardContent sx={{ p: 3 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleApply(selectedInternship.id)}
                  disabled={isApplied}
                  sx={{
                    background: isApplied ? '#f0fdf4' : 'linear-gradient(135deg, #0f2460 0%, #1c3b8a 100%)',
                    color: isApplied ? '#16a34a' : '#ffffff',
                    fontWeight: 800,
                    fontSize: '16px',
                    py: '16px',
                    borderRadius: '16px',
                    boxShadow: isApplied ? 'none' : '0 8px 24px rgba(15,36,96,0.25)',
                    '&.Mui-disabled': {
                      background: '#f0fdf4',
                      color: '#16a34a',
                      border: '2px solid #bbf7d0'
                    }
                  }}
                >
                  {isApplied ? 'Application Submitted 🎉' : 'Apply for this Role'}
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <AppBar position="sticky" elevation={0} sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: '#0f172a' }} onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', ml: 1 }}>
            Opportunities
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Filter Bar */}
      <Box
        className="flex gap-2 overflow-x-auto px-4 pt-4 pb-2"
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {filterOptions.map((filter) => (
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
                    bgcolor: '#2d5be3',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 91, 227, 0.25)',
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

      {/* Results Count */}
      <Box className="px-4 pb-3 pt-1">
        <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
          {filteredInternships.length} opportunit{filteredInternships.length !== 1 ? 'ies' : 'y'} found
        </Typography>
      </Box>

      <div className="px-4 space-y-4">
        {filteredInternships.map((internship) => {
          const daysLeft = getDaysLeft(internship.deadline);
          return (
            <PremiumCard 
              key={internship.id} 
              onClick={() => setSelectedInternshipId(internship.id)}
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(15, 36, 96, 0.08)' }
              }} 
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <div className="flex items-start justify-between mb-4">
                  {/* Company Logo and Name */}
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={internship.companyLogo}
                      alt={internship.company}
                      sx={{ width: 56, height: 56, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}
                      variant="rounded"
                    />
                    <div>
                      {/* Company Name */}
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                        {internship.company}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                        {internship.location}
                      </Typography>
                    </div>
                  </div>

                  {/* Bookmark Icon */}
                  <IconButton
                    size="small"
                    onClick={(e) => toggleBookmark(internship.id, e)}
                    sx={{
                      color: bookmarked.includes(internship.id) ? '#2d5be3' : '#94A3B8',
                      backgroundColor: bookmarked.includes(internship.id) ? 'rgba(45, 91, 227, 0.1)' : 'transparent',
                      '&:hover': { backgroundColor: 'rgba(45, 91, 227, 0.1)' }
                    }}
                  >
                    {bookmarked.includes(internship.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </div>

                {/* Role Title */}
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2, fontSize: '1.15rem', lineHeight: 1.3 }}>
                  {internship.role}
                </Typography>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {/* Stipend */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${internship.type === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                      <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                    </div>
                    <div>
                      <Typography sx={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Stipend</Typography>
                      <Typography sx={{ fontSize: '13px', fontWeight: 800, color: internship.type === 'Paid' ? '#10b981' : '#475569' }}>
                        {internship.stipend}
                      </Typography>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <AccessTimeIcon sx={{ fontSize: 18 }} />
                    </div>
                    <div>
                      <Typography sx={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Duration</Typography>
                      <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                        {internship.duration}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {internship.skills.slice(0, 3).map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(45, 91, 227, 0.05)',
                        color: '#1e3a8a',
                        fontSize: '11px',
                        fontWeight: 700,
                        height: 24,
                        borderRadius: '6px',
                        border: '1px solid rgba(45, 91, 227, 0.1)'
                      }}
                    />
                  ))}
                  {internship.skills.length > 3 && (
                    <Chip
                      label={`+${internship.skills.length - 3}`}
                      size="small"
                      sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: 700, height: 24, borderRadius: '6px' }}
                    />
                  )}
                </div>

                <div className="flex items-center gap-3">
                   <Box sx={{ flexGrow: 1, py: 1.5, px: 2, borderRadius: '12px', bgcolor: applied.includes(internship.id) ? '#f0fdf4' : '#f8fafc', border: applied.includes(internship.id) ? '1px solid #bbf7d0' : '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: applied.includes(internship.id) ? '#16a34a' : '#2d5be3' }}>
                        {applied.includes(internship.id) ? 'Applied ✓' : 'View Details'}
                      </Typography>
                   </Box>

                  {/* Deadline prominent block */}
                  <div className="flex flex-col items-center justify-center px-4 bg-orange-50 rounded-xl h-11 border border-orange-100 flex-shrink-0">
                    <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#ea580c', lineHeight: 1 }}>
                      {daysLeft}
                    </Typography>
                    <Typography sx={{ fontSize: '9px', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', mt: 0.5 }}>
                      Days Left
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </PremiumCard>
          );
        })}

        {/* Empty state */}
        {filteredInternships.length === 0 && (
          <Box className="flex flex-col items-center justify-center py-16">
            <Typography sx={{ fontSize: '48px', mb: 2 }}>🔍</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 800, color: '#334155', mb: 0.5 }}>
              No opportunities found
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
              Check back later or try a different filter
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}