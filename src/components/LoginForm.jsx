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
import Link from "next/link"; // Import Link from Next.js

function LoginForm({ onCancel, onSubmit, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    console.log("Email:", email, "Password:", password);
    if (onSubmit) {
      setLoading(true); // Start loading
      await onSubmit(email, password);
      setLoading(false); // Stop loading
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
      {error && (
        <Typography
          variant="body2"
          textAlign="center"
          gutterBottom
          sx={{
            color: "red",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            data-testid="email-input"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root.Mui-error": {
                borderColor: "red",
              },
            }}
            error={!!error} // Add red outline if there's an error
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
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root.Mui-error": {
                borderColor: "red",
              },
            }}
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
            error={!!error} // Add red outline if there's an error
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
              "Log in"
            )}
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
        <Grid item xs={12} textAlign="center">
          <Typography variant="body2" sx={{ color: "#6c757d" }}>
            Don't have an account?{" "}
            <Link
              href="/register"
              style={{ color: "#007bff", textDecoration: "none" }} // Changed to blue color
            >
              Register here
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
