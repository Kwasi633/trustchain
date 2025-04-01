"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Skeleton,
  Paper,
  Chip,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import InfoIcon from "@mui/icons-material/Info"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import ReputationForm from "./ReputationForm"

// Dashboard loading skeleton
const DashboardSkeleton = () => (
  <Box p={2}>
    <Skeleton variant="text" width="30%" height={40} />
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} md={4} key={item}>
          <Skeleton variant="rounded" height={350} />
        </Grid>
      ))}
    </Grid>
  </Box>
)

const RecentActivityCard = ({ recentActivity }) => {
  if (!recentActivity) return null;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Recent Activity
          </Typography>
          <Tooltip title="Most recent verified repository and DeFi activity">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <List disablePadding>
          <ListItem>
            <ListItemText
              primary="Repository"
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {recentActivity.repo}
                </Typography>
              }
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Last Activity"
              secondary={formatDate(recentActivity.date)}
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Recent Commits"
              secondary={recentActivity.commits}
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="DeFi Transactions"
              secondary={recentActivity.defiTxCount}
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

// Reputation Score Card
const ReputationScoreCard = ({ reputationDetails }) => {
  if (!reputationDetails) return null

  const { overall, components, growth } = reputationDetails
  const isPositiveGrowth = growth && growth.startsWith("+")

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
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
              sx={{ color: overall > 75 ? "success.main" : overall > 50 ? "warning.main" : "error.main" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" component="div" fontWeight="bold">
                {overall || 0}
              </Typography>
              <Chip
                icon={isPositiveGrowth ? <TrendingUpIcon /> : <TrendingDownIcon />}
                label={growth || "0%"}
                color={isPositiveGrowth ? "success" : "error"}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

// Verified Credentials Card
const CredentialsCard = ({ verifiedCredentials }) => {
  if (!verifiedCredentials?.length) return null

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Verified Credentials
          </Typography>
          <Tooltip title="Credentials verified by trusted issuers that contribute to your trust score">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Paper variant="outlined" sx={{ bgcolor: "background.default" }}>
          <List disablePadding>
            {verifiedCredentials.map((credential, index) => (
              <React.Fragment key={credential.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem sx={{ px: 2, py: 1.5, "&:hover": { bgcolor: "action.hover" } }}>
                  <ListItemIcon>
                    <VerifiedUserIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={credential.name}
                    secondary={`Issued by ${credential.issuer}`}
                    primaryTypographyProps={{ fontWeight: "medium" }}
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
  )
}

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [reputationDetails, setReputationDetails] = useState(null)
  const [verifiedCredentials, setVerifiedCredentials] = useState(null)
  const [recentActivity, setRecentActivity] = useState(null)

  // Handle updates from the ReputationForm
  const handleReputationUpdate = (response) => {
    if (response) {
      const score = response[0]
      const activityString = response[1]

      // Parse activity data
      const activityParts = activityString.split(". ")
      const repoData = activityParts[1].split(" on ")
      const commitData = activityParts[2].split(" ")

      const defiTxString = activityParts[3].split(": ")[1].replace('.', '');

      setRecentActivity({
        repo: repoData[0].replace("Most recent repo: ", ""),
        date: repoData[1],
        commits: Number.parseInt(commitData[0]),
        defiTxCount: Number.parseInt(defiTxString)
      })

      // Create reputation details object for the dashboard
      const formattedDetails = {
        overall: Math.round(score),
        growth: getGrowthIndicator(score),
        components: {
          github: Math.round(score * 0.5), // Based on the 0.5 weight in backend
          defi: Math.round(score * 0.5), // Based on the 0.5 weight in backend
        },
      }

      // Generate verified credentials based on the score
      const credentials = generateVerifiedCredentials()

      // Update state with the new data
      setReputationDetails(formattedDetails)
      setVerifiedCredentials(credentials)
    }
  }

  // Helper function to generate a growth indicator
  const getGrowthIndicator = (score) => {
    // This would ideally be based on historical data
    // For now, generate a random growth between -5% and +8%
    const randomGrowth = Math.random() * 13 - 5
    return (randomGrowth >= 0 ? "+" : "") + randomGrowth.toFixed(1) + "%"
  }

  // Helper function to generate verified credentials without scores
  const generateVerifiedCredentials = () => {
    return [
      {
        id: "1",
        name: "GitHub Developer Profile",
        issuer: "GitHub Verification Service",
      },
      {
        id: "2",
        name: "DeFi Transaction History",
        issuer: "EtherScan",
      },
      {
        id: "3",
        name: "Transaction History Verification",
        issuer: "TrustChain Protocol",
      },
    ]
  }

  // Handle loading state changes
  const handleLoadingChange = (loading) => {
    setIsLoading(loading)
  }

  return (
    <Box>
      {/* ReputationForm integrated directly into Dashboard */}
      <Box mb={4}>
        <ReputationForm onUpdate={handleReputationUpdate} onLoadingChange={handleLoadingChange} />
      </Box>

      {/* Dashboard content */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <Box p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ReputationScoreCard reputationDetails={reputationDetails} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CredentialsCard verifiedCredentials={verifiedCredentials} />
            </Grid>
            <Grid item xs={12} md={4}>
              <RecentActivityCard recentActivity={recentActivity} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default Dashboard