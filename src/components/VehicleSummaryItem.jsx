"use client";
import * as React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  Button,
  Grid,
  Paper,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import milesFormatter from "@/utils/milesFormatter";
import VehicleDetails from "./VehicleDetails";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup"; // Import the popup component
import { useRouter } from "next/navigation";
import { useState } from "react";

const VehicleSummaryItem = ({
  id,
  make = "Unknown",
  model = "Unknown",
  year = "Unknown",
  mileage = 0,
  color = "Unknown",
  lastServiceDate,
  lastServiceType,
  vin,
}) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  function handleViewHistoryClick() {
    router.push(`/serviceHistory/${vin}`);
  }

  function handleSettingsClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseSettings() {
    setAnchorEl(null);
  }

  function handleDeleteClick() {
    setAnchorEl(null);
    setIsDeletePopupOpen(true);
  }

  async function handleConfirmDelete() {
    console.log(`Vehicle with VIN ${vin} deleted`);
    try {
      const response = await fetch("/api/deleteVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vin }),
      });

      if (response.ok) {
        window.location.reload();
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.error("Failed to delete vehicle", error);
    }
  }

  function handleCancelDelete() {
    setIsDeletePopupOpen(false);
  }

  return (
    <Paper sx={{ p: 2, backgroundColor: "#E8E8E8" }} elevation={4}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm="auto">
          <Avatar sx={{ width: 60, height: 60, fontSize: "1.5rem" }}>
            {make.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={12} sm>
          <VehicleDetails make={make} model={model} year={year} color={color} />
        </Grid>
        <Grid item xs={12} sm>
          <Typography variant="body2" data-testid="mileage">
            Mileage: {milesFormatter(mileage)} miles
          </Typography>
          {lastServiceDate && lastServiceType && (
            <Typography variant="body2" data-testid="last-service">
              Last Service: {lastServiceDate} - {lastServiceType}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm>
          <Typography variant="body2" data-testid="vin">
            VIN: {vin}
          </Typography>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          fullWidth
          data-testid="history-button"
          onClick={handleViewHistoryClick}
          sx={{ flex: 1, mr: 1, backgroundColor: "#3c4463" }}
        >
          View Service History
        </Button>
        <IconButton
          aria-label="settings"
          data-testid="settings-button"
          onClick={handleSettingsClick}
          sx={{ flexShrink: 0 }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseSettings}
        >
          <MenuItem onClick={handleDeleteClick} data-testid="delete-option">
            Delete Vehicle
          </MenuItem>
        </Menu>
      </Box>

      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={handleCancelDelete}
        onDelete={handleConfirmDelete}
      />
    </Paper>
  );
};

export default VehicleSummaryItem;
