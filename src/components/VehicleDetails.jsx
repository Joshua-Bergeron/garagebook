import * as React from "react";
import { Typography } from "@mui/material";

function VehicleDetails({ make, model, year, color }) {
  return (
    <>
      <Typography variant="h6" data-testid="make-model">
        {make} {model}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        data-testid="year-color"
      >
        {year} - {color}
      </Typography>
    </>
  );
}

export default VehicleDetails;
