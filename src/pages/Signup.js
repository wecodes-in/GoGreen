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

  // Validate a single field
  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "username" && !value.trim()) errorMsg = "Username is required";
    if (name === "email") {
      if (!value) errorMsg = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Invalid email format";
    }
    if (name === "password" && value.length < 6) errorMsg = "Password must be at least 6 characters";
    if (name === "mobile" && !value) errorMsg = "Mobile number is required";
    if (name === "age" && (isNaN(value) || value < 1 || value > 100)) errorMsg = "Enter a valid age";

    return errorMsg;
  };

  // Handle input changes & validate dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate and update errors dynamically
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Check if the form is valid
  const isFormValid = () => Object.values(errors).every((err) => !err) && Object.values(formData).every((val) => val);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
  
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
  
      setSnackbar({ open: true, message: "Signup successful! Redirecting to login...", severity: "success" });
  
      setTimeout(() => {
        Cookies.remove("authToken");
        navigate("/login");
        window.location.reload();      }, 1000);
      
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.msg || "Signup failed", severity: "error" });
    }
    setLoading(false);
  };
  
  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 6, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Create an Account</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          Sign up to access your account
        </Typography>
        <form onSubmit={handleSignup}>
          <Grid container spacing={2}>
            {["username", "email", "password", "address", "age", "mobile"].map((field) => (
              <Grid item xs={field === "age" || field === "mobile" ? 6 : 12} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "password" ? "password" : field === "age" ? "number" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field]}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !isFormValid()}
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
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
