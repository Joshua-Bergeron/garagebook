"use client";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import GarageIcon from "@mui/icons-material/Garage";
import { useRouter } from "next/navigation";
import ButtonBase from "@mui/material/ButtonBase";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const pages = ["Vehicles"];
const settings = ["Logout"];

function NavigationBar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const userName = session?.user?.name || "";

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (setting) => {
    setAnchorElUser(null);

    if (setting === "Account") {
      console.log("account");
    } else if (setting === "Logout") {
      console.log("logout");
      signOut({ callbackUrl: "/" });
    }
  };

  const handleNavigate = (page) => {
    if (page === "Vehicles") {
      router.push("/dashboard");
    }
  };

  return (
    <AppBar position="static" sx={{ mb: 3, backgroundColor: "#3c4463" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GarageIcon sx={{ mr: 1 }} data-testid="garage-icon" />
          <Typography
            component={ButtonBase}
            onClick={() => router.push("/")}
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            data-testid="title-text"
          >
            GarageBook
          </Typography>
          {isLoggedIn && (
            <>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    data-testid={`${page.toLowerCase()}-link`}
                    onClick={() => handleNavigate(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar data-testid="avatar-icon">
                      {getInitials(userName)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleUserMenuClick(setting)}
                      data-testid={`${setting.toLowerCase()}-link`}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
