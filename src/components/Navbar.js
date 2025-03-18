import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
        const token = Cookies.get("authToken");


  // Open Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open Profile Menu
  const handleProfileOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  // Close Profile Menu
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2E7D32", padding: "5px 0" }}>
      <Toolbar>
        {/* Logo / Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Go Green
        </Typography>

        {/* ✅ Desktop Menu (Visible on md and larger) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "15px" }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "#1B5E20" } }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/donate" sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "#1B5E20" } }}>
            Donate
          </Button>
          <Button color="inherit" component={Link} to="/tree-tracker" sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "#1B5E20" } }}>
            Tree Tracker
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={{ fontWeight: "bold", "&:hover": { backgroundColor: "#1B5E20" } }}>
            About Us
          </Button>

  {/* ✅ Show "Admin Panel" only for Admins */}
  {user?.email === "admin@gmail.com" && (
            <Button color="warning" component={Link} to="/admin" sx={{ fontWeight: "bold", backgroundColor: "#FF9800" }}>
              Admin Panel
            </Button>
          )}
          {user &&token!="undefined" && token!=undefined  ? (
            <>
              {/* Profile Icon */}
              <IconButton color="inherit" onClick={handleProfileOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleProfileClose}>
                <MenuItem component={Link} to="/profile" onClick={handleProfileClose}>My Profile</MenuItem>
                <MenuItem onClick={() => { handleProfileClose(); logout(); }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: "bold" }}>Login</Button>
              <Button color="inherit" component={Link} to="/signup" sx={{ fontWeight: "bold" }}>Signup</Button>
            </>
          )}
        </Box>

        {/* ✅ Mobile Menu Button (Visible on xs only) */}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ display: { xs: "block", md: "none" } }}>
          <MenuIcon />
        </IconButton>

        {/* ✅ Mobile Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem component={Link} to="/donate" onClick={handleMenuClose}>Donate</MenuItem>
          <MenuItem component={Link} to="/tree-tracker" onClick={handleMenuClose}>Tree Tracker</MenuItem>
          <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About Us</MenuItem>




{user?.email === "admin@gmail.com" && (
            <MenuItem component={Link} to="/admin" onClick={handleMenuClose} sx={{ color: "orange" }}>Admin Panel</MenuItem>
          )}

          {user &&token!="undefined" && token!=undefined  ? (
            <>
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); logout(); }}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>Signup</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
