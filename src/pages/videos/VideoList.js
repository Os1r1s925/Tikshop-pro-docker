import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoCall as VideoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VideoList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for videos
  const videos = [
    {
      id: '1',
      title: 'Summer Collection Showcase',
      thumbnail: 'https://via.placeholder.com/300x200?text=Summer+Collection',
      duration: '1:24',
      status: 'published',
      createdAt: '2025-03-15',
      views: 1245
    },
    {
      id: '2',
      title: 'Product Demo - Wireless Earbuds',
      thumbnail: 'https://via.placeholder.com/300x200?text=Wireless+Earbuds',
      duration: '2:10',
      status: 'draft',
      createdAt: '2025-04-02',
      views: 0
    },
    {
      id: '3',
      title: 'Spring Fashion Trends 2025',
      thumbnail: 'https://via.placeholder.com/300x200?text=Spring+Fashion',
      duration: '3:45',
      status: 'published',
      createdAt: '2025-03-28',
      views: 876
    },
    {
      id: '4',
      title: 'Unboxing New Tech Gadgets',
      thumbnail: 'https://via.placeholder.com/300x200?text=Tech+Gadgets',
      duration: '4:12',
      status: 'processing',
      createdAt: '2025-04-05',
      views: 0
    }
  ];
  
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateVideo = () => {
    navigate('/videos/new');
  };

  const handleEditVideo = (id) => {
    navigate(`/videos/${id}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'published': return 'success';
      case 'draft': return 'default';
      case 'processing': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Videos
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateVideo}
        >
          Create Video
        </Button>
      </Box>
      
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      
      {filteredVideos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <VideoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No videos found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? 'Try a different search term' : 'Create your first video to get started'}
          </Typography>
          {!searchTerm && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleCreateVideo}
            >
              Create Video
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={video.thumbnail}
                  alt={video.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {video.title}
                    </Typography>
                    <Chip 
                      label={video.status} 
                      size="small" 
                      color={getStatusColor(video.status)} 
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {video.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {video.createdAt}
                  </Typography>
                  {video.status === 'published' && (
                    <Typography variant="body2" color="text.secondary">
                      Views: {video.views}
                    </Typography>
                  )}
                </CardContent>
                <Divider />
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<EditIcon />}
                    onClick={() => handleEditVideo(video.id)}
                  >
                    Edit
                  </Button>
                  <IconButton size="small" color="error" sx={{ ml: 'auto' }}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default VideoList;
