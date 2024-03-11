// React
import * as React from "react";
import { useState } from "react";
// React router
import { Link, useLocation, Outlet } from "react-router-dom";
// Axios
import axios from "axios";
// Cookies
import { useCookies } from "react-cookie";
// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LoadingButton from "@mui/lab/LoadingButton";

const drawerWidth = 240;

function DashboardLayout(props) {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);

  const logOut = async () => {
    // console.log(cookies.token);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/logout",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      // Remove the "token" cookie entirely
      removeCookie("token", { path: "/" });
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { pathname } = useLocation();

  const drawer = (
    <div>
      <Toolbar style={{ justifyContent: "center" }}>
        <Link to="../" style={{ textDecoration: "none", color: "#fff" }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <ArrowBackIosIcon sx={{ color: "#2486F0", fontSize: "medium" }} />
            <Typography
              style={{
                textAlign: "center",
                justifyContent: "center",
                fontSize: "16px",
                color: "#2486F0",
                margin: 0,
              }}
              align="center"
              variant="h4"
              noWrap
              component="h1"
            >
              Back
            </Typography>
          </Stack>
        </Link>
      </Toolbar>

      <Divider />

      <List disablePadding>
        <ListItem
          disablePadding
          button
          component={Link}
          to="."
          selected={pathname === "/admin/dashboard"}
        >
          <ListItemButton>
            <ListItemIcon>
              <SpaceDashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          button
          component={Link}
          to="statistics"
          selected={pathname === "/admin/dashboard/statistics"}
        >
          <ListItemButton>
            <ListItemIcon>
              <DataUsageIcon />
            </ListItemIcon>
            <ListItemText primary={"Statistics"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#2486F0",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Party Event
            </Typography>

            <LoadingButton
              onClick={logOut}
              loading={loading}
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Logout
            </LoadingButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
