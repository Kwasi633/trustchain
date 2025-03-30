// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { trustchain_backend } from 'declarations/trustchain_backend';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { 
//   AppBar, Toolbar, Typography, Button, Box, Paper, Card, CardContent, 
//   CircularProgress, TextField, Grid, List, ListItem, ListItemIcon, 
//   ListItemText, Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Tabs, Tab, Alert, Snackbar, Container,
//   Divider, IconButton, Badge, Avatar, Tooltip, Skeleton, LinearProgress
// } from '@mui/material';

// // Icons
// import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import HistoryIcon from '@mui/icons-material/History';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// import CloseIcon from '@mui/icons-material/Close';
// import InfoIcon from '@mui/icons-material/Info';

// // Styles
// import './App.css';

// // Lazy load components for code splitting
// const Dashboard = lazy(() => import('./components/Dashboard'));
// const StakeComponent = lazy(() => import('./components/Stake'));
// const ActivityComponent = lazy(() => import('./components/Activity'));

// // Error boundary component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     this.setState({ error, errorInfo });
//     // Log error to monitoring service
//     console.error("UI Error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Paper sx={{ p: 3, m: 2, textAlign: 'center' }}>
//           <Typography variant="h5" color="error" gutterBottom>
//             Something went wrong
//           </Typography>
//           <Button 
//             variant="contained" 
//             onClick={() => window.location.reload()}
//           >
//             Reload Application
//           </Button>
//         </Paper>
//       );
//     }
//     return this.props.children;
//   }
// }

// // Create theme with light/dark mode support
// const createAppTheme = (prefersDarkMode) => {
//   return createTheme({
//     palette: {
//       mode: prefersDarkMode ? 'dark' : 'light',
//       primary: {
//         main: '#3f51b5',
//       },
//       secondary: {
//         main: '#f50057',
//       },
//       background: {
//         default: prefersDarkMode ? '#121212' : '#f5f5f5',
//         paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
//       },
//     },
//     shape: {
//       borderRadius: 8,
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: 'none',
//             fontWeight: 600,
//           },
//         },
//       },
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             boxShadow: prefersDarkMode 
//               ? '0px 4px 12px rgba(0, 0, 0, 0.5)' 
//               : '0px 4px 12px rgba(0, 0, 0, 0.05)',
//           },
//         },
//       },
//     },
//   });
// };

// // ---------------------
// // Header Component
// // ---------------------
// function Header({ isConnected, currentUser, userScore, onConnect, onDisconnect, notifications }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const unreadCount = notifications?.filter(n => !n.read).length || 0;

//   const handleNotificationsClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="sticky" elevation={1}>
//       <Toolbar>
//         <IconButton
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography 
//           variant="h6" 
//           component="div" 
//           sx={{ 
//             flexGrow: 1, 
//             display: 'flex', 
//             alignItems: 'center',
//             fontWeight: 700
//           }}
//         >
//           <VerifiedUserIcon sx={{ mr: 1 }} />
//           TrustChain
//         </Typography>
        
//         {isConnected ? (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Tooltip title="Notifications">
//               <IconButton 
//                 color="inherit" 
//                 onClick={handleNotificationsClick}
//                 sx={{ mr: 2 }}
//               >
//                 <Badge badgeContent={unreadCount} color="error">
//                   <NotificationsIcon />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             <Box 
//               sx={{ 
//                 mr: 2, 
//                 textAlign: 'right',
//                 display: { xs: 'none', sm: 'block' } 
//               }}
//             >
//               <Typography variant="body2">{currentUser}</Typography>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'flex-end' 
//                 }}
//               >
//                 <VerifiedUserIcon 
//                   sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} 
//                 />
//                 Reputation: {userScore}
//               </Typography>
//             </Box>
//             <Button 
//               variant="outlined" 
//               color="inherit" 
//               onClick={onDisconnect}
//               size="small"
//               startIcon={<CloseIcon />}
//             >
//               Disconnect
//             </Button>
//           </Box>
//         ) : (
//           <Button 
//             variant="contained" 
//             color="secondary" 
//             onClick={onConnect}
//             startIcon={<AccountBalanceWalletIcon />}
//           >
//             Connect Identity
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// // ---------------------
// // Notifications Component
// // ---------------------
// function Notifications({ notifications, onDismiss, onViewAll }) {
//   const unreadNotifications = notifications?.filter((n) => !n.read) || [];
  
//   if (unreadNotifications.length === 0) return null;
  
//   return (
//     <Snackbar
//       open={unreadNotifications.length > 0}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       sx={{ mt: 7 }}
//     >
//       <Alert 
//         severity="info" 
//         variant="filled"
//         action={
//           <Box>
//             <Button color="inherit" size="small" onClick={onViewAll}>
//               View all
//             </Button>
//             <IconButton
//               size="small"
//               color="inherit"
//               onClick={onDismiss}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         }
//       >
//         {`${unreadNotifications.length} new notification${
//           unreadNotifications.length > 1 ? 's' : ''
//         }: ${unreadNotifications[0]?.message}`}
//       </Alert>
//     </Snackbar>
//   );
// }

// // ---------------------
// // Custom Tabs Component
// // ---------------------
// function CustomTabs({ activeTab, setActiveTab }) {
//   const handleChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 0, sm: 2 } }}>
//       <Tabs
//         value={activeTab}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//         variant="fullWidth"
//         aria-label="application tabs"
//       >
//         <Tab 
//           icon={<DashboardIcon />} 
//           iconPosition="start" 
//           label="Dashboard" 
//           value="dashboard" 
//           aria-label="dashboard tab"
//         />
//         <Tab 
//           icon={<LocalAtmIcon />} 
//           iconPosition="start" 
//           label="Stake" 
//           value="stake" 
//           aria-label="stake tab"
//         />
//         <Tab 
//           icon={<HistoryIcon />} 
//           iconPosition="start" 
//           label="Activity" 
//           value="activity"
//           aria-label="activity tab" 
//         />
//       </Tabs>
//     </Box>
//   );
// }

// // ---------------------
// // Loading Component
// // ---------------------
// function LoadingFallback() {
//   return (
//     <Box sx={{ width: '100%', mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <CircularProgress />
//       <Typography variant="body2" sx={{ mt: 2 }}>
//         Loading...
//       </Typography>
//     </Box>
//   );
// }

// // ---------------------
// // Welcome Component
// // ---------------------
// function Welcome({ isLoading, handleConnect }) {
//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mt: 4 }}>
//         <Typography variant="h4" gutterBottom fontWeight="bold">
//           Welcome to TrustChain
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom color="text.secondary">
//           Unifying trust across the Web3 ecosystem
//         </Typography>
        
//         <Divider sx={{ my: 3 }} />
        
//         <Paper variant="outlined" sx={{ p: 2, mb: 3, textAlign: 'left' }}>
//           <List dense>
//             <ListItem>
//               <ListItemIcon>
//                 <CheckCircleIcon color="success" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="On-Chain AI Inference via Canisters"
//                 secondary="Real-time integration of on-chain transactions and off-chain contributions."
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <CheckCircleIcon color="success" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="HTTPS Outcalls for Verified Off-Chain Data"
//                 secondary="WASM-optimized HTTPS outcalls powering real-time data from GitHub and Etherscan."
//               />
//             </ListItem>
            
//             <ListItem>
//               <ListItemIcon>
//                 <CheckCircleIcon color="success" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Reputation Calculation"
//                 secondary="Canister-based reputation scoring combining GitHub commits and DeFi transactions."
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <CheckCircleIcon color="success" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Reverse Gas + Internet Identity"
//                 secondary="Fee-free interactions with robust Sybil resistance"
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <CheckCircleIcon color="success" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Seamless dApp Integration"
//                 secondary="Easily integrate TrustChain API into other dApps."
//               />
//             </ListItem>
//           </List>
//         </Paper>
        
//         <Button 
//           variant="contained" 
//           color="primary" 
//           size="large"
//           fullWidth 
//           onClick={handleConnect}
//           disabled={isLoading}
//           sx={{ py: 1.5 }}
//         >
//           {isLoading ? (
//             <Box display="flex" alignItems="center" justifyContent="center">
//               <CircularProgress size={20} color="inherit" />
//               <Box ml={1}>Connecting...</Box>
//             </Box>
//           ) : (
//             'Connect with Internet Identity'
//           )}
//         </Button>
//       </Paper>
//     </Container>
//   );
// }

// // ---------------------
// // Main App Component
// // ---------------------
// function App() {
//   // State management
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userScore, setUserScore] = useState(null);
//   const [reputationDetails, setReputationDetails] = useState(null);
//   const [verifiedCredentials, setVerifiedCredentials] = useState([]);
//   const [transactionHistory, setTransactionHistory] = useState([]);
//   const [stakeAmount, setStakeAmount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(true);
  
//   // Theme preferences
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//   const theme = React.useMemo(
//     () => createAppTheme(prefersDarkMode),
//     [prefersDarkMode]
//   );

//   // Error handling effect
//   useEffect(() => {
//     if (error) {
//       // Log to monitoring service
//       console.error("Application error:", error);
      
//       // Auto-dismiss after 5 seconds
//       const timer = setTimeout(() => {
//         setError(null);
//       }, 5000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   // Simulate data fetch when connected
//   useEffect(() => {
//     let isMounted = true;
    
//     if (isConnected) {
//       setIsLoading(true);
      
//       // In production code, replace with actual backend calls
//       const fetchData = async () => {
//         try {
//           // Simulate API call to the backend canister
//           // In production: await trustchain_backend.getUserData(principal);
//           setTimeout(() => {
//             if (!isMounted) return;
            
//             setReputationDetails({
//               overall: 85,
//               components: {
//                 financial: 82,
//                 social: 88,
//                 technical: 91,
//                 governance: 75,
//               },
//               growth: '+3.2%',
//             });
            
//             setVerifiedCredentials([
//               { id: 1, name: 'GitHub Contributor', issuer: 'GitHub', verified: true, score: 82 },
//               { id: 2, name: 'DeFi Power User', issuer: 'Sonic', verified: true, score: 78 },
//               { id: 3, name: 'Early Adopter', issuer: 'ICP Ecosystem', verified: true, score: 95 },
//             ]);
            
//             setTransactionHistory([
//               { id: 1, type: 'Reputation Stake', amount: '25 ICP', date: '2025-03-15', status: 'Completed' },
//               { id: 2, type: 'Credential Verification', amount: '0.5 ICP', date: '2025-03-10', status: 'Completed' },
//               { id: 3, type: 'Identity Attestation', amount: '1 ICP', date: '2025-03-05', status: 'Completed' },
//             ]);
            
//             setNotifications([
//               { id: 1, message: 'Your reputation score increased by 2.5 points', date: '2025-03-18', read: false },
//               { id: 2, message: 'New credential verification request from Sonic', date: '2025-03-17', read: false },
//               { id: 3, message: "Congratulations! You're in the top 10% of trusted users", date: '2025-03-15', read: true },
//             ]);
            
//             setIsLoading(false);
//           }, 1500);
//         } catch (err) {
//           if (!isMounted) return;
//           setError("Failed to load user data. Please try again.");
//           setIsLoading(false);
//         }
//       };
      
//       fetchData();
//     }
    
//     return () => {
//       isMounted = false;
//     };
//   }, [isConnected]);

//   const handleConnect = async () => {
//     setIsLoading(true);
//     try {
//       // In production: integrate with actual Internet Identity
//       // const identity = await window.ic.plug.requestConnect();
//       // const principal = await window.ic.plug.agent.getPrincipal();
      
//       // Simulate Internet Identity connection
//       setTimeout(() => {
//         setIsConnected(true);
//         setCurrentUser('7fc..a3b');
//         setUserScore(85);
//         setIsLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Connection error:', error);
//       setError("Failed to connect. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   const handleDisconnect = () => {
//     // In production: await window.ic.plug.disconnect();
//     setIsConnected(false);
//     setCurrentUser(null);
//     setUserScore(null);
//     setReputationDetails(null);
//     setActiveTab('dashboard');
//   };

//   const handleStakeReputation = async () => {
//     if (stakeAmount > 0) {
//       setIsLoading(true);
//       try {
//         // In production: await trustchain_backend.stakeReputation(stakeAmount);
        
//         // Simulate staking process
//         setTimeout(() => {
//           setTransactionHistory((prev) => [
//             { 
//               id: Date.now(), 
//               type: 'Reputation Stake', 
//               amount: `${stakeAmount} ICP`, 
//               date: new Date().toISOString().split('T')[0], 
//               status: 'Completed' 
//             },
//             ...prev,
//           ]);
          
//           const scoreIncrease = Math.floor(stakeAmount / 10);
          
//           setUserScore((prev) => Math.min(100, prev + scoreIncrease));
//           setReputationDetails((prev) => ({
//             ...prev,
//             overall: Math.min(100, prev.overall + scoreIncrease),
//             growth: `+${((scoreIncrease / prev.overall) * 100).toFixed(1)}%`,
//           }));
          
//           setIsLoading(false);
//           setStakeAmount(0);
//           setActiveTab('dashboard');
//         }, 2000);
//       } catch (error) {
//         console.error('Staking error:', error);
//         setError("Failed to stake reputation. Please try again.");
//         setIsLoading(false);
//       }
//     }
//   };

//   const dismissNotifications = () => {
//     setShowNotifications(false);
//     // Mark as read in production: await trustchain_backend.markNotificationsAsRead();
//     setNotifications(prev => 
//       prev.map(notification => ({...notification, read: true}))
//     );
//   };

//   const viewAllNotifications = () => {
//     // Navigate to notifications page or open modal
//     dismissNotifications();
//     // For now, just alert
//     alert("View all notifications (would show a modal in production)");
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <ErrorBoundary>
//         <Box 
//           className="app-container"
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             minHeight: '100vh',
//             bgcolor: 'background.default'
//           }}
//         >
//           <Header
//             isConnected={isConnected}
//             currentUser={currentUser}
//             userScore={userScore}
//             onConnect={handleConnect}
//             onDisconnect={handleDisconnect}
//             notifications={notifications}
//           />
          
//           {error && (
//             <Alert 
//               severity="error" 
//               sx={{ m: 2 }}
//               action={
//                 <IconButton
//                   aria-label="close"
//                   color="inherit"
//                   size="small"
//                   onClick={() => setError(null)}
//                 >
//                   <CloseIcon fontSize="inherit" />
//                 </IconButton>
//               }
//             >
//               {error}
//             </Alert>
//           )}
          
//           {isLoading && <LinearProgress />}
          
//           {showNotifications && (
//             <Notifications 
//               notifications={notifications} 
//               onDismiss={dismissNotifications}
//               onViewAll={viewAllNotifications}
//             />
//           )}
          
//           <Box 
//             component="main" 
//             sx={{ 
//               flexGrow: 1, 
//               p: { xs: 1, sm: 2, md: 3 }, 
//               width: '100%', 
//               maxWidth: '1200px', 
//               mx: 'auto' 
//             }}
//           >
//             {!isConnected ? (
//               <Welcome isLoading={isLoading} handleConnect={handleConnect} />
//             ) : (
//               <>
//                 <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//                 <Suspense fallback={<LoadingFallback />}>
//                   {activeTab === 'dashboard' && (
//                     <Dashboard
//                       reputationDetails={reputationDetails}
//                       verifiedCredentials={verifiedCredentials}
//                       isLoading={isLoading}
//                     />
//                   )}
//                   {activeTab === 'stake' && (
//                     <StakeComponent
//                       stakeAmount={stakeAmount}
//                       setStakeAmount={setStakeAmount}
//                       handleStakeReputation={handleStakeReputation}
//                       isLoading={isLoading}
//                     />
//                   )}
//                   {activeTab === 'activity' && (
//                     <ActivityComponent 
//                       transactionHistory={transactionHistory} 
//                     />
//                   )}
//                 </Suspense>
//               </>
//             )}
//           </Box>
          
//           <Box 
//             component="footer" 
//             sx={{ 
//               p: 2, 
//               backgroundColor: 'background.paper', 
//               mt: 'auto',
//               borderTop: 1,
//               borderColor: 'divider'
//             }}
//           >
//             <Typography variant="caption" display="block" align="center">
//               © GeekTeam • {new Date().getFullYear()} | TrustChain v1.0.0
//             </Typography>
//           </Box>
//         </Box>
//       </ErrorBoundary>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { trustchain_backend } from 'declarations/trustchain_backend';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { 
  AppBar, Toolbar, Typography, Button, Box, Paper, Card, CardContent, 
  CircularProgress, TextField, Grid, List, ListItem, ListItemIcon, 
  ListItemText, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Tabs, Tab, Alert, Snackbar, Container,
  Divider, IconButton, Badge, Avatar, Tooltip, Skeleton, LinearProgress
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

// Styles
import './App.css';

// Lazy load components for code splitting
const Dashboard = lazy(() => import('./components/Dashboard'));
const StakeComponent = lazy(() => import('./components/Stake'));
const ActivityComponent = lazy(() => import('./components/Activity'));

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("UI Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Paper sx={{ p: 3, m: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload Application
          </Button>
        </Paper>
      );
    }
    return this.props.children;
  }
}

// Create theme with light/dark mode support
const createAppTheme = (prefersDarkMode) => {
  return createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: prefersDarkMode ? '#121212' : '#f5f5f5',
        paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: prefersDarkMode 
              ? '0px 4px 12px rgba(0, 0, 0, 0.5)' 
              : '0px 4px 12px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  });
};

// ---------------------
// Header Component
// ---------------------
function Header({ isConnected, currentUser, userScore, onConnect, onDisconnect, notifications }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', fontWeight: 700 }}>
          <VerifiedUserIcon sx={{ mr: 1 }} />
          TrustChain AI
        </Typography>
        {isConnected ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationsClick} sx={{ mr: 2 }}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Box sx={{ mr: 2, textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2">{currentUser}</Typography>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <VerifiedUserIcon sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                Reputation: {userScore}
              </Typography>
            </Box>
            <Button variant="outlined" color="inherit" onClick={onDisconnect} size="small" startIcon={<CloseIcon />}>
              Disconnect
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="secondary" onClick={onConnect} startIcon={<AccountBalanceWalletIcon />}>
            Connect Identity
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

// ---------------------
// Notifications Component
// ---------------------
function Notifications({ notifications, onDismiss, onViewAll }) {
  const unreadNotifications = notifications?.filter(n => !n.read) || [];
  if (unreadNotifications.length === 0) return null;
  return (
    <Snackbar open={unreadNotifications.length > 0} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ mt: 7 }}>
      <Alert 
        severity="info" 
        variant="filled"
        action={
          <Box>
            <Button color="inherit" size="small" onClick={onViewAll}>View all</Button>
            <IconButton size="small" color="inherit" onClick={onDismiss}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        {`${unreadNotifications.length} new notification${unreadNotifications.length > 1 ? 's' : ''}: ${unreadNotifications[0]?.message}`}
      </Alert>
    </Snackbar>
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
    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 0, sm: 2 } }}>
      <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="application tabs">
        <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" value="dashboard" aria-label="dashboard tab" />
        <Tab icon={<LocalAtmIcon />} iconPosition="start" label="Stake" value="stake" aria-label="stake tab" />
        <Tab icon={<HistoryIcon />} iconPosition="start" label="Activity" value="activity" aria-label="activity tab" />
      </Tabs>
    </Box>
  );
}

// ---------------------
// Loading Component
// ---------------------
function LoadingFallback() {
  return (
    <Box sx={{ width: '100%', mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
}

// ---------------------
// Welcome Component
// ---------------------
function Welcome({ isLoading, handleConnect }) {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome to TrustChain AI
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Unifying on‑chain and off‑chain trust via a Rust-powered ML model.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Paper variant="outlined" sx={{ p: 2, mb: 3, textAlign: 'left' }}>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="On-Chain AI inference via canisters"
                secondary="Real-time integration of on-chain and off-chain data."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Real-time HTTPS outcalls"
                secondary="Fetches verified off-chain GitHub and DeFi data."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Reputation calculation"
                secondary="Canister-based scoring using GitHub contributions and DeFi transactions."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Seamless dApp integration"
                secondary="Easily integrate TrustChain API into any dApp."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Reverse gas + Internet Identity"
                secondary="Fee-free interactions with robust sybil resistance."
              />
            </ListItem>
          </List>
        </Paper>
        <Button variant="contained" color="primary" size="large" fullWidth onClick={handleConnect} disabled={isLoading} sx={{ py: 1.5 }}>
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
    </Container>
  );
}

// ---------------------
// Main App Component
// ---------------------
function App() {
  // State management
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
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(true);
  
  // Theme preferences
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => createAppTheme(prefersDarkMode), [prefersDarkMode]);

  // Error handling effect
  useEffect(() => {
    if (error) {
      console.error("Application error:", error);
      const timer = setTimeout(() => { setError(null); }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Simulate data fetch when connected
  useEffect(() => {
    let isMounted = true;
    if (isConnected) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          // In production, replace with a call to update_reputation_score(github_handle, eth_address)
          setTimeout(() => {
            if (!isMounted) return;
            setReputationDetails({
              overall: 85,
              components: { financial: 82, social: 88, technical: 91, governance: 75 },
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
        } catch (err) {
          if (!isMounted) return;
          setError("Failed to load user data. Please try again.");
          setIsLoading(false);
        }
      };
      fetchData();
    }
    return () => { isMounted = false; };
  }, [isConnected]);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // In production: integrate with actual Internet Identity & then call update_reputation_score API.
      setTimeout(() => {
        setIsConnected(true);
        setCurrentUser('7fc..a3b');
        setUserScore(85);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Connection error:', error);
      setError("Failed to connect. Please try again.");
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

  const handleStakeReputation = async () => {
    if (stakeAmount > 0) {
      setIsLoading(true);
      try {
        // In production: call trustchain_backend.stakeReputation(stakeAmount) to boost reputation score.
        setTimeout(() => {
          setTransactionHistory(prev => ([
            { 
              id: Date.now(), 
              type: 'Reputation Stake', 
              amount: `${stakeAmount} ICP`, 
              date: new Date().toISOString().split('T')[0], 
              status: 'Completed' 
            },
            ...prev,
          ]));
          const scoreIncrease = Math.floor(stakeAmount / 10);
          setUserScore(prev => Math.min(100, prev + scoreIncrease));
          setReputationDetails(prev => ({
            ...prev,
            overall: Math.min(100, prev.overall + scoreIncrease),
            growth: `+${((scoreIncrease / prev.overall) * 100).toFixed(1)}%`,
          }));
          setIsLoading(false);
          setStakeAmount(0);
          setActiveTab('dashboard');
        }, 2000);
      } catch (error) {
        console.error('Staking error:', error);
        setError("Failed to stake reputation. Please try again.");
        setIsLoading(false);
      }
    }
  };

  const dismissNotifications = () => {
    setShowNotifications(false);
    setNotifications(prev => prev.map(notification => ({...notification, read: true})));
  };

  const viewAllNotifications = () => {
    dismissNotifications();
    alert("View all notifications (would show a modal in production)");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Box className="app-container" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header
            isConnected={isConnected}
            currentUser={currentUser}
            userScore={userScore}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            notifications={notifications}
          />
          {error && (
            <Alert severity="error" sx={{ m: 2 }}
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => setError(null)}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          )}
          {isLoading && <LinearProgress />}
          {showNotifications && (
            <Notifications notifications={notifications} onDismiss={dismissNotifications} onViewAll={viewAllNotifications} />
          )}
          <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, width: '100%', maxWidth: '1200px', mx: 'auto' }}>
            {!isConnected ? (
              <Welcome isLoading={isLoading} handleConnect={handleConnect} />
            ) : (
              <>
                <CustomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <Suspense fallback={<LoadingFallback />}>
                  {activeTab === 'dashboard' && (
                    <Dashboard
                      reputationDetails={reputationDetails}
                      verifiedCredentials={verifiedCredentials}
                      isLoading={isLoading}
                    />
                  )}
                  {activeTab === 'stake' && (
                    <StakeComponent
                      stakeAmount={stakeAmount}
                      setStakeAmount={setStakeAmount}
                      handleStakeReputation={handleStakeReputation}
                      isLoading={isLoading}
                    />
                  )}
                  {activeTab === 'activity' && (
                    <ActivityComponent transactionHistory={transactionHistory} />
                  )}
                </Suspense>
              </>
            )}
          </Box>
          <Box component="footer" sx={{ p: 2, backgroundColor: 'background.paper', mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" display="block" align="center">
              © TrustChain • {new Date().getFullYear()} | v1.0.0
            </Typography>
          </Box>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
