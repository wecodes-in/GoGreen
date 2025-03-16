import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const monthlyData = [
  { month: "Jan", trees: 120 },
  { month: "Feb", trees: 150 },
  { month: "Mar", trees: 180 },
  { month: "Apr", trees: 200 },
  { month: "May", trees: 240 },
  { month: "Jun", trees: 300 },
];

const donationDistribution = [
  { name: "Individuals", value: 60 },
  { name: "Corporates", value: 25 },
  { name: "NGOs", value: 15 },
];

const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

const topDonors = [
  { name: "John Doe", trees: 50 },
  { name: "Green Corp", trees: 40 },
  { name: "Emily Smith", trees: 30 },
  { name: "Nature NGO", trees: 25 },
];

const TreeTracker = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
        🌳 Tree Donation Tracker
      </Typography>

      {/* Charts Section */}
      <Grid container spacing={4}>
        {/* Monthly Donations Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              📊 Monthly Tree Donations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
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
                <Pie data={donationDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {donationDistribution.map((entry, index) => (
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
              {topDonors.map((donor, index) => (
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
