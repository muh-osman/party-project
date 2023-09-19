// React router
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Sass
import css from "./Admin.module.scss";
// Icons
import scanIcon from "../../assets/images/scan.webp";
import dashboardIcon from "../../assets/images/dashboard.svg";
// Mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Admin() {
  return (
    <article className={css.container}>
      {/* Scan */}
      <Card sx={{ width: 200, padding: 1 }}>
        <CardActionArea component={RouterLink} to="scan">
          <CardMedia
            component="img"
            height="140"
            image={scanIcon}
            alt="Scan qr code"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center", margin: 0 }}
            >
              Scan
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Dashboard */}
      <Card sx={{ width: 200, padding: 1 }}>
        <CardActionArea component={RouterLink} to="dashboard">
          <CardMedia
            component="img"
            height="140"
            image={dashboardIcon}
            alt="Dashboard"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center", margin: 0 }}
            >
              Dashboard
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </article>
  );
}
