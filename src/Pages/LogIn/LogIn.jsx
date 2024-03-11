import React, { useState, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Axios
import axios from "axios"
// MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
// Cookies
import { useCookies } from 'react-cookie';

const theme = createTheme();

export default function LogIn() {
  // Cookies
  const [cookies, setCookie] = useCookies(['token']);
  // Disable submit button
  const [loading, setLoading] = useState(false);
  // Alert Message State
  const [alertMsg, setAlertMsg] = useState(null);
  let alert = (
    <Alert
      sx={{ mt: 2 }}
      variant="outlined"
      severity="error"
    >{`${alertMsg}`}</Alert>
  );

  const navigate = useNavigate(); //After Signin

  // Signin Button
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data.currentToken);
      setCookie("token", response.data.currentToken)

      // setLoading(false);
      navigate("/admin", {replace: true})

      // console.log(email, password);
    } catch (error) {
      setLoading(false);
      setAlertMsg(error.message);
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#222", fontSize: "48px", fontWeight: 800 }}
          >
            Log as admin
          </Typography>

          {alertMsg ? alert : null}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value="zaru@mailinator.com"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value="Pa$$w0rd!"
            />
            <FormControlLabel
              control={<Checkbox id="checkbox" color="primary" />}
              label="Remember me"
            />

            {/* Signin Button */}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disableRipple
              loading={loading}
              sx={{ mt: 3, mb: 1, height: "56px", transition: "0.1s" }}
            >
              Log in
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
