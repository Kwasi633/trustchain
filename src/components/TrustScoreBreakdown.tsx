import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample breakdown data for various metrics
const data = [
  { metric: 'Governance', score: 80 },
  { metric: 'DeFi', score: 75 },
  { metric: 'NFTs', score: 90 },
  { metric: 'Gaming', score: 65 },
  { metric: 'SocialFi', score: 85 },
];

const TrustScoreBreakdown = () => {
  return (
    <Box sx={{ width: '100%', height: 300, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Trust Score Breakdown
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="metric" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
          />
          <Bar dataKey="score" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TrustScoreBreakdown;
