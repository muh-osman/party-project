// React
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// MUI
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Cookies
import { useCookies } from "react-cookie";



export default function BasicTable() {
  const [cookies] = useCookies(["token"]);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/guests", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(response);
      setData(response.data.guests);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const guests = data.map((guest) => (
    <TableRow
      key={guest.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {guest.name}
      </TableCell>
      <TableCell>{guest.email}</TableCell>
      <TableCell>{guest.created_at}</TableCell>
      <TableCell sx={{ color: guest.attendanceStatus ? "#36A2EB" : "#FF6384" }}>
        {guest.attendanceStatus ? "Attended" : "Not Attend"}
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableRow-root:hover": {
            backgroundColor: "#F6F6F6",
            whiteSpace: "nowrap",
          },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F6F6F6" }}>
            <TableCell sx={{ fontWeight: "600" }}>Name:</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Email:</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Register date:</TableCell>
            <TableCell sx={{ fontWeight: "600" }}>Status:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {guests}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
