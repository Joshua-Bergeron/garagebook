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

function LoginForm({ onCancel, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
    if (onSubmit) {
      onSubmit(email, password);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            data-testid="password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            data-testid="login-button"
            onClick={handleLogin}
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
