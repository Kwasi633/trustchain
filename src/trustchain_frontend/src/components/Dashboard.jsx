// import React from 'react';
// import { 
//   Box, Typography, Card, CardContent, Grid, 
//   CircularProgress, List, ListItem, ListItemIcon,
//   ListItemText, Divider, Skeleton, Paper, Chip,
//   LinearProgress, Tooltip, IconButton
// } from '@mui/material';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import InfoIcon from '@mui/icons-material/Info';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// // Dashboard loading skeleton
// const DashboardSkeleton = () => (
//   <Box p={2}>
//     <Skeleton variant="text" width="30%" height={40} />
//     <Grid container spacing={3} sx={{ mt: 1 }}>
//       <Grid item xs={12} md={6}>
//         <Skeleton variant="rounded" height={350} />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Skeleton variant="rounded" height={350} />
//       </Grid>
//     </Grid>
//   </Box>
// );

// // Reputation Score Card
// const ReputationScoreCard = ({ reputationDetails }) => {
//   if (!reputationDetails) return null;
  
//   const { overall, components, growth } = reputationDetails;
//   const isPositiveGrowth = growth && growth.startsWith('+');
  
//   return (
//     <Card variant="outlined" sx={{ height: '100%' }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" gutterBottom fontWeight="bold">
//             Reputation Score
//           </Typography>
//           <Tooltip title="Your overall reputation score based on on-chain and off-chain activities">
//             <IconButton size="small">
//               <InfoIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Box>
        
//         <Box display="flex" justifyContent="center" mb={3}>
//           <Box position="relative" display="inline-flex">
//             <CircularProgress
//               variant="determinate"
//               value={overall || 0}
//               size={120}
//               thickness={5}
//               sx={{ color: overall > 75 ? 'success.main' : (overall > 50 ? 'warning.main' : 'error.main') }}
//             />
//             <Box
//               sx={{
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 right: 0,
//                 position: 'absolute',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <Typography variant="h4" component="div" fontWeight="bold">
//                 {overall || 0}
//               </Typography>
//               <Chip 
//                 icon={isPositiveGrowth ? <TrendingUpIcon /> : <TrendingDownIcon />}
//                 label={growth || '0%'} 
//                 color={isPositiveGrowth ? "success" : "error"}
//                 size="small"
//                 variant="outlined"
//               />
//             </Box>
//           </Box>
//         </Box>
        
//         <Typography variant="subtitle2" gutterBottom fontWeight="medium">
//           Reputation Components
//         </Typography>
        
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           {components &&
//             Object.entries(components).map(([key, value]) => (
//               <Grid item xs={12} sm={6} key={key}>
//                 <Box sx={{ mb: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                     <Typography variant="body2" color="text.secondary">
//                       {key.charAt(0).toUpperCase() + key.slice(1)}
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       {value}
//                     </Typography>
//                   </Box>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={value} 
//                     sx={{ 
//                       height: 8,
//                       borderRadius: 4,
//                       backgroundColor: 'rgba(0, 0, 0, 0.1)',
//                       '& .MuiLinearProgress-bar': {
//                         borderRadius: 4,
//                       }
//                     }}
//                   />
//                 </Box>
//               </Grid>
//             ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// // Verified Credentials Card
// const CredentialsCard = ({ verifiedCredentials }) => {
//   if (!verifiedCredentials?.length) return null;
  
//   return (
//     <Card variant="outlined" sx={{ height: '100%' }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" gutterBottom fontWeight="bold">
//             Verified Credentials
//           </Typography>
//           <Tooltip title="Credentials verified by trusted issuers that contribute to your reputation">
//             <IconButton size="small">
//               <InfoIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Box>
        
//         <Paper variant="outlined" sx={{ bgcolor: 'background.default' }}>
//           <List disablePadding>
//             {verifiedCredentials.map((credential, index) => (
//               <React.Fragment key={credential.id}>
//                 {index > 0 && <Divider component="li" />}
//                 <ListItem
//                   sx={{
//                     px: 2,
//                     py: 1.5,
//                     '&:hover': {
//                       bgcolor: 'action.hover',
//                     },
//                   }}
//                 >
//                   <ListItemIcon>
//                     <VerifiedUserIcon color="primary" />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={credential.name}
//                     secondary={`Issued by ${credential.issuer}`}
//                     primaryTypographyProps={{ fontWeight: 'medium' }}
//                   />
//                   <Chip
//                     label={credential.score}
//                     color={credential.score > 80 ? "success" : (credential.score > 60 ? "warning" : "error")}
//                     size="small"
//                     variant="filled"
//                   />
//                 </ListItem>
//               </React.Fragment>
//             ))}
//           </List>
//         </Paper>
        
//         <Box textAlign="center" mt={2}>
//           <Typography variant="caption" color="text.secondary">
//             Credentials are verified through secure attestation protocols
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// function Dashboard({ reputationDetails, verifiedCredentials, isLoading }) {
//   if (isLoading) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <Box p={2}>
//       <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
//         Reputation Dashboard
//       </Typography>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <ReputationScoreCard reputationDetails={reputationDetails} />
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <CredentialsCard verifiedCredentials={verifiedCredentials} />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default Dashboard;

import React from 'react';
import { 
  Box, Typography, Card, CardContent, Grid, 
  CircularProgress, List, ListItem, ListItemIcon,
  ListItemText, Divider, Skeleton, Paper, Chip,
  LinearProgress, Tooltip, IconButton
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Dashboard loading skeleton
const DashboardSkeleton = () => (
  <Box p={2}>
    <Skeleton variant="text" width="30%" height={40} />
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rounded" height={350} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rounded" height={350} />
      </Grid>
    </Grid>
  </Box>
);

// Reputation Score Card
const ReputationScoreCard = ({ reputationDetails }) => {
  if (!reputationDetails) return null;
  
  const { overall, components, growth } = reputationDetails;
  const isPositiveGrowth = growth && growth.startsWith('+');
  
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            AI Reputation Score
          </Typography>
          <Tooltip title="Score calculated via Rust-powered ML integrating on‑chain transactions and off‑chain GitHub/DeFi data">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display="flex" justifyContent="center" mb={3}>
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={overall || 0}
              size={120}
              thickness={5}
              sx={{ color: overall > 75 ? 'success.main' : (overall > 50 ? 'warning.main' : 'error.main') }}
            />
            <Box
              sx={{
                top: 0, left: 0, bottom: 0, right: 0,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" component="div" fontWeight="bold">
                {overall || 0}
              </Typography>
              <Chip 
                icon={isPositiveGrowth ? <TrendingUpIcon /> : <TrendingDownIcon />}
                label={growth || '0%'} 
                color={isPositiveGrowth ? "success" : "error"}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Typography variant="subtitle2" gutterBottom fontWeight="medium">
          Reputation Components
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {components &&
            Object.entries(components).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {value}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={value} 
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': { borderRadius: 4 }
                    }}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Verified Credentials Card
const CredentialsCard = ({ verifiedCredentials }) => {
  if (!verifiedCredentials?.length) return null;
  
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Verified Credentials
          </Typography>
          <Tooltip title="Credentials verified by trusted issuers that contribute to your trust score">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Paper variant="outlined" sx={{ bgcolor: 'background.default' }}>
          <List disablePadding>
            {verifiedCredentials.map((credential, index) => (
              <React.Fragment key={credential.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem sx={{ px: 2, py: 1.5, '&:hover': { bgcolor: 'action.hover' } }}>
                  <ListItemIcon>
                    <VerifiedUserIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={credential.name}
                    secondary={`Issued by ${credential.issuer}`}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                  <Chip
                    label={credential.score}
                    color={credential.score > 80 ? "success" : (credential.score > 60 ? "warning" : "error")}
                    size="small"
                    variant="filled"
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
        <Box textAlign="center" mt={2}>
          <Typography variant="caption" color="text.secondary">
            Credentials are verified through secure attestation protocols.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

function Dashboard({ reputationDetails, verifiedCredentials, isLoading }) {
  if (isLoading) return <DashboardSkeleton />;
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        TrustChain AI Reputation Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ReputationScoreCard reputationDetails={reputationDetails} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CredentialsCard verifiedCredentials={verifiedCredentials} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
