"use client";
import React from "react";
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  ArrowForward,
  DirectionsCar,
  Build,
  AttachMoney,
} from "@mui/icons-material";
import NavigationBar from "./NavigationBar";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  return (
    <>
      <NavigationBar />
      <Container
        maxWidth="lg"
        sx={{ paddingTop: 4, display: "grid", gridTemplateRows: "1fr auto" }}
      >
        <Box sx={{ textAlign: "center", padding: 4, marginTop: 15 }}>
          <Typography variant="h2" gutterBottom>
            Welcome to GarageBook
          </Typography>
          <Typography variant="h5" gutterBottom>
            Your one-stop solution for managing your garage.
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ backgroundColor: "#3c4463" }}
              endIcon={<ArrowForward data-testid="arrow-icon" />}
              onClick={() => router.push("/register")}
              data-testid="register-button"
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                borderColor: "#3c4463",
                color: "#3c4463",
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                  borderColor: "#3c4463",
                },
              }}
              onClick={() => router.push("/login")}
              data-testid="login-button"
            >
              Login
            </Button>
          </Box>
        </Box>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <DirectionsCar
                  sx={{ fontSize: 40, color: "#3c4463" }}
                  data-testid="car-icon"
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#3c4463" }}
                >
                  Vehicle Management
                </Typography>
                <Typography>
                  Efficiently track all of your vehicles in one place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <Build
                  sx={{ fontSize: 40, color: "#3c4463" }}
                  data-testid="tool-icon"
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#3c4463" }}
                >
                  Service History
                </Typography>
                <Typography>
                  Log and track all maintenance and service records.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <AttachMoney
                  sx={{ fontSize: 40, color: "#3c4463" }}
                  data-testid="money-icon"
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#3c4463" }}
                >
                  Expense Tracking
                </Typography>
                <Typography>
                  Track expenses related to vehicle maintenance and repairs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
