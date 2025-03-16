import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const AdminPanel = () => (
  <Container sx={{ textAlign: "center", mt: 5 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, backgroundColor: "#fbe9e7" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#D32F2F", fontWeight: "bold" }}>Admin Panel</Typography>
      <Typography variant="h6" color="text.secondary">Manage donations and tree updates.</Typography>
    </Paper>
  </Container>
);

export default AdminPanel;
