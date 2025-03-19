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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import milesFormatter from "@/utils/milesFormatter";
import VehicleDetails from "./VehicleDetails";
import { useRouter } from "next/navigation";

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
  function handleViewHistoryClick() {
    router.push(`/serviceHistory/${vin}`);
  }

  function handleSettingsClick() {
    console.log("Settings clicked");
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
      </Box>
    </Paper>
  );
};

export default VehicleSummaryItem;
