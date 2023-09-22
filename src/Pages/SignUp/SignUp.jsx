// React router
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// Sass
import css from "./SignUp.module.scss";
// Axios
import axios from "axios";
// MUI
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

const theme = createTheme();

export default function SignUp() {
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

  // SignUp Button handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    setLoading(true);
    try {
      // const response = await axios.post("/user?ID=12345", {
      //   name: name,
      //   email: email,
      // });
      // console.log(response);

      // Flip the form

      setTimeout(() => {
        document.querySelector(`.${css.flip_card_inner}`).style.transform =
          "rotateY(180deg)";
      }, 3000);
      
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
            Join us
          </Typography>

          {/* Alert if Exist */}
          {alertMsg ? alert : null}

          <div className={css.flip_card}>
            <div className={css.flip_card_inner}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                className={css.flip_card_front}
              >
                <Grid container spacing={2}>
                  {/* Name input */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      name="name"
                      label="Name"
                    />
                  </Grid>

                  {/* Email Input */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                    />
                  </Grid>
                </Grid>

                {/* Sign Up Button */}
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableRipple
                  loading={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    transition: "0.1s",
                    height: "56px",
                  }}
                >
                  Join us
                </LoadingButton>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    {/* Link to Signin */}
                    <Link component={RouterLink} to="/login" variant="body2">
                      I'm an admin
                    </Link>
                  </Grid>
                </Grid>
              </Box>

              <div className={css.flip_card_back}>
                <h1>Thank You!</h1>
                <h3>Check your email, we have sent you a QR Code.</h3>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
