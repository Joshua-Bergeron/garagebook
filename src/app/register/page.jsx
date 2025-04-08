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
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log("Data:", data);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const userInfo = await response.json();
    console.log("userInfo", userInfo);
    router.push("/login");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#495057" }}
      >
        Create an Account
      </Typography>
      <Typography
        variant="body2"
        textAlign="center"
        gutterBottom
        sx={{ color: "#6c757d" }}
      >
        Please fill in the details to register.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            data-testid="name-input"
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            fullWidth
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            data-testid="email-input"
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            data-testid="password-input"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={handleChange}
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
        <Grid item xs={12}>
          <TextField
            data-testid="confirm-password-input"
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={data.confirmPassword}
            onChange={handleChange}
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
            data-testid="register-button"
            onClick={handleRegister}
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
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
