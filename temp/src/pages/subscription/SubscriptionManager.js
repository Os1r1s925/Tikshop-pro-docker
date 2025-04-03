import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

const SubscriptionManager = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState({ show: false, message: '' });
  
  useEffect(() => {
    // Simulate fetching subscription data
    const fetchSubscriptionData = async () => {
      try {
        // This would be replaced with actual API calls
        // const subscriptionResponse = await fetch('/api/subscription');
        // const paymentResponse = await fetch('/api/payment-history');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock subscription data
        const mockSubscription = {
          plan: 'Pro',
          status: 'active',
          nextBillingDate: '2025-04-30',
          price: 19.99,
          features: [
            'Unlimited video creation',
            'TikTok Shop integration',
            'AI script generation',
            'Eleven Labs voice integration',
            'Competitor analysis',
            'Priority support'
          ]
        };
        
        // Mock payment history
        const mockPaymentHistory = [
          { id: 'pay_123', date: '2025-03-01', amount: 19.99, status: 'completed' },
          { id: 'pay_122', date: '2025-02-01', amount: 19.99, status: 'completed' },
          { id: 'pay_121', date: '2025-01-01', amount: 19.99, status: 'completed' }
        ];
        
        setSubscription(mockSubscription);
        setPaymentHistory(mockPaymentHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const handleUpgradeClick = () => {
    setUpgradeDialogOpen(true);
  };

  const handleUpgradeConfirm = async () => {
    try {
      setLoading(true);
      
      // This would be replaced with an actual API call
      // await fetch('/api/subscription/upgrade', { method: 'POST' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setSubscription({
        ...subscription,
        plan: 'Premium',
        price: 39.99,
        features: [
          ...subscription.features,
          'Advanced analytics',
          'White-label videos',
          'Custom branding'
        ]
      });
      
      setActionSuccess({
        show: true,
        message: 'Successfully upgraded to Premium plan!'
      });
      
      setUpgradeDialogOpen(false);
      setLoading(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setActionSuccess({ show: false, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      setLoading(false);
    }
  };

  const handleUpgradeCancel = () => {
    setUpgradeDialogOpen(false);
  };

  const handleCancelClick = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      setLoading(true);
      
      // This would be replaced with an actual API call
      // await fetch('/api/subscription/cancel', { method: 'POST' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setSubscription({
        ...subscription,
        status: 'cancelled',
      });
      
      setActionSuccess({
        show: true,
        message: 'Subscription cancelled. Your access will continue until the end of the billing period.'
      });
      
      setCancelDialogOpen(false);
      setLoading(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setActionSuccess({ show: false, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setLoading(false);
    }
  };

  const handleCancelCancel = () => {
    setCancelDialogOpen(false);
  };

  if (loading && !subscription) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Subscription Management
      </Typography>
      
      {actionSuccess.show && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {actionSuccess.message}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Current Plan */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Current Plan
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                {subscription.plan}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  bgcolor: subscription.status === 'active' ? 'success.main' : 'error.main',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                {subscription.status === 'active' ? 'ACTIVE' : 'CANCELLED'}
              </Typography>
            </Box>
            
            <Typography variant="body1" gutterBottom>
              ${subscription.price}/month
            </Typography>
            
            {subscription.status === 'active' && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Next billing date: {subscription.nextBillingDate}
              </Typography>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Features:
            </Typography>
            <List dense>
              {subscription.features.map((feature, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              {subscription.status === 'active' && subscription.plan !== 'Premium' && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleUpgradeClick}
                  disabled={loading}
                >
                  Upgrade Plan
                </Button>
              )}
              
              {subscription.status === 'active' && (
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleCancelClick}
                  disabled={loading}
                >
                  Cancel Subscription
                </Button>
              )}
              
              {subscription.status !== 'active' && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleUpgradeClick}
                  disabled={loading}
                >
                  Reactivate Subscription
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Payment History */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Payment History
            </Typography>
            
            {paymentHistory.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                No payment history available
              </Typography>
            ) : (
              <List>
                {paymentHistory.map((payment, index) => (
                  <React.Fragment key={payment.id}>
                    <ListItem>
                      <ListItemIcon>
                        <ReceiptIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`$${payment.amount} - ${payment.date}`}
                        secondary={`Status: ${payment.status} | ID: ${payment.id}`}
                      />
                    </ListItem>
                    {index < paymentHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        {/* Available Plans */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Available Plans
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Basic
                  </Typography>
                  <Typography variant="h4" color="text.primary" sx={{ mt: 2 }}>
                    $9.99
                    <Typography variant="caption" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="5 videos per month" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Basic TikTok Shop integration" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Standard support" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    fullWidth
                    variant={subscription.plan === 'Basic' ? 'contained' : 'outlined'}
                    disabled={subscription.plan === 'Basic'}
                  >
                    {subscription.plan === 'Basic' ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ border: subscription.plan === 'Pro' ? '2px solid #1976d2' : 'none' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div">
                      Pro
                    </Typography>
                    {subscription.plan === 'Pro' && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1
                        }}
                      >
                        CURRENT
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="h4" color="text.primary" sx={{ mt: 2 }}>
                    $19.99
                    <Typography variant="caption" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Unlimited video creation" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Full TikTok Shop integration" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="AI script generation" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Eleven Labs voice integration" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Priority support" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    fullWidth
                    variant={subscription.plan === 'Pro' ? 'contained' : 'outlined'}
                    disabled={subscription.plan === 'Pro'}
                  >
                    {subscription.plan === 'Pro' ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Premium
                  </Typography>
                  <Typography variant="h4" color="text.primary" sx={{ mt: 2 }}>
                    $39.99
                    <Typography variant="caption" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Everything in Pro plan" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Advanced analytics" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="White-label videos" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Custom branding" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="24/7 premium support" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    fullWidth
                    variant={subscription.plan === 'Premium' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={handleUpgradeClick}
                    disabled={subscription.plan === 'Premium'}
                  >
                    {subscription.plan === 'Premium' ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      {/* Upgrade Dialog */}
      <Dialog
        open={upgradeDialogOpen}
        onClose={handleUpgradeCancel}
      >
        <DialogTitle>Upgrade to Premium Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to upgrade to our Premium plan at $39.99/month. This will give you access to all Premium features immediately.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Additional Premium features:
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Advanced analytics" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="White-label videos" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Custom branding" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="24/7 premium support" />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpgradeCancel}>Cancel</Button>
          <Button onClick={handleUpgradeConfirm} variant="contained">
            Upgrade Now
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Cancel Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCancelCancel}
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your subscription? You will still have access to your current plan until the end of the billing period ({subscription?.nextBillingDate}).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCancel}>Keep Subscription</Button>
          <Button onClick={handleCancelConfirm} color="error">
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManager;
