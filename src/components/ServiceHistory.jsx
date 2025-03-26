import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import milesFormatter from "@/utils/milesFormatter";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";

export default function ServiceHistory({ serviceHistory }) {
  return (
    <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="service history table">
        <TableHead>
          <TableRow
            style={{
              backgroundColor: "#495057",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableCell sx={{ color: "white" }}>Service Type</TableCell>
            <TableCell sx={{ color: "white" }}>Mileage</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>City</TableCell>
            <TableCell sx={{ color: "white" }}>State</TableCell>
            <TableCell sx={{ color: "white" }}>Additional Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No maintenance history records have been added for this vehicle
              </TableCell>
            </TableRow>
          ) : (
            serviceHistory.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : grey[200],
                }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell>{milesFormatter(row.mileage)}</TableCell>
                <TableCell>
                  {dayjs(row.serviceDate).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
