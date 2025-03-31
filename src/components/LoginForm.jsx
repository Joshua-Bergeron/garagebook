"use client";
import React, { useState } from "react";
import {
  Grid,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm({ onSubmit, onCancel }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box>
      <Typography
        variant="body2"
        textAlign="center"
        gutterBottom
        sx={{ color: "#6c757d" }}
      >
        Please log in to your account to access your garage.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            data-testid="email-input"
            label="Email"
            required
            fullWidth
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            data-testid="password-input"
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            required
            fullWidth
            sx={{ borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            data-testid="login-button"
            onClick={onSubmit}
            sx={{
              width: "100%",
              backgroundColor: "#495057",
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#343a40",
              },
              marginBottom: 2,
            }}
          >
            Log in
          </Button>
          <Button
            variant="outlined"
            data-testid="cancel-button"
            onClick={onCancel}
            sx={{
              width: "100%",
              color: "#495057",
              borderColor: "#ced4da",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f8f9fa",
                borderColor: "#adb5bd",
              },
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
