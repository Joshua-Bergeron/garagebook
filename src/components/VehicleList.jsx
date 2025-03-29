import * as React from "react";
import VehicleSummaryItem from "./VehicleSummaryItem";
import { Typography, Stack, Box } from "@mui/material";

function VehicleList({ vehicleList }) {
  return (
    <Stack spacing={2}>
      {vehicleList && vehicleList.length > 0 ? (
        vehicleList.map((vehicle, index) => {
          return (
            <VehicleSummaryItem
              key={index}
              id={vehicle.id}
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
              mileage={vehicle.mileage}
              color={vehicle.color}
              lastServiceDate={vehicle.lastServiceDate}
              lastServiceType={vehicle.lastServiceType}
              vin={vehicle.vin}
            />
          );
        })
      ) : (
        <Box>
          <Typography
            color="text.secondary"
            align="center"
            sx={{ width: "100%" }}
            variant="h6"
          >
            No Vehicles To Display
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

export default VehicleList;
