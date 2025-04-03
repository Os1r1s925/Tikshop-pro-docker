import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const navigate = useNavigate();
  const videosPerPage = 8;

  useEffect(() => {
    // Simulate fetching videos
    const fetchVideos = async () => {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/api/videos');
        // const data = await response.json();
        
        // Simulated data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockVideos = [
          { id: 1, title: 'Summer Fashion Collection', thumbnail: 'https://via.placeholder.com/300x200?text=Summer+Fashion', views: 1200, date: '2025-03-28' },
          { id: 2, title: 'Tech Gadgets Review', thumbnail: 'https://via.placeholder.com/300x200?text=Tech+Gadgets', views: 980, date: '2025-03-25' },
          { id: 3, title: 'Home Decor Ideas', thumbnail: 'https://via.placeholder.com/300x200?text=Home+Decor', views: 750, date: '2025-03-22' },
          { id: 4, title: 'Fitness Equipment Showcase', thumbnail: 'https://via.placeholder.com/300x200?text=Fitness+Equipment', views: 620, date: '2025-03-20' },
          { id: 5, title: 'Beauty Products Review', thumbnail: 'https://via.placeholder.com/300x200?text=Beauty+Products', views: 890, date: '2025-03-18' },
          { id: 6, title: 'Kitchen Gadgets Demo', thumbnail: 'https://via.placeholder.com/300x200?text=Kitchen+Gadgets', views: 720, date: '2025-03-15' },
          { id: 7, title: 'Travel Essentials Guide', thumbnail: 'https://via.placeholder.com/300x200?text=Travel+Essentials', views: 1050, date: '2025-03-12' },
          { id: 8, title: 'Pet Accessories Showcase', thumbnail: 'https://via.placeholder.com/300x200?text=Pet+Accessories', views: 580, date: '2025-03-10' },
          { id: 9, title: 'Office Supplies Review', thumbnail: 'https://via.placeholder.com/300x200?text=Office+Supplies', views: 430, date: '2025-03-08' },
          { id: 10, title: 'Gaming Accessories Demo', thumbnail: 'https://via.placeholder.com/300x200?text=Gaming+Accessories', views: 1150, date: '2025-03-05' }
        ];
        
        setVideos(mockVideos);
        setTotalPages(Math.ceil(mockVideos.length / videosPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCreateVideo = () => {
    navigate('/videos/editor');
  };

  const handleEditVideo = (videoId) => {
    navigate(`/videos/editor?id=${videoId}`);
  };

  const handleDeleteClick = (video) => {
    setSelectedVideo(video);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // This would be replaced with an actual API call
      // await fetch(`/api/videos/${selectedVideo.id}`, {
      //   method: 'DELETE'
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setVideos(videos.filter(video => video.id !== selectedVideo.id));
      setDeleteDialogOpen(false);
      setSelectedVideo(null);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedVideo(null);
  };

  // Filter videos based on search term
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate videos
  const paginatedVideos = filteredVideos.slice(
    (page - 1) * videosPerPage,
    page * videosPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          My Videos
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateVideo}
        >
          Create New Video
        </Button>
      </Box>
      
      <TextField
        fullWidth
        margin="normal"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      {filteredVideos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">No videos found</Typography>
          <Typography variant="body1" color="text.secondary">
            Try a different search term or create a new video
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedVideos.map((video) => (
              <Grid item xs={12} sm={6} md={3} key={video.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Views: {video.views}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {video.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => navigate(`/videos/view/${video.id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleEditVideo(video.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteClick(video)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the video "{selectedVideo?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoList;
