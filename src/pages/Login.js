import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (user || token) {
      navigate("/"); // Redirect to home if logged in
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.token;
      const userId = response.data.userId;
      const userName = response.data.userName;

      Cookies.set("authToken", token, { expires: 7 });
      localStorage.setItem("userId", userId); // Store userId only at login
      localStorage.setItem("userName", userName); // Store userId only at login

      login({ email: formData.email }, token);
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      navigate("/");
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.msg || "Login failed", severity: "error" });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
      <Paper elevation={4} sx={{ padding: 4, width: "100%", textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Welcome Back 👋
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Login to continue
        </Typography>

        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || !formData.email || !formData.password}
                sx={{
                  py: 1.2,
                  fontSize: "16px",
                  background: loading ? "gray" : "primary.main",
                  "&:hover": { background: "primary.dark" },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                New here?{" "}
                <Typography
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </Typography>
              </Typography>
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

export default Login;
