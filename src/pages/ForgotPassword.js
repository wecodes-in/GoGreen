import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  // Validate form
  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    return true;
  };

  // Handle forgot password request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setSnackbar({ open: true, message: response.data.message || "Password reset email sent!", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Something went wrong", severity: "error" });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 6, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          Enter your email to receive a password reset link.
        </Typography>

        <form onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2, height: 45 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Reset Password"}
          </Button>
        </form>

        <Button onClick={() => navigate("/login")} sx={{ marginTop: 2, textTransform: "none", fontWeight: "bold" }}>
          Back to Login
        </Button>
      </Paper>

      {/* Snackbar for success/error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPassword;
