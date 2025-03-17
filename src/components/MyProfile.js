import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Chip
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const MyProfile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(`${BASE_URL}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        fetchDonations(response.data.userId); // Fetch donations after profile data
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to load profile", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch Donations API Call
  const fetchDonations = async (userId) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_URL}/donations/donations?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setDonations(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to fetch donations", severity: "error" });
    }
  };
  

  const handleLogout = () => {
    logout();
    Cookies.remove("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "success"; // Green
      case "Pending":
        return "warning"; // Yellow
      case "Failed":
        return "error"; // Red
      default:
        return "default"; // Gray
    }
  };
  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 6, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          My Profile
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : profile ? (
          <>
            {/* Profile Details Table */}
            <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Field</strong></TableCell>
                    <TableCell><strong>Value</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { label: "UserId", value: profile.userId || "N/A" },
                    { label: "Name", value: profile.name || "N/A" },
                    { label: "Email", value: profile.email || "N/A" },
                    { label: "Mobile", value: profile.mobile || "N/A" },
                    { label: "Age", value: profile.age || "N/A" },
                    { label: "Address", value: profile.address || "N/A" },
                  ].map((field, index) => (
                    <TableRow key={index}>
                      <TableCell>{field.label}</TableCell>
                      <TableCell>{field.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Donation History */}
            <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
              Donation History
            </Typography>

            {donations.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No donations made yet.
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Transaction Id</strong></TableCell>
                      <TableCell><strong>Amount (₹)</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {donations.map((donation, index) => (
                      <TableRow key={index}>
                        <TableCell>{donation.transactionId || `TXN${index}`}</TableCell>
                        <TableCell>₹{donation.amount}</TableCell>
                        <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                        
<TableCell>
  <Chip 
    label={donation.status} 
    color={getStatusColor(donation.status)} 
    variant="outlined"
  />
</TableCell>                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        ) : (
          <Typography variant="body1" color="error">
            Failed to load profile data.
          </Typography>
        )}
      </Paper>

      {/* Snackbar Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyProfile;

 