import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as MuteIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const VideoEditor = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [transcript, setTranscript] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Simulate fetching products and voice options
    const fetchData = async () => {
      try {
        // This would be replaced with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock products data
        const mockProducts = [
          { id: 1, name: 'Summer Dress', price: 49.99, category: 'Fashion' },
          { id: 2, name: 'Wireless Earbuds', price: 89.99, category: 'Electronics' },
          { id: 3, name: 'Yoga Mat', price: 29.99, category: 'Fitness' },
          { id: 4, name: 'Coffee Maker', price: 79.99, category: 'Kitchen' },
          { id: 5, name: 'Skincare Set', price: 59.99, category: 'Beauty' }
        ];
        
        // Mock voice options
        const mockVoices = [
          { id: 'v1', name: 'Emma (Female, US)', language: 'en-US' },
          { id: 'v2', name: 'James (Male, US)', language: 'en-US' },
          { id: 'v3', name: 'Sophie (Female, UK)', language: 'en-GB' },
          { id: 'v4', name: 'Thomas (Male, UK)', language: 'en-GB' },
          { id: 'v5', name: 'Mei (Female, CN)', language: 'zh-CN' }
        ];
        
        setProducts(mockProducts);
        setVoiceOptions(mockVoices);
        setSelectedVoice('v1');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
    // Check if we're editing an existing video
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');
    
    if (videoId) {
      // Fetch existing video data
      fetchVideoData(videoId);
    }
  }, []);
  
  const fetchVideoData = async (videoId) => {
    try {
      setLoading(true);
      
      // This would be replaced with an actual API call
      // const response = await fetch(`/api/videos/${videoId}`);
      // const data = await response.json();
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock video data
      const mockVideoData = {
        title: 'Summer Fashion Collection',
        description: 'Check out our latest summer fashion collection with amazing discounts!',
        transcript: 'Hello everyone! Today I\'m excited to show you our brand new summer collection. We have amazing dresses, accessories, and more - all at incredible prices. Don\'t miss out on these limited-time offers!',
        selectedProducts: [1, 5],
        selectedVoice: 'v3',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
      };
      
      // Set form data
      setTranscript(mockVideoData.transcript);
      setSelectedProducts(mockVideoData.selectedProducts);
      setSelectedVoice(mockVideoData.selectedVoice);
      setVideoUrl(mockVideoData.videoUrl);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching video data:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (videoRef.current) {
      videoRef.current.volume = newValue / 100;
    }
  };

  const handleTranscriptChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setSaveSuccess(false);
      setSaveError('');
      
      // This would be replaced with an actual API call
      // const formData = new FormData();
      // if (videoFile) formData.append('video', videoFile);
      // formData.append('transcript', transcript);
      // formData.append('selectedProducts', JSON.stringify(selectedProducts));
      // formData.append('selectedVoice', selectedVoice);
      
      // const response = await fetch('/api/videos', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLoading(false);
      setSaveSuccess(true);
      
      // Simulate redirect after successful save
      setTimeout(() => {
        // window.location.href = '/videos';
      }, 2000);
    } catch (error) {
      console.error('Error saving video:', error);
      setLoading(false);
      setSaveError('Failed to save video. Please try again.');
    }
  };

  const handleGenerateTranscript = async () => {
    if (!videoUrl) {
      alert('Please upload a video first');
      return;
    }
    
    try {
      setLoading(true);
      
      // This would be replaced with an actual API call
      // const response = await fetch('/api/generate-transcript', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ videoUrl }),
      // });
      // const data = await response.json();
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transcript
      const mockTranscript = "Welcome to our product showcase! Today we're featuring some amazing items that you'll absolutely love. Our first item is perfect for summer days and special occasions. Next, we have an incredible tech gadget that will make your life easier. Don't miss out on these limited-time offers!";
      
      setTranscript(mockTranscript);
      setLoading(false);
    } catch (error) {
      console.error('Error generating transcript:', error);
      setLoading(false);
      alert('Failed to generate transcript. Please try again.');
    }
  };

  const handleAddProduct = () => {
    setProductDialogOpen(true);
  };

  const handleCloseProductDialog = () => {
    setProductDialogOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Video Editor
      </Typography>
      
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Video saved successfully!
        </Alert>
      )}
      
      {saveError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {saveError}
        </Alert>
      )}
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Upload" />
          <Tab label="Edit" />
          <Tab label="Products" />
          <Tab label="Voice" />
        </Tabs>
      </Paper>
      
      {activeTab === 0 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload Video
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                sx={{ mb: 2 }}
              >
                Select Video File
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
              <Typography variant="body2" color="text.secondary">
                Supported formats: MP4, MOV, AVI (max 500MB)
              </Typography>
            </Box>
          </Paper>
          
          {videoUrl && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
                <video
                  ref={videoRef}
                  src={videoUrl}
                  style={{ width: '100%', maxHeight: '400px' }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls={false}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handlePlayPause}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </IconButton>
                <IconButton onClick={handleMuteToggle}>
                  {isMuted ? <MuteIcon /> : <VolumeIcon />}
                </IconButton>
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  sx={{ mx: 2, width: '200px' }}
                />
              </Box>
            </Paper>
          )}
        </Box>
      )}
      
      {activeTab === 1 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transcript & Script
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleGenerateTranscript}
                disabled={!videoUrl || loading}
              >
                Generate Transcript
              </Button>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={10}
              label="Transcript/Script"
              value={transcript}
              onChange={handleTranscriptChange}
              placeholder="Enter or generate transcript here..."
            />
          </Paper>
        </Box>
      )}
      
      {activeTab === 2 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Product Tagging
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select products to tag in your video
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {selectedProducts.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                No products selected. Click "Add Product" to tag products in your video.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {products
                  .filter(product => selectedProducts.includes(product.id))
                  .map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1">{product.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${product.price} - {product.category}
                          </Typography>
                        </Box>
                        <IconButton 
                          color="error" 
                          onClick={() => handleProductSelect(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))
                }
              </Grid>
            )}
          </Paper>
        </Box>
      )}
      
      {activeTab === 3 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Voice Settings
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="voice-select-label">Select Voice</InputLabel>
              <Select
                labelId="voice-select-label"
                value={selectedVoice}
                label="Select Voice"
                onChange={handleVoiceChange}
              >
                {voiceOptions.map(voice => (
                  <MenuItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button 
              variant="outlined" 
              disabled={!transcript || !selectedVoice}
              sx={{ mb: 2 }}
            >
              Preview Voice
            </Button>
            
            <Typography variant="body2" color="text.secondary">
              Note: Voice generation requires Eleven Labs API key in settings
            </Typography>
          </Paper>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button 
          variant="contained" 
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={loading || !videoUrl}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Video'}
        </Button>
      </Box>
      
      {/* Product Selection Dialog */}
      <Dialog open={productDialogOpen} onClose={handleCloseProductDialog} maxWidth="md" fullWidth>
        <DialogTitle>Select Products</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    cursor: 'pointer',
                    border: selectedProducts.includes(product.id) ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    bgcolor: selectedProducts.includes(product.id) ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
                  }}
                  onClick={() => handleProductSelect(product.id)}
                >
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductDialog}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoEditor;
