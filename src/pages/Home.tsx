import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="grey.900"
      color="white"
    >
      <Typography variant="h2" component="h1" gutterBottom>
        TrustChain: Decentralized Reputation for Web3
      </Typography>
      <Typography variant="h6" gutterBottom>
        Verify, trust & build on-chain credibility with AI-powered scoring.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/login"
      >
        Get Started
      </Button>
    </Box>
  );
}
