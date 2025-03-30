import React from 'react';
import { 
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info';

const Activity = ({ transactionHistory }) => {
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Activity History
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="activity table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory && transactionHistory.length > 0 ? (
              transactionHistory.map((tx) => (
                <TableRow key={tx.id} hover>
                  <TableCell component="th" scope="row">
                    {tx.type}
                  </TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={tx.status}
                      color={
                        tx.status.toLowerCase() === 'completed'
                          ? 'success'
                          : 'warning'
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Transaction Details">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No transaction history available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Activity;
