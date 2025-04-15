import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function DeleteConfirmationPopup({ isOpen, onClose, onDelete }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this vehicle? ALL of the vehicle's
          data including its maintenance history will be permanently removed.
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          data-testid="cancel-button"
          onClick={onClose}
          sx={{
            width: "100%",
            color: "#495057",
            borderColor: "#ced4da",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#D3D3D3",
              borderColor: "#adb5bd",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          data-testid="login-button"
          onClick={onDelete}
          sx={{
            width: "100%",
            backgroundColor: "#cf142b",
            color: "#ffffff",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#8B0000",
            },
          }}
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
