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
  CircularProgress,
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to track loading

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the field
  };

  const validateFields = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors
      return;
    }

    setLoading(true); // Start loading
    try {
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
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCancel = () => {
    router.push("/"); // Navigate to the home route
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
        marginTop: "10vh",
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
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
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
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            data-testid="register-button"
            onClick={handleRegister}
            disabled={loading} // Disable button while loading
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
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Register"
            )}
          </Button>
          <Button
            variant="outlined"
            data-testid="cancel-button"
            onClick={handleCancel} // Call handleCancel on click
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
