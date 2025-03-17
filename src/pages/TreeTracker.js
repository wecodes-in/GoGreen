import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TreeTracker = () => {
  const [donationSummary, setDonationSummary] = useState({
    monthlyData: [],
    donorType: [],
    topDonors: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(`${BASE_URL}/donations/donation-summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDonationSummary(response.data);
      } catch (err) {
        setError("Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
        🌳 Tree Donation Tracker
      </Typography>

      <Grid container spacing={4}>
        {/* Monthly Donations Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              📊 Monthly Tree Donations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donationSummary.monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="trees" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart for Donation Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              🌍 Donation Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={donationSummary.donorType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {donationSummary.donorType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Donors Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              🏆 Top Donors
            </Typography>
            <ul>
              {donationSummary.topDonors.map((donor, index) => (
                <li key={index}>
                  <Typography variant="body1">
                    <strong>{donor.name}</strong> - {donor.trees} trees donated
                  </Typography>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TreeTracker;
