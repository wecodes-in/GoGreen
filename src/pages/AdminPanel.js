import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  Select, MenuItem
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const AdminPanel = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [donations, setDonations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch all donations from API
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const token = Cookies.get("authToken");

    try {
      const response = await axios.get(
        `${BASE_URL}/donations/all-donations-admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (donation) => {
    setEditId(donation._id);
    setEditData(donation);
  };

  // Handle input change in the edit form
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Update donation details
  const handleUpdate = async () => {
    try {
      const token = Cookies.get("authToken");
      await axios.put(`${BASE_URL}/donations/${editId}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSnackbarMessage("✅ Donation updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setEditId(null);
      fetchDonations();
    } catch (error) {
      setSnackbarMessage("❌ Failed to update donation.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Delete a donation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?"))
      return;

    try {
      const token = Cookies.get("authToken");
      await axios.delete(`${BASE_URL}/donations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSnackbarMessage("🗑️ Donation deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchDonations();
    } catch (error) {
      setSnackbarMessage("❌ Failed to delete donation.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        🛠️ Admin Panel - Manage Donations
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell><strong>ID</strong></TableCell> */}
              <TableCell>
                <strong>Donation Id</strong>
              </TableCell>
              <TableCell>
                <strong>User Id</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Payment Mode</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Amount Used</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
              </TableCell>
              <TableCell>
                <strong>Donor Type</strong>
              </TableCell>
              <TableCell>
                <strong>Transaction ID</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation._id}>
                {/* <TableCell>{donation._id}</TableCell> */}
                <TableCell>{donation.donationId}</TableCell>
                <TableCell>{donation.userId}</TableCell>
                <TableCell>{donation.name}</TableCell>
                <TableCell>{donation.paymentMode}</TableCell>

<TableCell>
  {editId === donation._id ? (
    <Select
      name="status"
      value={editData.status || ""}
      onChange={handleChange}
      size="small"
      fullWidth
    >
      <MenuItem value="Success"> Success</MenuItem>
      <MenuItem value="Pending"> Pending</MenuItem>
      <MenuItem value="Failed"> Failed</MenuItem>
    </Select>
  ) : (
    donation.status
  )}
</TableCell>

<TableCell>
  {editId === donation._id ? (
    <Select
      name="amountUsed"
      value={editData.amountUsed || ""}
      onChange={handleChange}
      size="small"
      fullWidth
    >
      <MenuItem value="Yes"> Yes</MenuItem>
      <MenuItem value="No"> No</MenuItem>
=    </Select>
  ) : (
    donation.amountUsed
  )}
</TableCell>


                <TableCell>{donation.amount}</TableCell>
                <TableCell>{donation.donorType}</TableCell>
                <TableCell>{donation.transactionId}</TableCell>
                <TableCell>
                  {new Date(donation.date).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </TableCell>{" "}
                <TableCell>
                  {editId === donation._id ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleUpdate}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(donation)}
                    >
                      Edit
                    </Button>
                  )}
                  {/* <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDelete(donation._id)}
                  >
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
