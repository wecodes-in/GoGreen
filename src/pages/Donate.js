import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Grid, TextField, MenuItem, Snackbar, Alert, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

const donationOptions = [
  { label: "Plant 1 Tree - ₹50", value: 50 },
  { label: "Plant 5 Trees - ₹250", value: 250 },
  { label: "Plant 10 Trees - ₹500", value: 500 },
  { label: "Custom Amount", value: "custom" },
];
const donorTypes = ["Individual", "Corporate", "NGO"];

const Donate = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [donorType, setDonorType] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (storedUserId) {
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  // ✅ Check form validity whenever a field updates
  useEffect(() => {
    const donationAmount = amount === "custom" ? parseInt(customAmount) : amount;
    setIsFormValid(!!donationAmount && donorType !== "" && transactionId.trim() !== "");
  }, [amount, customAmount, donorType, transactionId]);

  const handleDonation = async () => {
    if (!isFormValid) return;

    const donationAmount = amount === "custom" ? parseInt(customAmount) : amount;
    
    try {
      const token = Cookies.get("authToken");

      const response = await axios.post(`${BASE_URL}/donations/donate`, {
        amount: donationAmount,
        userId,
        name: userName,
        paymentMode: "UPI",
        donorType,
        transactionId,
        amountUsed: "No",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setSnackbarMessage("🎉 Thank you for your contribution! You are making a difference! 🌳");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("❌ Something went wrong. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
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
              <TextField
                fullWidth
                label="Enter custom amount"
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </Grid>
          )}
        </Grid>

        {/* Donor Type Selection */}
        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">Donor Type (Required)</FormLabel>
          <RadioGroup row value={donorType} onChange={(e) => setDonorType(e.target.value)}>
            {donorTypes.map((type) => (
              <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Transaction ID Input */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transaction ID (Required)"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              sx={{ mt: 3 }}
            />
          </Grid>
        </Grid>

        {/* UPI QR Code for Payment */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">Scan & Pay via UPI</Typography>
          <img src="assets/qr_code.jpg" alt="UPI QR Code" style={{ width: "200px", marginTop: "10px" }} />
        </Box>

        {/* 🌳 Confirm Donation Button (Disabled until form is valid) */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
          onClick={handleDonation}
          disabled={!isFormValid} // ✅ Disabled if form is incomplete
        >
          🌳 Confirm Donation
        </Button>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    

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
            <Typography variant="h4" fontWeight="bold" color="#D98324">🏡 500+</Typography>
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
