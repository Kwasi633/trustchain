import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function Dashboard() {
  const [trustScore, setTrustScore] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching the trust score
    setTimeout(() => {
      setTrustScore(82);
    }, 2000);
  }, []);

  return (
    <Box
      textAlign="center"
      p={4}
      minHeight="100vh"
      sx={{ bgcolor: 'grey.900', color: 'white' }}
    >
      <Typography variant="h4" gutterBottom>
        Your TrustChain Score
      </Typography>
      {trustScore !== null ? (
        <Typography variant="h1">{trustScore}/100</Typography>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </Box>
  );
}
