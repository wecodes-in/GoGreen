import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid, Paper, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (formData.age && isNaN(formData.age)) newErrors.age = "Age must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          age: Number(formData.age),
          mobile: formData.mobile,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Cookies.set("authToken", response.data.token, { expires: 7 }); // Store token
      login({ email: formData.email }); // Update Auth Context

      setSnackbar({ open: true, message: "Signup successful! Redirecting...", severity: "success" });

      setTimeout(() => navigate("/"), 2000); // Redirect to home after 2s
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.msg || "Signup failed", severity: "error" });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Signup</Typography>
        <form onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} error={!!errors.age} helperText={errors.age} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </Button>
            </Grid>
          </Grid>
        </form>
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
