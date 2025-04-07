import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
  Card,
  CardMedia,
  IconButton
} from '@mui/material';
import {
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  TextFields as TextIcon,
  Image as ImageIcon,
  MusicNote as MusicIcon,
  Mic as MicIcon
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`video-editor-tabpanel-${index}`}
      aria-labelledby={`video-editor-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const VideoEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [videoData, setVideoData] = useState({
    title: id === 'new' ? '' : 'Product Demo - Wireless Earbuds',
    description: id === 'new' ? '' : 'Showcase of our new wireless earbuds with noise cancellation features.',
    productIds: id === 'new' ? [] : ['prod123', 'prod456'],
    template: id === 'new' ? '' : 'product-showcase',
    duration: id === 'new' ? 30 : 130,
    autoGenerate: true
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setVideoData({
      ...videoData,
      [name]: checked
    });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setVideoData({
      ...videoData,
      [name]: newValue
    });
  };

  const handleSave = () => {
    // Save logic would go here
    navigate('/videos');
  };

  const templates = [
    { id: 'product-showcase', name: 'Product Showcase' },
    { id: 'product-review', name: 'Product Review' },
    { id: 'tutorial', name: 'Tutorial' },
    { id: 'promotion', name: 'Promotion' },
    { id: 'unboxing', name: 'Unboxing' }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {id === 'new' ? 'Create New Video' : 'Edit Video'}
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          {id !== 'new' && (
            <Button
              variant="outlined"
              startIcon={<PlayIcon />}
            >
              Preview
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="video editor tabs"
              variant="fullWidth"
            >
              <Tab label="Details" />
              <Tab label="Content" />
              <Tab label="Voiceover" />
              <Tab label="Products" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Video Title"
                    name="title"
                    value={videoData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={videoData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Template</InputLabel>
                    <Select
                      name="template"
                      value={videoData.template}
                      label="Template"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {templates.map(template => (
                        <MenuItem key={template.id} value={template.id}>
                          {template.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ width: '100%' }}>
                    <Typography id="duration-slider" gutterBottom>
                      Duration (seconds): {videoData.duration}
                    </Typography>
                    <Slider
                      value={videoData.duration}
                      onChange={handleSliderChange('duration')}
                      aria-labelledby="duration-slider"
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={15}
                      max={180}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={videoData.autoGenerate}
                        onChange={handleSwitchChange}
                        name="autoGenerate"
                      />
                    }
                    label="Auto-generate video from product details"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Video Elements
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="outlined" startIcon={<TextIcon />}>
                      Add Text
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" startIcon={<ImageIcon />}>
                      Add Image
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" startIcon={<MusicIcon />}>
                      Add Music
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 5 }}>
                {videoData.autoGenerate 
                  ? "Video content will be auto-generated based on product details and selected template."
                  : "Drag and drop elements to build your video timeline."}
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Voiceover Options
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Voice Type</InputLabel>
                      <Select
                        value="female1"
                        label="Voice Type"
                      >
                        <MenuItem value="female1">Female Voice 1</MenuItem>
                        <MenuItem value="female2">Female Voice 2</MenuItem>
                        <MenuItem value="male1">Male Voice 1</MenuItem>
                        <MenuItem value="male2">Male Voice 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button 
                      variant="contained" 
                      startIcon={<MicIcon />}
                      fullWidth
                      sx={{ height: '56px' }}
                    >
                      Generate Voiceover
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Voiceover Script"
                      multiline
                      rows={6}
                      defaultValue={videoData.description}
                    />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  TikTok Shop Products
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  sx={{ mb: 3 }}
                >
                  Add Product
                </Button>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://via.placeholder.com/300x200?text=Wireless+Earbuds"
                        alt="Wireless Earbuds"
                      />
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1">
                          Wireless Earbuds Pro
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          $79.99
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://via.placeholder.com/300x200?text=Charging+Case"
                        alt="Charging Case"
                      />
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1">
                          Wireless Charging Case
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          $29.99
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box 
              sx={{ 
                width: '100%', 
                paddingTop: '177.78%', // 16:9 aspect ratio
                position: 'relative',
                backgroundColor: 'black',
                mb: 2
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" color="white">
                  {id === 'new' ? 'Preview will be available after saving' : 'Video preview'}
                </Typography>
              </Box>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              startIcon={<PlayIcon />}
              disabled={id === 'new'}
            >
              Play Preview
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoEditor;
