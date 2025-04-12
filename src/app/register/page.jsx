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
import NavigationBar from "@/components/NavigationBar";
import RegisterPage from "@/components/RegisterPage";

export default function Register() {
  return (
    <div>
      <NavigationBar />
      <RegisterPage />
    </div>
  );
}
