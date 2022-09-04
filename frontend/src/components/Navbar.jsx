import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";

function Navbar(props) {
  const { user } = useSelector((store) => store.auth);

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginY: 13,
      }}
    >
      <AppBar className="navbar" position="fixed">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontSize: { xs: "1.6rem", sm: "2.125rem" } }}
          >
            <Link to="/">TODO</Link>
          </Typography>
          <IconButton
            className="burger-menu"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
            onClick={props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          {user !== null ? (
            <AccountMenu />
          ) : (
            <>
              <Button
                color="inherit"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Link to="register">Register</Link>
              </Button>
              <Button
                color="inherit"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Link to="login">Login</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
