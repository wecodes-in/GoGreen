import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid, Paper, Snackbar, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    age: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation function
  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
  //  else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Invalid mobile number";
    if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 100)) newErrors.age = "Enter a valid age";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Signup
  const handleSignup = async (e) => {
    localStorage.removeItem("userId");

    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
     await axios.post(
        `${BASE_URL}/auth/register`,
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          age: Number(formData.age),
          mobile: formData.mobile,
        },
        { headers: { "Content-Type": "application/json" } }
      );


      login({ email: formData.email });

      setSnackbar({ open: true, message: "Signup successful! Redirecting...", severity: "success" });

      setTimeout(() =>  Cookies.remove("authToken"),navigate("/login"), 1000);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.msg || "Signup failed", severity: "error" });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 6, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Create an Account
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          Sign up to access your account
        </Typography>
        <form onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || Object.keys(errors).length > 0}
                sx={{ height: 45 }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")} sx={{ textTransform: "none", fontWeight: "bold" }}>
            Log in
          </Button>
        </Typography>
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
