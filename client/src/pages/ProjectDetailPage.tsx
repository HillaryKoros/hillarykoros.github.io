import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  CheckCircle as CheckIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  Description as NotebookIcon,
  VideoLibrary as VideoIcon,
  MenuBook as GuideIcon,
  School as WorkshopIcon,
  OpenInNew as OpenIcon
} from '@mui/icons-material';
import { projects } from '../data/projects';

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  operational: { bg: '#22c55e20', text: '#22c55e', label: 'Operational' },
  ongoing: { bg: '#3b82f620', text: '#3b82f6', label: 'Ongoing' },
  completed: { bg: '#f59e0b20', text: '#f59e0b', label: 'Completed' },
  planned: { bg: '#ef444420', text: '#ef4444', label: 'Planned' }
};

const tutorialIcons: Record<string, React.ElementType> = {
  notebook: NotebookIcon,
  video: VideoIcon,
  guide: GuideIcon,
  workshop: WorkshopIcon
};

const colorPalette = ['#3b82f6', '#22c55e', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899'];

// Helper to render text with [BOLD] brackets and ~~strikethrough~~
const renderWithBoldBrackets = (text: string) => {
  const parts = text.split(/(\[[A-Z]+\]|~~[^~]+~~)/g);
  return parts.map((part, i) => {
    if (part.match(/^\[[A-Z]+\]$/)) {
      const label = part.slice(1, -1);
      return (
        <span
          key={i}
          style={{
            fontWeight: 700,
            color: '#3b82f6',
            backgroundColor: '#3b82f620',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.85em',
            marginRight: '4px'
          }}
        >
          {label}
        </span>
      );
    }
    if (part.startsWith('~~') && part.endsWith('~~')) {
      const label = part.slice(2, -2);
      return (
        <span
          key={i}
          style={{
            textDecoration: 'line-through',
            color: 'hsl(var(--muted-foreground))',
            opacity: 0.7
          }}
        >
          {label}
        </span>
      );
    }
    return part;
  });
};

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onBack }) => {
  const project = projects.find(p => p.id === projectId);
  const projectIndex = projects.findIndex(p => p.id === projectId);
  const color = colorPalette[projectIndex % colorPalette.length];

  if (!project) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Project not found</Typography>
        <Button onClick={onBack} startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Stack spacing={4}>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'hsl(var(--foreground))',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'hsl(var(--secondary))'
              }
            }}
          >
            Back to Projects
          </Button>
        </motion.div>

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
              background: `linear-gradient(145deg, hsl(var(--card)) 0%, ${color}12 100%)`,
              border: '2px solid hsl(var(--border))',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: `linear-gradient(90deg, ${color} 0%, ${color}60 100%)`
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* Status & Categories */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                <Chip
                  label={statusColors[project.status].label}
                  size="small"
                  sx={{
                    bgcolor: statusColors[project.status].bg,
                    color: statusColors[project.status].text,
                    fontWeight: 700,
                    border: `1px solid ${statusColors[project.status].text}40`
                  }}
                />
                {project.displayCategories.map((cat, i) => (
                  <Chip
                    key={i}
                    label={cat}
                    size="small"
                    sx={{
                      bgcolor: `${color}20`,
                      color: color,
                      fontWeight: 600,
                      border: `1px solid ${color}40`
                    }}
                  />
                ))}
              </Stack>

              {/* Title */}
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{ mb: 2, color: 'hsl(var(--foreground))', fontSize: { xs: '1.8rem', md: '2.5rem' } }}
              >
                {project.title}
              </Typography>

              {/* Meta Info */}
              <Stack direction="row" spacing={3} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                {project.role && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon sx={{ fontSize: 20, color: 'hsl(var(--muted-foreground))' }} />
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                      {project.role}
                    </Typography>
                  </Stack>
                )}
                {project.duration && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TimelineIcon sx={{ fontSize: 20, color: 'hsl(var(--muted-foreground))' }} />
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                      {project.duration}
                    </Typography>
                  </Stack>
                )}
              </Stack>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: 'hsl(var(--foreground) / 0.9)',
                  lineHeight: 1.9,
                  fontSize: '1.1rem',
                  mb: 3
                }}
              >
                {project.description}
              </Typography>

              {/* Technologies */}
              <Typography variant="subtitle2" sx={{ color: 'hsl(var(--muted-foreground))', mb: 1 }}>
                Technologies Used
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {project.technologies.split(', ').map((tech, i) => (
                  <Chip
                    key={i}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: 'hsl(var(--secondary))',
                      color: 'hsl(var(--foreground))',
                      fontWeight: 500
                    }}
                  />
                ))}
              </Stack>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                {project.projectLink && (
                  <Button
                    variant="contained"
                    href={project.projectLink}
                    target="_blank"
                    startIcon={<LaunchIcon />}
                    sx={{
                      bgcolor: color,
                      color: '#fff',
                      fontWeight: 600,
                      px: 3,
                      '&:hover': {
                        bgcolor: color,
                        opacity: 0.9
                      }
                    }}
                  >
                    View Live
                  </Button>
                )}
                {project.codeLink && (
                  <Button
                    variant="outlined"
                    href={project.codeLink}
                    target="_blank"
                    startIcon={<GitHubIcon />}
                    sx={{
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))',
                      fontWeight: 600,
                      px: 3,
                      '&:hover': {
                        borderColor: color,
                        bgcolor: `${color}10`
                      }
                    }}
                  >
                    View Code
                  </Button>
                )}
              </Stack>
            </Box>
          </Paper>
        </motion.div>

        {/* Problem & Solution */}
        {(project.problem || project.solution) && (
          <Grid container spacing={3}>
            {project.problem && (
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      border: '2px solid hsl(var(--border))',
                      background: 'linear-gradient(145deg, hsl(var(--card)) 0%, #ef444412 100%)'
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: '#ef444420',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography sx={{ fontSize: 24 }}>?</Typography>
                      </Box>
                      <Typography variant="h5" fontWeight={700} sx={{ color: 'hsl(var(--foreground))' }}>
                        The Problem
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body1"
                      sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.8 }}
                    >
                      {project.problem}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            )}
            {project.solution && (
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      border: '2px solid hsl(var(--border))',
                      background: 'linear-gradient(145deg, hsl(var(--card)) 0%, #22c55e12 100%)'
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: '#22c55e20',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <CheckIcon sx={{ color: '#22c55e' }} />
                      </Box>
                      <Typography variant="h5" fontWeight={700} sx={{ color: 'hsl(var(--foreground))' }}>
                        The Solution
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.8 }}
                    >
                      {renderWithBoldBrackets(project.solution)}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            )}
          </Grid>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                border: '2px solid hsl(var(--border))',
                bgcolor: 'hsl(var(--card))'
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: 'hsl(var(--foreground))' }}>
                Key Metrics
              </Typography>
              <Grid container spacing={3}>
                {project.metrics.map((metric, i) => (
                  <Grid size={{ xs: 6, sm: 3 }} key={i}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 3,
                        background: `linear-gradient(145deg, ${colorPalette[i % colorPalette.length]}15 0%, ${colorPalette[i % colorPalette.length]}08 100%)`,
                        border: `1px solid ${colorPalette[i % colorPalette.length]}30`
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ color: colorPalette[i % colorPalette.length], mb: 0.5 }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        )}

        {/* Results & Features */}
        <Grid container spacing={3}>
          {/* Results */}
          {project.results && project.results.length > 0 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    border: '2px solid hsl(var(--border))',
                    bgcolor: 'hsl(var(--card))'
                  }}
                >
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: 'hsl(var(--foreground))' }}>
                    Results & Impact
                  </Typography>
                  <Stack spacing={2}>
                    {project.results.map((result, i) => (
                      <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                        <CheckIcon sx={{ color: '#22c55e', mt: 0.3, fontSize: 20 }} />
                        <Typography variant="body1" sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
                          {result}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    border: '2px solid hsl(var(--border))',
                    bgcolor: 'hsl(var(--card))'
                  }}
                >
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: 'hsl(var(--foreground))' }}>
                    Key Features
                  </Typography>
                  <Stack spacing={2}>
                    {project.features.map((feature, i) => (
                      <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 1,
                            bgcolor: `${color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Typography sx={{ color, fontWeight: 700, fontSize: 12 }}>{i + 1}</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          )}
        </Grid>

        {/* Tutorials Section */}
        {project.tutorials && project.tutorials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                border: '2px solid hsl(var(--border))',
                bgcolor: 'hsl(var(--card))'
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: 'hsl(var(--foreground))' }}>
                Tutorials & Resources
              </Typography>
              <Grid container spacing={2}>
                {project.tutorials.map((tutorial, i) => {
                  const TutorialIcon = tutorialIcons[tutorial.type] || NotebookIcon;
                  const tutorialColor = colorPalette[i % colorPalette.length];

                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tutorial.id}>
                      <Box
                        component={tutorial.url ? 'a' : 'div'}
                        href={tutorial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'block',
                          p: 2.5,
                          borderRadius: 2,
                          border: '1px solid hsl(var(--border))',
                          bgcolor: `${tutorialColor}08`,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          cursor: tutorial.url ? 'pointer' : 'default',
                          '&:hover': tutorial.url ? {
                            borderColor: tutorialColor,
                            transform: 'translateY(-2px)'
                          } : {}
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1.5,
                              bgcolor: `${tutorialColor}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <TutorialIcon sx={{ color: tutorialColor, fontSize: 20 }} />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'hsl(var(--foreground))' }}>
                              {tutorial.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                              {tutorial.description}
                            </Typography>
                          </Box>
                          {tutorial.url && (
                            <OpenIcon sx={{ fontSize: 16, color: 'hsl(var(--muted-foreground))' }} />
                          )}
                        </Stack>
                        {tutorial.duration && (
                          <Typography variant="caption" sx={{ color: tutorialColor, mt: 1, display: 'block' }}>
                            Duration: {tutorial.duration}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </motion.div>
        )}
      </Stack>
    </motion.div>
  );
};

export default ProjectDetailPage;
