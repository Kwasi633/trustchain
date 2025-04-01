import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { trustchain_backend } from 'declarations/trustchain_backend';

function ReputationForm({ onUpdate }) {
  const [githubHandle, setGithubHandle] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Call the backend API with the correct function name.
      const response = await trustchain_backend.update_reputation_score(githubHandle, ethAddress);
      setResult(response);
      if (onUpdate) {
        onUpdate(response);
      }
    } catch (error) {
      console.error("Error updating reputation:", error);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Calculate Reputation Score
      </Typography>
      <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="GitHub Handle"
          value={githubHandle}
          onChange={(e) => setGithubHandle(e.target.value)}
          required
        />
        <TextField
          label="Ethereum Address"
          value={ethAddress}
          onChange={(e) => setEthAddress(e.target.value)}
          required
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={loading || !githubHandle || !ethAddress}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Calculate Reputation'}
        </Button>
      </Box>
      {result && (
        <Box mt={2}>
          {/* <Typography variant="caption">Score from backend is: {result[0]}</Typography> */}
        </Box>
      )}
    </Paper>
  );
}

export default ReputationForm; 