import React, { useState, useEffect } from 'react';
import { trustchain_backend } from 'declarations/trustchain_backend';

// Material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';

import './App.css'; 

// ---------------------
// Header Component
// ---------------------
function Header({ isConnected, currentUser, userScore, onConnect, onDisconnect }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TrustChain
        </Typography>
        {isConnected ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2, textAlign: 'right' }}>
              <Typography variant="body2">{currentUser}</Typography>
              <Typography variant="caption">Reputation: {userScore}</Typography>
            </Box>
            <Button variant="outlined" color="inherit" onClick={onDisconnect}>
              Disconnect
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="secondary" onClick={onConnect}>
            Connect with Internet Identity
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

// ---------------------
// Dashboard Component
// ---------------------
function Dashboard({ reputationDetails, verifiedCredentials, isLoading }) {
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Reputation Dashboard
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Reputation Score Card */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reputation Score
                </Typography>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={reputationDetails?.overall || 0}
                      size={120}
                      thickness={5}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h4" component="div">
                        {reputationDetails?.overall || 0}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="subtitle1" color="textSecondary">
                  Growth: {reputationDetails?.growth || '0%'}
                </Typography>
                <Grid container spacing={1} mt={2}>
                  {reputationDetails &&
                    Object.entries(reputationDetails.components).map(([key, value]) => (
                      <Grid item xs={6} key={key}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Typography>
                        <Box className="progress-bar">
                          <Box className="progress" style={{ width: `${value}%` }} />
                        </Box>
                        <Typography variant="caption">{value}</Typography>
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Verified Credentials Card */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Verified Credentials
                </Typography>
                <List>
                  {verifiedCredentials.map((credential) => (
                    <ListItem key={credential.id} divider>
                      <ListItemIcon>
                        <Box className="credential-icon" />
                      </ListItemIcon>
                      <ListItemText
                        primary={credential.name}
                        secondary={`Issued by ${credential.issuer}`}
                      />
                      <Typography variant="body2" color="primary">
                        {credential.score}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

// ---------------------
// Stake Component
// ---------------------
function Stake({ stakeAmount, setStakeAmount, handleStakeReputation, isLoading }) {
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Reputation Staking
      </Typography>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="body1" gutterBottom>
          Stake your ICP to boost your reputation score and access exclusive perks such as lower
          DeFi collateral, DAO voting boosts, and SocialFi access. Reputation staking also powers
          our AI-driven, dynamic trust metrics.
        </Typography>
        <TextField
          label="Amount to Stake (ICP)"
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Staking Benefits
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Box className="check-icon" />
              </ListItemIcon>
              <ListItemText primary="Reputation amplification based on stake amount" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Box className="check-icon" />
              </ListItemIcon>
              <ListItemText primary="Access to exclusive reputation-gated opportunities" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Box className="check-icon" />
              </ListItemIcon>
              <ListItemText primary="Earn reputation yields from network participation" />
            </ListItem>
          </List>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleStakeReputation}
          disabled={stakeAmount <= 0 || isLoading}
        >
          {isLoading ? (
            <Box display="flex" alignItems="center">
              <CircularProgress size={20} color="inherit" />
              <Box ml={1}>Processing...</Box>
            </Box>
          ) : (
            'Stake Now'
          )}
        </Button>
      </Paper>
    </Box>
  );
}

// ---------------------
// Activity Component
// ---------------------
function Activity({ transactionHistory }) {
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Activity History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((tx) => (
                <TableRow key={tx.id} hover>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <Typography variant="caption" color="success.main">
                      {tx.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No transaction history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// ---------------------
// Notifications Component
// ---------------------
function Notifications({ notifications }) {
  const unreadNotifications = notifications.filter((n) => !n.read);
  if (unreadNotifications.length === 0) return null;
  return (
    <Box p={2}>
      <Alert severity="info" action={<Button color="inherit" size="small">View all</Button>}>
        {`${unreadNotifications.length} new notification${
          unreadNotifications.length > 1 ? 's' : ''
        }: ${unreadNotifications[0].message}`}
      </Alert>
    </Box>
  );
}

// ---------------------
// Custom Tabs Component
// ---------------------
function CustomTabs({ activeTab, setActiveTab }) {
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Dashboard" value="dashboard" />
        <Tab label="Stake Reputation" value="stake" />
        <Tab label="Activity" value="activity" />
      </Tabs>
    </Box>
  );
}

// ---------------------
// Main App Component
// ---------------------
function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [reputationDetails, setReputationDetails] = useState(null);
  const [verifiedCredentials, setVerifiedCredentials] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);

  // Simulate data fetch when connected
  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      setTimeout(() => {
        setReputationDetails({
          overall: 85,
          components: {
            financial: 82,
            social: 88,
            technical: 91,
            governance: 75,
          },
          growth: '+3.2%',
        });
        setVerifiedCredentials([
          { id: 1, name: 'GitHub Contributor', issuer: 'GitHub', verified: true, score: 82 },
          { id: 2, name: 'DeFi Power User', issuer: 'Sonic', verified: true, score: 78 },
          { id: 3, name: 'Early Adopter', issuer: 'ICP Ecosystem', verified: true, score: 95 },
        ]);
        setTransactionHistory([
          { id: 1, type: 'Reputation Stake', amount: '25 ICP', date: '2025-03-15', status: 'Completed' },
          { id: 2, type: 'Credential Verification', amount: '0.5 ICP', date: '2025-03-10', status: 'Completed' },
          { id: 3, type: 'Identity Attestation', amount: '1 ICP', date: '2025-03-05', status: 'Completed' },
        ]);
        setNotifications([
          { id: 1, message: 'Your reputation score increased by 2.5 points', date: '2025-03-18', read: false },
          { id: 2, message: 'New credential verification request from Sonic', date: '2025-03-17', read: false },
          { id: 3, message: "Congratulations! You're in the top 10% of trusted users", date: '2025-03-15', read: true },
        ]);
        setIsLoading(false);
      }, 1500);
    }
  }, [isConnected]);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Simulate Internet Identity connection
      setTimeout(() => {
        setIsConnected(true);
        setCurrentUser('7fc..a3b');
        setUserScore(85);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Connection error:', error);
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setCurrentUser(null);
    setUserScore(null);
    setReputationDetails(null);
    setActiveTab('dashboard');
  };

  const handleStakeReputation = () => {
    if (stakeAmount > 0) {
      setIsLoading(true);
      // Simulate staking process
      setTimeout(() => {
        setTransactionHistory((prev) => [
          { id: prev.length + 1, type: 'Reputation Stake', amount: `${stakeAmount} ICP`, date: '2025-03-19', status: 'Completed' },
          ...prev,
        ]);
        setUserScore((prev) => Math.min(100, prev + Math.floor(stakeAmount / 10)));
        setReputationDetails((prev) => ({
          ...prev,
          overall: Math.min(100, prev.overall + Math.floor(stakeAmount / 10)),
          growth: `+${((Math.floor(stakeAmount / 10) / prev.overall) * 100).toFixed(1)}%`,
        }));
        setIsLoading(false);
        setStakeAmount(0);
        setActiveTab('dashboard');
      }, 2000);
    }
  };

  return (
    <Box className="app-container">
      <Header
        isConnected={isConnected}
        currentUser={currentUser}
        userScore={userScore}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '1200px', mx: 'auto' }}>
        {!isConnected ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
              Welcome to TrustChain
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              A decentralized reputation layer built exclusively on ICP’s stack.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 3, textAlign: 'left' }}>
              <Typography variant="subtitle1" gutterBottom>
                Key Features:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Box className="check-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary="On-Chain AI Inference via Canisters"
                    secondary="Real-time, WASM-optimized scoring of on-chain behavior."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box className="check-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary="HTTPS Outcalls for Verified Off-Chain Data"
                    secondary="Directly query platforms like GitHub without centralized APIs."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box className="check-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Chain-Key Reputation Passport"
                    secondary="Portable, cross-subnet identity with chain-key cryptography."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box className="check-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reverse Gas + Internet Identity"
                    secondary="Fee-free interactions with robust Sybil resistance."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box className="check-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reputation Staking for Programmable Liquidity"
                    secondary="Stake to unlock perks and drive dynamic reputation."
                  />
                </ListItem>
              </List>
            </Paper>
            <Button variant="contained" color="primary" fullWidth onClick={handleConnect}>
              {isLoading ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <CircularProgress size={20} color="inherit" />
                  <Box ml={1}>Connecting...</Box>
                </Box>
              ) : (
                'Connect with Internet Identity'
              )}
            </Button>
          </Paper>
        ) : (
          <>
            <Notifications notifications={notifications} />
            <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'dashboard' && (
              <Dashboard
                reputationDetails={reputationDetails}
                verifiedCredentials={verifiedCredentials}
                isLoading={isLoading}
              />
            )}
            {activeTab === 'stake' && (
              <Stake
                stakeAmount={stakeAmount}
                setStakeAmount={setStakeAmount}
                handleStakeReputation={handleStakeReputation}
                isLoading={isLoading}
              />
            )}
            {activeTab === 'activity' && <Activity transactionHistory={transactionHistory} />}
          </>
        )}
      </Box>
      <Box component="footer" sx={{ p: 2, backgroundColor: 'background.paper', mt: 'auto' }}>
        <Typography variant="caption" display="block" align="center">
          Built exclusively on the Internet Computer Protocol • Akwaaba Dapps Hackathon 2025
        </Typography>
      </Box>
    </Box>
  );
}

export default App;