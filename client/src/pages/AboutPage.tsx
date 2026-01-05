import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Psychology as PsychologyIcon,
  BarChart as BarChartIcon,
  Public as PublicIcon,
  Cloud as CloudIcon,
  Videocam as VideocamIcon,
  MusicNote as MusicIcon,
  PhotoCamera as PhotoIcon,
  Satellite as SatelliteIcon,
  TrendingUp as TrendingUpIcon,
  Water as WaterIcon,
  Map as MapIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import TechGrid from '../components/TechGrid';
import { services } from '../data/services';
import { humanLanguages } from '../data/skills';

const skillTags = [
  "GIS & Remote Sensing",
  "Spatial Databases",
  "Machine Learning",
  "Data Visualization",
  "Full Stack Development",
  "Climate Technology",
  "Cloud Computing",
  "DevOps"
];

const iconMap: Record<string, React.ElementType> = {
  '🌍': PublicIcon,
  '🛰️': SatelliteIcon,
  '💻': CodeIcon,
  '📈': TrendingUpIcon,
  '🗄️': StorageIcon,
  '💧': WaterIcon,
  '🗺️': MapIcon,
  '📊': BarChartIcon,
  '📝': DescriptionIcon,
  '🧠': PsychologyIcon,
  '☁️': CloudIcon,
  '🎬': VideocamIcon,
  '🎵': MusicIcon,
  '📷': PhotoIcon
};

const colorPalette = ['#3b82f6', '#22c55e', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899'];

const AboutPage: React.FC = () => {
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
                width: 250,
                height: 250,
                borderRadius: '50%',
                background: 'hsl(var(--primary) / 0.12)',
                filter: 'blur(50px)'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf620 0%, #3b82f620 100%)',
                filter: 'blur(40px)'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight={800}
                sx={{ mb: 2, color: 'hsl(var(--foreground))', fontSize: { xs: '2.2rem', md: '2.8rem' } }}
              >
                About Me
              </Typography>
              <Box
                sx={{
                  height: 6,
                  width: 100,
                  background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, #8b5cf6 100%)',
                  borderRadius: 3,
                  mb: 4
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: 'hsl(var(--foreground) / 0.9)',
                  fontWeight: 400,
                  lineHeight: 2,
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  mb: 4,
                  textAlign: 'justify'
                }}
              >
                Geospatial technology expert with deep expertise in Geographic Information Systems (GIS),
                remote sensing, and full-stack software development. I specialize in building data-driven solutions
                for complex spatial challenges, transforming raw geospatial data into actionable insights through
                interactive visualizations and automated workflows. My work spans from developing early warning systems
                that help communities prepare for climate-related disasters to creating interactive web mapping applications
                that make spatial data accessible and understandable.
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ position: 'relative', zIndex: 1 }}>
                {skillTags.map((tag, index) => {
                  const color = colorPalette[index % colorPalette.length];
                  return (
                    <Chip
                      key={tag}
                      label={tag}
                      sx={{
                        background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
                        border: `1.5px solid ${color}35`,
                        color: 'hsl(var(--foreground))',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        py: 0.5,
                        height: 'auto',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '& .MuiChip-label': {
                          px: 1.5,
                          py: 0.8
                        },
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          background: `linear-gradient(135deg, ${color}28 0%, ${color}15 100%)`,
                          borderColor: color,
                          boxShadow: `0 6px 20px ${color}25`
                        }
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Paper>
        </motion.div>

        {/* Areas of Expertise */}
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ height: 40, width: 6, background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)', borderRadius: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: 'hsl(var(--foreground))', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                Areas of Expertise
              </Typography>
            </Stack>
          </motion.div>

          <Grid container spacing={3}>
            {services.primary.map((service, index) => {
              const color = colorPalette[index % colorPalette.length];
              const IconComponent = iconMap[service.icon] || CodeIcon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: 4,
                        border: '2px solid hsl(var(--border))',
                        background: `linear-gradient(145deg, hsl(var(--card)) 0%, ${color}12 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease'
                        },
                        '&:hover': {
                          borderColor: color,
                          transform: 'translateY(-8px)',
                          boxShadow: `0 20px 40px ${color}25`,
                          '&::before': {
                            opacity: 1
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'flex-start' }}>
                          <Box
                            sx={{
                              width: 72,
                              height: 72,
                              minWidth: 72,
                              flexShrink: 0,
                              borderRadius: 3,
                              background: `linear-gradient(145deg, ${color}25 0%, ${color}15 100%)`,
                              border: `2px solid ${color}40`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 4px 15px ${color}20`
                            }}
                          >
                            <IconComponent sx={{ fontSize: 36, color }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              sx={{ mb: 1.5, color: 'hsl(var(--foreground))', fontSize: '1.2rem', lineHeight: 1.3 }}
                            >
                              {service.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.8, fontSize: '1rem' }}
                            >
                              {service.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Creative Interests */}
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ height: 40, width: 6, background: 'linear-gradient(180deg, #f97316 0%, #ec4899 100%)', borderRadius: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: 'hsl(var(--foreground))', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                Creative Interests
              </Typography>
            </Stack>
          </motion.div>

          <Grid container spacing={3}>
            {services.creative.map((service, index) => {
              const color = colorPalette[(index + 3) % colorPalette.length];
              const IconComponent = iconMap[service.icon] || PhotoIcon;
              return (
                <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: 4,
                        border: '2px solid hsl(var(--border))',
                        background: `linear-gradient(145deg, hsl(var(--card)) 0%, ${color}12 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease'
                        },
                        '&:hover': {
                          borderColor: color,
                          transform: 'translateY(-8px)',
                          boxShadow: `0 20px 40px ${color}25`,
                          '&::before': {
                            opacity: 1
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'flex-start' }}>
                          <Box
                            sx={{
                              width: 72,
                              height: 72,
                              minWidth: 72,
                              flexShrink: 0,
                              borderRadius: 3,
                              background: `linear-gradient(145deg, ${color}25 0%, ${color}15 100%)`,
                              border: `2px solid ${color}40`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 4px 15px ${color}20`
                            }}
                          >
                            <IconComponent sx={{ fontSize: 36, color }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              sx={{ mb: 1.5, color: 'hsl(var(--foreground))', fontSize: '1.2rem', lineHeight: 1.3 }}
                            >
                              {service.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.8, fontSize: '1rem' }}
                            >
                              {service.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Languages */}
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ height: 40, width: 6, background: 'linear-gradient(180deg, #22c55e 0%, #06b6d4 100%)', borderRadius: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: 'hsl(var(--foreground))', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                Languages
              </Typography>
            </Stack>
          </motion.div>

          <Grid container spacing={3}>
            {humanLanguages.map((lang, index) => {
              const color = colorPalette[(index + 1) % colorPalette.length];
              return (
                <Grid size={{ xs: 6, sm: 3 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        border: '2px solid hsl(var(--border))',
                        background: `linear-gradient(145deg, hsl(var(--card)) 0%, ${color}12 100%)`,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease'
                        },
                        '&:hover': {
                          borderColor: color,
                          transform: 'translateY(-6px)',
                          boxShadow: `0 15px 35px ${color}25`,
                          '&::before': {
                            opacity: 1
                          }
                        }
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={800}
                        sx={{ color: 'hsl(var(--foreground))', mb: 1.5, fontSize: '1.5rem' }}
                      >
                        {lang.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.05rem', fontWeight: 500 }}
                      >
                        {lang.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Technologies */}
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ height: 40, width: 6, background: 'linear-gradient(180deg, #8b5cf6 0%, #3b82f6 100%)', borderRadius: 1 }} />
              <Typography variant="h4" fontWeight={800} sx={{ color: 'hsl(var(--foreground))', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                Technologies & Tools
              </Typography>
            </Stack>
          </motion.div>

          <TechGrid />
        </Box>
      </Stack>
    </motion.div>
  );
};

export default AboutPage;
