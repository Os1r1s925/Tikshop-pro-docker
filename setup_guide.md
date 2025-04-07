# TikShop Pro Setup Guide

## Overview

TikShop Pro is an enhanced Blaze.ai clone with TikTok Shop integration and additional features. This guide will help you set up and use the application, with special focus on the Settings page for API key integration.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Os1r1s925/Tikshop-pro-docker.git
   ```

2. Navigate to the project directory:
   ```
   cd Tikshop-pro-docker
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create required directories for uploads:
   ```
   mkdir -p uploads/videos uploads/images uploads/thumbnails uploads/voiceovers
   ```

5. Start the application:
   ```
   npm run dev
   ```

## Accessing the Settings Page

The Settings page is where you can input your API keys for various integrations. To access it:

1. Log in to the application (use demo credentials if in demo mode)
2. Click on the "Settings" option in the left navigation menu
3. Navigate to the "API Integrations" tab

## Available API Integrations

### Eleven Labs API
- Used for high-quality AI voiceovers in your videos
- Input your API key in the designated field
- Toggle visibility with the eye icon
- Click "Get API Key" to obtain a key if you don't have one
- Documentation is available via the "Documentation" button

### TikTok Shop API
- Used to manage products and create shoppable videos
- Input your API key in the designated field
- Toggle visibility with the eye icon
- Click "Get API Key" to obtain a key if you don't have one
- Documentation is available via the "Documentation" button

### Competitor Analysis API
- Used to analyze competitor TikTok Shop videos and gain market insights
- Input your API key in the designated field
- Toggle visibility with the eye icon
- Click "Get API Key" to obtain a key if you don't have one
- Documentation is available via the "Documentation" button

## Saving API Keys

After entering your API keys, click the "Save API Keys" button at the bottom of the page to store your settings.

## Navigation Menu

The application includes a comprehensive navigation menu with the following options:

- Dashboard: Overview of your content performance
- Videos: Create and manage your TikTok videos
- TikTok Shop: Manage your TikTok Shop products
- Subscription: Manage your subscription plan
- Settings: Configure API keys and application settings

## Troubleshooting

If you encounter issues with the application:

1. Ensure all dependencies are installed correctly
2. Check that the required directories exist
3. Verify your API keys are entered correctly
4. Check the browser console for any JavaScript errors
5. Ensure the server is running without errors

## Support

For additional support, please contact support@tikshoppro.com or visit our documentation website.
