"use client";

import * as React from "react";
import {
  Box,
  Container,
  Modal,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import VehicleList from "./VehicleList";
import GarageHeader from "./GarageHeader";
import NavigationBar from "./NavigationBar";
import NewVehicleForm from "./NewVehicleForm";
import { useState } from "react";
import { useSession } from "next-auth/react";

function Garage({ vehicleList }) {
  const [showNewVehicleForm, setShowNewVehicleForm] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <NavigationBar />
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  const handleNewVehicleClick = () => {
    setShowNewVehicleForm(true);
  };

  const handleClose = () => {
    setShowNewVehicleForm(false);
  };

  return (
    <>
      <NavigationBar />
      <Container sx={{ paddingTop: 4 }}>
        <GarageHeader onNewVehicleClick={handleNewVehicleClick} />
        <VehicleList vehicleList={vehicleList} />
      </Container>
      <Modal
        open={showNewVehicleForm}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropProps={{
          onClick: (event) => event.stopPropagation(),
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "md",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Add New Vehicle
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            <NewVehicleForm onCancel={handleClose} />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}

export default Garage;
