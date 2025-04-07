import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  CreditCard as CreditCardIcon,
  History as HistoryIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

const SubscriptionManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('basic');

  const handleOpenDialog = (plan) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$19.99',
      period: 'month',
      features: [
        'Up to 10 videos per month',
        'Basic video templates',
        'Standard quality exports',
        'Email support'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$49.99',
      period: 'month',
      features: [
        'Up to 50 videos per month',
        'All video templates',
        'HD quality exports',
        'TikTok Shop integration',
        'Priority email support',
        'Basic analytics'
      ],
      recommended: true
    },
    {
      id: 'business',
      name: 'Business',
      price: '$99.99',
      period: 'month',
      features: [
        'Unlimited videos',
        'All video templates',
        '4K quality exports',
        'TikTok Shop integration',
        'Advanced analytics',
        'Competitor analysis',
        'Phone support',
        'Custom branding'
      ],
      recommended: false
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Subscription
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Current Plan
          </Typography>
          <Chip 
            label="Active" 
            color="success" 
            size="small" 
            variant="outlined" 
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {plans.find(plan => plan.id === currentPlan)?.name} Plan
            </Typography>
            <Typography variant="body1" gutterBottom>
              {plans.find(plan => plan.id === currentPlan)?.price} / {plans.find(plan => plan.id === currentPlan)?.period}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Next billing date: May 7, 2025
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<CreditCardIcon />}
                sx={{ mr: 1 }}
              >
                Update Payment Method
              </Button>
              <Button 
                variant="outlined" 
                color="error"
              >
                Cancel Subscription
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="outlined" 
                startIcon={<HistoryIcon />}
                fullWidth
              >
                Billing History
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<ReceiptIcon />}
                fullWidth
              >
                Download Invoices
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Available Plans
      </Typography>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card 
              elevation={plan.recommended ? 3 : 1}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                border: plan.recommended ? '2px solid #1976d2' : 'none'
              }}
            >
              {plan.recommended && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 0,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4
                  }}
                >
                  Recommended
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {plan.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h4" component="div">
                    {plan.price}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                    / {plan.period}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant={plan.id === currentPlan ? "outlined" : "contained"} 
                  fullWidth
                  disabled={plan.id === currentPlan}
                  onClick={() => handleOpenDialog(plan.id)}
                >
                  {plan.id === currentPlan ? "Current Plan" : "Upgrade"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Subscription Change"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change your subscription plan? Your new plan will be effective immediately and you will be charged the difference for the current billing period.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} autoFocus variant="contained">
            Confirm Change
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManager;
