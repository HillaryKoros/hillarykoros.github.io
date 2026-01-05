import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Stack,
  Chip
} from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { projects, Project } from '../data/projects';

interface ProjectsPageProps {
  onViewProject?: (projectId: string) => void;
}

const statusConfig = {
  operational: { title: 'Operational', color: '#22c55e' },
  ongoing: { title: 'Ongoing', color: '#3b82f6' },
  planned: { title: 'Planned', color: '#f97316' }
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onViewProject }) => {
  const groupedProjects = useMemo(() => {
    const groups: Record<string, Project[]> = { operational: [], ongoing: [], planned: [] };
    projects.forEach(project => {
      if (groups[project.status]) groups[project.status].push(project);
    });
    return groups;
  }, []);

  const renderProjectSection = (status: 'operational' | 'ongoing' | 'planned', projectList: Project[]) => {
    if (projectList.length === 0) return null;
    const config = statusConfig[status];

    return (
      <Box key={status} sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: 'hsl(var(--foreground))' }}>
            {config.title}
          </Typography>
          <Chip
            label={projectList.length}
            size="small"
            sx={{ backgroundColor: `${config.color}20`, color: config.color, fontWeight: 600 }}
          />
        </Stack>

        <Grid container spacing={3}>
          {projectList.map((project, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
                  status={project.status}
                  onViewDetails={() => onViewProject?.(project.id)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Stack spacing={4}>
        {/* Hero */}
        <section className="py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-loose text-justify">
            A collection of my work in geospatial technology, data science, and web development.
            From early warning systems to interactive mapping applications.
          </p>
        </section>

        {/* Projects */}
        <Box>
          {renderProjectSection('operational', groupedProjects.operational)}
          {renderProjectSection('ongoing', groupedProjects.ongoing)}
          {renderProjectSection('planned', groupedProjects.planned)}
        </Box>
      </Stack>
    </motion.div>
  );
};

export default ProjectsPage;
