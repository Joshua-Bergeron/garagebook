"use client";
import React, { useState } from "react";
import { Autocomplete, Grid, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { maintenanceTypes } from "@/mocks/vehicleData";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

function MaintenanceForm({ handleClose, vin }) {
  const [maintenanceData, setMaintenanceData] = useState({
    type: null,
    mileage: "",
    serviceDate: "",
    city: "",
    state: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = (data) => {
    const errors = {};
    if (!data.type) errors.type = "Maintenance type is required";
    if (!data.mileage || isNaN(data.mileage))
      errors.mileage = "Mileage is required. No commas.";
    if (!data.serviceDate || !dayjs(data.serviceDate).isValid())
      errors.serviceDate = "Service date is required";
    if (!data.city) errors.city = "City is required";
    if (!data.state) errors.state = "State is required";
    return errors;
  };

  const handleChange = (field) => (event, value) => {
    setMaintenanceData({
      ...maintenanceData,
      [field]: value !== undefined ? value : event.target.value,
    });
    if (formErrors[field]) {
      const newErrors = { ...formErrors };
      delete newErrors[field];
      setFormErrors(newErrors);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setMaintenanceData({
      ...maintenanceData,
      type: newInputValue,
    });
    if (formErrors["type"]) {
      const newErrors = { ...formErrors };
      delete newErrors["type"];
      setFormErrors(newErrors);
    }
  };

  const handleDateChange = (date) => {
    setMaintenanceData({
      ...maintenanceData,
      serviceDate: date ? date.format("YYYY-MM-DD") : "",
    });
    if (formErrors["serviceDate"]) {
      const newErrors = { ...formErrors };
      delete newErrors["serviceDate"];
      setFormErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(maintenanceData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("/api/addNewMaintenance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vin: vin,
            maintenanceData,
          }),
        });

        if (response.ok) {
          setMaintenanceData({
            type: null,
            mileage: "",
            serviceDate: "",
            city: "",
            state: "",
            notes: "",
          });
          handleClose();
          window.location.reload();
        } else {
          console.error("Failed to submit maintenance data");
        }
      } catch (error) {
        console.error("Failed to submit maintenance data:", error);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        data-testid="maintenance-form"
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 500,
              color: "#555",
            }}
          >
            Add New Maintenance Log
          </Typography>
        </Grid>
        {/* Maintenance type */}
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            disablePortal
            id="maintenance-type-combo-box"
            data-testid="maintenance-type-combo-box"
            options={maintenanceTypes}
            value={maintenanceData.type}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Maintenance Type"
                required
                fullWidth
                error={!!formErrors.type}
                helperText={formErrors.type}
              />
            )}
          />
        </Grid>

        {/* Mileage */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Mileage"
            data-testid="mileage-field"
            value={maintenanceData.mileage}
            onChange={handleChange("mileage")}
            required
            fullWidth
            error={!!formErrors.mileage}
            helperText={formErrors.mileage}
          />
        </Grid>

        {/* Date of service */}
        <Grid item xs={12} sm={6} md={3}>
          <DatePicker
            label="Service Date"
            data-testid="date-field"
            value={
              maintenanceData.serviceDate
                ? new AdapterDayjs().date(maintenanceData.serviceDate)
                : null
            }
            onChange={(date) => handleDateChange(date)}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                variant: "outlined",
                id: "service-date",
                name: "serviceDate",
                error: !!formErrors.serviceDate,
                helperText: formErrors.serviceDate,
              },
            }}
          />
        </Grid>

        {/* City */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="City"
            data-testid="city-field"
            value={maintenanceData.city}
            onChange={handleChange("city")}
            required
            fullWidth
            error={!!formErrors.city}
            helperText={formErrors.city}
          />
        </Grid>

        {/* State */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="State"
            data-testid="state-field"
            value={maintenanceData.state}
            onChange={handleChange("state")}
            required
            fullWidth
            error={!!formErrors.state}
            helperText={formErrors.state}
          />
        </Grid>

        {/* Additional notes section */}
        <Grid item xs={12}>
          <TextField
            label="Additional Notes"
            inputProps={{ "data-testid": "notes-field" }}
            id="notes-field"
            name="notes"
            value={maintenanceData.notes}
            onChange={handleChange("notes")}
            multiline
            minRows={4}
            maxRows={Infinity}
            fullWidth
          />
        </Grid>

        {/* Submit button */}
        <Grid item xs={12} textAlign="center">
          <Button
            variant="outlined"
            onClick={handleClose}
            data-testid="cancel-button"
            fullWidth
            sx={{
              width: 300,
              marginRight: 4,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            data-testid="submit-button"
            fullWidth
            disabled={Object.keys(formErrors).length > 0}
            sx={{
              width: 300,
              backgroundColor: "#495057",
              "&:hover": {
                backgroundColor: "#808080",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default MaintenanceForm;
