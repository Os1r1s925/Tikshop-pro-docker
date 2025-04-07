import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  Divider
} from '@mui/material';
import { 
  VideoCall as VideoIcon, 
  ShoppingCart as ShopIcon, 
  TrendingUp as TrendingIcon, 
  BarChart as AnalyticsIcon 
} from '@mui/icons-material';

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { title: 'Total Videos', value: '24', icon: <VideoIcon color="primary" fontSize="large" /> },
    { title: 'TikTok Shop Products', value: '18', icon: <ShopIcon color="secondary" fontSize="large" /> },
    { title: 'Trending Content', value: '5', icon: <TrendingIcon color="success" fontSize="large" /> },
    { title: 'Conversion Rate', value: '3.2%', icon: <AnalyticsIcon color="info" fontSize="large" /> },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  {stat.title}
                </Typography>
                {stat.icon}
              </Box>
              <Typography component="p" variant="h4" sx={{ mt: 2 }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
        
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<VideoIcon />}
                  onClick={() => window.location.href = '/videos'}
                >
                  Create Video
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  startIcon={<ShopIcon />}
                  onClick={() => window.location.href = '/tiktok-shop'}
                >
                  Manage Products
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">• Created new product video "Summer Collection Showcase"</Typography>
              <Typography variant="body2">• Added 3 new products to TikTok Shop</Typography>
              <Typography variant="body2">• Updated competitor analysis for "Fashion Accessories"</Typography>
              <Typography variant="body2">• Generated voiceover for "Product Demo" video</Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Performance Overview */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Performance charts will appear here when you have more data
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
