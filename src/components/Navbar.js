import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2E7D32" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
        Go Green
        </Typography>

        {/* ✅ Desktop Menu: Hidden on small screens (xs), visible on medium (md) and larger */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontWeight: "bold" }}>Home</Button>
          <Button color="inherit" component={Link} to="/donate" sx={{ fontWeight: "bold" }}>Donate</Button>
          <Button color="inherit" component={Link} to="/about" sx={{ fontWeight: "bold" }}>Donate</Button>
          <Button color="inherit" component={Link} to="/tree-tracker" sx={{ fontWeight: "bold" }}>Tree Tracker</Button>
          {user ? (
            <Button color="inherit" onClick={logout} sx={{ fontWeight: "bold" }}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: "bold" }}>Login</Button>
              <Button color="inherit" component={Link} to="/signup" sx={{ fontWeight: "bold" }}>Signup</Button>
            </>
          )}
        </Box>

        {/* ✅ Mobile Menu Button: Visible only on small screens */}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ display: { xs: "block", md: "none" } }}>
          <MenuIcon />
        </IconButton>

        {/* Mobile Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem component={Link} to="/donate" onClick={handleMenuClose}>Donate</MenuItem>
          <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem>
          <MenuItem component={Link} to="/tree-tracker" onClick={handleMenuClose}>Tree Tracker</MenuItem>
          {user ? (
            <MenuItem onClick={() => { handleMenuClose(); logout(); }}>Logout</MenuItem>
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
