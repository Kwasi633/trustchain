import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const authClient = await AuthClient.create();
    authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <Box
      textAlign="center"
      p={4}
      minHeight="100vh"
      sx={{ bgcolor: 'grey.900', color: 'white' }}
    >
      <Typography variant="h4" gutterBottom>
        Sign in to TrustChain
      </Typography>
      <Button
        onClick={handleLogin}
        variant="contained"
        color="success"
        size="large"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login with Internet Identity"}
      </Button>
    </Box>
  );
}
