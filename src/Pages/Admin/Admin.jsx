import css from "./Admin.module.scss";
// Icons
import scanIcon from "../../assets/images/qrcode-solid.svg"
import dashboardIcon from "../../assets/images/chart-line-solid.svg"
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
      <Card sx={{ width: 200, height: 200, padding: 1 }}>
        <CardActionArea>
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
              sx={{ textAlign: "center" }}
            >
              Scan
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Dashboard */}
      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
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
              sx={{ textAlign: "center" }}
            >
              Dashboard
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </article>
  );
}
