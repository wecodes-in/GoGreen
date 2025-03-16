import React, { useState } from "react";
import { Box, Typography, Button, Paper, Grid, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
// import donationI÷mage from "images/img1.jpg"; // Example image

const donationOptions = [
  { label: "Plant 1 Tree - ₹50", value: 50 },
  { label: "Plant 5 Trees - ₹250", value: 250 },
  { label: "Plant 10 Trees - ₹500", value: 500 },
  { label: "Custom Amount", value: "custom" },
];

const Donate = () => {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDonation = () => {
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      {/* 🌿 Hero Section */}
      <Paper sx={{ p: 4, mb: 4, background: `url('images/img1.jpg') center/cover`, color: "white", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Typography variant="h3" fontWeight="bold">🌱 Make a Difference Today</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>Every ₹50 plants a tree. Your contribution helps restore forests and combat climate change.</Typography>
        <Button variant="contained" size="large" color="success" sx={{ mt: 2 }} onClick={() => document.getElementById("donation-form").scrollIntoView({ behavior: "smooth" })}>
          Donate Now
        </Button>
      </Paper>

      {/* 🌿 Donation Form */}
      <Paper id="donation-form" sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>🌍 Select Your Donation</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Choose an amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            >
              {donationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
          {amount === "custom" && (
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Enter custom amount" type="number" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
            </Grid>
          )}
        </Grid>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} onClick={handleDonation}>
          🌳 Confirm Donation
        </Button>
      </Paper>

      {/* 🌿 Impact Section */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, backgroundColor: "#E8F5E9" }}>
            <Typography variant="h4" fontWeight="bold" color="green">🌳 50,000+</Typography>
            <Typography variant="body1">Trees Planted</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, backgroundColor: "#E3F2FD" }}>
            <Typography variant="h4" fontWeight="bold" color="blue">🌍 10,000+</Typography>
            <Typography variant="body1">Kg of CO₂ Absorbed</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, backgroundColor: "#FFEBEE" }}>
            <Typography variant="h4" fontWeight="bold" color="red">🏡 500+</Typography>
            <Typography variant="body1">Communities Benefited</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 🌿 How It Works */}
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>🔄 How It Works</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">1️⃣ Choose an Amount</Typography>
            <Typography variant="body2">Select how many trees you want to plant.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">2️⃣ Make a Payment</Typography>
            <Typography variant="body2">Securely complete your donation.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">3️⃣ See Your Impact</Typography>
            <Typography variant="body2">Get updates on tree plantation progress.</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* 🌿 Testimonials */}
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>💬 What Our Donors Say</Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>“I donated 10 trees, and it felt amazing to be part of something bigger! The process was simple and transparent.” - Rahul Sharma</Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic", mt: 2 }}>“Knowing my contribution is helping the environment makes me so happy. Highly recommend this initiative!” - Priya Verma</Typography>
      </Paper>

      {/* 🌿 Transparency & Security */}
      <Paper sx={{ p: 4, mt: 4, backgroundColor: "#FAFAFA" }}>
        <Typography variant="h5" fontWeight="bold">🔐 100% Secure & Transparent</Typography>
        <Typography variant="body1">All donations are tracked and reported to ensure transparency. Your contributions go directly to tree plantations.</Typography>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          🎉 Thank you for your contribution! You are making a difference! 🌳
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Donate;
