import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  VideoLibrary as VideoIcon,
  Subscriptions as SubscriptionIcon,
  TrendingUp as TrendingUpIcon,
  MonetizationOn as MonetizationOnIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalViews: 0,
    totalSales: 0,
    recentVideos: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        
        // Simulated data for now
        const data = {
          totalVideos: 12,
          totalViews: 5280,
          totalSales: 1250,
          recentVideos: [
            { id: 1, title: 'Summer Fashion Collection', views: 1200, date: '2025-03-28' },
            { id: 2, title: 'Tech Gadgets Review', views: 980, date: '2025-03-25' },
            { id: 3, title: 'Home Decor Ideas', views: 750, date: '2025-03-22' },
            { id: 4, title: 'Fitness Equipment Showcase', views: 620, date: '2025-03-20' }
          ]
        };
        
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VideoIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Videos</Typography>
              </Box>
              <Typography variant="h4">{stats.totalVideos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Views</Typography>
              </Box>
              <Typography variant="h4">{stats.totalViews}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonetizationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Sales</Typography>
              </Box>
              <Typography variant="h4">${stats.totalSales}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SubscriptionIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Subscription</Typography>
              </Box>
              <Typography variant="h4">Active</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Videos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Videos
            </Typography>
            <List>
              {stats.recentVideos.map((video, index) => (
                <React.Fragment key={video.id}>
                  <ListItem>
                    <ListItemText 
                      primary={video.title} 
                      secondary={`Views: ${video.views} | Date: ${video.date}`} 
                    />
                  </ListItem>
                  {index < stats.recentVideos.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              TikShop Pro Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Video Creation" 
                  secondary="Create engaging videos with AI-powered tools" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="TikTok Shop Integration" 
                  secondary="Seamlessly connect your videos with product listings" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Transcript & Script Rewriting" 
                  secondary="Optimize your content with AI-generated scripts" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Competitor Analysis" 
                  secondary="Gain insights from top-performing content in your niche" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
