import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Stack,
  Paper
} from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const ProjectsPage: React.FC = () => {
  const icpacProjects = projects.filter(p => p.organization === 'icpac');
  const personalProjects = projects.filter(p => p.organization !== 'icpac');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Stack spacing={5}>
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
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: 250,
                height: 250,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf620 0%, #3b82f620 100%)',
                filter: 'blur(50px)'
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
                My Projects
              </Typography>
              <Box
                sx={{
                  height: 6,
                  width: 80,
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
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
                A collection of my work in geospatial technology, data science, and web development.
                From early warning systems that help communities prepare for climate-related disasters
                to interactive mapping applications that make spatial data accessible and understandable.
                Each project represents a step forward in leveraging technology for meaningful impact.
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* ICPAC Projects */}
        {icpacProjects.length > 0 && (
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    height: 32,
                    width: 6,
                    background: 'linear-gradient(180deg, #3b82f6 0%, #3b82f650 100%)',
                    borderRadius: 1
                  }}
                />
                <Box>
                  <Typography variant="h4" fontWeight={700} sx={{ color: 'hsl(var(--foreground))' }}>
                    ICPAC Projects
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                    Climate and early warning systems development
                  </Typography>
                </Box>
              </Stack>
            </motion.div>

            <Grid container spacing={3}>
              {icpacProjects.map((project, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      imageSrc={project.imageSrc}
                      gradient={project.gradient}
                      categories={project.displayCategories}
                      technologies={project.technologies}
                      projectLink={project.projectLink}
                      codeLink={project.codeLink}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Personal Projects */}
        {personalProjects.length > 0 && (
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    height: 32,
                    width: 6,
                    background: 'linear-gradient(180deg, #22c55e 0%, #22c55e50 100%)',
                    borderRadius: 1
                  }}
                />
                <Box>
                  <Typography variant="h4" fontWeight={700} sx={{ color: 'hsl(var(--foreground))' }}>
                    Open Source & Personal
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                    Side projects and contributions on GitHub
                  </Typography>
                </Box>
              </Stack>
            </motion.div>

            <Grid container spacing={3}>
              {personalProjects.map((project, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      imageSrc={project.imageSrc}
                      gradient={project.gradient}
                      categories={project.displayCategories}
                      technologies={project.technologies}
                      projectLink={project.projectLink}
                      codeLink={project.codeLink}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Stack>
    </motion.div>
  );
};

export default ProjectsPage;
