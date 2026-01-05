import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Grid,
  Button,
  Stack,
  Paper
} from '@mui/material';
import {
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Coffee as CoffeeIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { contactInfo } from '../data/contactInfo';

interface WindowWithCalendly extends Window {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
}

const contactActions = [
  {
    id: 'email',
    label: 'Send Email',
    icon: EmailIcon,
    color: '#3b82f6',
    getUrl: () => `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email.value}`
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: WhatsAppIcon,
    color: '#22c55e',
    getUrl: () => `https://wa.me/${contactInfo.phone.value.replace('+', '')}`
  },
  {
    id: 'call',
    label: 'Call',
    icon: PhoneIcon,
    color: '#8b5cf6',
    getUrl: () => `tel:${contactInfo.phone.value}`
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: CalendarIcon,
    color: '#f97316',
    isCalendly: true,
    getUrl: () => contactInfo.calendly.url
  }
];

const ContactPage: React.FC = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const handleAction = (action: typeof contactActions[0]) => {
    if (action.isCalendly) {
      const windowWithCalendly = window as WindowWithCalendly;
      if (calendlyLoaded && windowWithCalendly.Calendly) {
        windowWithCalendly.Calendly.initPopupWidget({
          url: `${action.getUrl()}?hide_landing_page_details=1&hide_gdpr_banner=1`
        });
      } else {
        window.open(action.getUrl(), '_blank');
      }
    } else {
      window.open(action.getUrl(), '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Stack spacing={4}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.08) 50%, hsl(var(--secondary) / 0.15) 100%)',
              border: '2px solid hsl(var(--border))',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'hsl(var(--primary) / 0.1)',
                filter: 'blur(40px)'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={700}
                sx={{ mb: 2, color: 'hsl(var(--foreground))', fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                Let's Connect
              </Typography>
              <Box
                sx={{
                  height: 6,
                  width: 80,
                  background: 'linear-gradient(90deg, #3b82f6 0%, #22c55e 100%)',
                  borderRadius: 3,
                  mb: 3
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: 'hsl(var(--foreground) / 0.85)',
                  fontWeight: 400,
                  lineHeight: 1.9,
                  fontSize: '1.1rem',
                  textAlign: 'justify'
                }}
              >
                Have a project in mind or want to collaborate? I'm always open to discussing new opportunities
                in geospatial technology, data science, and web development. Whether it's building climate resilience
                systems, creating interactive mapping solutions, or developing data-driven applications, let's explore
                how we can work together to create meaningful impact.
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Contact Actions */}
        <Grid container spacing={3}>
          {contactActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Grid size={{ xs: 6, sm: 3 }} key={action.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: '2px solid hsl(var(--border))',
                      background: `linear-gradient(135deg, hsl(var(--card)) 0%, ${action.color}08 100%)`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: action.color,
                        boxShadow: `0 12px 40px ${action.color}20`,
                        transform: 'translateY(-6px)'
                      }
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleAction(action)}
                      sx={{ p: 4, textAlign: 'center' }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 3,
                          background: `linear-gradient(135deg, ${action.color}20 0%, ${action.color}10 100%)`,
                          border: `2px solid ${action.color}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <IconComponent sx={{ fontSize: 40, color: action.color }} />
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ color: 'hsl(var(--foreground))', fontSize: '1.1rem' }}
                      >
                        {action.label}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '2px solid hsl(var(--border))',
              background: 'linear-gradient(135deg, hsl(var(--card)) 0%, #06b6d408 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#06b6d4',
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px #06b6d420'
              }
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #06b6d420 0%, #06b6d410 100%)',
                border: '2px solid #06b6d430',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LocationIcon sx={{ fontSize: 40, color: '#06b6d4' }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: 'hsl(var(--foreground))', fontSize: '1.3rem' }}>
                {contactInfo.location.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.1rem' }}>
                {contactInfo.location.value}
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,
              border: '2px solid hsl(var(--border))',
              background: 'linear-gradient(135deg, hsl(var(--card)) 0%, #ec489908 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#ec4899',
                boxShadow: '0 12px 40px #ec489920'
              }
            }}
          >
            <Stack direction="row" spacing={3} alignItems="flex-start">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  minWidth: 80,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ec489920 0%, #ec489910 100%)',
                  border: '2px solid #ec489930',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FavoriteIcon sx={{ fontSize: 40, color: '#ec4899' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 1, color: 'hsl(var(--foreground))', fontSize: '1.4rem' }}
                >
                  {contactInfo.support.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: 'hsl(var(--muted-foreground))', fontSize: '1.1rem' }}
                >
                  {contactInfo.support.subtitle}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {contactInfo.support.links.map((link, index) => {
                    const colors = ['#f97316', '#ec4899'];
                    const color = colors[index % colors.length];
                    return (
                      <Button
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        startIcon={link.label.includes('Coffee') ? <CoffeeIcon /> : <FavoriteIcon />}
                        sx={{
                          borderRadius: 3,
                          px: 4,
                          py: 1.5,
                          borderColor: color,
                          color: 'hsl(var(--foreground))',
                          background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: color,
                            background: `linear-gradient(135deg, ${color}25 0%, ${color}15 100%)`,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 6px 20px ${color}30`
                          }
                        }}
                      >
                        {link.label}
                      </Button>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Stack>
    </motion.div>
  );
};

export default ContactPage;
