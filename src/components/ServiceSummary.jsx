import React from "react";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import dayjs from "dayjs";

const ServiceSummary = ({
  lastServiceDate,
  lastServiceType,
  totalServices,
}) => (
  <Card elevation={2} sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="body1" gutterBottom sx={{ fontWeight: "bold" }}>
        Service Summary
      </Typography>
      <Divider sx={{ marginBottom: 1 }} />
      {lastServiceDate && lastServiceType && totalServices ? (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs>
            <Typography variant="body2">
              {`Last Service Date: ${dayjs(lastServiceDate).format(
                "MM/DD/YYYY"
              )}`}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">
              {`Last Service Type: ${lastServiceType}`}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">{`Total Services: ${totalServices}`}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body2">
          No service history records have been added for this vehicle yet.
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default ServiceSummary;
