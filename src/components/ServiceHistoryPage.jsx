"use client";
import React from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Modal,
  Box,
} from "@mui/material";
import ServiceHistory from "./ServiceHistory";
import dayjs from "dayjs";
import ServiceSummary from "./ServiceSummary";
import VehicleInformation from "./VehicleInformation";
import NavigationBar from "./NavigationBar";
import MaintenanceForm from "./MaintenanceForm";
import { useState } from "react";

export default function ServiceHistoryPage({ vehicle, serviceHistory }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const latestServiceEntry =
    serviceHistory.length > 0
      ? serviceHistory[serviceHistory.length - 1]
      : null;

  return (
    <>
      <NavigationBar />
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Typography variant="h4" gutterBottom align="left">
          {`${vehicle.year} ${vehicle.make} ${vehicle.model} - Service History`}
        </Typography>
        <VehicleInformation
          mileage={vehicle.mileage}
          licensePlate={vehicle.licensePlate}
          vin={vehicle.vin}
        />

        {latestServiceEntry ? (
          <ServiceSummary
            lastServiceDate={dayjs(latestServiceEntry.servicedate)}
            lastServiceType={latestServiceEntry.type}
            totalServices={serviceHistory.length}
          />
        ) : (
          <ServiceSummary />
        )}
        <Button
          variant="contained"
          sx={{
            marginBottom: 2,
            backgroundColor: "#495057",
            "&:hover": {
              backgroundColor: "#808080",
            },
          }}
          onClick={handleOpen}
          fullWidth
          data-testid="add-button"
        >
          Add Maintenance
        </Button>
        <Paper elevation={4}>
          <ServiceHistory serviceHistory={serviceHistory} />
        </Paper>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              minWidth: 700,
              p: 4,
            }}
          >
            <MaintenanceForm handleClose={handleClose} />
          </Box>
        </Modal>
      </Container>
    </>
  );
}
