import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Stack,
  Paper,
  Chip,
  Card,
  CardActionArea,
  IconButton
} from '@mui/material';
import {
  Description as NotebookIcon,
  PictureAsPdf as PdfIcon,
  GitHub as GitHubIcon,
  OpenInNew as OpenIcon,
  Code as ScriptIcon,
  ArrowBack as BackIcon,
  Schedule as TimeIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { blogArticles, notebookLinks, categories, BlogArticle } from '../data/blog';

const colorPalette = ['#3b82f6', '#22c55e', '#8b5cf6', '#f97316', '#06b6d4', '#ec4899'];

const categoryColors: Record<string, string> = {
  'Remote Sensing': '#3b82f6',
  'Web Development': '#8b5cf6',
  'Database': '#22c55e',
  'Data Science': '#f97316',
  'DevOps': '#06b6d4',
  'All': '#6b7280'
};

const typeIcons: Record<string, React.ElementType> = {
  notebook: NotebookIcon,
  github: GitHubIcon,
  pdf: PdfIcon,
  script: ScriptIcon,
  twitter: FaTwitter,
  linkedin: FaLinkedin
};

const typeColors: Record<string, string> = {
  notebook: '#f97316',
  github: '#6b7280',
  pdf: '#ef4444',
  script: '#22c55e',
  twitter: '#1da1f2',
  linkedin: '#0077b5'
};

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const filteredArticles = selectedCategory === 'All'
    ? blogArticles
    : blogArticles.filter(article => article.category === selectedCategory);

  const filteredResources = selectedCategory === 'All'
    ? notebookLinks
    : notebookLinks.filter(resource => resource.category === selectedCategory);

  // Show article detail view
  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Stack spacing={4}>
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.08) 100%)',
            border: '2px solid hsl(var(--border))'
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ mb: 1, color: 'hsl(var(--foreground))' }}
          >
            Ideas & Resources
          </Typography>
          <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
            Technical articles, notebooks, scripts, and resources.
          </Typography>
        </Paper>

        {/* Category Filter */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const color = categoryColors[category] || '#6b7280';
            return (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                size="small"
                sx={{
                  background: isSelected ? color : 'transparent',
                  border: `1px solid ${color}`,
                  color: isSelected ? '#fff' : color,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { background: isSelected ? color : `${color}20` }
                }}
              />
            );
          })}
        </Stack>

        {/* Articles Grid */}
        {filteredArticles.length > 0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'hsl(var(--foreground))' }}>
              Articles
            </Typography>
            <Grid container spacing={2}>
              {filteredArticles.map((article, index) => {
                const color = categoryColors[article.category] || colorPalette[index % colorPalette.length];
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          borderRadius: 2,
                          border: '1px solid hsl(var(--border))',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: color,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 12px ${color}15`
                          }
                        }}
                      >
                        <CardActionArea
                          onClick={() => setSelectedArticle(article)}
                          sx={{ height: '100%', p: 2 }}
                        >
                          <Stack spacing={1.5}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Chip
                                label={article.category}
                                size="small"
                                sx={{
                                  bgcolor: `${color}15`,
                                  color: color,
                                  fontWeight: 600,
                                  fontSize: '0.65rem',
                                  height: 22
                                }}
                              />
                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                <TimeIcon sx={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }} />
                                <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                                  {article.readTime}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ color: 'hsl(var(--foreground))', lineHeight: 1.3 }}>
                              {article.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
                              {article.description}
                            </Typography>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                              {article.tags.slice(0, 3).map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{
                                    bgcolor: 'hsl(var(--secondary))',
                                    color: 'hsl(var(--muted-foreground))',
                                    fontSize: '0.6rem',
                                    height: 20
                                  }}
                                />
                              ))}
                            </Stack>
                          </Stack>
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Resources Grid */}
        {filteredResources.length > 0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: 'hsl(var(--foreground))' }}>
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              {filteredResources.map((resource, index) => {
                const TypeIcon = typeIcons[resource.type];
                const typeColor = typeColors[resource.type];

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resource.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card
                        component="a"
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        elevation={0}
                        sx={{
                          display: 'block',
                          p: 2,
                          borderRadius: 2,
                          border: '1px solid hsl(var(--border))',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: typeColor,
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1.5,
                              bgcolor: `${typeColor}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <TypeIcon style={{ fontSize: 18, color: typeColor }} />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'hsl(var(--foreground))' }}>
                              {resource.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                              {resource.description}
                            </Typography>
                          </Box>
                          <OpenIcon sx={{ fontSize: 16, color: 'hsl(var(--muted-foreground))' }} />
                        </Stack>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Stack>
    </motion.div>
  );
};

// Article Detail Component
interface ArticleDetailProps {
  article: BlogArticle;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  const color = categoryColors[article.category] || '#3b82f6';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Stack spacing={3}>
        {/* Back Button */}
        <IconButton
          onClick={onBack}
          sx={{
            width: 40,
            height: 40,
            border: '1px solid hsl(var(--border))',
            '&:hover': { bgcolor: 'hsl(var(--secondary))' }
          }}
        >
          <BackIcon />
        </IconButton>

        {/* Header */}
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Chip
              label={article.category}
              size="small"
              sx={{ bgcolor: `${color}15`, color: color, fontWeight: 600 }}
            />
            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>
              {article.date} · {article.readTime}
            </Typography>
          </Stack>
          <Typography variant="h4" fontWeight={700} sx={{ color: 'hsl(var(--foreground))', mb: 1 }}>
            {article.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'hsl(var(--muted-foreground))' }}>
            {article.description}
          </Typography>
        </Box>

        {/* Problem / Solution / Verdict */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid #ef444440',
                bgcolor: '#ef444408'
              }}
            >
              <Typography variant="overline" sx={{ color: '#ef4444', fontWeight: 700 }}>
                The Problem
              </Typography>
              <Typography variant="body2" sx={{ color: 'hsl(var(--foreground))', mt: 1, lineHeight: 1.7 }}>
                {article.problem}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid #3b82f640',
                bgcolor: '#3b82f608'
              }}
            >
              <Typography variant="overline" sx={{ color: '#3b82f6', fontWeight: 700 }}>
                The Solution
              </Typography>
              <Typography variant="body2" sx={{ color: 'hsl(var(--foreground))', mt: 1, lineHeight: 1.7 }}>
                {article.solution}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid #22c55e40',
                bgcolor: '#22c55e08'
              }}
            >
              <Typography variant="overline" sx={{ color: '#22c55e', fontWeight: 700 }}>
                The Verdict
              </Typography>
              <Typography variant="body2" sx={{ color: 'hsl(var(--foreground))', mt: 1, lineHeight: 1.7 }}>
                {article.verdict}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Key Takeaways */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${color}40`,
            bgcolor: `${color}08`
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <CheckIcon sx={{ color: color, fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: color }}>
              Key Takeaways
            </Typography>
          </Stack>
          <Grid container spacing={1}>
            {article.keyPoints.map((point, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, mt: 1, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: 'hsl(var(--foreground))' }}>
                    {point}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Tags */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {article.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                bgcolor: 'hsl(var(--secondary))',
                color: 'hsl(var(--foreground))',
                fontWeight: 500
              }}
            />
          ))}
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default BlogPage;
