import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Alert,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Snackbar
} from '@mui/material';
import {
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Key as KeyIcon,
  Api as ApiIcon,
  ShoppingCart as ShopIcon,
  VoiceChat as VoiceIcon
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
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

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showElevenLabsKey, setShowElevenLabsKey] = useState(false);
  const [showTikTokShopKey, setShowTikTokShopKey] = useState(false);
  const [showCompetitorAnalysisKey, setShowCompetitorAnalysisKey] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Form states
  const [apiKeys, setApiKeys] = useState({
    elevenLabsApiKey: 'sk_cce1765473eface7f2e28dcba1a038fae531c10f5b2799db',
    tikTokShopApiKey: '',
    competitorAnalysisApiKey: ''
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    autoSave: true,
    defaultVideoQuality: 'hd'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApiKeyChange = (e) => {
    const { name, value } = e.target;
    setApiKeys({
      ...apiKeys,
      [name]: value
    });
  };

  const handleGeneralSettingChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: checked
    });
  };

  const handleSaveApiKeys = () => {
    // Save API keys logic would go here
    setSnackbarMessage('API keys saved successfully!');
    setSnackbarOpen(true);
  };

  const handleSaveGeneralSettings = () => {
    // Save general settings logic would go here
    setSnackbarMessage('General settings saved successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={2}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          variant="fullWidth"
        >
          <Tab label="API Integrations" icon={<ApiIcon />} iconPosition="start" />
          <Tab label="General" icon={<KeyIcon />} iconPosition="start" />
          <Tab label="Account" icon={<KeyIcon />} iconPosition="start" />
        </Tabs>

        {/* API Integrations Tab */}
        <TabPanel value={tabValue} index={0}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Connect your API keys to enable full functionality of TikShop Pro.
          </Alert>

          <Grid container spacing={3}>
            {/* Eleven Labs API */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <VoiceIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Eleven Labs API
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Connect to Eleven Labs for high-quality AI voiceovers in your videos.
                </Typography>
                <TextField
                  fullWidth
                  label="Eleven Labs API Key"
                  name="elevenLabsApiKey"
                  value={apiKeys.elevenLabsApiKey}
                  onChange={handleApiKeyChange}
                  type={showElevenLabsKey ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowElevenLabsKey(!showElevenLabsKey)}
                          edge="end"
                        >
                          {showElevenLabsKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  href="https://elevenlabs.io/api" 
                  target="_blank"
                  sx={{ mr: 1 }}
                >
                  Get API Key
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  href="https://docs.elevenlabs.io/api-reference" 
                  target="_blank"
                >
                  Documentation
                </Button>
              </Paper>
            </Grid>

            {/* TikTok Shop API */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShopIcon color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    TikTok Shop API
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Connect to TikTok Shop to manage products and create shoppable videos.
                </Typography>
                <TextField
                  fullWidth
                  label="TikTok Shop API Key"
                  name="tikTokShopApiKey"
                  value={apiKeys.tikTokShopApiKey}
                  onChange={handleApiKeyChange}
                  type={showTikTokShopKey ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowTikTokShopKey(!showTikTokShopKey)}
                          edge="end"
                        >
                          {showTikTokShopKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  href="https://developers.tiktok.com/doc/tiktok-shop-open-api-overview" 
                  target="_blank"
                  sx={{ mr: 1 }}
                >
                  Get API Key
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  href="https://developers.tiktok.com/doc/tiktok-shop-open-api-documentation" 
                  target="_blank"
                >
                  Documentation
                </Button>
              </Paper>
            </Grid>

            {/* Competitor Analysis API */}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ApiIcon color="info" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Competitor Analysis API
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Connect to analyze competitor TikTok Shop videos and gain market insights.
                </Typography>
                <TextField
                  fullWidth
                  label="Competitor Analysis API Key"
                  name="competitorAnalysisApiKey"
                  value={apiKeys.competitorAnalysisApiKey}
                  onChange={handleApiKeyChange}
                  type={showCompetitorAnalysisKey ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCompetitorAnalysisKey(!showCompetitorAnalysisKey)}
                          edge="end"
                        >
                          {showCompetitorAnalysisKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  href="https://kalodata.com/api" 
                  target="_blank"
                  sx={{ mr: 1 }}
                >
                  Get API Key
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  href="https://kalodata.com/docs" 
                  target="_blank"
                >
                  Documentation
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveApiKeys}
                >
                  Save API Keys
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* General Settings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Application Settings
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={generalSettings.darkMode}
                          onChange={handleSwitchChange}
                          name="darkMode"
                        />
                      }
                      label="Dark Mode"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={generalSettings.emailNotifications}
                          onChange={handleSwitchChange}
                          name="emailNotifications"
                        />
                      }
                      label="Email Notifications"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={generalSettings.autoSave}
                          onChange={handleSwitchChange}
                          name="autoSave"
                        />
                      }
                      label="Auto-save Projects"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Video Settings
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Default Video Quality"
                      name="defaultVideoQuality"
                      value={generalSettings.defaultVideoQuality}
                      onChange={handleGeneralSettingChange}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="sd">Standard Definition (480p)</option>
                      <option value="hd">High Definition (720p)</option>
                      <option value="fullhd">Full HD (1080p)</option>
                      <option value="4k">4K (2160p)</option>
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveGeneralSettings}
                >
                  Save Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Account Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue="Demo User"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      defaultValue="demo@tikshoppro.com"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Settings;
