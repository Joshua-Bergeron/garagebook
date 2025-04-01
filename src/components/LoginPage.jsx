import React from "react";
import LoginForm from "@/components/LoginForm";
import NavigationBar from "@/components/NavigationBar";
import { Box, Paper, Typography } from "@mui/material";

export default function LoginPage({ onSubmit, onCancel }) {
  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          marginTop: "-15vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            maxWidth: 360,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#24292f" }}
          >
            Sign in to GarageBook
          </Typography>
          <LoginForm onSubmit={onSubmit} onCancel={onCancel} />
        </Paper>
      </Box>
    </>
  );
}
